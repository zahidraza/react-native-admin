import * as React from 'react';

import type { I18nProvider } from '../types';
import { I18nContext } from './I18nContext';

export const useI18nProvider = (): I18nProvider =>
  React.useContext(I18nContext);
