import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

import HttpError from '../HttpError';
import type {
  Auth,
  AuthState,
  LoginResult,
  UserIdentity,
  Notification,
  AuthContextProviderProps,
} from '../types';
import { tryParse, isEmpty } from '../util/helpers';
import useStore from '../store/useStore';

import AuthContext from './AuthContext';

const AuthContextProvider = ({
  authProvider,
  children,
}: AuthContextProviderProps) => {
  const [authState, setAuthState] = React.useState<AuthState>(() => ({
    authenticating: undefined,
  }));
  const [, setNotification] = useStore<Notification>('@notification');

  //** Initialize AuthState from SecureStore if already logged in **//
  React.useEffect(() => {
    const initAsync = async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      const expiresAt = await SecureStore.getItemAsync('tokenExpiresAt');
      const user = await SecureStore.getItemAsync('user');

      const tokenExpiresAt = isEmpty(expiresAt) ? 0 : Number(expiresAt);
      const userIdentity = tryParse(user) as UserIdentity;
      let role;
      if (!isEmpty(userIdentity?.id)) {
        role = await SecureStore.getItemAsync(`${userIdentity.id}.role`);
      }

      setAuthState({
        authenticating: false,
        accessToken: accessToken || undefined,
        refreshToken: refreshToken || undefined,
        role: role || undefined,
        tokenExpiresAt,
        userIdentity: userIdentity,
      });
    };
    initAsync();
  }, []);

  const login = React.useCallback(
    async (authParams: any) => {
      if (authProvider) {
        setAuthState({ authenticating: true });

        try {
          const result: LoginResult = await authProvider.login(authParams);

          let role: string | undefined;
          if (!isEmpty(result.user)) {
            await SecureStore.setItemAsync('user', JSON.stringify(result.user));

            const roleKey = `${result?.user?.id}.role`;
            const storedRole =
              (await SecureStore.getItemAsync(roleKey)) || undefined;
            role =
              result?.user?.roleList?.length === 1
                ? result.user.roleList[0]
                : storedRole;
            if (!isEmpty(role)) {
              await SecureStore.setItemAsync(roleKey, role as string);
            }
          }

          //**  Write in Secure Store **//
          await SecureStore.setItemAsync('accessToken', result.accessToken);
          await SecureStore.setItemAsync(
            'refreshToken',
            result.refreshToken || ''
          );
          await SecureStore.setItemAsync(
            'tokenExpiresAt',
            `${result.expiresAt || 0}`
          );
          if (!isEmpty(result.user)) {
            await SecureStore.setItemAsync('user', JSON.stringify(result.user));
          }

          setAuthState({
            authenticating: false,
            accessToken: result.accessToken,
            refreshToken: result.accessToken,
            tokenExpiresAt: result.expiresAt,
            userIdentity: result.user,
            role,
          });
        } catch (error) {
          if (error instanceof HttpError) {
            setNotification({
              title: error.title || error.statusText || 'Error',
              message: error.message,
            });
          } else if (error instanceof Error) {
            setNotification({ title: 'Error', message: error.message });
          }
          setAuthState((prev) => ({ ...prev, authenticating: false }));
        }
      } else {
        console.error('AuthProvider is missing.');
      }
    },
    [authProvider, setAuthState, setNotification]
  );

  const changePassword = React.useCallback(
    async (authParams: any) => {
      if (authProvider) {
        try {
          await authProvider.changePassword({
            username: authState?.userIdentity?.username,
            ...authParams,
          });
        } catch (error) {
          if (error instanceof HttpError) {
            setNotification({
              title: error.title || error.statusText || 'Error',
              message: error.message,
            });
          } else if (error instanceof Error) {
            setNotification({ title: 'Error', message: error.message });
          }
        }
      } else {
        console.error('AuthProvider is missing.');
      }
    },
    [authProvider, authState, setNotification]
  );

  const changeRole = React.useCallback(
    async (role: string) => {
      const roleKey = `${authState.userIdentity?.id}.role`;
      await SecureStore.setItemAsync(roleKey, role);
      setAuthState((prev) => ({ ...prev, role }));
    },
    [authState, setAuthState]
  );

  const logout = React.useCallback(async () => {
    //**  Delete from Secure Store **//
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('tokenExpiresAt');
    await SecureStore.deleteItemAsync('user');

    setAuthState({
      authenticating: false,
      accessToken: undefined,
      refreshToken: undefined,
      tokenExpiresAt: undefined,
      userIdentity: undefined,
      role: undefined,
    });
  }, []);

  const getIdentity = React.useCallback(async (): Promise<UserIdentity> => {
    return { id: '', username: '', fullName: '', roles: '', roleList: [] };
  }, []);

  const auth: Auth = React.useMemo(() => {
    return {
      ...authState,
      login,
      logout,
      changePassword,
      changeRole,
      getIdentity,
    };
  }, [authState, login, logout, changePassword, changeRole, getIdentity]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
