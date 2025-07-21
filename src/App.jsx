import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useMode } from './context/ModeContext';

import TripPlanner from './pages/TripPlanner'; // Classic
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';

import GameHome from './pages/GameMode/Home';
import SearchDestination from './pages/GameMode/SearchDestination';
import ChooseDates from './pages/GameMode/ChooseDates';
import PreferencesLoadout from './pages/GameMode/PreferencesLoadout';
import RecapScreen from './pages/GameMode/RecapScreen';
import GamePlanner from './pages/GameMode/Planner'; // ✅ Rename Plan.jsx to Planner.jsx

export default function App() {
  const { mode, toggleMode } = useMode();
  const isGaming = mode === "gaming";

  const bgClass = isGaming
    ? "bg-black text-neon font-gamer"
    : "bg-sand text-jungle font-tribal";

  return (
    <div className={`min-h-screen w-full flex flex-col ${bgClass}`}>
      <header className={`flex justify-between items-center px-6 py-4 shadow-md ${isGaming ? "bg-gray-900" : "bg-white"}`}>
        <h1 className={`text-2xl font-bold ${isGaming ? "text-neon" : "text-fire"}`}>
          {isGaming ? "🎮 NomadPal GX" : "🔥 NomadPal 🛖"}
        </h1>
        <div className="flex items-center gap-4">
          <nav className="space-x-4">
            <Link to="/planner" className="hover:underline">Plan</Link>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/explore" className="hover:underline">Explore</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
          </nav>
          <button
            onClick={toggleMode}
            className={`px-3 py-1 rounded text-white ${
              isGaming ? "bg-green-600 hover:bg-green-700" : "bg-fire hover:bg-orange-600"
            }`}
          >
            {isGaming ? "Classic Mode" : "Gaming Mode"}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={isGaming ? <GameHome /> : <Home />} />
          <Route path="/search-destination" element={<SearchDestination />} />
          <Route path="/choose-dates" element={<ChooseDates />} />
          <Route path="/loadout" element={<PreferencesLoadout />} />
          <Route path="/recap" element={<RecapScreen />} />
          <Route path="/planner" element={isGaming ? <GamePlanner /> : <TripPlanner />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
