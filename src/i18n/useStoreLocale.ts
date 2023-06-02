import { useStore } from '../store/useStore';

// Locale saved in Store
export const useStoreLocale = () => {
  const [locale] = useStore('@locale');
  return locale;
};
