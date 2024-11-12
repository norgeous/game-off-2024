import { useCallback, useEffect, useState } from 'react';
import DungeonStateContext, {
  defaultDungeonState,
} from './DungeonStateContext';
import dungeonConfigParser, {
  Direction,
  getNextRoom,
  RoomConfig1D,
} from '../helpers/dungeonConfigParser';
import { EventBus, EventNames } from '../game/EventBus';

import dungeon1 from '../dungeons/1';

const useDungeonState = () => {
  const [dungeon1D, setDungeon1D] = useState<RoomConfig1D[]>([]);
  // const [roomHistory, setRoomHistory] = useState();
  const [current, setCurrent] = useState(defaultDungeonState.current);

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
