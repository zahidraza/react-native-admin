import React from 'react';

import type { DataProvider } from '../types';
import { DataProviderContext } from './DataProviderContext';

export const useDataProvider = (): DataProvider =>
  React.useContext(DataProviderContext);
