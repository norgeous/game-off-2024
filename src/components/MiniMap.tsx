import { useState } from 'react';
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
import dungeonConfigParser, {
  findRoomConfigByCoordinate,
  to2D,
} from '../helpers/dungeonConfigParser';

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
  width: 80px;
  height: 80px;
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
  dungeonStr: string;
  onClose: () => void;
}

const MiniMap = ({ phaserScene, dungeonStr, onClose }: IMiniMap) => {
  const [currentRoom, setCurrentRoom] = useState({
    x: 0,
    y: 6,
    roomType: '0',
    playerEnterFrom: 'unknown',
    adjacentRooms: {
      north: '1',
      south: undefined,
      west: undefined,
      east: undefined,
    },
  });
  const dungeonConfig = dungeonConfigParser(dungeonStr);
  const rows = to2D(dungeonConfig);

  const go = (direction: string) => {
    const nextRoom = {
      north: {
        x: currentRoom.x,
        y: currentRoom.y - 1,
        playerEnterFrom: 'south',
      },
      south: {
        x: currentRoom.x,
        y: currentRoom.y + 1,
        playerEnterFrom: 'north',
      },
      east: {
        x: currentRoom.x + 1,
        y: currentRoom.y,
        playerEnterFrom: 'west',
      },
      west: {
        x: currentRoom.x - 1,
        y: currentRoom.y,
        playerEnterFrom: 'east',
      },
    }[direction];

    if (!nextRoom) return;

    const nextRoomConfig = findRoomConfigByCoordinate(
      dungeonConfig,
      nextRoom.x,
      nextRoom.y,
    );

    if (!nextRoomConfig) return;

    const next = {
      ...nextRoom,
      roomType: nextRoomConfig?.roomType || '?',
      adjacentRooms: nextRoomConfig.adjacentRooms,
    };

    if (next) {
      setCurrentRoom(next);
      const dataForScene = {
        roomType: next.roomType,
        adjacentRooms: next.adjacentRooms,
        playerEnterFrom: nextRoom.playerEnterFrom,
      };
      phaserScene?.scene.start('Rooms', dataForScene);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'grid' }}>
        {rows.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((cell, x) => (
              <Room
                key={x}
                $roomType={cell.roomType}
                $isCurrent={
                  cell.x === currentRoom.x && cell.y === currentRoom.y
                }
              >
                <div style={{ fontSize: 30 }}>{cell.roomType}</div>
                <div
                  style={{
                    position: 'absolute',
                    fontSize: 12,
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
        {currentRoom.adjacentRooms.north && (
          <MenuButton
            style={{ position: 'absolute', top: 0 }}
            onClick={() => go('north')}
          >
            <FaArrowUp size={32} />
          </MenuButton>
        )}
        {currentRoom.adjacentRooms.south && (
          <MenuButton
            style={{ position: 'absolute', bottom: 0 }}
            onClick={() => go('south')}
          >
            <FaArrowDown size={32} />
          </MenuButton>
        )}
        {currentRoom.adjacentRooms.west && (
          <MenuButton
            style={{ position: 'absolute', left: 0 }}
            onClick={() => go('west')}
          >
            <FaArrowLeft size={32} />
          </MenuButton>
        )}
        {currentRoom.adjacentRooms.east && (
          <MenuButton
            style={{ position: 'absolute', right: 0 }}
            onClick={() => go('east')}
          >
            <FaArrowRight size={32} />
          </MenuButton>
        )}
      </div>
      <pre style={{ textAlign: 'left' }}>
        {JSON.stringify(currentRoom, null, 2)}
      </pre>
    </Modal>
  );
};

export default MiniMap;
