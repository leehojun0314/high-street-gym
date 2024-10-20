import Loading from '@/components/atoms/Loading';
import Title from '@/components/atoms/Title';
import useBlog from '@/hooks/useBlog';
import { formatDate } from '@fullcalendar/core/index.js';
import { Link } from 'react-router-dom';

export default function ViewBlogs() {
  const { blogs, isLoading } = useBlog();
  console.log('posts:', blogs);
  return (
    <main className='p-4'>
      <Title className=' mb-4'>Blog Posts</Title>
      <div className='flex flex-row justify-center gap-2'>
        <Link to={'/blog/my'} className='btn btn-secondary'>
          My Posts
        </Link>
        <Link to={'/blog/new'} className='btn btn-primary'>
          New Post
        </Link>
      </div>

      {isLoading && (
        <div className='w-full flex justify-center align-center'>
          <Loading />
        </div>
      )}

      <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {blogs.map((blog) => (
          <li key={blog.blog_id} className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>{blog.blog_title}</h2>
              {/* <p>{blog.blog_content}</p> */}
              <p>{formatDate(blog.blog_datetime)}</p>
              <div className='card-actions justify-end'>
                <Link
                  className='btn btn-primary'
                  to={`/blog/view/${blog.blog_id}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
