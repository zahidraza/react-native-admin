import useAuthProvider from './useAuthProvider';

const useAuth = () => {
  const {
    authenticating,
    accessToken,
    refreshToken,
    tokenExpiresAt,
    role,
    logout,
  } = useAuthProvider();
  return {
    authenticating,
    accessToken,
    refreshToken,
    tokenExpiresAt,
    role,
    logout,
  };
};

export default useAuth;
