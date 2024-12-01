import { useContext } from 'react';
import PlayerContext from '../contexts/PlayerContext';
import ShopButton from './ShopButton';
import CornerMenu, { Corner } from './CornerMenu';
import { defaultPlayerStats } from '../objects/entities/Player';

interface IShopButtons {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const ShopButtons = ({ phaserScene, onClose }: IShopButtons) => {
  const {
    playerStats,
    updatePlayerStats,
    setCoinsSpent,
    adjustCoinsSpent,
    coinsAvailable,
  } = useContext(PlayerContext);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          gap: 12,
          padding: 60,
        }}
      >
        <div>
          <ShopButton
            onClick={() => {
              if (coinsAvailable > 0) {
                phaserScene.sound.play('cash-reg');
                adjustCoinsSpent(1);
                updatePlayerStats({ initialHp: playerStats.initialHp + 1 });
              } else {
                alert('no funds');
              }
            }}
          >
            Health +
          </ShopButton>
          <center>current: {playerStats.initialHp}</center>
        </div>

        <div>
          <ShopButton
            onClick={() => {
              // cashSfx();
              updatePlayerStats({
                speed: Number((playerStats.speed + 0.1).toFixed(1)),
              });
            }}
          >
            Speed +
          </ShopButton>
          <center>current: {playerStats.speed}</center>
        </div>

        <div>
          <ShopButton
            onClick={() => {
              // cashSfx();
              updatePlayerStats({
                attackRate: Number((playerStats.attackRate + 0.1).toFixed(1)),
              });
            }}
          >
            Attack Rate +
          </ShopButton>
          <center>current: {playerStats.attackRate}</center>
        </div>
      </div>
      <CornerMenu $corner={Corner.BL}>
        <button
          onClick={() => {
            updatePlayerStats(defaultPlayerStats);
            setCoinsSpent(0);
          }}
        >
          Refund All Past Purchases
        </button>
      </CornerMenu>
      <CornerMenu $corner={Corner.BR}>
        <button onClick={() => onClose()}>Back to Main Menu</button>
      </CornerMenu>
    </>
  );
};

export default ShopButtons;
