import { useContext } from 'react';
import styled from 'styled-components';
import PlayerContext from '../contexts/PlayerContext';

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 30px;
`;

const CoinCount = styled.div`
  font-weight: bold;
  text-shadow: 2px 2px #000;
`;

const Coins = () => {
  const { coinsAvailable } = useContext(PlayerContext);
  return (
    <>
      <Container>
        <img src="./assets/items/coin.png" />
        <CoinCount>{new Intl.NumberFormat().format(coinsAvailable)}</CoinCount>
      </Container>
    </>
  );
};

export default Coins;
