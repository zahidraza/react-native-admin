import * as React from 'react';
import StoreContext from './StoreContext';
import type { StoreContextProviderProps } from './types';

const StoreContextProvider = ({
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

export default StoreContextProvider;
