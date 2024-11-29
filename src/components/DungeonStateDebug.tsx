import { useContext } from 'react';
import {
  FaDungeon,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa6';
import styled from 'styled-components';
import MenuButton from './MenuButton';
import Modal from './Modal';
import DungeonStateContext from '../contexts/DungeonStateContext';
import MiniMap from './MiniMap';

const ArrowsContainer = styled.div`
  position: relative;
  width: 240px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

interface IDungeonStateDebugToggleButton {
  onClick: () => void;
}

export const DungeonStateDebugToggleButton = ({
  onClick,
}: IDungeonStateDebugToggleButton) => (
  <MenuButton onClick={onClick}>
    <FaDungeon size={30} />
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
      <pre style={{ textAlign: 'left' }}>
        current: {JSON.stringify(current, null, 2)}
      </pre>
      <ArrowsContainer style={{}}>
        <MiniMap />
        <MenuButton
          style={{ position: 'absolute', top: 0 }}
          onClick={() => go(phaserScene, 'north')}
        >
          <FaArrowUp size={30} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', bottom: 0 }}
          onClick={() => go(phaserScene, 'south')}
        >
          <FaArrowDown size={30} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', left: 0 }}
          onClick={() => go(phaserScene, 'west')}
        >
          <FaArrowLeft size={30} />
        </MenuButton>
        <MenuButton
          style={{ position: 'absolute', right: 0 }}
          onClick={() => go(phaserScene, 'east')}
        >
          <FaArrowRight size={30} />
        </MenuButton>
      </ArrowsContainer>
      <div>roomHistory length: {roomHistory.length}</div>
      <div>visited room count: {visitedRoomCount}</div>
      {/* <pre>roomHistory: {JSON.stringify(roomHistory, null, 2)}</pre> */}
    </Modal>
  );
};

export default DungeonStateDebug;
