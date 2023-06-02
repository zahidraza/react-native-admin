import useAuthProvider from './useAuthProvider';

const useActiveRole = () => {
  const { role } = useAuthProvider();
  return role;
};

export default useActiveRole;
