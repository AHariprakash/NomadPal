import { useEffect, useState } from "react";

const categoryMap = {
  food: "restaurant,cafe",
  hotels: "hotel,guest_house,hostel",
  attractions: "museum,attraction,monument"
};

export default function PlacesExplorer({ lat, lon, category, groupType, budget }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "pk.c38b43cee37fa4ba03141bc6a5d2685c"; // ✅ your LocationIQ key

  useEffect(() => {
    if (!lat || !lon || !category) return;

    setLoading(true);
    const types = categoryMap[category] || "restaurant";
    const url = `https://api.locationiq.com/v1/nearby.php?key=${apiKey}&lat=${lat}&lon=${lon}&tag=${types}&radius=5000&format=json`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setPlaces([]);
        } else {
          let filtered = data.slice(0, 15); // limit to 15 results

          // OPTIONAL: Simple budget filter (mock)
          if (budget === "low") {
            filtered = filtered.filter(p => !p.name || !p.name.includes("5-star"));
          }

          setPlaces(filtered);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Places API error:", err);
        setLoading(false);
      });
  }, [lat, lon, category, groupType, budget]);

  if (loading) return <p>Loading nearby {category}...</p>;

  if (places.length === 0) return <p>No results found near this location.</p>;

  return (
    <div className="mt-4 space-y-4">
      <h4 className="text-lg font-bold text-jungle mb-2">
        Nearby {category.charAt(0).toUpperCase() + category.slice(1)}
      </h4>
      <ul className="grid gap-3">
        {places.map((place, i) => (
          <li key={i} className="bg-white p-3 rounded shadow">
            <p className="font-semibold">{place.name || "Unnamed Place"}</p>
            <p className="text-sm text-gray-600">{place.address || place.display_name}</p>
            {place.distance && (
              <p className="text-xs text-gray-500">~{Math.round(place.distance)}m away</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
