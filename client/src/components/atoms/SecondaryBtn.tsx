import { ButtonHTMLAttributes } from 'react';

export default function SecondaryBtn(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button {...props} className={`btn btn-secondary ${props.className}`}>
      {props.children}
    </button>
  );
}
