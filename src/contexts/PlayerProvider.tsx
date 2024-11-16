import { useState, useEffect } from 'react';
import PlayerContext from './PlayerContext';

const usePlayer = () => {
  const [health, setHealth] = useState(100);

  return {
    health: 100,
    inventory: [],
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
