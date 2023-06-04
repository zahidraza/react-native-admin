import useStore from '../store/useStore';

// Locale saved in Store
const useStoreLocale = () => {
  const [locale] = useStore('@locale');
  return locale;
};

export default useStoreLocale;
