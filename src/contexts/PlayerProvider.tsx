import { useState, useEffect, useCallback } from 'react';
import PlayerContext from './PlayerContext';
import { EventBus, EventNames } from '../helpers/EventBus';
import { useLocalStorage } from '../helpers/localstorage';
import { defaultPlayerStats } from '../objects/entities/Player';

type ItemKeysType = 'gold' | 'gold-medium' | 'gold-large' | 'heart';

const usePlayer = () => {
  const [playerStats, setPlayerStats] = useLocalStorage(
    'player-stats-new',
    defaultPlayerStats,
  );
  const updatePlayerStats = useCallback(
    (statsFragment: Partial<typeof defaultPlayerStats>) =>
      setPlayerStats({ ...playerStats, ...statsFragment }),
    [playerStats, setPlayerStats],
  );

  const [coins, setCoins] = useLocalStorage('coins', 0);
  const adjustCoins = useCallback(
    (amount: number) => setCoins(coins + amount),
    [coins, setCoins],
  );

  const [coinsSpent, setCoinsSpent] = useLocalStorage('coins-spent', 0);
  const adjustCoinsSpent = useCallback(
    (amount: number) => setCoinsSpent(coinsSpent + amount),
    [coinsSpent, setCoinsSpent],
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
          'gold-medium': () => adjustCoins(+3),
          'gold-large': () => adjustCoins(+5),
          heart: () => updatePlayerStats({ hp: playerStats.hp + 1 }),
        })[itemKey]?.();
      },
    );
    return () => {
      EventBus.removeListener(EventNames.COLLECT_ITEM);
    };
  }, [adjustCoins, playerStats, updatePlayerStats]);

  return {
    playerStats,
    updatePlayerStats,

    coins,
    adjustCoins,

    coinsSpent,
    adjustCoinsSpent,

    coinsAvailable: coins - coinsSpent,

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
