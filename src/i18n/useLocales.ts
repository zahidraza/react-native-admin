import useI18nProvider from './useI18nProvider';

const useLocales = () => {
  const { getLocales } = useI18nProvider();
  return typeof getLocales === 'function' ? getLocales() : [];
};

export default useLocales;
