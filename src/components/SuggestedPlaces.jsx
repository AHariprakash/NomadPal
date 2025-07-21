import { useEffect, useState } from "react";
import { fetchPlaces } from "../utils/api/places";

export default function SuggestedPlaces({ lat, lon, category, title }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (lat && lon) {
      setLoading(true);
      setError("");
      fetchPlaces(lat, lon, category)
        .then((data) => {
          setPlaces(data.features || []);
        })
        .catch((err) => {
          console.error("Error fetching places:", err);
          setError("Could not load places.");
        })
        .finally(() => setLoading(false));
    }
  }, [lat, lon, category]);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold">{title}</h4>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-2 max-h-64 overflow-auto">
          {places.length > 0 ? (
            places.map((p) => (
              <li key={p.properties.place_id} className="border rounded p-2 bg-gray-50">
                {p.properties.name || p.properties.address_line2 || "Unnamed Place"}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No places found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
