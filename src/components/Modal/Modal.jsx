import { Component } from 'react';
import Proptypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalView } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: Proptypes.func.isRequired,
    currentImage: Proptypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalView >
          <img src={this.props.currentImage} alt="" />
        </ModalView>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
