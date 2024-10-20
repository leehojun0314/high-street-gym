import SecondaryBtn from '@/components/atoms/SecondaryBtn';
import Title from '@/components/atoms/Title';
import useMyPosts from '@/hooks/useMyPosts';
import { formatDate } from '@fullcalendar/core/index.js';
import { Link } from 'react-router-dom';

export default function MyPosts() {
  const { blogs, handleDelete } = useMyPosts();
  return (
    <main className='p-4'>
      <Title className='text-center mb-4'>My Posts</Title>
      <div className='flex justify-center'>
        <Link className='btn btn-secondary' to='/blog/view'>
          Back to Blog
        </Link>
      </div>
      <section className='p-4'>
        <ul className='grid grid-cols-1'>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <li key={blog.blog_id} className='flex flex-row card shadow-xl'>
                <Link to={`/blog/view/${blog.blog_id}`} className='card-body '>
                  <h2 className='card-title'>{blog.blog_title}</h2>
                  <p>{blog.blog_content}</p>
                  <div className='card-actions flex flex-row justify-between items-end'>
                    <span className='text-gray-500'>
                      {formatDate(blog.blog_datetime, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </span>
                    <SecondaryBtn
                      onClick={handleDelete(blog.blog_id)}
                      className='justify-end'
                    >
                      Delete
                    </SecondaryBtn>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className='w-full text-center'>No posts found.</p>
          )}
        </ul>
      </section>
    </main>
  );
}
