import React, { forwardRef, InputHTMLAttributes } from 'react';

const FileInput = forwardRef(function (
  props: InputHTMLAttributes<HTMLInputElement>,
  ref?: React.Ref<HTMLInputElement>,
) {
  return (
    <input
      type='file'
      {...props}
      className={`file-input file-input-bordered w-full max-w-xs ${props.className}`}
      ref={ref}
    />
  );
});
export default FileInput;
