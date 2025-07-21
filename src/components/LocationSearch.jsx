import { useState } from "react";

export default function LocationSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchSuggestions = async (input) => {
    const apiKey = "pk.c38b43cee37fa4ba03141bc6a5d2685c";
    try {
      const response = await fetch(
        `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${encodeURIComponent(input)}&limit=5`
      );
      const data = await response.json();
      setResults(!data.error ? data : []);
    } catch (error) {
      console.error("LocationIQ Error:", error);
      setResults([]);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.length >= 3) fetchSuggestions(input);
    else setResults([]);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setResults([]);
    onSelect(place);
  };

  return (
    <div className="relative z-50"> {/* ⬅️ Ensure this is highest */}
      <input
        type="text"
        placeholder="Search for a location..."
        value={query}
        onChange={handleChange}
        className="p-2 border rounded w-full bg-white"
      />
      {results.length > 0 && (
        <ul className="absolute z-50 bg-white border rounded shadow mt-1 w-full max-h-60 overflow-auto">
          {results.map((place, i) => (
            <li
              key={i}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
