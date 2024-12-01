import { useContext } from 'react';
import PlayerContext from '../contexts/PlayerContext';
import ShopButton from './ShopButton';
import CornerMenu, { Corner } from './CornerMenu';
import { defaultPlayerStats } from '../objects/entities/Player';

interface IShopButtons {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const MAX_ATTACK_RATE = 2;

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
        {/* Health */}
        <div>
          <center>10 Gold</center>
          <ShopButton
            onClick={() => {
              if (coinsAvailable - 10 >= 0) {
                phaserScene.sound.play('cash-reg');
                adjustCoinsSpent(10);
                updatePlayerStats({ initialHp: playerStats.initialHp + 1 });
              } else {
                phaserScene.sound.play('no-gold');
              }
            }}
          >
            Health +
          </ShopButton>
          <center>Current: {playerStats.initialHp}</center>
        </div>

        {/* Speed */}
        <div>
          <center>10 Gold</center>
          <ShopButton
            onClick={() => {
              if (coinsAvailable - 10 >= 0) {
                phaserScene.sound.play('cash-reg');
                adjustCoinsSpent(10);
                updatePlayerStats({
                  speed: Number((playerStats.speed + 0.1).toFixed(1)),
                });
              } else {
                phaserScene.sound.play('no-gold');
              }
            }}
          >
            Speed +
          </ShopButton>
          <center>Current: {playerStats.speed}</center>
        </div>

        {/* Attack Rate */}
        <div>
          <center>10 Gold</center>
          <ShopButton
            onClick={() => {
              if (playerStats.attackRate >= MAX_ATTACK_RATE) {
                phaserScene.sound.play('maxed');
                return;
              }
              if (coinsAvailable - 10 >= 0) {
                phaserScene.sound.play('cash-reg');
                adjustCoinsSpent(10);
                updatePlayerStats({
                  attackRate: Number((playerStats.attackRate + 0.1).toFixed(1)),
                });
              } else {
                phaserScene.sound.play('no-gold');
              }
            }}
          >
            Attack Rate +
          </ShopButton>
          <center>Current: {playerStats.attackRate}</center>
        </div>
      </div>
      <CornerMenu $corner={Corner.BL}>
        <button
          onClick={() => {
            phaserScene.sound.play('cash-reg');
            updatePlayerStats(defaultPlayerStats);
            setCoinsSpent(0);
          }}
        >
          Refund All Gold
        </button>
      </CornerMenu>
      <CornerMenu $corner={Corner.BR}>
        <button
          onClick={() => {
            phaserScene.sound.play('see-ya');
            onClose();
          }}
        >
          Back to Main Menu
        </button>
      </CornerMenu>
    </>
  );
};

export default ShopButtons;
