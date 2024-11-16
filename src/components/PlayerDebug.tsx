import { useContext } from 'react';
import { FaUser } from 'react-icons/fa6';
import MenuButton from './MenuButton';
import Modal from './Modal';
import PlayerContext from '../contexts/PlayerContext';

interface IDungeonStateDebugToggleButton {
  onClick: () => void;
}

export const PlayerDebugToggleButton = ({
  onClick,
}: IDungeonStateDebugToggleButton) => (
  <MenuButton onClick={onClick}>
    <FaUser size={32} />
  </MenuButton>
);

interface IDungeonStateDebug {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const PlayerDebug = ({ onClose }: IDungeonStateDebug) => {
  const data = useContext(PlayerContext);

  return (
    <Modal onClose={onClose}>
      <pre style={{ textAlign: 'left' }}>{JSON.stringify(data, null, 2)}</pre>
    </Modal>
  );
};

export default PlayerDebug;
