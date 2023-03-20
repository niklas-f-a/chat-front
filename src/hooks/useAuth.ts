import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export type Credentials = {
  email: string;
  password: string;
};

export interface User {
  chatRooms: number[];
  email: string;
  githubId: null | string;
  photos: string[];
  _id: string;
}

const useAuth = () => {
  const queryClient = useQueryClient();

  const checkLoginStatus = async () => {
    const { data, status } = await api.auth.status();

    if (status !== 200) return null;

    return data;
  };

  const login = async ({ email, password }: Credentials) =>
    api.auth.login({ email, password });

  const signup = async ({ email, password }: Credentials) =>
    api.auth.signup({ email, password });

  const mutateLogin = useMutation(login, {
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], data);
    },
  });

  const mutateSignup = useMutation(signup, {
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], data);
    },
  });

  const { data: user } = useQuery(['auth'], {
    queryFn: checkLoginStatus,
  });

  return {
    mutateLogin,
    mutateSignup,
    checkLoginStatus,
    isLoggedIn: !!user,
    user,
  };
};

export default useAuth;
