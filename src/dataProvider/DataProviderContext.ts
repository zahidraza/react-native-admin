import * as React from 'react';

import type { DataProvider } from '../types';
import defaultDataProvider from './defaultDataProvider';

const DataProviderContext =
  React.createContext<DataProvider>(defaultDataProvider);

DataProviderContext.displayName = 'DataProviderContext';

export default DataProviderContext;
