import type { I18nProvider, Locale } from '../types';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import type { Translations } from './types';

const createI18nProvider = (
  translations: Translations,
  supportedLocales: Locale[]
) => {
  const i18n = new I18n(translations);

  // Set the locale once at the beginning of your app.
  const localeTag = Localization.locale;
  const locale = localeTag?.split('-')[0] || 'en';
  i18n.defaultLocale = 'en';
  i18n.locale = locale;
  i18n.enableFallback = true;

  const i18nProvider: I18nProvider = {
    i18n: i18n,
    translate: (key: string, options): string => {
      return i18n.t(key, options);
    },
    changeLocale: (loc: string) => {
      i18n.locale = loc;
    },
    getLocale: (): string => i18n.locale,
    getLocales: (): Locale[] =>
      supportedLocales || [{ locale: 'en', name: 'English' }],
  };

  return i18nProvider;
};

export default createI18nProvider;
