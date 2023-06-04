import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { I18n } from 'i18n-js/typings';
import type { UseQueryOptions, QueryClient, QueryKey } from 'react-query';
import type { Store } from './store/types';

export type ApiUrl = string | (() => Promise<string>);

export type Identifier = string | number;

export interface Record {
  id: Identifier;
  name: string;
  [key: string]: any;
}

export interface Variables {
  [key: string]: any;
}

export interface UserIdentity {
  id: Identifier;
  username: string;
  fullName: string;
  roles: string;
  roleList: string[];
  locationList?: any[];
  [key: string]: any;
}

export interface AuthState {
  authenticating?: boolean | undefined;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: number;
  role?: string;
  userIdentity?: UserIdentity;
}

export type Auth = AuthState & {
  login?: (params: any) => Promise<void>;
  logout?: (params: any) => Promise<void>;
  changeRole?: (role: string) => Promise<void>;
  getIdentity?: () => Promise<UserIdentity>;
};

export interface LoginResult {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  user?: UserIdentity;
  [key: string]: any;
}

export interface AuthProvider {
  login: (params: any) => Promise<LoginResult>;
  logout: (params: any) => Promise<void>;
  changePassword: (params: any) => Promise<void>;
  getIdentity: () => Promise<UserIdentity>;
}

export interface AuthContextProviderProps {
  authProvider?: AuthProvider;
  children: React.ReactNode;
}

export interface AuthOptions {
  appId?: string; // Application Id
  loginPath?: string; // API End point for login e.g - /ouath/token
  logoutPath?: string; // API End point for login e.g - /logout
  passwordChangePath?: string; // API End point for logout e.g - /changePassword
  identityPath?: string; // API End point for user identity e.g - /profile
  clientId?: string; // Client Id for basic basic authorization of client
  clientSecret?: string; // Client Secret for basic basic authorization of client
  loginParse?: (data: any, allowedRoleIds: string[]) => LoginResult; // Parse Response and return Login Result
  axiosOptions?: AxiosRequestConfig;
  allowedRoleIds?: string[];
  log?: boolean;
}

export interface QueryOptions<TQueryFnData = Record, TData = Record>
  extends Omit<
    UseQueryOptions<TQueryFnData, AxiosError, TData, QueryKey>,
    'queryKey' | 'queryFn'
  > {
  version?: number | string;
}

export type DataProviderOptions = Partial<AxiosRequestConfig> & {
  accessToken?: string;
  rawResponse?: boolean;
  basePath?: string;
  enabled?: boolean;
};

export interface DataProvider {
  list: (options: DataProviderOptions) => Promise<any>;
  query: (options: DataProviderOptions) => Promise<any>;
  mutation: (options: DataProviderOptions) => Promise<any>;
}

export interface DataOptions {
  basePath?: string;
  timeout?: number;
  log?: boolean;
}

export type Translate = (key: string, options?: any) => string;

export type Locale = {
  locale: string;
  name: string;
};

export interface I18nProvider {
  i18n?: I18n;
  translate: Translate;
  changeLocale: (locale: string) => void;
  getLocale: () => string;
  getLocales?: () => Locale[];
  [key: string]: any;
}

export interface I18nContextProviderProps {
  i18nProvider: I18nProvider;
  children: React.ReactNode;
}

export interface Notification {
  title?: string;
  message?: string;
  timeout?: number;
}

export interface AppProps {
  store: Store;
  i18nProvider: I18nProvider;
  authProvider: AuthProvider;
  dataProvider: DataProvider;
  queryClient: QueryClient;
  children: any;
}
