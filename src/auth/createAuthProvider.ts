/* eslint-disable dot-notation */
import axios, { AxiosError } from 'axios';
import jwtDecode from 'jwt-decode';
import type {
  ApiUrl,
  AuthProvider,
  LoginResult,
  UserIdentity,
  AuthOptions,
} from '../types';
import Base64 from '../util/Base64';
import handleAuthError from '../util/handleAuthError';
import { isEmpty, isTrue } from '../util/helpers';

const defaultIdentity: UserIdentity = {
  id: '',
  username: '',
  fullName: '',
  roles: '',
  roleList: [],
};

const createAuthProvider = async (
  authApiUrl: ApiUrl,
  authOptions: AuthOptions
) => {
  let authUrl: string;
  if (typeof authApiUrl === 'string') {
    authUrl = authApiUrl;
  } else {
    authUrl = await authApiUrl();
  }

  const loginPath = authOptions?.loginPath || '/oauth/token';
  const passwordChangePath =
    authOptions?.passwordChangePath || '/api/users/changePassword';
  const axiosOptions = authOptions?.axiosOptions || {};

  const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
      //** Prepare Axios Options **//
      let authHeader = {};
      if (
        !isEmpty(authOptions.clientId) &&
        !isEmpty(authOptions.clientSecret)
      ) {
        authHeader = {
          Authorization:
            'Basic ' +
            Base64.btoa(`${authOptions.clientId}:${authOptions.clientSecret}`),
        };
      }

      let options = {
        ...axiosOptions,
        url: `${authUrl}${loginPath}`,
        method: 'post',
        params: {
          ...axiosOptions.params,
          grant_type: 'password',
          appId: authOptions?.appId,
          username: username?.trim(),
          password: password?.trim(),
        },
        headers: {
          ...authHeader,
          ...axiosOptions.headers,
        },
      };

      try {
        const response = await axios(options);
        const loginResult =
          typeof authOptions.loginParse === 'function'
            ? authOptions.loginParse(
                response.data,
                authOptions?.allowedRoleIds || []
              )
            : defaultLoginParse(response.data, authOptions?.allowedRoleIds);
        if (isTrue(authOptions?.log)) {
          console.log('login', { options, response, loginResult });
        }
        return loginResult;
      } catch (error) {
        const authError = handleAuthError(error as AxiosError);
        throw authError;
      }
    },
    logout: async (arg) => {
      if (isTrue(authOptions?.log)) {
        console.log('logout', { arg });
      }
    },
    changePassword: async ({ username, oldPassword, newPassword }) => {
      let options = {
        ...axiosOptions,
        url: `${authUrl}${passwordChangePath}`,
        method: 'patch',
        params: {
          ...axiosOptions.params,
          username,
          oldPassword,
          newPassword,
        },
      };
      try {
        const response = await axios(options);
        if (isTrue(authOptions?.log)) {
          console.log('changePassword', { options, response });
        }
      } catch (error) {
        const apiError = handleAuthError(error as AxiosError);
        throw apiError;
      }
    },
    getIdentity: async () => {
      if (isTrue(authOptions?.log)) {
        console.log('getIdentity', { defaultIdentity });
      }
      return defaultIdentity;
    },
  };

  return authProvider;
};

export default createAuthProvider;

const defaultLoginParse = (
  data: any,
  allowedRoleIds: string[] = []
): LoginResult => {
  if (isEmpty(data)) return { accessToken: '' };

  const accessToken =
    data['access_token'] || data['accessToken'] || data['token'];
  const refreshToken = data['refresh_token'] || data['refreshToken'];
  const expiresIn = data['expires_in'] || data['expiresIn'];
  const tokenExpiresAt =
    typeof expiresIn === 'number' ? new Date().getTime() + expiresIn * 1000 : 0;

  const userId = data['user_id'] || data['userId'] || data['id'];
  let fullName = data['full_name'] || data['fullName'] || data['name'];
  let username = data['user_name'] || data['userName'] || data['username'];
  if (isEmpty(fullName)) {
    let firstName = data['first_name'] || data['firstName'];
    let lastName = data['last_name'] || data['lastName'];
    fullName = firstName
      ? `${firstName}${isEmpty(lastName) ? '' : ` ${lastName}`}`
      : null;
    if (isEmpty(fullName)) {
      fullName = data['user_name'] || data['userName'] || data['username'];
    }
  }

  let user: UserIdentity = {
    id: userId,
    username,
    fullName,
    roles: '',
    roleList: [],
  };

  if (accessToken) {
    const decodedToken: any = jwtDecode(accessToken);
    const roleList =
      decodedToken['authorities'] &&
      decodedToken['authorities'].map((role: string) => role.substring(5));
    if (isEmpty(username)) {
      username =
        decodedToken['user_name'] ||
        decodedToken['userName'] ||
        decodedToken['username'];
    }
    user = {
      //   ...(decodedToken as any),
      ...user,
      username,
      roles: roleList.join(', '),
      roleList: !isEmpty(allowedRoleIds)
        ? roleList.filter((roleId: string) => allowedRoleIds.includes(roleId))
        : roleList,
    };
  }

  const loginResult: LoginResult = {
    accessToken,
    refreshToken,
    tokenExpiresAt,
    user,
  };
  return loginResult;
};
