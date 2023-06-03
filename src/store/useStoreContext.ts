import React from 'react';

import { StoreContext } from './StoreContext';

export const useStoreContext = () => React.useContext(StoreContext);
