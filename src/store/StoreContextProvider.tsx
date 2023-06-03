import React from 'react';
import { StoreContext } from './StoreContext';
import type { Store } from './types';

export interface StoreContextProviderProps {
  store: Store;
  children: React.ReactNode;
}

export const StoreContextProvider = ({
  store,
  children,
}: StoreContextProviderProps) => {
  React.useEffect(() => {
    store.setup();
  }, [store]);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
