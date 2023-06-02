import { useI18nProvider } from './useI18nProvider';

// Current Locale set in i18n
export const useLocale = () => {
  const { getLocale } = useI18nProvider();
  return typeof getLocale === 'function' ? getLocale() : null;
};
