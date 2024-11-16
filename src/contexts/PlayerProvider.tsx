import { useState, useEffect, useCallback } from 'react';
import PlayerContext from './PlayerContext';
import { EventBus, EventNames } from '../game/EventBus';

const usePlayer = () => {
  const [health, setHealth] = useState(3);
  const adjustHealth = useCallback(
    (amount: number) => setHealth(health + amount),
    [health],
  );

  const [coins, setCoins] = useState(0);
  const adjustCoins = useCallback(
    (amount: number) => setCoins(coins + amount),
    [coins],
  );
  const [inventory, setInventory] = useState([]);

  // when the player takes damage
  useEffect(() => {
    EventBus.on(EventNames.ADJUST_PLAYER_HEALTH, adjustHealth);
    return () => {
      EventBus.removeListener(EventNames.ADJUST_PLAYER_HEALTH);
    };
  }, [adjustHealth]);

  return {
    health,
    adjustHealth,

    coins,
    adjustCoins,

    inventory,
    setInventory,
  };
};

interface IPlayerProvider {
  children: React.ReactNode;
}

const PlayerProvider = ({ children }: IPlayerProvider) => (
  <PlayerContext.Provider value={usePlayer()}>
    {children}
  </PlayerContext.Provider>
);

export default PlayerProvider;
