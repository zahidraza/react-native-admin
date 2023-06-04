import * as React from 'react';

import type { Store } from './types';
import asyncStore from './asyncStore';

const defaultStore = asyncStore();

const StoreContext = React.createContext<Store>(defaultStore);

export default StoreContext;
