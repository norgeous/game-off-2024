import { useCallback, useEffect, useState } from 'react';
import DungeonStateContext from './DungeonStateContext';
import dungeonConfigParser, {
  Direction,
  getNextRoom,
  RoomConfig1D,
} from '../helpers/dungeonConfigParser';
import { EventBus, EventNames } from '../game/EventBus';

import dungeon1 from '../dungeons/1';

const defaultCurrent = {
  x: 0,
  y: 6,
  roomType: '0',
  playerEnterFrom: 'start',
  adjacentRooms: {
    north: '1',
    south: '?',
    west: '?',
    east: '.',
  },
};

const useDungeonState = () => {
  const [dungeon1D, setDungeon1D] = useState<RoomConfig1D[]>([]);
  const [current, setCurrent] = useState(defaultCurrent);

  // on mount, generate the dungeon1D and save to react state
  useEffect(() => {
    setDungeon1D(dungeonConfigParser(dungeon1));
  }, []);

  const go = useCallback(
    (scene: Phaser.Scene, direction: Direction) => {
      const nextRoom = getNextRoom(dungeon1D, current.x, current.y, direction);
      setCurrent(nextRoom);
      scene?.scene.start('TiledMapTest2', nextRoom);
    },
    [current.x, current.y, dungeon1D],
  );

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
