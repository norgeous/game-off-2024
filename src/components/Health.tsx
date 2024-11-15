import { FaCoins, FaHeart } from 'react-icons/fa6';

const Health = () => (
  <>
    <div style={{ display: 'flex', gap: 8 }}>
      <FaHeart size={32} />
      <FaHeart size={32} />
      <FaHeart size={32} />
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <FaCoins size={32} /> 10,000
    </div>
  </>
);

export default Health;
