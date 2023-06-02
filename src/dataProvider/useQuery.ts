import * as React from 'react';
import type { AxiosError } from 'axios';
import { QueryKey, useQuery as useRQuery, useQueryClient } from 'react-query';

import type {
  QueryOptions,
  DataProviderOptions,
  Notification,
  Record,
} from '../types';
import { useAuth } from '../auth/useAuth';
import { HttpError } from '../HttpError';
import { useStore } from '../store/useStore';
import { useDataProvider } from './useDataProvider';
import { useDeepEffect } from '../hooks/useDeepEffect';
import { usePrevious } from '../hooks/usePrevious';

export function useQuery<TQueryFnData = Record, TData = Record>(
  key: QueryKey,
  options: DataProviderOptions,
  queryOptions?: QueryOptions<TQueryFnData, TData>
) {
  const dataProvider = useDataProvider();
  const { accessToken, logout } = useAuth();
  const [, setNotification] = useStore<Notification>('@notification');
  const queryClient = useQueryClient();

  const { version, ...restQueryOptions } = queryOptions || {};

  const queryResult = useRQuery<TQueryFnData, AxiosError, TData, QueryKey>(
    key,
    () =>
      dataProvider.query({
        ...options,
        enabled: queryOptions?.enabled,
        accessToken, // accessToken cannot be overridden
      }),
    restQueryOptions
  );

  const prevVersion = usePrevious(version);
  useDeepEffect(() => {
    if (prevVersion !== undefined && prevVersion !== version) {
      typeof queryResult?.refetch === 'function' && queryResult.refetch();
    }
  }, [version]);

  //** Handle Error Notification **//
  const error = queryResult.error;
  React.useEffect(() => {
    if (error instanceof HttpError) {
      setNotification({ title: error.title, message: error.message });
    }
  }, [error, setNotification]);

  //** Logout if unauthorized **//
  const unauthorized = error instanceof HttpError && error.statusCode === 401;
  React.useEffect(() => {
    const logoutAsync = async () => {
      if (unauthorized && logout) {
        await logout({});
        queryClient.clear();
      }
    };
    logoutAsync();
  }, [unauthorized, queryClient, logout]);

  return queryResult;
}
