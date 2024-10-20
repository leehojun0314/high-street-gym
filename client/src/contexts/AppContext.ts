import { TUser } from '@/types';
import { createContext } from 'react';

export const AppContext = createContext<{
  user: TUser | undefined;
  isLoading: boolean;
  setUser: (user: TUser | undefined) => void;
  setIsLoading: (isLoading: boolean) => void;
}>({
  user: undefined,
  isLoading: true,
  setUser: () => {},
  setIsLoading: () => {},
});
