import React from 'react';
import {
  UseMutationOptions,
  useMutation as useRMutation,
  useQueryClient,
} from 'react-query';

import type {
  DataProviderOptions,
  Notification,
  Record,
  Variables,
} from '../types';
import { useAuth } from '../auth/useAuth';
// import { HttpError } from '../HttpError';
import { useStore } from '../store/useStore';
import { useDataProvider } from './useDataProvider';
import type { AxiosError } from 'axios';

export function useMutation<TVariables = Variables, TData = Record>(
  options: DataProviderOptions,
  mutationOptions: Omit<
    UseMutationOptions<TData, AxiosError, TVariables, unknown>,
    'mutationFn'
  >
) {
  const dataProvider = useDataProvider();
  const { accessToken, logout } = useAuth();
  const [, setNotification] = useStore<Notification>('@notification');
  const queryClient = useQueryClient();

  const mutationResult = useRMutation<TData, AxiosError, TVariables, unknown>(
    (callTimeOptions: any = {}) => {
      const mergedOptions = {
        ...options,
        ...callTimeOptions,
        params: {
          ...options?.params,
          ...callTimeOptions?.params,
        },
        headers: {
          ...options?.headers,
          ...callTimeOptions?.headers,
        },
        accessToken,
      };
      return dataProvider.mutation(mergedOptions);
    },
    mutationOptions
  );

  //** Handle Error Notification **//
  // const error = mutationResult.error;
  // React.useEffect(() => {
  //   if (error instanceof HttpError) {
  //     setNotification({ title: error.title, message: error.message });
  //   }
  // }, [error, setNotification]);

  //** Logout if unauthorized **//
  // const unauthorized = error instanceof HttpError && error.statusCode === 401;
  const unauthorized = false;
  React.useEffect(() => {
    const logoutAsync = async () => {
      if (unauthorized && logout) {
        await logout({});
        queryClient.clear();
      }
    };
    logoutAsync();
  }, [unauthorized, queryClient, logout]);

  return mutationResult;
}
