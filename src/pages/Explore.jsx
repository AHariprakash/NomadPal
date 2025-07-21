import { useState } from "react";

// Destination data with country flags
const allDestinations = [
  { name: "Bali", desc: "Beaches & temples", flag: "🇮🇩" },
  { name: "Kyoto", desc: "Culture & calm", flag: "🇯🇵" },
  { name: "Machu Picchu", desc: "Adventure & history", flag: "🇵🇪" },
  { name: "Reykjavik", desc: "Auroras & ice", flag: "🇮🇸" },
  { name: "Rome", desc: "Ancient ruins & pasta", flag: "🇮🇹" },
  { name: "Santorini", desc: "Cliff views & sunsets", flag: "🇬🇷" },
];

export default function Explore() {
  const [query, setQuery] = useState("");

  // Filter based on search query
  const filtered = allDestinations.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-fire mb-4">Explore New Places</h2>

      <input
        type="text"
        placeholder="Search destinations..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/2 text-black bg-white"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No places match your search.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((place, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <h3 className="text-lg font-semibold text-jungle">
                {place.flag} {place.name}
              </h3>
              <p className="text-gray-700">{place.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
