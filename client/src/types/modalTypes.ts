import React from 'react';

export type TModalInit = {
  title: string;
  closeBtn?: boolean;
  cancelBtn?: boolean;
  clickOutside?: boolean;
  submitBtn?: boolean;
  onSubmit?: (evt: React.FormEvent<HTMLFormElement>) => void;
  onClose?: () => void;
};
export type TModalProps = React.PropsWithChildren<{
  ref: React.Ref<HTMLDialogElement>;
  title: string;
  children?: React.ReactElement;
  closeBtn?: boolean;
  cancelBtn?: boolean;
  submitBtn?: boolean;
  clickOutside?: boolean;
  onSubmit?: (evt: React.FormEvent<HTMLFormElement>) => void;
  onClose?: () => void;
}>;
