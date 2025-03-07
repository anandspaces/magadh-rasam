import { useState } from "react";

const API_KEY = "887804b857df80c908527bf9fb877df9"; // Replace with your API key

const LocationFetcher: React.FC = () => {
  const [location, setLocation] = useState<{ city: string; state: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await fetch(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
            );
            const data = await response.json();
            console.log("data",data)
            if (data.length > 0) {
              setLocation({
                city: data[0].name,
                state: data[0].state,
              });
              setError(null);
            } else {
              setError("Location not found.");
            }
          } catch (err) {
            setError("Failed to fetch location data.");
          }
        },
        (err) => {
          setError("GPS location access denied or unavailable.");
          console.error("GPS Error:", err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by your device.");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Fetch Your Location</h2>
      <button
        onClick={fetchLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Get Location
      </button>

      {location && (
        <div className="mt-4 text-gray-700">
          <p><strong>Location:</strong> {location.city} ({location.state})</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LocationFetcher;
