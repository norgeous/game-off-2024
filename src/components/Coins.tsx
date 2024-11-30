import { useContext } from 'react';
import { FaCoins } from 'react-icons/fa6';
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

interface ICoins {
  phaserScene: Phaser.Scene;
}

const Coins = ({ phaserScene }: ICoins) => {
  const { coins } = useContext(PlayerContext);
  return (
    <>
      <Container>
        <FaCoins size={30} style={{ color: 'gold' }} />
        <CoinCount>{new Intl.NumberFormat().format(coins)}</CoinCount>

        {phaserScene.scene.key === 'MainMenu' && (
          <button onClick={() => phaserScene.scene.start('Shop')}>
            Power Up!
          </button>
        )}
      </Container>
    </>
  );
};

export default Coins;
