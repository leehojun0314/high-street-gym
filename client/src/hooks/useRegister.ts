import { axiosAPI } from '@/libs/axiosAPI';
import { registerSchema } from '@/libs/registerSchema';
import { RegisterInputs } from '@/types/registerInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const alertModalRef = useRef<HTMLDialogElement>(null);
  const [alertModalContents, setAlertModalContent] = useState<{
    title: string;
    message: string;
  }>({
    title: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, formState, handleSubmit } = useForm<RegisterInputs>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      dob: null,
      mobile: '',
      gender: 'MALE',
      confirmPwd: '',
    },
    resolver: yupResolver(registerSchema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  useLayoutEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log('data: ', data);
    setIsLoading(true);
    axiosAPI
      .post('/user/register', data)
      .then((res) => {
        console.log('res: ', res);
        setAlertModalContent({
          title: 'Success',
          message: 'Registration successful',
        });
        alertModalRef.current?.addEventListener('close', () => {
          console.log('closed');
          navigate('/login');
        });
        alertModalRef.current?.showModal();
      })
      .catch((err: AxiosError) => {
        console.log('err: ', err);
        setAlertModalContent({
          title: 'Error',
          message: (err.response?.data as string) || 'Something went wrong',
        });
        alertModalRef.current?.showModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const showModal = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  return {
    isMobile,
    handleSubmit,
    dialogRef,
    showModal,
    register,
    formState,
    onSubmit,
    isLoading,
    alertModalContents,
    alertModalRef,
  };
}
