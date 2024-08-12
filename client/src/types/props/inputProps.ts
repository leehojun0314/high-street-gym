import { UseFormRegisterReturn } from 'react-hook-form';

export type TInputProps = {
  className?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  id?: string;
  value?: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: string | number | Date | boolean;
};
