import { TInputProps } from '@/types/props/inputProps';
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
  value,
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
      value={value}
      required={required}
      readOnly={readOnly}
      className={`border-gray-400 border rounded-lg p-2 ${className}`}
      defaultValue={defaultValue}
      {...register}
    >
      {children}
    </input>
  );
}
