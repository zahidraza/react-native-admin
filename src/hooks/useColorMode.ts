import useStore from '../store/useStore';

const useColorMode = () => {
  const [colorMode] = useStore('@color-mode');
  return colorMode;
};

export default useColorMode;
