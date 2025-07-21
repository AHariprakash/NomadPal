import { getDateRange } from "./dateUtils";
import { fetchPlaces } from "./api/places"; // adjust path if needed

export async function generateItinerary(destinations, startDate, endDate, preference, groupType, budget) {
  const days = getDateRange(startDate, endDate);
  const itinerary = [];

  const categoryMap = {
    Adventure: "entertainment",
    Relaxation: "leisure.spa",
    Culture: "tourism.sights",
    Nature: "natural",
  };

  const category = categoryMap[preference] || "tourism.sights";

  for (let i = 0; i < days.length; i++) {
    const date = days[i];
    const destination = destinations[i % destinations.length];
    const { lat, lon } = destination;

    let activityNames = [];

    try {
      const data = await fetchPlaces(lat, lon, category);
      activityNames = (data.features || [])
        .map(p => p.properties.name || p.properties.address_line2)
        .filter(Boolean);
    } catch (err) {
      console.error("Error fetching real places:", err);
    }

    itinerary.push({
      date,
      destination: destination.display_name,
      hotel: budget === "luxury" ? "5-Star Resort" : budget === "mid" ? "Comfort Inn" : "Budget Inn",
      activities: activityNames.slice(0, 2),
      meals: groupType === "school" ? "Cafeteria Buffet" : "Local Restaurant",
    });
  }

  return itinerary;
}
