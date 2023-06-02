import useIdentity from '../auth/useIdentity';
import useQuery from '../dataProvider/useQuery';
import type { UserIdentity } from '../types';
import { isEmpty } from '../util/helpers';
import useDeepMemo from './useDeepMemo';

const useUser = (version?: number | string): UserIdentity => {
  const identity = useIdentity();

  const { data: user = {} } = useQuery(
    ['userIdentity', identity?.id],
    { url: `users/${identity?.id}` },
    {
      enabled: !isEmpty(identity?.id),
      version,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const memoizedUser: UserIdentity = useDeepMemo(
    () => ({ ...identity, ...(user as any) }),
    [identity, user]
  );

  return memoizedUser;
};

export default useUser;
