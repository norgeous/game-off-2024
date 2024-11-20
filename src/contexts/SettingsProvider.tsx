import SettingsContext from './SettingsContext';
import { useLocalStorage } from '../helpers/localstorage';

const useSettings = () => {
  const [isMusicMuted, setIsMusicMuted] = useLocalStorage(
    'isMusicMuted',
    false,
  );

  return {
    isMusicMuted,
    setIsMusicMuted,
  };
};

interface ISettingsProvider {
  children: React.ReactNode;
}

const SettingsProvider = ({ children }: ISettingsProvider) => (
  <SettingsContext.Provider value={useSettings()}>
    {children}
  </SettingsContext.Provider>
);

export default SettingsProvider;
