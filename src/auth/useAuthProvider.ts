import * as React from 'react';

import type { Auth } from '../types';
import AuthContext from './AuthContext';

const useAuthProvider = (): Auth => React.useContext(AuthContext);

export default useAuthProvider;
