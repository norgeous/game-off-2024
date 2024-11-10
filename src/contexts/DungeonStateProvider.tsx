import { useEffect, useState } from 'react';
import DungeonStateContext from './DungeonStateContext';
import dungeonConfigParser, {
  RoomConfig1D,
} from '../helpers/dungeonConfigParser';
import { EventBus } from '../game/EventBus';

const useDungeonState = () => {
  const [dungeonState, setDungeonState] = useState<RoomConfig1D[]>([]);

  // on mount, generate the dungeonState
  useEffect(() => {
    setDungeonState(dungeonConfigParser());
  }, []);

  //
  useEffect(() => {
    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      console.log('current-scene-ready', scene);
    });
    return () => {
      EventBus.removeListener('current-scene-ready');
    };
  }, []);

  return dungeonState;
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
