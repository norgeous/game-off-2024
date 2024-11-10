import { useEffect, useState } from 'react';
import DungeonStateContext from './DungeonStateContext';
import dungeonConfigParser, {
  Direction,
  getNextRoom,
  RoomConfig1D,
} from '../helpers/dungeonConfigParser';
import { EventBus } from '../game/EventBus';

const defaultCurrent = {
  x: 0,
  y: 0,
  roomType: '0',
  playerEnterFrom: 'start',
  adjacentRooms: {
    north: undefined,
    south: '5',
    west: undefined,
    east: '7',
  },
};

const useDungeonState = () => {
  const [dungeon1D, setDungeon1D] = useState<RoomConfig1D[]>([]);
  const [current, setCurrent] = useState(defaultCurrent);

  // on mount, generate the dungeon1D and save to react state
  useEffect(() => {
    setDungeon1D(dungeonConfigParser());
  }, []);

  // when a door is touched, update current
  useEffect(() => {
    EventBus.on('use-door', (scene: Phaser.Scene, direction: Direction) => {
      scene.scene.destroy?.();
      const nextRoom = getNextRoom(dungeon1D, current.x, current.y, direction);
      setCurrent(nextRoom);
      console.log('use-door', scene, nextRoom);
    });
    return () => {
      EventBus.removeListener('use-door');
    };
  }, []);

  return {
    dungeon1D,
    current,
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
