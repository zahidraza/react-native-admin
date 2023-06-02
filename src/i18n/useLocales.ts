import { useI18nProvider } from './useI18nProvider';

export const useLocales = () => {
  const { getLocales } = useI18nProvider();
  return typeof getLocales === 'function' ? getLocales() : [];
};
