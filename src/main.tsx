import React from 'react';
import ReactDOM from 'react-dom/client';
import DungeonStateProvider from './contexts/DungeonStateProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DungeonStateProvider>
      <App />
    </DungeonStateProvider>
  </React.StrictMode>,
);
