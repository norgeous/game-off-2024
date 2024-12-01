import { useCallback, useContext, useEffect, useState } from 'react';
import DungeonStateContext, {
  defaultDungeonState,
} from './DungeonStateContext';
import dungeonConfigParser, {
  Direction,
  getNextRoom,
  getRoomInfo,
  RoomConfig1D,
} from '../helpers/dungeonConfigParser';
import { EventBus, EventNames } from '../helpers/EventBus';
import SettingsContext from './SettingsContext';

import dungeon1 from '../dungeons/1';
import PlayerContext from './PlayerContext';

const getIsRoomCleared = (
  current: typeof defaultDungeonState.current,
  roomHistory: RoomConfig1D[],
) =>
  roomHistory.some(
    (prevRoom) => prevRoom.x === current.x && prevRoom.y === current.y,
  );

const getRoomClearedCount = (roomHistory: RoomConfig1D[]) =>
  new Set(roomHistory.map((room) => JSON.stringify(room))).size;

const useDungeonState = () => {
  const { isMusicMuted } = useContext(SettingsContext);
  const { playerStats, updatePlayerStats } = useContext(PlayerContext);

  const [dungeon1D, setDungeon1D] = useState<RoomConfig1D[]>([]);
  const [current, setCurrent] = useState(defaultDungeonState.current);
  const [roomHistory, setRoomHistory] = useState<RoomConfig1D[]>([]);

  const settings = { isMusicMuted };

  // on mount, generate the dungeon1D and save to react state
  useEffect(() => {
    const newDungeon1D = dungeonConfigParser(dungeon1);
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
      scene?.scene.start('Room', {
        ...nextRoom,
        ...settings,
        isRoomCleared: getIsRoomCleared(nextRoom, roomHistory),
        roomClearedCount: getRoomClearedCount(roomHistory),
        playerStats,
      });
    },
    [current, dungeon1D, roomHistory, playerStats], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // when START event received, start dungeon with current room config (the config of start room zero)
  useEffect(() => {
    EventBus.on(EventNames.START, (scene: Phaser.Scene) => {
      console.log('START THE MADNESS');

      // find the first roomType of 0
      const startRoom = dungeon1D.find(({ roomType }) => roomType === '0');
      if (!startRoom) return;

      const { adjacentRooms } = getRoomInfo(
        dungeon1D,
        startRoom.x,
        startRoom.y,
      );

      const startState = {
        ...startRoom,
        playerEnterFrom: 'start',
        adjacentRooms,
      };

      setCurrent(startState); // reset current
      setRoomHistory([startRoom]); // reset history

      const resetStats = { hp: playerStats.initialHp };
      updatePlayerStats(resetStats); // reset current hp

      scene?.scene.start('Room', {
        ...startState,
        ...settings,
        isRoomCleared: false,
        roomClearedCount: 0,
        playerStats: { ...playerStats, ...resetStats },
      });
    });
    return () => {
      EventBus.removeListener(EventNames.START);
    };
  }, [dungeon1D, playerStats]); // eslint-disable-line react-hooks/exhaustive-deps

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
