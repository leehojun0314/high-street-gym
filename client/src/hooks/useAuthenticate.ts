import { axiosAPI } from '@/libs/axiosAPI';
import { TUser } from '@/types';
import { useEffect, useState } from 'react';

export default function useAuthenticate() {
  const [user, setUser] = useState<TUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log('isLoading in use Authenticate: ', isLoading);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('use authenticate token: ', token);
    if (token) {
      setIsLoading(true);
      axiosAPI
        .get('/user')
        .then((response) => {
          console.log('use authenticate response: ', response);
          if (response && response.data) {
            setUser(response.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log('use authenticate err: ', err);
          // localStorage.removeItem('token');
          setUser(undefined);
        })
        .finally(() => {
          console.log('use authenticate finally called');
          setIsLoading(false);
        });
    } else {
      setUser(undefined);
      setIsLoading(false);
    }
  }, []);
  return { user, isLoading, setUser, setIsLoading };
}
