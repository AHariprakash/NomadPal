// src/pages/GameMode/ChooseDates.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";

export default function ChooseDates() {
  const navigate = useNavigate();
  const { gameData, setGameData } = useGame();

  const [startDate, setStartDate] = useState(gameData.startDate || "");
  const [endDate, setEndDate] = useState(gameData.endDate || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (startDate && endDate) {
      setGameData(prev => ({
        ...prev,
        startDate,
        endDate,
      }));
      navigate("/loadout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white font-gamer px-6">
      <h2 className="text-3xl text-neon mb-2 animate-pulse">
        📍 Your Quest to {gameData.destination || "Mystery Realm"}
      </h2>
      <p className="text-gray-300 text-center mb-6 max-w-lg">
        Brave traveler, when does your journey begin and end?
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col">
          <span className="mb-1 text-sm">🌅 Start Date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-800 p-3 rounded text-white outline-none"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-sm">🌇 End Date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-800 p-3 rounded text-white outline-none"
          />
        </label>

        <button
          onClick={handleNext}
          disabled={!startDate || !endDate}
          className={`mt-6 py-3 px-6 rounded-full text-white transition-all ${
            startDate && endDate
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          🧭 Proceed to Next Level
        </button>
      </div>
    </div>
  );
}
