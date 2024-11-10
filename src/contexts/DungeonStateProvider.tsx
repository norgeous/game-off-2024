import DungeonStateContext from './DungeonStateContext';
import dungeonState from '../helpers/dungeonState';

const useDungeonState = () => {
  return {
    'i am context': 'hello',
    dungeonState,
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
