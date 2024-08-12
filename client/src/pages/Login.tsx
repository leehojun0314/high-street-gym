import EmailIcon from '@/components/atoms/icons/EmailIcon';
import PasswordIcon from '@/components/atoms/icons/PasswordIcon';
import Loading from '@/components/atoms/Loading';
import PrimaryBtn from '@/components/atoms/PrimaryBtn';
import InputWithIcon from '@/components/molecules/InputWithIcon';
import Modal from '@/components/organisms/Modal';
import { AppContext } from '@/contexts/AppContext';
import useModal from '@/hooks/useModal';
import { axiosAPI } from '@/libs/axiosAPI';
import { useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { modalProps, toggleModal } = useModal({
    title: 'Error',
    closeBtn: true,
    clickOutside: true,
  });
  const { setUser } = useContext(AppContext);
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsLoading(true);
      console.log('submit clicked: ', event.target);
      const formData = new FormData(event.target as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      axiosAPI
        .post('/user/login', { email, password })
        .then((res) => {
          console.log('login res: ', res);
          if (res.data) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            setIsLoading(false);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log('err: ', err);
          setIsLoading(false);

          toggleModal();
        });
    },
    [setUser, navigate, toggleModal],
  );
  return (
    <>
      <header className='bg-none text-center pb-12'>
        <div className='mt-[128px]'>
          <Link
            className='font-alkatra text-5xl   font-normal mx-auto'
            to={'/'}
          >
            High Street Gym
          </Link>
        </div>
      </header>
      <Modal {...modalProps}>
        <p>Invalid email or password</p>
      </Modal>
      <main className='grid align-top justify-center w-full '>
        <div className='w-full md:w-[460px] mx-auto'>
          <form
            onSubmit={handleSubmit}
            method='post'
            className=' border-black border rounded-2xl px-6 py-5 w-full'
          >
            <h2 className='text-center mb-6 text-2xl font-medium'>Log In</h2>
            <div className='flex flex-col gap-2 font-semibold'>
              <InputWithIcon
                inputProps={{
                  placeholder: 'Email',
                  type: 'text',
                  name: 'email',
                }}
                Icon={EmailIcon}
              />

              <InputWithIcon
                Icon={PasswordIcon}
                inputProps={{
                  placeholder: 'Password',
                  type: 'password',
                  name: 'password',
                }}
              />
            </div>
            <div className='my-2'>
              Not our member yet?{' '}
              <Link
                to='/register'
                className='text-blue-500 underline btn btn-link p-0'
              >
                Register here!
              </Link>
            </div>
            <PrimaryBtn type='submit' className='w-full'>
              {isLoading ? <Loading /> : 'Log In'}
            </PrimaryBtn>
          </form>
        </div>
      </main>
    </>
  );
}
