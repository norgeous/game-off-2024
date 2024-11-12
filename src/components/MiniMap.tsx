import { useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { to2D } from '../helpers/dungeonConfigParser';
import DungeonStateContext from '../contexts/DungeonStateContext';

const breatheAnimation = keyframes`
  100% { background: #ff0; }
`;

interface IRoom {
  $roomType: string;
  $isCurrent: boolean;
  $isVisited: boolean;
}

const Room = styled.div<IRoom>`
  width: 15px;
  height: 9px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #222;
  background: ${({ $roomType, $isVisited }) => {
    if ($roomType === '.' && $isVisited) return '#222';
    return $isVisited ? '#660' : '#050505';
  }};
  ${({ $isCurrent }) =>
    $isCurrent &&
    css`
      background: #660;
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
