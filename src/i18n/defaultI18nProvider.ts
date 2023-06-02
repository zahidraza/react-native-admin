import type { I18nProvider, Locale } from '../types';

const defaultI18nProvider: I18nProvider = {
  translate: (key: string, _options: any): string => key,
  changeLocale: (_locale: string) => {},
  getLocale: (): string => 'en',
  getLocales: (): Locale[] => [{ locale: 'en', name: 'English' }],
};

export default defaultI18nProvider;
