import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGame } from "../../context/GameContext";

export default function RecapScreen() {
  const navigate = useNavigate();
  const { gameData } = useGame();

  const {
    destination,
    startDate,
    endDate,
    budget,
    preferences,
    groupType,
  } = gameData;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const questTitle = destination
    ? `Quest to ${destination.split(" ")[0]}`
    : "Unnamed Quest";

  const handleStart = () => {
    navigate("/planner");
  };

  const handleSave = () => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
    alert("🎉 Quest saved to your local scrolls!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white px-6 font-gamer animate-fadeIn">
      <h2 className="text-4xl text-neon mb-4 animate-pulse">🌟 {questTitle}</h2>

      {/* Optional Map Preview */}
      {destination ? (
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
            destination
          )}&zoom=5&size=400x200&maptype=terrain&key=${apiKey}`}
          alt="Map Preview"
          className="rounded-xl mb-6 shadow-lg border border-neon"
        />
      ) : (
        <p className="mb-4 text-gray-400 italic">🗺️ No map available yet</p>
      )}

      {/* Recap Card */}
      <div className="bg-gray-800 p-6 rounded-xl border border-neon shadow-xl max-w-md w-full space-y-4 text-lg">
        {/* Destination */}
        <div className="flex justify-between items-center">
          <span className="text-green-400">📍 Destination:</span>
          <span className="flex-1 text-right">{destination || "N/A"}</span>
          <button
            onClick={() => navigate("/search-destination")}
            className="text-blue-400 text-sm underline ml-2"
          >
            Edit
          </button>
        </div>

        {/* Dates */}
        <div className="flex justify-between items-center">
          <span className="text-green-400">🗓️ Dates:</span>
          <span className="flex-1 text-right">
            {startDate || "?"} → {endDate || "?"}
          </span>
          <button
            onClick={() => navigate("/choose-dates")}
            className="text-blue-400 text-sm underline ml-2"
          >
            Edit
          </button>
        </div>

        {/* Budget */}
        <div className="flex justify-between items-center">
          <span className="text-green-400">💰 Budget:</span>
          <span className="flex-1 text-right">
            {budget === "low" ? "🪙 Low" : budget === "mid" ? "💳 Mid" : "💎 Luxury"}
          </span>
          <button
            onClick={() => navigate("/loadout")}
            className="text-blue-400 text-sm underline ml-2"
          >
            Edit
          </button>
        </div>

        {/* Preferences */}
        <div>
          <span className="text-green-400">⚙️ Preferences:</span>
          <div className="mt-1 text-white">
            {preferences.length > 0 ? preferences.join(", ") : "None selected"}
          </div>
        </div>

        {/* Group Type */}
        <div>
          <span className="text-green-400">🧙 Party:</span> {groupType}
        </div>
      </div>

      {/* Message */}
      <p className="mt-8 italic text-gray-400 max-w-lg text-center">
        "Every great quest begins with a single step... and a little magic." ✨
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        <button
          onClick={handleSave}
          className="px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
        >
          💾 Save This Quest
        </button>
        <button
          onClick={handleStart}
          className="px-5 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md animate-bounce"
        >
          🎮 Start My Quest!
        </button>
      </div>
    </div>
  );
}
