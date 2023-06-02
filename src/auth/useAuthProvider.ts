import * as React from 'react';

import type { Auth } from '../types';
import { AuthContext } from './AuthContext';

export const useAuthProvider = (): Auth => React.useContext(AuthContext);
