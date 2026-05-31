import { useState, useEffect } from "react";

export function useGeoLocation() {
  const [location, setLocation] = useState({});
  const [error, setError] = useState("");
  useEffect(function() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    function success(position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }
    function error(err) {
      setError(err.message);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  return { location, error };
}
