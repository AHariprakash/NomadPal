import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";

export default function PreferencesLoadout() {
  const [budget, setBudget] = useState("mid");
  const [preferences, setPreferences] = useState([]);
  const [groupType, setGroupType] = useState("solo");
  const navigate = useNavigate();
  const { setGameData } = useGame();

  const preferenceOptions = ["Nature", "History", "Food", "Nightlife", "Shopping", "Adventure"];
  const groupOptions = ["solo", "couple", "family", "friends"];

  const togglePreference = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleStart = () => {
    setGameData(prev => ({
      ...prev,
      budget,
      preferences,
      groupType
    }));
    navigate("/recap");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-black to-gray-900 text-white font-gamer">
      <h2 className="text-3xl text-neon mb-6 animate-pulse">🧰 Prepare Your Travel Loadout</h2>

      {/* Budget */}
      <div className="mb-6 w-full max-w-md">
        <h3 className="mb-2 text-lg text-green-400">💰 Choose Budget Level</h3>
        <div className="flex gap-4">
          {["low", "mid", "high"].map((level) => (
            <button
              key={level}
              onClick={() => setBudget(level)}
              className={`px-4 py-2 rounded-full border-2 ${
                budget === level
                  ? "bg-green-600 border-green-500"
                  : "bg-gray-800 border-gray-600"
              }`}
            >
              {level === "low" ? "🪙 Low" : level === "mid" ? "💳 Mid" : "💎 Luxury"}
            </button>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-6 w-full max-w-md">
        <h3 className="mb-2 text-lg text-green-400">⚙️ Equip Preferences</h3>
        <div className="grid grid-cols-2 gap-3">
          {preferenceOptions.map((pref) => (
            <button
              key={pref}
              onClick={() => togglePreference(pref)}
              className={`px-3 py-2 rounded-lg border-2 text-sm ${
                preferences.includes(pref)
                  ? "bg-green-700 border-green-500"
                  : "bg-gray-800 border-gray-600"
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      {/* Group Type */}
      <div className="mb-6 w-full max-w-md">
        <h3 className="mb-2 text-lg text-green-400">🧙 Choose Party Type</h3>
        <div className="flex gap-4 flex-wrap">
          {groupOptions.map((group) => (
            <button
              key={group}
              onClick={() => setGroupType(group)}
              className={`px-4 py-2 rounded-full border-2 ${
                groupType === group
                  ? "bg-green-600 border-green-500"
                  : "bg-gray-800 border-gray-600"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-4 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
      >
        🧭 Finalize Loadout & Begin!
      </button>
    </div>
  );
}
