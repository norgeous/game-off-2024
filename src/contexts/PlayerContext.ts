import { createContext } from 'react';

export const defaultPlayer = {
  health: 100,
  inventory: [],
};

const PlayerContext = createContext(defaultPlayer);

export default PlayerContext;
