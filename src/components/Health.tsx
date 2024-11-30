import { useContext } from 'react';
import PlayerContext from '../contexts/PlayerContext';

const Health = () => {
  const {
    playerStats: { hp },
  } = useContext(PlayerContext);
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {Array.from({ length: hp }, (_, i) => (
        <img key={i} src="./assets/items/heart.png" />
      ))}
    </div>
  );
};

export default Health;
