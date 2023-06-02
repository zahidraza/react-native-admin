import * as React from 'react';

import { I18nContext } from './I18nContext';
import { useStore } from '../store/useStore';
import type { I18nProvider } from '../types';

export interface I18nContextProviderProps {
  i18nProvider: I18nProvider;
  children: React.ReactNode;
}

export const I18nContextProvider = ({
  i18nProvider,
  children,
}: I18nContextProviderProps) => {
  const [locale] = useStore('@locale', i18nProvider.getLocale());

  // watch store for locale changes
  React.useEffect(() => {
    if (locale && i18nProvider.getLocale() !== locale) {
      i18nProvider.changeLocale(locale);
    }
  }, [locale, i18nProvider]);
  return (
    <I18nContext.Provider value={i18nProvider}>{children}</I18nContext.Provider>
  );
};
