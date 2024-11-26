import { RoomType } from '../rooms';

export type Direction = 'north' | 'south' | 'east' | 'west';

export type SceneInitParamsType = {
  roomType: RoomType;
  adjacentRooms: { [direction in Direction]: string };
  playerEnterFrom: Direction;
  isMusicMuted: boolean;
};

export type RoomConfig1D = {
  x: number;
  y: number;
  roomType: string;
};

// Find the object in array by x and y keys
// always returns a value, even when not found
export const findRoomConfigByCoordinate = (
  dungeon1D: RoomConfig1D[],
  px: number,
  py: number,
) => {
  const roomConfig = dungeon1D.find(({ x, y }) => x === px && y === py); // or undefined
  if (!roomConfig) return { x: 0, y: 0, roomType: '%' };
  else return roomConfig;
};

// get roomType for the coord
const getRoomType = (dungeon1D: RoomConfig1D[], x: number, y: number) =>
  findRoomConfigByCoordinate(dungeon1D, x, y)?.roomType;

// get the adjacentRooms for the coord
const getAdjacentRooms = (dungeon1D: RoomConfig1D[], x: number, y: number) => ({
  north: getRoomType(dungeon1D, x, y - 1),
  south: getRoomType(dungeon1D, x, y + 1),
  east: getRoomType(dungeon1D, x + 1, y),
  west: getRoomType(dungeon1D, x - 1, y),
});

export const getRoomInfo = (
  dungeon1D: RoomConfig1D[],
  x: number,
  y: number,
) => {
  const roomType = getRoomType(dungeon1D, x, y);
  const adjacentRooms = getAdjacentRooms(dungeon1D, x, y);
  return { roomType, adjacentRooms };
};

// Convert the multiline dungeon string into a 1 dimensional array of RoomConfig1D objects
const dungeonConfigTo1D = (dungeonConfig: string) =>
  dungeonConfig
    .trim()
    .split('\n')
    .map((row: string, y: number) =>
      row.split('').map((roomType: string, x: number) => ({ x, y, roomType })),
    )
    .flat();

// main function to convert dungeonStr to array of RoomConfig
const dungeonConfigParser = (dungeonStr: string) => {
  const dungeon1D = dungeonConfigTo1D(dungeonStr);
  return dungeon1D;
};
export default dungeonConfigParser;

// when moving to next scene, this will get the config data of the next room
export const getNextRoom = (
  dungeon1D: RoomConfig1D[],
  currentX: number,
  currentY: number,
  direction: Direction,
) => {
  // convert current position and direction into new position
  const { x, y, playerEnterFrom } = {
    north: {
      x: currentX,
      y: currentY - 1,
      playerEnterFrom: 'south',
    },
    south: {
      x: currentX,
      y: currentY + 1,
      playerEnterFrom: 'north',
    },
    east: {
      x: currentX + 1,
      y: currentY,
      playerEnterFrom: 'west',
    },
    west: {
      x: currentX - 1,
      y: currentY,
      playerEnterFrom: 'east',
    },
  }[direction];

  const { roomType, adjacentRooms } = getRoomInfo(dungeon1D, x, y);

  return {
    x,
    y,
    roomType,
    playerEnterFrom,
    adjacentRooms,
  };
};

// convert the 1D RoomConfig array to a 2D nested array / matrix
// this only is used for rendering the minimap
export const to2D = (dungeonConfig: RoomConfig1D[]) =>
  Object.values(Object.groupBy(dungeonConfig, ({ y }: RoomConfig1D) => y));
