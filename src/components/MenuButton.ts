import styled from 'styled-components';

const MenuButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  padding: 0;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;
  }
`;

export default MenuButton;
