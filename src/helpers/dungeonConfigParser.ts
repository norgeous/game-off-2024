const dungeonConfigTo2D = (dungeonConfig: string) =>
  dungeonConfig
    .trim()
    .split('\n')
    .map((row: string, y: number) =>
      row.split('').map((roomType: string, x: number) => ({ x, y, roomType })),
    )
    .flat();

type RoomConfig = {
  x: number;
  y: number;
  roomType: string;
};

export const findRoomConfigByCoordinate = (
  arr: RoomConfig[],
  px: number,
  py: number,
) => {
  const roomConfig = arr.find(({ x, y }) => x === px && y === py); // or undefined
  if (!roomConfig || roomConfig.roomType === '.') return undefined;
  else return roomConfig;
};

const dungeonConfigParser = (dungeonStr: string) => {
  const flatted = dungeonConfigTo2D(dungeonStr);

  const withDoors = flatted.map((roomConfig) => {
    const { x, y } = roomConfig;

    const adjacentRooms = {
      north: findRoomConfigByCoordinate(flatted, x, y - 1),
      south: findRoomConfigByCoordinate(flatted, x, y + 1),
      east: findRoomConfigByCoordinate(flatted, x + 1, y),
      west: findRoomConfigByCoordinate(flatted, x - 1, y),
    };

    return {
      ...roomConfig,
      adjacentRooms: roomConfig.roomType !== '.' ? adjacentRooms : {},
    };
  });

  return withDoors;
};

export default dungeonConfigParser;

export const to2D = (dungeonConfig: RoomConfig[]) =>
  Object.values(Object.groupBy(dungeonConfig, ({ y }: { y: number }) => y));
