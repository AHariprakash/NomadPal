export async function fetchPlaces(lat, lon, category) {
  const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;
  const radius = 5000; // 5km radius

  try {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=10&apiKey=${apiKey}`
    );
    const data = await res.json();
    console.log(`[Geoapify] ${category}:`, data);
    return data;
  } catch (err) {
    console.error("Geoapify fetch failed:", err);
    return { features: [] };
  }
}
