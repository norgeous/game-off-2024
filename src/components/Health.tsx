import { useState } from 'react';
import { FaHeart } from 'react-icons/fa6';

const Health = () => {
  const [playerHealth, setPlayerHealth] = useState(3);
  return (
    <div style={{ display: 'flex', gap: 8, color: 'firebrick' }}>
      {Array.from({ length: playerHealth }).map(() => (
        <FaHeart size={32} />
      ))}
      <button onClick={() => setPlayerHealth(playerHealth + 1)}>
        add heart
      </button>
    </div>
  );
};

export default Health;
