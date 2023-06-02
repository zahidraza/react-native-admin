import type { Store } from './types';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Subscription = {
  key: string;
  callback: (value: any) => void;
};

const asyncStore = (version: string = '1_0_0'): Store => {
  const prefix = `Store`;
  const prefixLength = prefix.length;

  const subscriptions: { [key: string]: Subscription } = {};
  const publish = (key: string, value: any) => {
    Object.keys(subscriptions).forEach((id) => {
      if (!subscriptions[id]) return; // may happen if a component unmounts after a first subscriber was notified
      if (subscriptions[id]?.key === key) {
        subscriptions[id]?.callback(value);
      }
    });
  };

  return {
    setup: async () => {
      // check version
      const storedVersion = await AsyncStorage.getItem(`${prefix}.version`);
      if (storedVersion && storedVersion !== version) {
        const allKeys = await AsyncStorage.getAllKeys();
        const keys = allKeys.filter((key: string) => key.startsWith(prefix));
        AsyncStorage.multiRemove(keys);
      }
      await AsyncStorage.setItem(`${prefix}.version`, version);
    },
    getItem: async <T = any,>(key: string, defaultValue?: T) => {
      const valueFromStorage = await AsyncStorage.getItem(`${prefix}.${key}`);
      return valueFromStorage === null || valueFromStorage === undefined
        ? defaultValue
        : tryParse(valueFromStorage);
    },
    setItem: async <T = any,>(key: string, value: T) => {
      if (value === undefined || value === null) {
        await AsyncStorage.removeItem(`${prefix}.${key}`);
      } else {
        let serializedValue = `${value}`;
        if (typeof value === 'object') {
          serializedValue = JSON.stringify(value);
        }
        await AsyncStorage.setItem(`${prefix}.${key}`, serializedValue);
      }
      publish(key, value);
    },
    removeItem: async (key: string) => {
      await AsyncStorage.removeItem(`${prefix}.${key}`);
      publish(key, undefined);
    },
    removeItems: async (keyPrefix: string) => {
      const allKeys = await AsyncStorage.getAllKeys();
      const keys = allKeys.filter((key: string) =>
        key.startsWith(`${prefix}.${keyPrefix}`)
      );
      await AsyncStorage.multiRemove(keys);
      keys
        .map((key: string) => key.substring(prefixLength + 1))
        .forEach((publishKey: string) => publish(publishKey, undefined));
    },
    subscribe: (key: string, callback: (value: string) => void) => {
      const id = Math.random().toString();
      subscriptions[id] = {
        key,
        callback,
      };
      return () => {
        delete subscriptions[id];
      };
    },
  };
};

export default asyncStore;

const tryParse = (value: string): any => {
  if (
    (value.trim().startsWith('{') && value.trim().endsWith('}')) ||
    (value.trim().startsWith('[') && value.trim().startsWith(']'))
  ) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return value;
};
