import useStore from '../store/useStore';

const useChangeLocale = () => {
  const [, setLocale] = useStore('@locale');
  return setLocale;
};

export default useChangeLocale;
