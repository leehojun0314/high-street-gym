import { TInputProps } from '@/types/inputProps';
import React from 'react';

export default function Input({
  className,
  children,
  register,
  placeholder,
  type,
  name,
  autoComplete,
  id,
  required,
  readOnly,
  defaultValue,
}: React.PropsWithChildren<TInputProps>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      id={id}
      required={required}
      readOnly={readOnly}
      className={`input input-bordered w-full max-w-xs ${className}`}
      defaultValue={defaultValue}
      {...register}
    >
      {children}
    </input>
  );
}
