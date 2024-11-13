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
  go: (_scene: Phaser.Scene, _direction: Direction) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  roomHistory: [] as RoomConfig1D[],
};

const DungeonStateContext = createContext(defaultDungeonState);

export default DungeonStateContext;
