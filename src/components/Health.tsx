import { useContext } from 'react';
import { FaHeart } from 'react-icons/fa6';
import PlayerContext from '../contexts/PlayerContext';

const Health = () => {
  const { health, adjustHealth } = useContext(PlayerContext);
  return (
    <>
      <div style={{ display: 'flex', gap: 8, color: 'firebrick' }}>
        {Array.from({ length: health }, (_, i) => (
          <FaHeart key={i} size={32} />
        ))}
      </div>
      <div>
        <button onClick={() => adjustHealth(+1)}>add heart</button>
        <button onClick={() => adjustHealth(-1)}>remove heart</button>
      </div>
    </>
  );
};

export default Health;
