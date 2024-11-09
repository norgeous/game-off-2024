import { FaMapLocationDot, FaDungeon } from 'react-icons/fa6';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import Modal from './Modal';
import dungeonConfigParser, { to2D } from '../helpers/dungeonConfigParser';

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
`;

const MiniMap = ({ dungeonStr, onClose }) => {
  const dungeonConfig = dungeonConfigParser(dungeonStr);
  const rows = to2D(dungeonConfig);
  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'grid' }}>
        {rows.map((row) => (
          <div style={{ display: 'flex' }}>
            {row.map((cell) => (
              <Room>
                <div style={{ fontSize: 30 }}>{cell.roomType}</div>
                <div style={{ position: 'absolute', fontSize: 12, top: 0, left: 0 }}>
                  ({cell.x}, {cell.y})
                </div>
                {cell.adjacentRooms.north && (
                  <div style={{ position: 'absolute', fontSize: 16, top: 0 }}><FaDungeon /></div>
                )}
                {cell.adjacentRooms.south && (
                  <div style={{ position: 'absolute', fontSize: 16, bottom: 0 }}><FaDungeon /></div>
                )}
                {cell.adjacentRooms.east && (
                  <div style={{ position: 'absolute', fontSize: 16, right: 0 }}><FaDungeon /></div>
                )}
                {cell.adjacentRooms.west && (
                  <div style={{ position: 'absolute', fontSize: 16, left: 0 }}><FaDungeon /></div>
                )}
              </Room>
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default MiniMap;
