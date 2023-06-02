import * as React from 'react';
import { useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { QueryClient } from 'react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import { App, asyncStore, createAuthProvider, createDataProvider, createI18nProvider, isEmpty } from '@jazasoft/react-native-admin';
import type { AuthProvider, DataProvider, Locale, Translations } from '@jazasoft/react-native-admin';

import AppNavigationContainer from './navigation/AppNavigationContainer';

// i18n translations
import englishTranslationMessages from './i18n/en';
import hindiTranslationMessages from './i18n/hi';

// theme
import theme from './theme';
import createColorModeManager from './createColorModeManager';
import defaultAuthProvider from './defaultAuthProvider';
import { authUrl, clientId, clientSecret, appUrl, basePath, appId } from '../config';

const nbConfig = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  },
});

const translations: Translations = {
  en: englishTranslationMessages,
  hi: hindiTranslationMessages,
};
const supportedLocales: Locale[] = [
  { locale: 'en', name: 'English' },
  { locale: 'hi', name: 'हिंदी' },
];

const i18nProvider = createI18nProvider(translations, supportedLocales);

const defaultDataProvider: DataProvider = {
  list: async () => {},
  query: async () => {},
  mutation: async () => {},
};

export default function SampleApp() {
  const [authProvider, setAuthProvider] = React.useState<AuthProvider>(defaultAuthProvider);
  const [dataProvider, setDataProvider] = React.useState<DataProvider>(defaultDataProvider);

  //** Initialize Tenant Info, Auth & Data Provider *//
  React.useEffect(() => {
    const initAsync = async () => {
      //** Initialize Tenant Info **//
      const tenantInfo = await AsyncStorage.getItem('tenantInfo');
      if (isEmpty(tenantInfo)) {
        const extra = Constants.manifest?.extra || {};
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        const { version, eas, ...tenant } = extra;
        if (isEmpty(tenant)) {
          /* eslint-disable-next-line no-alert */
          alert('Cannot Extract Client Info from manifest.');
          return;
        }

        await AsyncStorage.setItem('tenantInfo', JSON.stringify(tenant));
      }
      //** Create Auth & Data Provider */
      const aProvider = await createAuthProvider(authUrl, {
        clientId,
        clientSecret,
        appId,
        log: false,
      });
      const dProvider = await createDataProvider(appUrl, {
        basePath,
        timeout: 30000,
        log: false,
      });

      setAuthProvider(aProvider);
      setDataProvider(dProvider);
    };
    initAsync();
  }, []);

  const version = Constants.manifest?.extra?.version || Constants.manifest?.version;
  const store = asyncStore(version.replace(/\\./g, '_'));
  const colorScheme = useColorScheme();
  const colorModeManager = createColorModeManager(store, colorScheme);

  return (
    <App store={store} i18nProvider={i18nProvider} authProvider={authProvider} dataProvider={dataProvider} queryClient={queryClient}>
      <NativeBaseProvider theme={theme} colorModeManager={colorModeManager} config={nbConfig}>
        <AppNavigationContainer />
      </NativeBaseProvider>
    </App>
  );
}
