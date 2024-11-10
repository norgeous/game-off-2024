import dungeonConfigParser, {
  findRoomConfigByCoordinate,
  getNextRoom,
  to2D,
} from './dungeonConfigParser';

const defaultState = {
  dungeonConfig: [],
  current: {
    x: 0,
    y: 0,
    roomType: '0',
    playerEnterFrom: 'start',
    adjacentRooms: {
      north: undefined,
      south: undefined,
      west: undefined,
      east: undefined,
    },
  },
};

const createDungeonState = (onSetState: (newState) => void) => {
  let state = defaultState;

  const setState = (newState) => {
    state = { ...state, ...newState }; // override top level keys in state object
    onSetState(state);
  };

  const setDungeonStr = (newDungeonStr: string) => {
    const dungeonConfig = dungeonConfigParser(newDungeonStr);
    setState({ dungeonConfig });
    const rows = to2D(dungeonConfig);
    setState({ rows });
  };

  // const go = (direction) => {
  //   const { x, y, playerEnterFrom, roomType, adjacentRooms } = getNextRoom(
  //     state.current.x,
  //     state.current.y,
  //     direction,
  //   );

  //   const { roomType, adjacentRooms } = findRoomConfigByCoordinate(
  //     state.dungeonConfig,
  //     x,
  //     y,
  //   );

  //   return {
  //     x,
  //     y,
  //     roomType,
  //     playerEnterFrom,
  //     adjacentRooms,
  //   };

  //   // const next = {
  //   //   ...nextRoom,
  //   //   roomType: nextRoomConfig?.roomType || '?',
  //   //   adjacentRooms: nextRoomConfig.adjacentRooms,
  //   // };

  //   // if (next) {
  //   //   setCurrentRoom(next);
  //   //   const dataForScene = {
  //   //     roomType: next.roomType,
  //   //     adjacentRooms: next.adjacentRooms,
  //   //     playerEnterFrom: nextRoom.playerEnterFrom,
  //   //   };
  //   //   phaserScene?.scene.start('Rooms', dataForScene);
  //   // }
  // };

  return {
    state,
    setState,
    setDungeonStr,
  };
};

export default createDungeonState;
