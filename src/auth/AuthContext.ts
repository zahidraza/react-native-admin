import * as React from 'react';

import type { Auth } from '../types';

const AuthContext = React.createContext<Auth>({});

AuthContext.displayName = 'AuthContext';

export default AuthContext;
