import { useState, useEffect, useCallback } from 'react';
import PlayerContext from './PlayerContext';
import { EventBus, EventNames } from '../helpers/EventBus';
import { useLocalStorage } from '../helpers/localstorage';
import { defaultPlayerStats } from '../objects/entities/Player';

type ItemKeysType = 'gold' | 'heart';

const usePlayer = () => {
  const [playerStats, setPlayerStats] = useState(defaultPlayerStats);
  const updatePlayerStats = useCallback(
    (statsFragment: Partial<typeof defaultPlayerStats>) =>
      setPlayerStats({ ...playerStats, ...statsFragment }),
    [playerStats],
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
          heart: () => updatePlayerStats({ hp: playerStats.hp + 1 }),
        })[itemKey]();
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
