import { TModalInit } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useModal(props: TModalInit) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalTitle, setModalTitle] = useState<string>('');
  useEffect(() => {
    setModalTitle(props.title);
  }, [props.title]);
  const toggleModal = useCallback(
    (isOpen?: boolean) => {
      if (modalRef.current)
        if (isOpen !== undefined) {
          if (isOpen) {
            modalRef.current.showModal();
          } else {
            modalRef.current.close();
          }
          return;
        } else {
          if (modalRef.current.open) {
            modalRef.current.close();
          } else {
            modalRef.current.showModal();
          }
        }
    },
    [modalRef],
  );

  return {
    toggleModal,

    modalProps: {
      ref: modalRef,
      ...props,
      title: modalTitle,
      onClose: props.onClose,
    },
  };
}
