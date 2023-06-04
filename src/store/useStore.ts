import * as React from 'react';

import { useStoreContext } from './useStoreContext';
import useEventCallback from '../hooks/useEventCallback';
import { useDeepEffect } from '../hooks/useDeepEffect';

export type useStoreResult<T = any> = [
  T | undefined,
  (value: T, defaultValue?: T) => void
];

// export type useStoreResult<T = any> = [
//   T | undefined,
//   (value: T | ((value: T) => void), defaultValue?: T) => void
// ];

export const useStore = <T = any>(
  key: string,
  defaultValue?: T
): useStoreResult<T> => {
  const { getItem, setItem, subscribe } = useStoreContext();
  const [value, setValue] = React.useState<T>();

  //** Initialize initial Value **//
  useDeepEffect(() => {
    const initAsync = async () => {
      const val = await getItem(key, defaultValue);
      setValue(val);
    };
    initAsync();
  }, [key, defaultValue, getItem]);

  // subscribe to changes on this key, and change the state when they happen
  useDeepEffect(() => {
    const unsubscribe = subscribe(key, (newValue) => {
      setValue(typeof newValue === 'undefined' ? defaultValue : newValue);
    });
    return () => unsubscribe();
  }, [key, subscribe, getItem, defaultValue]);

  const set = useEventCallback(
    (valueParam: T, runtimeDefaultValue?: T) => {
      const newValue =
        typeof valueParam === 'function' ? valueParam(value) : valueParam;
      // we only set the value in the Store;
      // the value in the local state will be updated
      // by the useEffect during the next render
      setItem(
        key,
        typeof newValue === 'undefined'
          ? typeof runtimeDefaultValue === 'undefined'
            ? defaultValue
            : runtimeDefaultValue
          : newValue
      );
    },
    [key, setItem, defaultValue, value]
  );
  return [value, set];
};
