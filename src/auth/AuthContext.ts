import React from 'react';

import type { Auth } from '../types';

export const AuthContext = React.createContext<Auth>({});

AuthContext.displayName = 'AuthContext';

// export default AuthContext;
