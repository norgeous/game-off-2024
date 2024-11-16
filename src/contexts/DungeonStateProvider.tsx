import { useCallback, useEffect, useState } from 'react';
import DungeonStateContext, {
  defaultDungeonState,
} from './DungeonStateContext';
import dungeonConfigParser, {
  Direction,
  getNextRoom,
  getRoomInfo,
  RoomConfig1D,
} from '../helpers/dungeonConfigParser';
import { EventBus, EventNames } from '../EventBus';

import dungeon1 from '../dungeons/1';

const useDungeonState = () => {
  const [dungeon1D, setDungeon1D] = useState<RoomConfig1D[]>([]);
  const [current, setCurrent] = useState(defaultDungeonState.current);
  const [roomHistory, setRoomHistory] = useState<RoomConfig1D[]>([]);

  // on mount, generate the dungeon1D and save to react state
  useEffect(() => {
    const newDungeon1D = dungeonConfigParser(dungeon1);

    // find the first roomType of 0
    const startRoom = newDungeon1D.find(({ roomType }) => roomType === '0');
    if (!startRoom) return;
    const { adjacentRooms } = getRoomInfo(
      newDungeon1D,
      startRoom.x,
      startRoom.y,
    );
    const startState = {
      ...startRoom,
      playerEnterFrom: 'start',
      adjacentRooms,
    };
    setCurrent(startState);
    setRoomHistory([...roomHistory, startRoom]);

    setDungeon1D(newDungeon1D);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback(
    (scene: Phaser.Scene, direction: Direction) => {
      const nextRoom = getNextRoom(dungeon1D, current.x, current.y, direction);
      setRoomHistory([
        ...roomHistory,
        { x: nextRoom.x, y: nextRoom.y, roomType: nextRoom.roomType },
      ]);
      setCurrent(nextRoom);
      scene?.scene.start('TiledMapTest2', nextRoom);
    },
    [current.x, current.y, dungeon1D, roomHistory],
  );

  // when START event received, start dungeon with current room config (the config of start room zero)
  useEffect(() => {
    EventBus.on(EventNames.START, (scene: Phaser.Scene) =>
      scene?.scene.start('TiledMapTest2', current),
    );
    return () => {
      EventBus.removeListener(EventNames.START);
    };
  }, [current]);

  // when a door is touched, exec go function
  useEffect(() => {
    EventBus.on(EventNames.USE_DOOR, go);
    return () => {
      EventBus.removeListener(EventNames.USE_DOOR);
    };
  }, [go]);

  return {
    dungeon1D,
    current,
    go,

    roomHistory,
  };
};

interface IDungeonStateProvider {
  children: React.ReactNode;
}

const DungeonStateProvider = ({ children }: IDungeonStateProvider) => (
  <DungeonStateContext.Provider value={useDungeonState()}>
    {children}
  </DungeonStateContext.Provider>
);

export default DungeonStateProvider;
