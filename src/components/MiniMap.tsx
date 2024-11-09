import {
  FaMapLocationDot,
  FaDungeon,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa6';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import Modal from './Modal';
import dungeonConfigParser, { to2D } from '../helpers/dungeonConfigParser';
import { useState } from 'react';

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
`;

const MiniMap = ({ phaserScene, dungeonStr, onClose }) => {
  const [currentRoom, setCurrentRoom] = useState({ x: 0, y: 6 });
  const dungeonConfig = dungeonConfigParser(dungeonStr);
  const rows = to2D(dungeonConfig);

  const changeRoom = (x, y) => {
    setCurrentRoom({ x, y });
    // const type = 'A';
    // const playerEnterFrom = 'south';
    // phaserScene?.scene.start('Rooms', { type, playerEnterFrom });
  };

  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'grid' }}>
        {rows.map((row) => (
          <div style={{ display: 'flex' }}>
            {row.map((cell) => (
              <Room
                isCurrent={cell.x === currentRoom.x && cell.y === currentRoom.y}
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
                {cell.adjacentRooms.north && (
                  <div style={{ position: 'absolute', fontSize: 16, top: 0 }}>
                    <FaDungeon />
                  </div>
                )}
                {cell.adjacentRooms.south && (
                  <div
                    style={{ position: 'absolute', fontSize: 16, bottom: 0 }}
                  >
                    <FaDungeon />
                  </div>
                )}
                {cell.adjacentRooms.east && (
                  <div style={{ position: 'absolute', fontSize: 16, right: 0 }}>
                    <FaDungeon />
                  </div>
                )}
                {cell.adjacentRooms.west && (
                  <div style={{ position: 'absolute', fontSize: 16, left: 0 }}>
                    <FaDungeon />
                  </div>
                )}
              </Room>
            ))}
          </div>
        ))}
      </div>
      <div>
        click <FaDungeon /> above to teleport, or use arrows below to force
        movement
      </div>
      <div
        style={{
          position: 'relative',
          width: 120,
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MenuButton
          style={{ position: 'absolute', top: 0 }}
          onClick={() => changeRoom(currentRoom.x, currentRoom.y - 1)}
        >
          <FaArrowUp size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', bottom: 0 }}
          onClick={() => changeRoom(currentRoom.x, currentRoom.y + 1)}
        >
          <FaArrowDown size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', left: 0 }}
          onClick={() => changeRoom(currentRoom.x - 1, currentRoom.y)}
        >
          <FaArrowLeft size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', right: 0 }}
          onClick={() => changeRoom(currentRoom.x + 1, currentRoom.y)}
        >
          <FaArrowRight size={32} />
        </MenuButton>
        ({currentRoom.x}, {currentRoom.y})
      </div>
    </Modal>
  );
};

export default MiniMap;
