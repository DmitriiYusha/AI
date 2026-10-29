"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

// Day-based color palette (warm, easy on the eyes)
const DAY_COLORS: Record<number, string> = {
  1: "#64785d",
  2: "#8b78b8",
  3: "#d97706",
  4: "#7c3aed",
  5: "#b91c1c",
};

function PhotoTile({ photo, alt }: { photo: string; alt: string }) {
  if (photo?.startsWith("http")) {
    return (
      <img
        src={photo}
        alt={alt}
        className="h-20 w-20 object-cover rounded-xl shadow"
        loading="lazy"
      />
    );
  }
  return (
    <div className="h-20 w-20 flex items-center justify-center rounded-xl bg-primary/10 text-3xl">
      {photo}
    </div>
  );
}

interface Place {
  id: string;
  day: number;
  title: string;
  lat: number;
  lon: number;
  description: string;
  photo?: string;
  time?: string;
}

export default function TripMap({ places }: { places: Place[] }) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const dayPlaces = useMemo(() => {
    const groups: Record<number, Place[]> = {};
    for (const p of places) {
      if (!groups[p.day]) groups[p.day] = [];
      groups[p.day].push(p);
    }
    return groups;
  }, [places]);

  const days = Object.keys(dayPlaces).map((d) => Number(d));

  const getCenter = (): [number, number] => {
    if (places.length === 0) return [51.505, -0.09];
    const lats = places.map((p) => p.lat);
    const lons = places.map((p) => p.lon);
    return [average(lats), average(lons)];
  };

  const average = (arr: number[]) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
  };

  const markerIcon = (day: number) => {
    const color = DAY_COLORS[day] || "#64785d";
    const icon = new Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    return icon;
  };

  return (
    <div className="w-full h-full min-h-[420px] rounded-2xl surface border border-border">
      <MapContainer
        center={getCenter()}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={markerIcon(place.day)}
          >
            <Popup className="max-w-xs">
              <div className="flex gap-3">
                <PhotoTile photo={place.photo || "📍"} alt={place.title} />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{place.title}</p>
                  <p className="text-xs text-muted-foreground">День {place.day} · {place.time}</p>
                  {place.description && (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {place.description}
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {days.map((day) => (
          <div
            key={day}
            className="cursor-pointer px-3 py-1.5 text-sm rounded-lg"
            style={{ background: DAY_COLORS[day] + "18", color: DAY_COLORS[day] }}
            onClick={() => setSelectedDay((prev) => (prev === day ? null : day))}
          >
            День {day}
          </div>
        ))}
      </MapContainer>

      {selectedDay !== null && dayPlaces[selectedDay] && (
        <div className="px-4 pb-3 pt-2 border-t border-border">
          <h4 className="text-sm font-medium mb-2">День {selectedDay}</h4>
          <ul className="space-y-2">
            {dayPlaces[selectedDay].map((place) => (
              <li key={place.id} className="flex gap-3 items-center">
                <PhotoTile photo={place.photo || "📍"} alt={place.title} />
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{place.title}</p>
                  <p className="text-xs text-muted-foreground">{place.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
