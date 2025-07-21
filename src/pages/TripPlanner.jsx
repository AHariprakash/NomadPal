import { useEffect, useState } from "react";
import { calculateDailyBudget } from "../utils/budgetLogic";
import { generateItinerary } from "../utils/generateItinerary";
import LocationSearch from "../components/LocationSearch";
import LocationMap from "../components/LocationMap";
import WeatherForecast from "../components/WeatherForecast";
import SuggestedPlaces from "../components/SuggestedPlaces";

export default function TripPlanner() {
  const [step, setStep] = useState(1);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [travelDates, setTravelDates] = useState({ start: "", end: "" });
  const [preference, setPreference] = useState("");
  const [groupType, setGroupType] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [itinerary, setItinerary] = useState([]);
  const [loadingItinerary, setLoadingItinerary] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  useEffect(() => {
    const loadItinerary = async () => {
      if (
        selectedDestinations.length &&
        travelDates.start &&
        travelDates.end &&
        preference &&
        groupType &&
        budget
      ) {
        setLoadingItinerary(true);
        const plan = await generateItinerary(
          selectedDestinations,
          travelDates.start,
          travelDates.end,
          preference,
          groupType,
          budget
        );
        setItinerary(plan);
        setLoadingItinerary(false);
      }
    };

    if (step === 4) loadItinerary();
  }, [step]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-fire">Trip Planner Wizard</h2>

      {step === 1 && (
        <div>
          <label className="block mb-2">Add Destination(s):</label>
          <LocationSearch
            onSelect={(place) => {
              if (!selectedDestinations.some((d) => d.place_id === place.place_id)) {
                setSelectedDestinations([...selectedDestinations, place]);
              }
            }}
          />
          {selectedDestinations.length > 0 && (
            <LocationMap
              lat={selectedDestinations[selectedDestinations.length - 1].lat}
              lon={selectedDestinations[selectedDestinations.length - 1].lon}
              name={selectedDestinations[selectedDestinations.length - 1].display_name}
            />
          )}
          <div className="mt-4 space-y-2">
            {selectedDestinations.map((place, index) => (
              <div
                key={place.place_id}
                className="flex justify-between items-center bg-white shadow p-2 rounded"
              >
                <span>{place.display_name}</span>
                <button
                  onClick={() => {
                    const updated = selectedDestinations.filter((_, i) => i !== index);
                    setSelectedDestinations(updated);
                  }}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={nextStep}
            disabled={selectedDestinations.length === 0}
            className="mt-4 bg-fire text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block mb-2">Travel Dates:</label>
          <input
            type="date"
            value={travelDates.start}
            onChange={(e) => setTravelDates({ ...travelDates, start: e.target.value })}
            className="p-2 border rounded mr-2"
          />
          <input
            type="date"
            value={travelDates.end}
            onChange={(e) => setTravelDates({ ...travelDates, end: e.target.value })}
            className="p-2 border rounded"
          />
          <div className="mt-4 space-x-2">
            <button onClick={prevStep} className="bg-gray-300 px-3 py-1 rounded">
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!travelDates.start || !travelDates.end}
              className="bg-fire text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block mb-2">Travel Preference:</label>
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select a type...</option>
            <option>Adventure</option>
            <option>Relaxation</option>
            <option>Culture</option>
            <option>Nature</option>
          </select>

          <label className="block mb-2">Who’s going?</label>
          <select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select group type...</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="school">School Expo</option>
          </select>

          <label className="block mb-2">What’s your budget?</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select a budget...</option>
            <option value="low">Low</option>
            <option value="mid">Mid</option>
            <option value="luxury">Luxury</option>
          </select>

          <label className="block mb-2">Preferred Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
          </select>

          <div className="mt-4 space-x-2">
            <button onClick={prevStep} className="bg-gray-300 px-3 py-1 rounded">
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!preference || !groupType || !budget}
              className="bg-fire text-white px-4 py-2 rounded"
            >
              See Plan
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white rounded p-4 shadow space-y-4">
          <h3 className="text-lg font-semibold text-jungle mb-2">Trip Summary</h3>
          <ul className="list-disc list-inside">
            {selectedDestinations.map((d, i) => (
              <li key={i}><strong>Destination:</strong> {d.display_name}</li>
            ))}
          </ul>
          <p><strong>Dates:</strong> {travelDates.start} to {travelDates.end}</p>
          <p><strong>Preference:</strong> {preference}</p>
          <p><strong>Group Type:</strong> {groupType}</p>
          <p><strong>Budget Level:</strong> {budget}</p>
          <p><strong>Currency:</strong> {currency}</p>
          <p>
            <strong>Estimated Daily Budget:</strong>{" "}
            {calculateDailyBudget(groupType, budget, currency)} {currency}
          </p>

          <WeatherForecast
            lat={selectedDestinations[0]?.lat}
            lon={selectedDestinations[0]?.lon}
            start={travelDates.start}
            end={travelDates.end}
          />

          <SuggestedPlaces
            lat={selectedDestinations[0]?.lat}
            lon={selectedDestinations[0]?.lon}
            category="accommodation.hotel"
            title="Recommended Hotels"
          />
          <SuggestedPlaces
            lat={selectedDestinations[0]?.lat}
            lon={selectedDestinations[0]?.lon}
            category="catering.restaurant"
            title="Nearby Restaurants"
          />
          <SuggestedPlaces
            lat={selectedDestinations[0]?.lat}
            lon={selectedDestinations[0]?.lon}
            category="tourism.sights"
            title="Tourist Attractions"
          />

          <div>
            <h4 className="text-xl font-semibold text-fire mt-6 mb-3">📅 Daily Itinerary</h4>

            {loadingItinerary ? (
              <p className="text-sm text-gray-500">Generating your itinerary...</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {itinerary.map((day, i) => (
                  <div key={i} className="bg-white border rounded-xl shadow-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-500">{day.date}</span>
                      <span className="text-sm font-semibold text-jungle">{day.destination}</span>
                    </div>

                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏨</span>
                        <span>Stay at: <strong>{day.hotel}</strong></span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="text-lg">🎯</span>
                        <div>
                          <p>Activities:</p>
                          <ul className="list-disc list-inside ml-4">
                            {day.activities.length > 0 ? (
                              day.activities.map((activity, idx) => (
                                <li key={idx}>{activity}</li>
                              ))
                            ) : (
                              <li>Free Exploration</li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-lg">🍽️</span>
                        <span>Meal Plan: <strong>{day.meals}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setStep(1);
              setSelectedDestinations([]);
              setTravelDates({ start: "", end: "" });
              setPreference("");
              setGroupType("");
              setBudget("");
              setCurrency("USD");
              setItinerary([]);
            }}
            className="mt-4 text-sm text-fire underline"
          >
            Plan Another Trip
          </button>
        </div>
      )}
    </div>
  );
}
