import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import { fetchActivities } from "../../utils/fetchActivities";

const GEOAPIFY_KEY = "254b5e492b6c4381aedd80d57c83c207";

export default function Planner() {
  const { gameData } = useGame();
  const [activities, setActivities] = useState([]);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // Step 1: Geocode destination
    const getCoordinates = async () => {
      const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        gameData.destination
      )}&apiKey=${GEOAPIFY_KEY}`;
      const res = await fetch(geoUrl);
      const data = await res.json();
      const loc = data.features?.[0]?.geometry;
      if (loc) setCoords(loc);
    };

    getCoordinates();
  }, [gameData.destination]);

  useEffect(() => {
    // Step 2: Fetch activities
    if (coords) {
      fetchActivities({
        lat: coords.coordinates[1],
        lon: coords.coordinates[0],
        category: "tourism.sights",
        apiKey: GEOAPIFY_KEY,
      }).then(setActivities);
    }
  }, [coords]);

  return (
    <div className="p-6 text-white font-gamer">
      <h2 className="text-3xl text-neon mb-4 animate-pulse">🗺️ Quest Plan</h2>

      <h3 className="text-xl text-green-400 mb-2">🔍 Points of Interest:</h3>
      {activities.length === 0 ? (
        <p className="text-gray-400">Loading activities...</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((place) => (
            <li key={place.properties.place_id} className="bg-gray-800 p-3 rounded-lg shadow">
              <h4 className="font-bold">{place.properties.name}</h4>
              <p className="text-sm text-gray-300">{place.properties.address_line1}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
