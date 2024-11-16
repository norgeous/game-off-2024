import React from 'react';
import ReactDOM from 'react-dom/client';
import PlayerProvider from './contexts/PlayerProvider';
import DungeonStateProvider from './contexts/DungeonStateProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlayerProvider>
      <DungeonStateProvider>
        <App />
      </DungeonStateProvider>
    </PlayerProvider>
  </React.StrictMode>,
);
