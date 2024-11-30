import { createContext } from 'react';
import { defaultPlayerStats } from '../objects/entities/Player';

export const defaultPlayer = {
  playerStats: defaultPlayerStats,
  updatePlayerStats: (_: Partial<typeof defaultPlayerStats>) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars

  coins: 0,
  adjustCoins: (_: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars

  inventory: [],
};

const PlayerContext = createContext(defaultPlayer);

export default PlayerContext;
