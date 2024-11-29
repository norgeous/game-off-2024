import { createContext } from 'react';

const playerStats = {
  hp: 10,
  maxHp: 10,
  speed: 0.1,
  attackRate: 1,
};

export const defaultPlayer = {
  playerStats,
  updatePlayerStats: (_: typeof playerStats) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars

  health: 3,
  adjustHealth: (_: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars

  coins: 0,
  adjustCoins: (_: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars

  inventory: [],
};

const PlayerContext = createContext(defaultPlayer);

export default PlayerContext;
