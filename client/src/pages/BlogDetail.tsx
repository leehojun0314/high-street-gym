import ErrorMsg from '@/components/atoms/ErrorMsg';
import Loading from '@/components/atoms/Loading';
import TextArea from '@/components/molecules/TextArea';
import useBlogDetail from '@/hooks/useBlogDetail';
import { formatDate } from '@fullcalendar/core/index.js';
import { Link } from 'react-router-dom';

export default function BlogDetail() {
  const { blog, isLoading, error } = useBlogDetail();
  console.log('blog: ', blog);
  return (
    <main className='p-4'>
      {isLoading && <Loading />}
      {error && (
        <ErrorMsg className='grid h-[500px] items-center justify-center'>
          {error}
        </ErrorMsg>
      )}
      {blog && (
        <div>
          <div className='flex flex-row justify-between'>
            <h1 className='block text-3xl'>{blog.blog_title}</h1>
            <div className='flex flex-col '>
              <span>{blog.User.user_firstname + blog.User.user_lastname}</span>
              <span>
                {formatDate(blog.blog_datetime, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
          <TextArea
            // className='p-4'
            textAreaProps={{
              value: blog.blog_content,
              readOnly: true,
            }}
            resize={false}
          ></TextArea>
        </div>
      )}
      <Link className='btn btn-secondary mt-4 float-end' to='/blog/view'>
        Back to Blog
      </Link>
    </main>
  );
}
