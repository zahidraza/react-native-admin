import { useAuthProvider } from './useAuthProvider';

export const useAuth = () => {
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
