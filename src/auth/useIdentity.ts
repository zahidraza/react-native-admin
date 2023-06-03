import React from 'react';
import * as SecureStore from 'expo-secure-store';

import { useAuthProvider } from './useAuthProvider';
import type { UserIdentity } from '../types';
import { isEmpty } from '../util/helpers';

const defaultIdentity: UserIdentity = {
  id: '',
  username: '',
  fullName: '',
  roles: '',
  roleList: [],
};

export const useIdentity = () => {
  const [identity, setIdentity] = React.useState<UserIdentity>(defaultIdentity);
  const { userIdentity, getIdentity } = useAuthProvider();
  React.useEffect(() => {
    const initAsync = async () => {
      if (!isEmpty(userIdentity)) {
        setIdentity(userIdentity || defaultIdentity);
      } else {
        const user = SecureStore.getItemAsync('user');
        if (!isEmpty(user)) {
          // setIdentity(user);
        } else {
          // call getIdentity method
        }
      }
    };
    initAsync();
  }, [userIdentity, getIdentity, setIdentity]);
  return identity;
};
