import type { AuthProvider, LoginResult, UserIdentity } from '../types';

const defaultIdentity: UserIdentity = {
  id: '',
  username: '',
  fullName: '',
  roles: '',
  roleList: [],
};

export const defaultProvider: AuthProvider = {
  login: async ({ username, password }) => {
    console.log('login', { username, password });

    let accessToken = 'dummy_access_token';
    let refreshToken = 'dummy_refresh_token';
    let tokenExpiresAt = 0;

    const result: LoginResult = {
      accessToken,
      refreshToken,
      expiresAt: tokenExpiresAt,
    };
    return result;
  },
  logout: async () => {
    console.log('logout');
  },
  changePassword: async (params: any) => {
    console.log('changePassword', params);
  },
  getIdentity: async () => {
    console.log('getIdentity');
    return defaultIdentity;
  },
};
