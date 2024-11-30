import { useContext } from 'react';
import PlayerContext from '../contexts/PlayerContext';

const maxDisplayHearts = 6;

const Health = () => {
  const {
    playerStats: { hp },
  } = useContext(PlayerContext);

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        textShadow: '2px 2px #000',
        fontSize: 30,
      }}
    >
      {Array.from({ length: Math.min(hp, maxDisplayHearts) }, (_, i) => (
        <img key={i} src="./assets/items/heart.png" />
      ))}
      {hp > maxDisplayHearts && `+${hp - maxDisplayHearts}`}
    </div>
  );
};

export default Health;
