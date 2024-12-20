import styled from 'styled-components';
import { FaXmark } from 'react-icons/fa6';

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: #000c;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #404c;
  position: relative;
  border-radius: 8px;
`;

const ModalInner = styled.div`
  display: flex;
  padding: 48px;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 8px;
  position: absolute;
  right: 0;
`;

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: IModal) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <Button onClick={onClose}>
          <FaXmark size={30} />
        </Button>
        <ModalInner>{children}</ModalInner>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
