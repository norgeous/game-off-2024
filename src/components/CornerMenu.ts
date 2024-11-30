import styled, { css } from 'styled-components';

export enum Corner {
  TL,
  TR,
  BL,
  BR,
}

interface ICornerMenu {
  $corner: Corner;
}

const CornerMenu = styled.div<ICornerMenu>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  position: absolute;
  max-width: 50%;
  ${({ $corner }) =>
    ({
      [Corner.TL]: css`
        top: 0;
        left: 0;
      `,
      [Corner.TR]: css`
        top: 0;
        right: 0;
      `,
      [Corner.BL]: css`
        bottom: 0;
        left: 0;
      `,
      [Corner.BR]: css`
        bottom: 0;
        right: 0;
      `,
    })[$corner]}
`;

export default CornerMenu;
