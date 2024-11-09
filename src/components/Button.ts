import styled from 'styled-components';

const Button = styled.button`
  width: 140px;
  padding: 10px;
  background-color: #000000;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.87);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #0ec3c9;
    color: #0ec3c9;
  }

  &:active {
    background-color: #0ec3c9;
  }

  /* Disabled styles */
  &:disabled {
    cursor: not-allowed;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.3);
  }
`;

export default Button;
