import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";

export default function SearchDestination() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { gameData, setGameData } = useGame();

  // Fetch destination suggestions from Geoapify
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            query
          )}&limit=5&apiKey=254b5e492b6c4381aedd80d57c83c207`
        )
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(data.features || []);
          })
          .catch((err) => console.error("Geoapify error:", err));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (place) => {
    const name =
      place.properties.formatted ||
      place.properties.city ||
      place.properties.name;
    setGameData((prev) => ({
      ...prev,
      destination: name,
    }));
    navigate("/choose-dates");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white font-gamer px-6">
      <h2 className="text-3xl text-neon mb-6 animate-pulse">🧭 Choose Your First Destination</h2>

      <input
        type="text"
        placeholder="Search magical places..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-gray-800 p-3 rounded w-full max-w-md text-white outline-none mb-2"
      />

      {suggestions.length > 0 && (
        <ul className="bg-gray-800 border border-gray-600 w-full max-w-md rounded-lg mt-2 overflow-hidden">
          {suggestions.map((place, index) => (
            <li
              key={place.properties.place_id || index}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700"
            >
              {place.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
