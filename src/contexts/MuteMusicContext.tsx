import React, { createContext, useState, useContext } from 'react';

const defaultMuteContext = {
  isMute: false,
  toggleMute: () => {},
};

interface IMuteProvider {
  children: React.ReactNode;
}

const MuteContext = createContext(defaultMuteContext);

export const MuteProvider = ({ children }: IMuteProvider) => {
  const [isMute, setIsMute] = useState(false);

  const toggleMute = () => setIsMute((prevMute) => !prevMute);

  return (
    <MuteContext.Provider value={{ isMute, toggleMute }}>
      {children}
    </MuteContext.Provider>
  );
};

export const MuteMusicContext = () => useContext(MuteContext);
