import { useState, useEffect } from 'react';
import PlayerContext from './PlayerContext';
import { EventBus, EventNames } from '../game/EventBus';

const usePlayer = () => {
  const [health, setHealth] = useState(100);
  const [inventory, setInventory] = useState([]);

  // when the player takes damage
  useEffect(() => {
    EventBus.on(EventNames.ADJUST_PLAYER_HEALTH, (amount: number) => {
      setHealth(health + amount);
    });
    return () => {
      EventBus.removeListener(EventNames.ADJUST_PLAYER_HEALTH);
    };
  }, [health]);

  return {
    health,
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
