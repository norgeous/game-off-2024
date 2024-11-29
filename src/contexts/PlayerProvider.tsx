import { useState, useEffect, useCallback } from 'react';
import PlayerContext from './PlayerContext';
import { EventBus, EventNames } from '../helpers/EventBus';
import { useLocalStorage } from '../helpers/localstorage';

type ItemKeysType = 'gold' | 'heart';

const defaultPlayerStats = {
  hp: 10,
  maxHp: 10,
  speed: 0.1,
  attackRate: 1,
};

const usePlayer = () => {
  const [playerStats, setPlayerStats] = useState(defaultPlayerStats);
  const updatePlayerStats = useCallback(
    (statsFragment: typeof defaultPlayerStats) =>
      setPlayerStats({ ...playerStats, ...statsFragment }),
    [playerStats],
  );

  const [health, setHealth] = useState(3);
  const adjustHealth = useCallback(
    (amount: number) => setHealth(health + amount),
    [health],
  );

  const [coins, setCoins] = useLocalStorage('coins', 0);
  const adjustCoins = useCallback(
    (amount: number) => setCoins(coins + amount),
    [coins, setCoins],
  );

  const [inventory, setInventory] = useState([]);

  // when scene sends the UPDATE_PLAYER_STATS event
  useEffect(() => {
    EventBus.on(EventNames.UPDATE_PLAYER_STATS, updatePlayerStats);
    return () => {
      EventBus.removeListener(EventNames.UPDATE_PLAYER_STATS);
    };
  }, [updatePlayerStats]);

  // when item collected
  useEffect(() => {
    EventBus.on(
      EventNames.COLLECT_ITEM,
      (_scene: Phaser.Scene, itemKey: ItemKeysType) => {
        ({
          gold: () => adjustCoins(+1),
          heart: () => adjustHealth(+1),
        })[itemKey]();
      },
    );
    return () => {
      EventBus.removeListener(EventNames.COLLECT_ITEM);
    };
  }, [adjustCoins, adjustHealth]);

  return {
    playerStats,
    updatePlayerStats,

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
