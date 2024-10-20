import { axiosAPI } from '@/libs/axiosAPI';
import { TPost } from '@/types/blogTypes';
import { useCallback, useEffect, useState } from 'react';

export default function useMyPosts() {
  const [blogs, setBlogs] = useState<TPost[]>([]);
  const handleDelete = useCallback(
    (id: number) => {
      return () => {
        console.log('id: ', id);
        axiosAPI
          .delete('/blog', { data: { id } })
          .then((res) => {
            console.log('delete res: ', res);
            alert('The post has been deleted');
            setBlogs(blogs.filter((blog) => blog.blog_id !== id));
          })
          .catch((err) => {
            console.log('err:', err);
          });
      };
    },
    [setBlogs, blogs],
  );
  useEffect(() => {
    axiosAPI
      .get('/blog/my')
      .then((res) => {
        console.log('my posts res: ', res);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return {
    blogs,
    handleDelete,
  };
}
