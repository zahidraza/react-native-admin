import type { StorageManager, ColorMode } from 'native-base';
import type { Store } from '@jazasoft/react-native-admin';

const createColorModeManager = (store: Store, initialColorMode: ColorMode): StorageManager => {
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await store.getItem('@color-mode');
        return val === 'dark' ? 'dark' : val === 'light' ? 'light' : initialColorMode;
      } catch (e) {
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        await store.setItem('@color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };
  return colorModeManager;
};

export default createColorModeManager;
