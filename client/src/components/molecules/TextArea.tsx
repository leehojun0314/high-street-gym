import { UseFormRegisterReturn } from 'react-hook-form';

export default function TextArea({
  label,
  register,
  className,
  textAreaProps,
  resize = true,
}: {
  label?: string;
  register?: UseFormRegisterReturn;
  className?: string;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  resize?: boolean;
}) {
  return (
    <label className={'form-control' + ' ' + className}>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <textarea
        className={
          'textarea textarea-bordered h-24 ' + (resize ? '' : 'resize-none')
        }
        placeholder='Enter your message here'
        {...textAreaProps}
        {...register}
      ></textarea>
    </label>
  );
}
