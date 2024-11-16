import { useState } from 'react';
import { FaCoins } from 'react-icons/fa6';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 32px;
`;

const CoinCount = styled.div`
  font-weight: bold;
  text-shadow: 2px 2px #000;
`;

const Coins = () => {
  const [count, setCount] = useState(1_000_000);
  const display = new Intl.NumberFormat().format(count);
  return (
    <>
      <Container>
        <FaCoins size={32} style={{ color: 'gold' }} />
        <CoinCount>{display}</CoinCount>
      </Container>
      {/* <Container>
        <button onClick={() => setCount(0)}>0</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count + 1_000_000)}>+1M</button>
      </Container> */}
    </>
  );
};

export default Coins;
