import { FaMapMarkerAlt, FaSpinner } from "react-icons/fa";

interface LocationFetcherProps {
  onLocationFound: (address: string) => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
  loading: boolean;
}

function LocationFetcher({
  onLocationFound,
  onError,
  onLoading,
  loading
}:LocationFetcherProps) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const handleFetchLocation = () => {
    onLoading(true);
    onError("");
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude: lat, longitude: lon } = position.coords;
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
            );
            
            if (!response.ok) throw new Error("Location fetch failed");
            
            const data = await response.json();
            
            if (data.length > 0) {
              onLocationFound(`${data[0].name}, ${data[0].state}`);
            } else {
              onError("Location not found");
            }
          } catch (err) {
            onError("Failed to fetch location data");
          } finally {
            onLoading(false);
          }
        },
        (err) => {
          console.log("Location Fetch Error: ",err)
          onError("Location access denied or unavailable");
          onLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      onError("Geolocation not supported");
      onLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={handleFetchLocation}
        disabled={loading}
        className="flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-700 disabled:opacity-50"
      >
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <FaMapMarkerAlt className="text-base" />
        )}
        {loading ? "Locating..." : "Use Current Location"}
      </button>
    </div>
  );
};

export default LocationFetcher;