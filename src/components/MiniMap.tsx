import { FaDungeon } from 'react-icons/fa6';
import MenuButton from './MenuButton';
import Modal from './Modal';
import dungeonConfigParser, { to2D } from '../helpers/dungeonConfigParser';

export const MiniMapToggleButton = ({ onClick }) => (
  <MenuButton onClick={onClick}>
    <FaDungeon size={32} />
  </MenuButton>
);

const MiniMap = ({ dungeonStr, onClose }) => {
  const dungeonConfig = dungeonConfigParser(dungeonStr);
  const rows = to2D(dungeonConfig);
  // console.log(dungeonConfig, rows);
  return (
    <Modal onClose={onClose}>
      <div style={{ display: 'grid' }}>
        {rows.map((row) => (
          <div style={{ display: 'flex' }}>
            {row.map((cell) => (
              // <pre>{JSON.stringify(cell,null,2)}</pre>
              <pre style={{ margin: 0 }} title={JSON.stringify(cell, null, 2)}>
                {cell.roomType}
              </pre>
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default MiniMap;
