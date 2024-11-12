import { createContext } from 'react';
import { Direction, RoomConfig1D } from '../helpers/dungeonConfigParser';

export const defaultDungeonState = {
  dungeon1D: [] as RoomConfig1D[],
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
  go: (_scene:Phaser.Scene, _direction: Direction) => {},
};

const DungeonStateContext = createContext(defaultDungeonState);

export default DungeonStateContext;
