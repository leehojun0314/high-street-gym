import ErrorMsg from '@/components/atoms/ErrorMsg';
import PrimaryBtn from '@/components/atoms/PrimaryBtn';
import FormField from '@/components/molecules/FormField';
import TextArea from '@/components/molecules/TextArea';
import Modal from '@/components/organisms/Modal';
import useNewPost from '@/hooks/useNewPost';
import { Link } from 'react-router-dom';

export default function NewPost() {
  const { register, formState, handleSubmit, onSubmit, modalProps } =
    useNewPost();
  return (
    <main className='p-4'>
      <h1 className='text-center'>New Post</h1>
      <section className='flex flex-row justify-center p-4'>
        <Link className='btn btn-secondary' to='/blog/view'>
          Back to Blog
        </Link>
      </section>
      <Modal {...modalProps}>
        <div>
          <p>Post created successfully.</p>
          <Link className='btn btn-secondary float-end' to='/blog/view'>
            Confirm
          </Link>
        </div>
      </Modal>
      <section>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label='Title'
            inputProps={{
              type: 'text',
              className: 'w-full',
            }}
            required={false}
            register={register('title')}
            error={formState.errors.title}
          />
          <TextArea
            label='Content'
            className='w-full h-40'
            register={register('content')}
          />
          {formState.errors.content && (
            <ErrorMsg>{formState.errors.content.message}</ErrorMsg>
          )}
          <PrimaryBtn className='w-fit self-end' type='submit'>
            Submit
          </PrimaryBtn>
        </form>
      </section>
    </main>
  );
}
