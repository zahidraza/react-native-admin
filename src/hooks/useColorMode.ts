import { useStore } from '../store/useStore';

export const useColorMode = () => {
  const [colorMode] = useStore('@color-mode');
  return colorMode;
};
