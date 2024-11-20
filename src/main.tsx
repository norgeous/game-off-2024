import React from 'react';
import ReactDOM from 'react-dom/client';
import PlayerProvider from './contexts/PlayerProvider';
import DungeonStateProvider from './contexts/DungeonStateProvider';
import App from './components/App';
import SettingsProvider from './contexts/SettingsProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <PlayerProvider>
        <DungeonStateProvider>
          <App />
        </DungeonStateProvider>
      </PlayerProvider>
    </SettingsProvider>
  </React.StrictMode>,
);
