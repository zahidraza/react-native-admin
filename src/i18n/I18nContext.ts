import * as React from 'react';

import type { I18nProvider } from '../types';
import defaultI18nProvider from './defaultI18nProvider';

const I18nContext = React.createContext<I18nProvider>(defaultI18nProvider);

I18nContext.displayName = 'I18nContext';

export default I18nContext;
