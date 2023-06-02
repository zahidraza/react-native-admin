import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { ApiUrl, DataProvider, DataProviderOptions } from '../types';
import handleApiError from '../util/handleApiError';
import { isEmpty, isTrue } from '../util/helpers';

export interface DataOptions {
  basePath?: string;
  timeout?: number;
  log?: boolean;
}

export const createDataProvider = async (
  appApiUrl: ApiUrl,
  dataOptions: DataOptions
) => {
  let appUrl: string;
  if (typeof appApiUrl === 'string') {
    appUrl = appApiUrl;
  } else {
    appUrl = await appApiUrl();
  }

  const restClient = axios.create({
    baseURL: appUrl,
    timeout: dataOptions?.timeout || 30000,
    headers: { 'Content-Type': 'application/json' },
  });

  const dataProvider: DataProvider = {
    list: async (arg: DataProviderOptions) => {
      const { rawResponse = false, enabled = true, ...options } = arg || {};
      if (!enabled) return [];

      const basePath =
        options.basePath === undefined || options.basePath === null
          ? dataOptions?.basePath
          : options.basePath;
      let axiosConfig = prepareAxiosConfig(basePath, options);

      try {
        const response = await restClient.get(
          axiosConfig.url || '',
          axiosConfig
        );
        if (isTrue(dataOptions?.log)) {
          console.log(`list: ${arg?.url || ''}`, { options: arg, response });
        }

        return rawResponse ? response : response.data?.content || response.data;
      } catch (error) {
        const httpError = handleApiError(error as AxiosError);
        console.log({ axiosConfig, httpError });
        throw httpError;
      }
    },
    query: async (arg: DataProviderOptions) => {
      const { rawResponse = false, enabled = true, ...options } = arg || {};
      if (!enabled) return {};

      const basePath =
        options.basePath === undefined || options.basePath === null
          ? dataOptions?.basePath
          : options.basePath;
      let axiosConfig = prepareAxiosConfig(basePath, options);

      try {
        const response = await restClient.get(
          axiosConfig.url || '',
          axiosConfig
        );
        if (isTrue(dataOptions?.log)) {
          console.log(`query: ${arg?.url || ''}`, { options, response });
        }
        return rawResponse ? response : response.data;
      } catch (error) {
        const httpError = handleApiError(error as AxiosError);
        console.log({ axiosConfig, httpError });
        throw httpError;
      }
    },
    mutation: async (arg: DataProviderOptions) => {
      const { rawResponse = false, ...options } = arg || {};
      const basePath =
        options.basePath === undefined || options.basePath === null
          ? dataOptions?.basePath
          : options.basePath;
      let axiosConfig = prepareAxiosConfig(basePath, options);

      try {
        const response = await restClient(axiosConfig);
        if (isTrue(dataOptions?.log)) {
          console.log(`mutation: ${arg?.url || ''}`, { options, response });
        }
        return rawResponse ? response : response.data;
      } catch (error) {
        const httpError = handleApiError(error as AxiosError);
        console.log({ axiosConfig, httpError });
        throw httpError;
      }
    },
  };

  return dataProvider;
};

const prepareAxiosConfig = (
  basePath?: string,
  options?: any
): AxiosRequestConfig => {
  const url = isEmpty(basePath)
    ? `/${options.url}`
    : `${basePath}/${options.url}`;
  let authHeader = {};
  if (!isEmpty(options.accessToken)) {
    authHeader = {
      Authorization: 'Bearer ' + options.accessToken,
    };
  }

  let axiosConfig: AxiosRequestConfig = {
    ...options,
    url,
    headers: { ...authHeader, ...options.headers },
  };
  return axiosConfig;
};
