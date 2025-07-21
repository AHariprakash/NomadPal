// src/pages/GameMode/Home.jsx
import { Link } from "react-router-dom";

export default function GameHome() {
  const featuredPlaces = ["Kyoto", "Barcelona", "Cairo", "Reykjavík", "Bali"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-gray-900 to-black text-white font-gamer">
      <h2 className="text-4xl mb-6 text-neon animate-pulse">🌍 Choose Your First Quest</h2>

      <p className="mb-4 text-lg text-gray-300 italic max-w-xl text-center">
        Welcome, traveler! I’m your tribal guide. Where shall your journey begin?
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {featuredPlaces.map((place, idx) => (
          <Link
            to={`/choose-dates?destination=${encodeURIComponent(place)}`}
            key={idx}
            className="bg-gray-800 p-4 rounded-xl border border-neon shadow-lg hover:scale-105 transition-all"
          >
            <h3 className="text-xl mb-2 text-neon">{place}</h3>
            <p className="text-sm text-gray-400">A mystical land full of wonder...</p>
          </Link>
        ))}
      </div>

      <Link
        to="/search-destination"
        className="mt-10 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-lg shadow-xl"
      >
        🧭 Start New Journey
      </Link>
    </div>
  );
}
