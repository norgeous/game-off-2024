import { useContext } from 'react';
import {
  FaMapLocationDot,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa6';
import styled, { css, keyframes } from 'styled-components';
import MenuButton from './MenuButton';
import Modal from './Modal';
import { to2D } from '../helpers/dungeonConfigParser';
import DungeonStateContext from '../contexts/DungeonStateContext';

const breatheAnimation = keyframes`
  100% { opacity: 0.6; }
`;

interface IMiniMapToggleButton {
  onClick: () => void;
}

export const MiniMapToggleButton = ({ onClick }: IMiniMapToggleButton) => (
  <MenuButton onClick={onClick}>
    <FaMapLocationDot size={32} />
  </MenuButton>
);

interface IRoom {
  $roomType: string;
  $isCurrent: boolean;
}

const Room = styled.div<IRoom>`
  margin: 1px;
  width: 60px;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ $roomType }) => ($roomType === '.' ? '#111' : '#440')};
  ${({ $isCurrent }) =>
    $isCurrent &&
    css`
      background: #044;
      animation-name: ${breatheAnimation};
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
    `}
`;

interface IMiniMap {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const MiniMap = ({ phaserScene, onClose }: IMiniMap) => {
  const { dungeon1D, current, go, roomHistory } =
    useContext(DungeonStateContext);

  const rows = to2D(dungeon1D);
  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'grid' }}>
        {rows.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row?.map((cell, x) => (
              <Room
                key={x}
                $roomType={cell.roomType}
                $isCurrent={cell.x === current.x && cell.y === current.y}
              >
                <div style={{ fontSize: 20 }}>{cell.roomType}</div>
                <div
                  style={{
                    position: 'absolute',
                    fontSize: 10,
                    top: 0,
                    left: 0,
                  }}
                >
                  ({cell.x}, {cell.y})
                </div>
              </Room>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          width: 80,
          height: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        {!['?', '.'].includes(current.adjacentRooms.north) && (
          <MenuButton
            style={{ position: 'absolute', top: 0 }}
            onClick={() => go(phaserScene, 'north')}
          >
            <FaArrowUp size={32} />
          </MenuButton>
        )}
        {!['?', '.'].includes(current.adjacentRooms.south) && (
          <MenuButton
            style={{ position: 'absolute', bottom: 0 }}
            onClick={() => go(phaserScene, 'south')}
          >
            <FaArrowDown size={32} />
          </MenuButton>
        )}
        {!['?', '.'].includes(current.adjacentRooms.west) && (
          <MenuButton
            style={{ position: 'absolute', left: 0 }}
            onClick={() => go(phaserScene, 'west')}
          >
            <FaArrowLeft size={32} />
          </MenuButton>
        )}
        {!['?', '.'].includes(current.adjacentRooms.east) && (
          <MenuButton
            style={{ position: 'absolute', right: 0 }}
            onClick={() => go(phaserScene, 'east')}
          >
            <FaArrowRight size={32} />
          </MenuButton>
        )}
      </div>
      roomHistory length: {roomHistory.length}
      <pre style={{ textAlign: 'left' }}>
        current: {JSON.stringify(current, null, 2)}
      </pre>
    </Modal>
  );
};

export default MiniMap;
