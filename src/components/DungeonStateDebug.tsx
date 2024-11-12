import { useContext } from 'react';
import {
  FaCircleInfo,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa6';
import MenuButton from './MenuButton';
import Modal from './Modal';
import DungeonStateContext from '../contexts/DungeonStateContext';

interface IDungeonStateDebugToggleButton {
  onClick: () => void;
}

export const DungeonStateDebugToggleButton = ({
  onClick,
}: IDungeonStateDebugToggleButton) => (
  <MenuButton onClick={onClick}>
    <FaCircleInfo size={32} />
  </MenuButton>
);

interface IDungeonStateDebug {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const DungeonStateDebug = ({ phaserScene, onClose }: IDungeonStateDebug) => {
  const { current, go, roomHistory } = useContext(DungeonStateContext);

  const visitedRoomCount = [
    ...new Set(roomHistory.map(({ x, y }) => `${x}:${y}`)),
  ].length;

  return (
    <Modal onClose={onClose}>
      <div
        style={{
          position: 'relative',
          width: 120,
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <MenuButton
          style={{ position: 'absolute', top: 0 }}
          onClick={() => go(phaserScene, 'north')}
        >
          <FaArrowUp size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', bottom: 0 }}
          onClick={() => go(phaserScene, 'south')}
        >
          <FaArrowDown size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', left: 0 }}
          onClick={() => go(phaserScene, 'west')}
        >
          <FaArrowLeft size={32} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', right: 0 }}
          onClick={() => go(phaserScene, 'east')}
        >
          <FaArrowRight size={32} />
        </MenuButton>
      </div>
      <div>roomHistory length: {roomHistory.length}</div>
      <div>visited room count: {visitedRoomCount}</div>
      <pre style={{ textAlign: 'left' }}>
        current: {JSON.stringify(current, null, 2)}
      </pre>
    </Modal>
  );
};

export default DungeonStateDebug;
