import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';
import { ModeProvider } from './context/ModeContext';
import { GameProvider } from './context/GameContext'; // ✅

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </ModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
