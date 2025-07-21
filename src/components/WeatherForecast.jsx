import { useEffect, useState } from "react";

export default function WeatherForecast({ lat, lon, start, end }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon || !start || !end) return;

    setLoading(true);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&start_date=${start}&end_date=${end}&timezone=auto`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setForecast(data.daily || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Weather error:", err);
        setLoading(false);
      });
  }, [lat, lon, start, end]);

  if (loading) return <p className="text-sm text-gray-600">Loading weather...</p>;

  if (!forecast.time) return <p className="text-sm text-red-500">No weather data available.</p>;

  return (
    <div className="mt-4 bg-white rounded p-4 shadow">
      <h4 className="text-lg font-semibold mb-2 text-jungle">Weather Forecast</h4>
      <ul className="space-y-2">
        {forecast.time.map((date, i) => (
          <li key={i} className="flex justify-between border-b pb-1">
            <span>{date}</span>
            <span>{forecast.temperature_2m_min[i]}°C - {forecast.temperature_2m_max[i]}°C</span>
            <span>{forecast.precipitation_sum[i]}mm</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
