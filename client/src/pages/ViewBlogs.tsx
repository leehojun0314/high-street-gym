import { axiosAPI } from '@/libs/axiosAPI';
import { TPost } from '@/types/blogTypes';
import { useEffect, useState } from 'react';

export default function ViewBlogs() {
  const [posts, setPosts] = useState<TPost[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axiosAPI.get('/blog/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);
  return (
    <main className='p-4'>
      <h1 className='text-3xl text-center font-bold mb-4'>Blog Posts</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {posts.map((post) => (
          <div key={post.post_id} className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>{post.post_title}</h2>
              <p>{post.post_content}</p>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary'>Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
