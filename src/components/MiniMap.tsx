import { useState } from 'react';
import {
  FaMapLocationDot,
  FaDungeon,
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

export const MiniMapToggleButton = ({ onClick }) => (
  <MenuButton onClick={onClick}>
    <FaMapLocationDot size={32} />
  </MenuButton>
);

const Room = styled.div`
  border: 1px solid aqua;
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ isCurrent }) => (isCurrent ? '#044' : 'transparent')};
  ${({ isCurrent }) =>
    isCurrent &&
    css`
      animation-name: ${breatheAnimation};
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
    `}
`;

const MiniMap = ({ phaserScene, dungeonStr, onClose }) => {
  const [currentRoom, setCurrentRoom] = useState({
    x: 0,
    y: 6,
    roomType: '0',
    playerEnterFrom: 'unknown',
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
    };

    if (next) {
      setCurrentRoom(next);
      const dataForScene = {
        roomType: next.roomType,
        adjacentRooms: nextRoomConfig.adjacentRooms,
        playerEnterFrom: nextRoom.playerEnterFrom,
      };
      phaserScene?.scene.start('Rooms', dataForScene);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'grid' }}>
        {rows.map((row) => (
          <div style={{ display: 'flex' }}>
            {row.map((cell) => {
              const isCurrent =
                cell.x === currentRoom.x && cell.y === currentRoom.y;
              return (
                <Room isCurrent={isCurrent}>
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
                  {cell.adjacentRooms.north && (
                    <MenuButton
                      style={{ position: 'absolute', fontSize: 16, top: 0 }}
                      onClick={() => go('north')}
                      disabled={!isCurrent}
                    >
                      <FaDungeon />
                    </MenuButton>
                  )}
                  {cell.adjacentRooms.south && (
                    <MenuButton
                      style={{ position: 'absolute', fontSize: 16, bottom: 0 }}
                      onClick={() => go('south')}
                      disabled={!isCurrent}
                    >
                      <FaDungeon />
                    </MenuButton>
                  )}
                  {cell.adjacentRooms.east && (
                    <MenuButton
                      style={{ position: 'absolute', fontSize: 16, right: 0 }}
                      onClick={() => go('east')}
                      disabled={!isCurrent}
                    >
                      <FaDungeon />
                    </MenuButton>
                  )}
                  {cell.adjacentRooms.west && (
                    <MenuButton
                      style={{ position: 'absolute', fontSize: 16, left: 0 }}
                      onClick={() => go('west')}
                      disabled={!isCurrent}
                    >
                      <FaDungeon />
                    </MenuButton>
                  )}
                </Room>
              );
            })}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          width: 150,
          height: 150,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <MenuButton
          style={{ position: 'absolute', top: 0 }}
          onClick={() => go('north')}
        >
          <FaArrowUp size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', bottom: 0 }}
          onClick={() => go('south')}
        >
          <FaArrowDown size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', left: 0 }}
          onClick={() => go('west')}
        >
          <FaArrowLeft size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', right: 0 }}
          onClick={() => go('east')}
        >
          <FaArrowRight size={32} />
        </MenuButton>
        ({currentRoom.x}, {currentRoom.y})
        <br />
        type: {currentRoom.roomType}
        <br />
        from: {currentRoom.playerEnterFrom}
      </div>
    </Modal>
  );
};

export default MiniMap;
