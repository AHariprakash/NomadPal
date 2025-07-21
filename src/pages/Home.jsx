import { useNavigate } from "react-router-dom";
import { Sparkles, MapPin, CalendarDays, Landmark } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-start px-4 py-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-fire mb-2">Welcome to NomadPal</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Your tribal-style smart assistant to help you plan unforgettable journeys with live insights and personalized recommendations.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
        <FeatureCard
          icon={<Sparkles className="text-fire" />}
          title="Smart Itinerary Generator"
          desc="Get day-wise travel plans with weather, activities, meals and hotel recommendations."
        />
        <FeatureCard
          icon={<CalendarDays className="text-jungle" />}
          title="Weather-Aware Planning"
          desc="We fetch real-time forecasts to optimize your trip days based on climate."
        />
        <FeatureCard
          icon={<Landmark className="text-orange-600" />}
          title="Live Hotels, Attractions & Food"
          desc="We fetch actual open spots from Geoapify near your destinations."
        />
        <FeatureCard
          icon={<MapPin className="text-indigo-500" />}
          title="Mapped Destinations"
          desc="Every location added appears on a map, with location-aware suggestions."
        />
      </section>

      <button
        className="text-white bg-fire hover:bg-red-600 px-6 py-3 text-lg rounded-xl shadow-md"
        onClick={() => navigate("/planner")}
      >
        Start Planning Your Trip
      </button>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-start gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg text-jungle">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  );
}
