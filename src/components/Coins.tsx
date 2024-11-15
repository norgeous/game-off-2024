import { FaCoins } from 'react-icons/fa6';

const Coins = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <FaCoins size={32} style={{ color: 'gold' }} />
    <div style={{ fontWeight: 'bold' }}>1,000,000</div>
    <div style={{ fontSize: 32 }}>𓀀</div>
  </div>
);

export default Coins;
