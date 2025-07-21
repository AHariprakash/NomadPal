// src/utils/fetchActivities.js
export async function fetchActivities({ lat, lon, category, apiKey }) {
  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},5000&limit=10&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.features || [];
  } catch (err) {
    console.error("Geoapify Places fetch failed:", err);
    return [];
  }
}
