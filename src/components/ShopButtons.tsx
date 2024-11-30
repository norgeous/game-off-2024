import { useContext } from 'react';
import PlayerContext from '../contexts/PlayerContext';

interface IShopButtons {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const ShopButtons = ({ onClose }: IShopButtons) => {
  const { playerStats, updatePlayerStats } = useContext(PlayerContext);

  return (
    <div style={{ position: 'absolute', bottom: 0 }}>
      <div style={{ textAlign: 'right' }}>
        hp:{' '}
        <button onClick={() => updatePlayerStats({ hp: playerStats.hp - 1 })}>
          -
        </button>{' '}
        {playerStats.hp}{' '}
        <button onClick={() => updatePlayerStats({ hp: playerStats.hp + 1 })}>
          +
        </button>
      </div>
      <div style={{ textAlign: 'right' }}>
        maxHp:{' '}
        <button
          onClick={() => updatePlayerStats({ maxHp: playerStats.maxHp - 1 })}
        >
          -
        </button>{' '}
        {playerStats.maxHp}{' '}
        <button
          onClick={() => updatePlayerStats({ maxHp: playerStats.maxHp + 1 })}
        >
          +
        </button>
      </div>
      <div style={{ textAlign: 'right' }}>
        speed:{' '}
        <button
          onClick={() =>
            updatePlayerStats({
              speed: Number((playerStats.speed - 0.1).toFixed(1)),
            })
          }
        >
          -
        </button>{' '}
        {playerStats.speed.toFixed(1)}{' '}
        <button
          onClick={() =>
            updatePlayerStats({
              speed: Number((playerStats.speed + 0.1).toFixed(1)),
            })
          }
        >
          +
        </button>
      </div>
      <div style={{ textAlign: 'right' }}>
        attackRate:{' '}
        <button
          onClick={() =>
            updatePlayerStats({
              attackRate: Number((playerStats.attackRate - 0.1).toFixed(1)),
            })
          }
        >
          -
        </button>{' '}
        {playerStats.attackRate.toFixed(1)}{' '}
        <button
          onClick={() =>
            updatePlayerStats({
              attackRate: Number((playerStats.attackRate + 0.1).toFixed(1)),
            })
          }
        >
          +
        </button>
      </div>

      <button onClick={() => onClose()}>Refund All</button>
      <button onClick={() => onClose()}>Back</button>
    </div>
  );
};

export default ShopButtons;
