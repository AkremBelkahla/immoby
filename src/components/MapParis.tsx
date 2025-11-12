import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix pour les icônes Leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export function MapParis() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Coordonnées de Paris
    const position: L.LatLngExpression = [48.8566, 2.3522];

    // Créer la carte
    const map = L.map(mapRef.current).setView(position, 13);
    mapInstanceRef.current = map;

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Ajouter un marqueur
    const marker = L.marker(position).addTo(map);
    marker.bindPopup(`
      <strong>Immoby</strong><br/>
      123 Avenue des Champs-Élysées<br/>
      75008 Paris, France
    `);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg border">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
