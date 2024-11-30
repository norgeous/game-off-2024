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
    <FaUser size={30} />
  </MenuButton>
);

interface IDungeonStateDebug {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const PlayerDebug = ({ onClose }: IDungeonStateDebug) => {
  const { playerStats, updatePlayerStats, coins, adjustCoins, inventory } =
    useContext(PlayerContext);

  return (
    <Modal onClose={onClose}>
      <div>
        coins: <button onClick={() => adjustCoins(-1)}>-</button> {coins}{' '}
        <button onClick={() => adjustCoins(+1)}>+</button>{' '}
        <button onClick={() => adjustCoins(+1_000_000)}>+1M</button>{' '}
        <button onClick={() => adjustCoins(-coins)}>reset</button>
      </div>
      <pre style={{ textAlign: 'left' }}>
        {JSON.stringify(playerStats, null, 2)}
      </pre>
      <div>
        hp:{' '}
        <button onClick={() => updatePlayerStats({ hp: playerStats.hp - 1 })}>
          -
        </button>{' '}
        {playerStats.hp}{' '}
        <button onClick={() => updatePlayerStats({ hp: playerStats.hp + 1 })}>
          +
        </button>
      </div>
      <pre style={{ textAlign: 'left' }}>
        inventory: {JSON.stringify(inventory, null, 2)}
      </pre>
    </Modal>
  );
};

export default PlayerDebug;
