import React, { ReactNode } from 'react';
import Modal, { Props as ModalProps } from 'react-modal';

interface CustomModalProps extends ModalProps {
  children?: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;