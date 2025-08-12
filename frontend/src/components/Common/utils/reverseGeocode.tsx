export async function reverseGeocode(lat:Number, lng:Number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: {
          "User-Agent": "QuickCourt-App/1.0 (your-email@example.com)",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch location");

    const data = await res.json();

    return {
      address: data.address.road || data.display_name || "",
      city: data.address.city || data.address.town || data.address.village || "",
      state: data.address.state || "",
      zip_code: data.address.postcode || "",
      full_address: data.display_name || "",
    };
  } catch (err) {
    console.error("Reverse geocoding error:", err);
    throw err;
  }
}