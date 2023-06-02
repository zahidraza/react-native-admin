import { useAuthProvider } from './useAuthProvider';

export const useActiveRole = () => {
  const { role } = useAuthProvider();
  return role;
};
