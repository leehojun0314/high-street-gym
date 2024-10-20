import helpGIF from '@/assets/help.gif';
import dobIcon from '@/assets/birthday.svg';
import UserIcon from '@/components/atoms/icons/UserIcon';
import EmailIcon from '@/components/atoms/icons/EmailIcon';
import GenderIcon from '@/components/atoms/icons/GenderIcon';
import PasswordIcon from '@/components/atoms/icons/PasswordIcon';
import MobileIcon from '@/components/atoms/icons/MobileIcon';
import Input from '@/components/atoms/Input';
import RegisterLabel from '@/components/atoms/RegisterLabel';
import PrimaryBtn from '@/components/atoms/PrimaryBtn';
import SecondaryBtn from '@/components/atoms/SecondaryBtn';
import ErrorMsg from '@/components/atoms/ErrorMsg';
import IconContainer from '@/components/molecules/IconContainer';
import useRegister from '@/hooks/useRegister';
import Loading from '@/components/atoms/Loading';
import FormField from '@/components/molecules/FormField';
import { genderOptions } from '@/static/genderOptions';
export default function Register() {
  const {
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
  } = useRegister();
  return (
    <main className='mx-auto max-w-[600px] min-h-[60vh] py-12 px-5'>
      <h1 className='text-center font-bold text-3xl'>Become Our Member</h1>
      <h3 className='text-red text-center mb-2'>* Required Field</h3>
      <form id='registrationForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-[1fr_5fr] gap-3 items-center md:grid-rows-[auto] md:gap-2'>
          <FormField
            label='First Name:'
            icon={UserIcon}
            inputProps={{
              type: 'text',
              placeholder: isMobile ? 'Please enter your first name' : '',
            }}
            register={register('firstname')}
            error={formState.errors.firstname}
          />
          <FormField
            label='Last Name:'
            // icon={UserIcon}
            inputProps={{
              type: 'text',
              placeholder: isMobile ? 'Please enter your last name' : '',
            }}
            error={formState.errors.lastname}
            required={false}
            register={register('lastname')}
          />
          <FormField
            label='Email:'
            icon={EmailIcon}
            inputProps={{
              type: 'email',
              placeholder: isMobile ? 'Please enter your email' : '',
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
                  className='radio'
                  type='radio'
                  id={option.id}
                  value={option.value}
                  // register={register('gender')}
                  {...register('gender')}
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
              placeholder: isMobile ? 'Please enter your password' : '',
              autoComplete: 'new-password',
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
            placeholder={isMobile ? 'Please enter your password again' : ''}
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
              placeholder: isMobile ? 'Please enter your mobile number' : '',
            }}
            register={register('mobile')}
            error={formState.errors.mobile}
          />
        </div>
        <ErrorMsg id='error-msg'></ErrorMsg>
        <div className='text-center mt-5 text-base'>
          Need{' '}
          <span className='btn btn-link p-0 text-base' onClick={showModal}>
            help?
          </span>
        </div>
        <div className='flex flex-row gap-3 justify-center items-center mt-5 md:gap-[50px]'>
          <SecondaryBtn
            onClick={() => {
              history.back();
            }}
            className='flex-1'
          >
            {isLoading ? <Loading /> : 'Back'}
          </SecondaryBtn>
          <PrimaryBtn type='submit' className='flex-1'>
            {isLoading ? <Loading /> : 'Sign Up'}
          </PrimaryBtn>
        </div>
      </form>
      <dialog ref={alertModalRef} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>{alertModalContents.title}</h3>
          <p className='py-4'>{alertModalContents.message}</p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
      <dialog className='modal' ref={dialogRef}>
        <div className='modal-box'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <img src={helpGIF} alt='help-gif'></img>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </main>
  );
}
