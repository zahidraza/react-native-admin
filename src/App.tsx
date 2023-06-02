import * as React from 'react';
import { Platform } from 'react-native';

import { QueryClientProvider, focusManager } from 'react-query';
import { useAppState } from '@react-native-community/hooks';

import * as Updates from 'expo-updates';

import { AuthContextProvider } from './auth/AuthContextProvider';
import DataProviderContext from './dataProvider/DataProviderContext';
import { I18nContextProvider } from './i18n/I18nContextProvider';
import { StoreContextProvider } from './store/StoreContextProvider';
import useOnlineManager from './hooks/useOnlineManager';
import usePrevious from './hooks/usePrevious';
import type { AppProps } from './types';

const updateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log(error);
  }
};

export function App(props: AppProps) {
  const {
    store,
    i18nProvider,
    authProvider,
    dataProvider,
    queryClient,
    children,
  } = props;

  useOnlineManager();
  const currentAppState = useAppState();
  const previousAppState = usePrevious(currentAppState);

  //** Update App on start **//
  React.useEffect(() => {
    updateAsync();
  }, []);

  //** Update App on foreground **//
  React.useEffect(() => {
    if (
      ['inactive', 'background'].includes(previousAppState || '') &&
      currentAppState === 'active'
    ) {
      updateAsync();
    }
  }, [previousAppState, currentAppState]);

  //** React Query: refetch on App Focus **//
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(currentAppState === 'active');
    }
  }, [currentAppState]);

  return (
    <StoreContextProvider store={store}>
      <I18nContextProvider i18nProvider={i18nProvider}>
        <AuthContextProvider authProvider={authProvider}>
          <DataProviderContext.Provider value={dataProvider}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </DataProviderContext.Provider>
        </AuthContextProvider>
      </I18nContextProvider>
    </StoreContextProvider>
  );
}
