import * as React from 'react';

import StoreContext from './StoreContext';

const useStoreContext = () => React.useContext(StoreContext);

export default useStoreContext;
