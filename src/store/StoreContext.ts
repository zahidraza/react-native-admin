import * as React from 'react';

import type { Store } from './types';
import { asyncStore } from './asyncStore';

const defaultStore = asyncStore();

export const StoreContext = React.createContext<Store>(defaultStore);
