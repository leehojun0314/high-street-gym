import { axiosAPI } from '@/libs/axiosAPI';
import { TUser } from '@/types';
import { TPost } from '@/types/blogTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function useBlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<TPost & { User: TUser }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setIsLoading(true);
    axiosAPI
      .get(`/blog/view/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  return {
    blog,
    isLoading,
    error,
  };
}
