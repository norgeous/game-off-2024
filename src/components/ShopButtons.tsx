import { useContext } from 'react';
import PlayerContext from '../contexts/PlayerContext';
import ShopButton from './ShopButton';
import CornerMenu, { Corner } from './CornerMenu';

interface IShopButtons {
  phaserScene: Phaser.Scene;
  onClose: () => void;
}

const ShopButtons = ({ onClose }: IShopButtons) => {
  const { playerStats, updatePlayerStats } = useContext(PlayerContext);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          gap: 20,
          padding: 12,
        }}
      >
        <div>
          <ShopButton
            onClick={() => updatePlayerStats({ hp: playerStats.hp + 1 })}
          >
            Health +
          </ShopButton>
          <center>current: {playerStats.hp}</center>
        </div>

        <div>
          <ShopButton
            onClick={() =>
              updatePlayerStats({
                speed: Number((playerStats.speed + 0.1).toFixed(1)),
              })
            }
          >
            Speed +
          </ShopButton>
          <center>current: {playerStats.speed}</center>
        </div>

        <div>
          <ShopButton
            onClick={() =>
              updatePlayerStats({
                attackRate: Number((playerStats.attackRate + 0.1).toFixed(1)),
              })
            }
          >
            Attack Rate +
          </ShopButton>
          <center>current: {playerStats.attackRate}</center>
        </div>
      </div>
      <CornerMenu $corner={Corner.BR}>
        <button onClick={() => onClose()}>Refund All</button>
        <button onClick={() => onClose()}>Back</button>
      </CornerMenu>
    </>
  );
};

export default ShopButtons;
