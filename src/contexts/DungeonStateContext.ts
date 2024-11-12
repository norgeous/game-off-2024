import { createContext } from 'react';

export const defaultDungeonState = {
  dungeon1D: [],
  current: {
    x: 0,
    y: 0,
    roomType: '?',
    playerEnterFrom: 'start',
    adjacentRooms: {
      north: '?',
      south: '?',
      west: '?',
      east: '?',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  go: (scene, direction) => {},
};

const DungeonStateContext = createContext(defaultDungeonState);

export default DungeonStateContext;
