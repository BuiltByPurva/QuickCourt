import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LeafletEventHandlerFnMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Upload, DollarSign, TennisBall, Soccer, Basketball } from "lucide-react";
import { reverseGeocode } from "./utils/reverseGeocode.tsx";

interface Venue {
  id: string | number;
  name?: string;
  description?: string;
  image?: string;
  lat?: number;
  lng?: number;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  full_address?: string;
  sports?: string[];
}

interface LocationCardProps {
  venue: Venue;
  onLocationChange: (location: any) => void;
  onImageUpload: (venueId: string | number, file: File) => void;
}

const forwardGeocode = async (address: string) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(address)}`,
      {
        headers: {
          "User-Agent": "QuickCourt-App/1.0 (your-real-email@example.com)",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch coordinates");

    const data = await res.json();
    if (data.length === 0) throw new Error("No results found for address");

    const { lat, lon } = data[0];
    return {
      lat: parseFloat(lat),
      lng: parseFloat(lon),
      ...await reverseGeocode(parseFloat(lat), parseFloat(lon)),
    };
  } catch (err) {
    console.error("Forward geocoding error:", err);
    throw err;
  }
};

// Sport Icon mapping
const getSportIcon = (sport: string) => {
  const iconClass = "w-5 h-5 text-emerald-600";
  switch (sport.toLowerCase()) {
    case "tennis":
      return <TennisBall className={iconClass} />;
    case "soccer":
      return <Soccer className={iconClass} />;
    case "basketball":
      return <Basketball className={iconClass} />;
    default:
      return <MapPin className={iconClass} />;
  }
};

const LocationCard = ({ venue, onLocationChange, onImageUpload }: LocationCardProps) => {
  const [location, setLocation] = useState({
    lat: venue.lat || 51.505,
    lng: venue.lng || -0.09,
    address: venue.address || "Select a location",
    city: venue.city || "",
    state: venue.state || "",
    zip_code: venue.zip_code || "",
    full_address: venue.full_address || "",
  });
  const [addressInput, setAddressInput] = useState(location.full_address);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    setAddressInput(location.full_address);
  }, [location.full_address]);

  const handleMarkerMove = async (newPos: { lat: number; lng: number }) => {
    setLoading(true);
    setError("");
    try {
      const locationData = await reverseGeocode(newPos.lat, newPos.lng);
      const newLocation = { ...newPos, ...locationData };
      setLocation(newLocation);
      setAddressInput(newLocation.full_address);
      onLocationChange(newLocation);
    } catch {
      setError("Failed to fetch address");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressBlur = async () => {
    if (!addressInput) {
      setError("Address cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const locationData = await forwardGeocode(addressInput);
      setLocation(locationData);
      onLocationChange(locationData);
    } catch {
      setError("Invalid address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Image Section */}
      <div className="relative mb-4">
        <img
          src={venue.image || "https://via.placeholder.com/300x200"}
          alt={venue.name || "Venue"}
          className="w-full h-48 object-cover rounded-lg"
        />
        <label className="absolute top-2 right-2 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                onImageUpload(venue.id, e.target.files[0]);
              }
            }}
          />
          <div className="bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition-colors">
            <Upload className="w-5 h-5 text-white" />
          </div>
        </label>
      </div>

      {/* Venue Details */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {venue.name || "Venue Name"}
      </h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {venue.description || "Experience world-class sports facilities in a premium location."}
      </p>

      {/* Address Section */}
      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg mb-4">
        <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">Address</h3>
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onBlur={handleAddressBlur}
            placeholder="Enter or select an address"
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              loading ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      </div>

      {/* Map Section */}
      <div className="space-y-2 mb-4">
        <h3 className="text-sm font-medium text-gray-900">Select Location</h3>
        <div className="h-64 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker
              position={[location.lat, location.lng]}
              icon={customIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  handleMarkerMove({ lat, lng });
                },
              } as LeafletEventHandlerFnMap}
            >
              <Popup>Drag to adjust location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Sports Available */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900">Sports Available</h3>
        {venue.sports?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {venue.sports.map((sport, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                {getSportIcon(sport)}
                <span className="text-sm text-emerald-800 font-medium">{sport}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No sports specified</p>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
