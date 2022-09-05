import Proptypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalView } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, currentImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown);

    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  });

  const handelKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalView>
        <img src={currentImage} alt="" />
      </ModalView>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: Proptypes.func.isRequired,
  currentImage: Proptypes.string.isRequired,
};

export default Modal;
