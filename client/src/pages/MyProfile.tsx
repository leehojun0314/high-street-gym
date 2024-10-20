import ErrorMsg from '@/components/atoms/ErrorMsg';
import EmailIcon from '@/components/atoms/icons/EmailIcon';
import GenderIcon from '@/components/atoms/icons/GenderIcon';
import MobileIcon from '@/components/atoms/icons/MobileIcon';
import PasswordIcon from '@/components/atoms/icons/PasswordIcon';
import UserIcon from '@/components/atoms/icons/UserIcon';
import dobIcon from '@/assets/birthday.svg';
import Input from '@/components/atoms/Input';
import Loading from '@/components/atoms/Loading';
import RegisterLabel from '@/components/atoms/RegisterLabel';
import FormField from '@/components/molecules/FormField';
import IconContainer from '@/components/molecules/IconContainer';
import useAuthenticate from '@/hooks/useAuthenticate';
import { genderOptions } from '@/static/genderOptions';
import { useEffect, useLayoutEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileInputs } from '@/types/profileInputs';
import { profileSchema } from '@/libs/profileSchema';
import { useNavigate } from 'react-router-dom';
export default function MyProfile() {
  const { user, isLoading } = useAuthenticate();
  const navigate = useNavigate();
  if (!isLoading && !user) {
    navigate('/login');
  }
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<ProfileInputs>({
      defaultValues: {
        firstname: user?.user_firstname,
        lastname: user?.user_lastname,
        email: user?.user_email,
        password: null,
        confirmPwd: null,
        dob: user?.dob,
        mobile: user?.user_phone,
        gender: user?.gender,
      },
      delayError: 1000,
      resolver: yupResolver(profileSchema),
      reValidateMode: 'onChange',
      mode: 'all',
    });

  const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
    console.log('data:', data);
  };
  useLayoutEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  useEffect(() => {
    if (user) {
      //for handling browser auto fill
      reset({
        firstname: user?.user_firstname,
        lastname: user?.user_lastname,
        email: user?.user_email,
        password: null,
        confirmPwd: null,
        dob: user?.dob,
        mobile: user?.user_phone,
        gender: user?.gender,
      });
    }
  }, [user, reset]);
  console.log('user: ', user);
  // useEffect(() => {
  //   // 브라우저에서 자동 채우기가 될 수 있는 모든 input 필드에 대한 값을 체크
  //   const autofillFields = ['firstname', 'lastname', 'email', 'mobile'];

  //   autofillFields.forEach((field) => {
  //     const input = document.querySelector(
  //       `input[name="${field}"]`,
  //     ) as HTMLInputElement;
  //     if (input && input.value) {
  //       setValue(field as keyof ProfileInputs, input.value);
  //     }
  //   });
  // }, [setValue]);
  return (
    <main className='p-4 mx-auto max-w-[600px] min-h-[60vh] py-12 px-5'>
      <h1 className='text-2xl font-bold text-center'>My Profile</h1>
      <div className='mt-4'>
        {isLoading && <Loading />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-[1fr_5fr] gap-3 items-center md:grid-rows-[auto] md:gap-2'>
            <FormField
              label='First name:'
              icon={UserIcon}
              inputProps={{
                type: 'text',
                defaultValue: user?.user_firstname,
              }}
              register={register('firstname')}
              error={formState.errors.firstname}
            />
            <FormField
              label='Last name:'
              inputProps={{ type: 'text', defaultValue: user?.user_lastname }}
              register={register('lastname')}
              error={formState.errors.lastname}
            />
            <FormField
              label='Email:'
              icon={EmailIcon}
              inputProps={{
                type: 'email',
                defaultValue: user?.user_email,
              }}
              register={register('email')}
              error={formState.errors.email}
            />
            <RegisterLabel htmlFor='gender' className='required'>
              Gender:
            </RegisterLabel>
            <IconContainer className='required'>
              <GenderIcon />
            </IconContainer>
            <div className='flex flex-row justify-start items-center gap-3 '>
              {genderOptions.map((option) => (
                <label
                  key={option.id}
                  htmlFor={option.id}
                  className='flex flex-row justify-center gap-1'
                >
                  <span>{option.label}</span>
                  <input
                    {...register('gender')}
                    className='radio'
                    type='radio'
                    id={option.id}
                    value={option.value}
                    checked={user?.gender === option.value}
                    // register={register('gender')}
                  />
                </label>
              ))}
            </div>
            {formState.errors.gender && (
              <ErrorMsg>{formState.errors.gender.message}</ErrorMsg>
            )}
            <FormField
              label='Date of Birth:'
              icon={() => <img src={dobIcon} alt='icon' className='w-7' />}
              inputProps={{
                type: 'date',
                name: 'dob',
                id: 'dob',
                value: String(user?.dob),
                onChange: (e) => {
                  setValue('dob', e.target.valueAsDate);
                },
              }}
              error={formState.errors.dob}
              required={false}
              register={register('dob')}
            />
            <FormField
              label='Password:'
              icon={PasswordIcon}
              inputProps={{
                type: 'password',
                placeholder: isMobile ? 'Change your password' : '',
                autoComplete: 'new-password',
                onChange: (e) => {
                  if (e.target.value.length) {
                    setValue('password', e.target.value);
                  } else {
                    setValue('password', null);
                  }
                },
              }}
              register={register('password')}
              error={formState.errors.password}
            />
            <RegisterLabel htmlFor='confirmPwd' className='required'>
              Confirm:
            </RegisterLabel>
            <span className='block md:hidden' />
            <Input
              type='password'
              placeholder={isMobile ? 'Please re-enter your new password' : ''}
              register={register('confirmPwd')}
            />
            {formState.errors.confirmPwd && (
              <ErrorMsg>{formState.errors.confirmPwd.message}</ErrorMsg>
            )}
            <FormField
              label='Mobile:'
              icon={MobileIcon}
              inputProps={{
                type: 'tel',
                defaultValue: user?.user_phone,
              }}
              register={register('mobile')}
              error={formState.errors.mobile}
            />
          </div>
          <div className='flex flex-row justify-center items-center gap-3 mt-4'>
            <button className='btn btn-secondary'>Back</button>
            <button className='btn btn-primary' type='submit'>
              Apply
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
