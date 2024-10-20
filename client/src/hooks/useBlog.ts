import { axiosAPI } from '@/libs/axiosAPI';
import { TPost } from '@/types/blogTypes';
import { useEffect, useState } from 'react';

export default function useBlog() {
  const [blogs, setBlogs] = useState<TPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosAPI
      .get('/blog/posts')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { blogs, isLoading };
}
