import { TModalProps } from '@/types';
import { forwardRef } from 'react';
const Modal = forwardRef(function (
  props: TModalProps,
  ref: React.Ref<HTMLDialogElement>,
) {
  return (
    <dialog className='modal' ref={ref}>
      <div className='modal-box'>
        {props.cancelBtn && (
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={props.onClose}
            >
              ✕
            </button>
          </form>
        )}
        <h3 className='font-bold text-lg pb-4'>{props.title}</h3>
        {props.submitBtn ? (
          <form onSubmit={props.onSubmit} method='dialog'>
            {props.children}
            <div className='modal-action'>
              {props.closeBtn && (
                <form method='dialog'>
                  {/* if there is a button in form, it will close the modal */}
                  <button className='btn' onClick={props.onClose}>
                    Close
                  </button>
                </form>
              )}
              <button className='btn btn-primary' type='submit'>
                Submit
              </button>
            </div>
          </form>
        ) : (
          props.children
        )}

        {props.closeBtn && !props.submitBtn && (
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn' onClick={props.onClose}>
                Close
              </button>
            </form>
          </div>
        )}
      </div>
      {props.clickOutside && (
        <form method='dialog' className='modal-backdrop'>
          <button onClick={props.onClose}>close</button>
        </form>
      )}
    </dialog>
  );
});
export default Modal;
