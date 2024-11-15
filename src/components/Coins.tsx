import { FaCoins } from 'react-icons/fa6';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 32px;
  user-select: none;
  pointer-events: none;
`;

const CoinCount = styled.div`
  font-weight: bold;
  text-shadow: 2px 2px #000;
`;

const Coins = () => (
  <Container>
    <FaCoins size={32} style={{ color: 'gold' }} />
    <CoinCount>1,000,000</CoinCount>
    <div style={{ fontSize: 32 }}>𓀀</div>
  </Container>
);

export default Coins;
