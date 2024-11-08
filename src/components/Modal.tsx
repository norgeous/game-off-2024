import styled from 'styled-components';
import { FaWindowClose } from 'react-icons/fa';

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: #000B;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #f5fB;
  position: relative;
`;

const ModalInner = styled.div`
  display: flex;
  padding: 38px;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  position: absolute;
  right: 0;
`;

const Modal = ({ children, onClose }) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={event => event.stopPropagation()}>
        <Button onClick={onClose}>
          <FaWindowClose size={32}/>
        </Button>
        <ModalInner>
          {children}
        </ModalInner>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
