import { useCallback, useEffect, useState } from 'react';
import DungeonStateContext from './DungeonStateContext';
import dungeonConfigParser, {
  Direction,
  getNextRoom,
  RoomConfig1D,
} from '../helpers/dungeonConfigParser';
import { EventBus } from '../game/EventBus';

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
    setDungeon1D(dungeonConfigParser());
  }, []);

  const go = useCallback((scene: Phaser.Scene, direction: Direction) => {
    // scene.scene.destroy?.();
    const nextRoom = getNextRoom(dungeon1D, current.x, current.y, direction);
    console.log({scene,direction,dungeon1D})
    setCurrent(nextRoom);
    scene?.scene.start('Rooms', nextRoom);
  }, [current.x, current.y, dungeon1D]);

  // when a door is touched, update current
  useEffect(() => {
    EventBus.on('use-door', go);
    return () => {
      EventBus.removeListener('use-door');
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
