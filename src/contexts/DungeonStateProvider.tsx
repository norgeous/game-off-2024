import { useEffect, useState } from 'react';
import DungeonStateContext from './DungeonStateContext';
// import createDungeonState from '../helpers/dungeonState';
import { EventBus } from '../game/EventBus';

const useDungeonState = () => {
  const [reactDungeonState, setReactDungeonState] = useState();

  useEffect(() => {
    // const dungeonState = createDungeonState(setReactDungeonState); // create singleton

    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      console.log('current-scene-ready', scene);
    });
    return () => {
      EventBus.removeListener('current-scene-ready');
    };
  }, []);

  return {
    'i am context': 'hello',
    reactDungeonState,
    setReactDungeonState,
    // dungeonState,
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
