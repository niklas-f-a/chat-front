import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export type Credentials = {
  email: string;
  password: string;
};

export type FriendRequest = {
  requester: {
    _id: string;
    username: string;
  };
  receiver: {
    _id: string;
    username: string;
  };
  established: boolean;
  _id: string;
};

export interface User {
  username: string;
  chatRooms: number[];
  email: string;
  githubId: null | string;
  photos: string[];
  _id: string;
  friendRequests: FriendRequest[];
  personalSpace?: string;
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

  const logout = () => api.auth.logout();

  const mutateLogout = useMutation(logout, {
    onSuccess: () => {
      queryClient.setQueryData(['auth'], null);
      queryClient.removeQueries();
    },
  });

  // console.log(user);

  return {
    mutateLogin,
    mutateSignup,
    checkLoginStatus,
    isLoggedIn: !!user,
    user,
    mutateLogout,
  };
};

export default useAuth;
