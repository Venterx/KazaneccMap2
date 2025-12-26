import { useEffect } from "react";
import { useMap } from "react-leaflet";

const ForceBounds = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const kazanBounds = [
      [55.7, 48.95], // Юго-запад
      [55.9, 49.3], // Северо-восток
    ];

    const bounds = L.latLngBounds(kazanBounds);

    const checkBounds = () => {
      const center = map.getCenter();

      if (!bounds.contains(center)) {
        const clampedLat = Math.max(
          bounds.getSouth(),
          Math.min(bounds.getNorth(), center.lat)
        );
        const clampedLng = Math.max(
          bounds.getWest(),
          Math.min(bounds.getEast(), center.lng)
        );

        map.panTo([clampedLat, clampedLng], {
          animate: true,
          duration: 0.5,
        });
      }
    };

    map.setMaxBounds(bounds);

    map.on("move", checkBounds);
    map.on("zoom", checkBounds);

    checkBounds();

    return () => {
      map.off("move", checkBounds);
      map.off("zoom", checkBounds);
    };
  }, [map]);

  return null;
};

export default ForceBounds;
