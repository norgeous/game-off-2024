import { createContext } from 'react';

export const defaultSettings = {
  isMusicMuted: false,
  setIsMusicMuted: () => {},
};

const SettingsContext = createContext(defaultSettings);

export default SettingsContext;
