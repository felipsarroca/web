"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";

type MapActivity = {
  id: string;
  name: string;
  block: string;
  drive: string;
  duration: string;
  appeal: string;
  latitude: number | null;
  longitude: number | null;
};

function FitActivities({ activities }: { activities: MapActivity[] }) {
  const map = useMap();
  useEffect(() => {
    const points = activities
      .filter((item) => item.latitude != null && item.longitude != null)
      .map((item) => [item.latitude!, item.longitude!] as [number, number]);
    if (points.length) map.fitBounds(latLngBounds(points), { padding: [28, 28], maxZoom: 12 });
  }, [activities, map]);
  return null;
}

export default function ActivityMap({ activities, region, onSelect }: { activities: MapActivity[]; region: "Astúries" | "Navarra"; onSelect: (id: string) => void }) {
  const located = activities.filter((item) => item.latitude != null && item.longitude != null);
  const center: [number, number] = region === "Astúries" ? [43.36, -5.55] : [43.12, -1.57];
  return (
    <div className="map-frame">
      <MapContainer center={center} zoom={9} scrollWheelZoom className="activity-map">
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FitActivities activities={located} />
        {located.map((activity) => (
          <CircleMarker
            key={activity.id}
            center={[activity.latitude!, activity.longitude!]}
            radius={7}
            pathOptions={{ color: "#fff", weight: 2, fillColor: region === "Astúries" ? "#176b87" : "#b85c3d", fillOpacity: 0.95 }}
          >
            <Popup>
              <strong>{activity.name}</strong>
              <span>{activity.block} · {activity.drive} · {activity.duration}</span>
              <p>{activity.appeal}</p>
              <button type="button" onClick={() => onSelect(activity.id)}>Obre la fitxa</button>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <p className="map-caption">{located.length} indrets ubicats · Les coordenades són orientatives: comprova l’accés i l’aparcament abans de sortir.</p>
    </div>
  );
}
