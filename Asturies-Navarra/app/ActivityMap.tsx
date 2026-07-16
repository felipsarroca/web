"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";

type MapActivity = {
  id: string; name: string; block: string; drive: string; duration: string; appeal: string;
  type: string; role: "àncora" | "complement"; locationPrecision: string | null;
  latitude: number | null; longitude: number | null;
};

type MarkerGroup = { key: string; latitude: number; longitude: number; activities: MapActivity[]; approximate: boolean };

function FitActivities({ groups }: { groups: MarkerGroup[] }) {
  const map = useMap();
  useEffect(() => {
    const points = groups.map((group) => [group.latitude, group.longitude] as [number, number]);
    if (points.length) map.fitBounds(latLngBounds(points), { padding: [32, 32], maxZoom: 12 });
  }, [groups, map]);
  return null;
}

export default function ActivityMap({ activities, region, onSelect }: { activities: MapActivity[]; region: "Astúries" | "Navarra"; onSelect: (id: string) => void }) {
  const [type, setType] = useState("Tots");
  const [anchorsOnly, setAnchorsOnly] = useState(false);
  const types = useMemo(() => ["Tots", ...Array.from(new Set(activities.map((item) => item.type))).sort()], [activities]);
  const filtered = useMemo(() => activities.filter((item) => (type === "Tots" || item.type === type) && (!anchorsOnly || item.role === "àncora") && item.latitude != null && item.longitude != null), [activities, type, anchorsOnly]);
  const groups = useMemo(() => {
    const grouped = new Map<string, MarkerGroup>();
    for (const activity of filtered) {
      const approximate = activity.locationPrecision === "clúster aproximat";
      const key = approximate ? activity.block : `${activity.latitude!.toFixed(4)}:${activity.longitude!.toFixed(4)}`;
      const current = grouped.get(key) ?? { key, latitude: activity.latitude!, longitude: activity.longitude!, activities: [], approximate };
      current.activities.push(activity);
      grouped.set(key, current);
    }
    return [...grouped.values()];
  }, [filtered]);
  const center: [number, number] = region === "Astúries" ? [43.36, -5.55] : [43.12, -1.57];
  const base = region === "Astúries"
    ? { name: "Casa de Villaviciosa", position: [43.4814, -5.4357] as [number, number] }
    : { name: "Casa d’Azpilkueta", position: [43.2004, -1.4809] as [number, number] };

  return <div className="map-shell">
    <div className="map-toolbar">
      <label>Tipus<select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="map-check"><input type="checkbox" checked={anchorsOnly} onChange={(event) => setAnchorsOnly(event.target.checked)}/> Només àncores</label>
      <span><b>{filtered.length}</b> propostes · <b>{groups.length}</b> punts</span>
    </div>
    <div className="map-frame">
      <MapContainer center={center} zoom={9} scrollWheelZoom className="activity-map">
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        <FitActivities groups={groups}/>
        <CircleMarker center={base.position} radius={11} pathOptions={{ color: "#17324b", weight: 3, fillColor: "#f2b632", fillOpacity: 1 }}>
          <Popup><div className="base-popup"><b>⌂ {base.name}</b><small>Punt d’origen dels trajectes</small></div></Popup>
        </CircleMarker>
        {groups.map((group) => <CircleMarker key={group.key} center={[group.latitude, group.longitude]} radius={Math.min(9 + Math.sqrt(group.activities.length) * 3, 23)} pathOptions={{ color: "#fff", weight: 2, fillColor: group.approximate ? "#d4a24c" : region === "Astúries" ? "#176b87" : "#b85c3d", fillOpacity: .92 }}>
          <Popup maxWidth={330}>
            <div className="map-popup-head"><strong>{group.approximate ? `Clúster ${group.activities[0].block}` : group.activities[0].name}</strong><span>{group.approximate ? `${group.activities.length} propostes amb ubicació aproximada` : "Ubicació geocodificada"}</span></div>
            <div className="map-popup-list">{group.activities.map((activity) => <button type="button" key={activity.id} onClick={() => onSelect(activity.id)}><b>{activity.name}</b><small>{activity.type} · {activity.drive} · {activity.duration}</small></button>)}</div>
          </Popup>
        </CircleMarker>)}
      </MapContainer>
      <div className="map-legend"><span><i className="home">⌂</i>Punt d’origen</span><span><i className={region === "Astúries" ? "exact asturies" : "exact navarra"}></i>Ubicació geocodificada</span><span><i className="approximate"></i>Centre aproximat del clúster</span><span>La mida indica quantes propostes comparteixen el punt</span></div>
      <p className="map-caption">Les ubicacions aproximades s’utilitzen només quan una activitat no té un punt físic únic o encara necessita verificació manual.</p>
    </div>
  </div>;
}
