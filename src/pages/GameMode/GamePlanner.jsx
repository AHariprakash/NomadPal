// src/pages/GameMode/GamePlanner.jsx
import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import dayjs from "dayjs";

export default function GamePlanner() {
  const { gameData } = useGame();
  const { destination, startDate, endDate, preferences } = gameData;

  const [days, setDays] = useState([]);

  // Replace this when you fetch actual coordinates
  const mockCoords = { lat: 0, lon: 0 };

  const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;

  // Generate date range
  useEffect(() => {
    if (!startDate || !endDate || !destination) return;
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const totalDays = end.diff(start, "day") + 1;
    const generatedDays = Array.from({ length: totalDays }, (_, i) => {
      return {
        date: start.add(i, "day").format("YYYY-MM-DD"),
        activities: [],
      };
    });
    setDays(generatedDays);
  }, [startDate, endDate, destination]);

  // Fetch POIs for each day
  useEffect(() => {
    days.forEach((day, idx) => {
      const { lat, lon } = mockCoords;
      const category = preferences[0] ? preferences[0].toLowerCase() : "tourism";
      fetch(
        `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&limit=3&apiKey=${apiKey}`
      )
        .then((r) => r.json())
        .then((data) => {
          const places = data.features.map((f) => f.properties.name);
          setDays((prev) => {
            const copy = [...prev];
            copy[idx].activities = [`Explore ${places.join(", ")}`];
            return copy;
          });
        })
        .catch(console.error);
    });
  }, [days]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6 font-gamer">
      <h2 className="text-3xl text-neon mb-4">🗺️ Quest Plan: {destination}</h2>
      {days.map((day, i) => (
        <div key={day.date} className="bg-gray-800 p-4 mb-6 rounded-md border-l-4 border-green-400 shadow-md">
          <h3 className="text-xl mb-2">Day {i + 1} – {day.date}</h3>
          {day.activities.length ? (
            <ul className="list-disc list-inside">
              {day.activities.map((act, j) => (
                <li key={j}>🎯 {act}</li>
              ))}
            </ul>
          ) : (
            <p>Loading activities…</p>
          )}
        </div>
      ))}
    </div>
  );
}
