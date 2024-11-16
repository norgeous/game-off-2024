import { createContext } from 'react';

export const defaultPlayer = {
  health: 3,
  adjustHealth: (_: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars

  coins: 0,
  adjustCoins: (_: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars

  inventory: [],
};

const PlayerContext = createContext(defaultPlayer);

export default PlayerContext;
