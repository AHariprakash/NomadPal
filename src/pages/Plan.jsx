import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";

export default function Plan() {
  const { gameData } = useGame();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const lat = 28.6139; // fallback lat/lng if needed
      const lon = 77.2090;
      const apiKey = "254b5e492b6c4381aedd80d57c83c207";

      try {
        const res = await fetch(
          `https://api.geoapify.com/v2/places?categories=entertainment,catering,tourism&filter=circle:${lon},${lat},5000&limit=10&apiKey=${apiKey}`
        );
        const data = await res.json();
        setActivities(data.features || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-10 font-gamer">
      <h2 className="text-3xl mb-6 text-neon animate-pulse">
        🧭 Quest Plan for {gameData.destination || "Unknown Land"}
      </h2>

      <ul className="space-y-4">
        {activities.map((act, idx) => (
          <li key={act.properties.place_id || idx} className="bg-gray-800 p-4 rounded-lg border border-neon">
            <h3 className="text-xl font-bold">{act.properties.name || "Unknown Spot"}</h3>
            <p>{act.properties.categories?.join(", ")}</p>
            <p className="text-sm text-gray-400">{act.properties.address_line1}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
