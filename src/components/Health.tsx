import { useContext } from 'react';
import { FaHeart } from 'react-icons/fa6';
import PlayerContext from '../contexts/PlayerContext';

const Health = () => {
  const { health } = useContext(PlayerContext);
  return (
    <div style={{ display: 'flex', gap: 8, color: 'firebrick' }}>
      {Array.from({ length: health }, (_, i) => (
        <FaHeart key={i} size={32} />
      ))}
    </div>
  );
};

export default Health;
