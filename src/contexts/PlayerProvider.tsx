import { useState, useEffect, useCallback } from 'react';
import PlayerContext from './PlayerContext';
import { EventBus, EventNames } from '../helpers/EventBus';
import { useLocalStorage } from '../helpers/localstorage';

type ItemKeysType = 'gold' | 'heart';

const usePlayer = () => {
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

  // when the player takes damage
  useEffect(() => {
    EventBus.on(EventNames.ADJUST_PLAYER_HEALTH, adjustHealth);
    return () => {
      EventBus.removeListener(EventNames.ADJUST_PLAYER_HEALTH);
    };
  }, [adjustHealth]);

  // when item collected
  useEffect(() => {
    EventBus.on(
      EventNames.COLLECT_ITEM,
      (_scene: Phaser.Scene, itemKey: ItemKeysType) => {
        console.log('COLLECT', itemKey);
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
