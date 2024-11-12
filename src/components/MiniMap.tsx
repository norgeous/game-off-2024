import { useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { to2D } from '../helpers/dungeonConfigParser';
import DungeonStateContext from '../contexts/DungeonStateContext';

const breatheAnimation = keyframes`
  100% { opacity: 0.6; }
`;

interface IRoom {
  $roomType: string;
  $isCurrent: boolean;
  $isVisited: boolean;
}

const Room = styled.div<IRoom>`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ $isVisited }) => $isVisited ? '#660' : '#050505'};
  ${({ $isCurrent }) =>
    $isCurrent &&
    css`
      background: #044;
      animation-name: ${breatheAnimation};
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
    `}
`;

const MiniMap = () => {
  const { dungeon1D, current, roomHistory } = useContext(DungeonStateContext);

  const rows = to2D(dungeon1D);

  return (
    <div style={{ display: 'grid' }}>
      {rows.map((row, y) => (
        <div key={y} style={{ display: 'flex' }}>
          {row?.map((cell, x) => (
            <Room
              key={x}
              $roomType={cell.roomType}
              $isCurrent={cell.x === current.x && cell.y === current.y}
              $isVisited={roomHistory.some(
                ({ x, y }) => cell.x === x && cell.y === y,
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MiniMap;
