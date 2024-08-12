import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function Select({
  children,
  onChange,
  value,
  label,
  register,
  name,
  defaultValue,
}: React.PropsWithChildren<{
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  label?: string;
  register?: UseFormRegisterReturn;
  name?: string;
  defaultValue?: string | number;
}>) {
  return (
    <label className='form-control w-full max-w-xs'>
      {label && (
        <div className='label'>
          <span className='label-text'>{label}</span>
        </div>
      )}

      <select
        className='select select-bordered'
        {...register}
        onChange={onChange}
        value={value}
        name={name}
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </label>
  );
}
