import { createContext } from 'react';

export const defaultSettings = {
  isMusicMuted: false,
  setIsMusicMuted: (_: boolean) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
};

const SettingsContext = createContext(defaultSettings);

export default SettingsContext;
