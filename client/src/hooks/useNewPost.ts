import { AppContext } from '@/contexts/AppContext';
import { axiosAPI } from '@/libs/axiosAPI';
import { postSchema } from '@/libs/postSchema';
import { PostInputs } from '@/types/postInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

export default function useNewPost() {
  const { user, isLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm<PostInputs>({
    defaultValues: {
      title: '',
      content: '',
    },
    resolver: yupResolver(postSchema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });
  const { modalProps, toggleModal } = useModal({
    title: 'New Post',
  });
  const onSubmit: SubmitHandler<PostInputs> = useCallback(
    (data) => {
      console.log('data: ', data);
      axiosAPI
        .post('/blog', data)
        .then((res) => {
          console.log('res: ', res);
          toggleModal();
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    },
    [toggleModal],
  );
  useEffect(() => {
    if (!isLoading && !user) {
      window.alert('You must be logged in to create a post');
      navigate('/login');
    }
  }, [user, isLoading, navigate]);
  return {
    register,
    formState,
    handleSubmit,
    onSubmit,
    modalProps,
  };
}
