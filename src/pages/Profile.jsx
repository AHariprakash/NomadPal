import { useState, useEffect } from "react";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [trips, setTrips] = useState([]);
  const [profile, setProfile] = useState({
    name: "Hari Prakash",
    email: "hari@example.com",
    phone: "+91-9876543210",
    currency: "USD",
    groupType: "Friends",
    travelStyle: "Adventure",
  });

  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    const savedTrips = JSON.parse(localStorage.getItem("pastTrips") || "[]");
    const savedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

    if (savedPic) setProfilePic(savedPic);
    if (savedTrips) setTrips(savedTrips);
    if (Object.keys(savedProfile).length > 0) setProfile(savedProfile);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    localStorage.setItem("userProfile", JSON.stringify(profile));
  };

  const handleReplan = (trip) => {
    localStorage.setItem("replanTrip", JSON.stringify(trip));
    window.location.href = "/planner";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-fire">👤 User Profile</h1>

      {/* Avatar + Basic Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow">
        <div className="text-center relative">
          <div className="relative group w-24 h-24 mx-auto">
            <img
              src={profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border shadow object-cover"
            />
            {profilePic && (
              <button
                title="Remove"
                onClick={() => {
                  setProfilePic(null);
                  localStorage.removeItem("profilePic");
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>

          <label className="block mt-3 text-sm text-fire font-medium cursor-pointer">
            <span className="underline">Change Avatar</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editing}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editing}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      {/* Travel Preferences */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold text-jungle">🌍 Travel Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Preferred Currency</label>
            <select
              name="currency"
              value={profile.currency}
              onChange={handleChange}
              disabled={!editing}
              className="border p-2 rounded w-full"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Group Type</label>
            <select
              name="groupType"
              value={profile.groupType}
              onChange={handleChange}
              disabled={!editing}
              className="border p-2 rounded w-full"
            >
              <option value="Couple">Couple</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="School">School Expo</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Travel Style</label>
            <select
              name="travelStyle"
              value={profile.travelStyle}
              onChange={handleChange}
              disabled={!editing}
              className="border p-2 rounded w-full"
            >
              <option value="Adventure">Adventure</option>
              <option value="Relaxation">Relaxation</option>
              <option value="Culture">Culture</option>
              <option value="Nature">Nature</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          {editing ? (
            <>
              <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-fire text-white rounded">
                Save
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="px-4 py-2 bg-fire text-white rounded">
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Past Trips */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold text-jungle">🧳 Past Trips</h2>
        {trips.length ? (
          <ul className="space-y-4">
            {trips.map((trip, i) => (
              <li key={i} className="p-4 bg-sand rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{trip.destinations?.join(", ")}</p>
                  <p className="text-sm text-gray-600">
                    {trip.start} to {trip.end} · {trip.groupType}
                  </p>
                </div>
                <button
                  className="bg-fire text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleReplan(trip)}
                >
                  Re-plan
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No trips saved yet.</p>
        )}
      </div>
    </div>
  );
}
