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
  const { health, adjustHealth, inventory } = useContext(PlayerContext);

  return (
    <Modal onClose={onClose}>
      <pre style={{ textAlign: 'left' }}>
        {JSON.stringify({ health, inventory }, null, 2)}
      </pre>
      <div>
        <button onClick={() => adjustHealth(+1)}>add heart</button>
        <button onClick={() => adjustHealth(-1)}>remove heart</button>
      </div>
    </Modal>
  );
};

export default PlayerDebug;
