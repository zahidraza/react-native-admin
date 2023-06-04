import * as React from 'react';

import type { DataProvider } from '../types';
import DataProviderContext from './DataProviderContext';

const useDataProvider = (): DataProvider =>
  React.useContext(DataProviderContext);

export default useDataProvider;
