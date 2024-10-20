import { LabelHTMLAttributes } from 'react';

export default function RegisterLabel(
  props: LabelHTMLAttributes<HTMLLabelElement>,
) {
  return (
    <label
      {...props}
      className={`hidden md:block ${props.className ? props.className : ''}`}
    >
      {props.children}
    </label>
  );
}
