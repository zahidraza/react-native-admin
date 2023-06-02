import { useStore } from '../store/useStore';

export const useChangeLocale = () => {
  const [, setLocale] = useStore('@locale');
  return setLocale;
};
