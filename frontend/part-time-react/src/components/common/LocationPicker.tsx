import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { redIcon } from "../map/NearByMap";

type Props = {
  onSelect: (value: {
    latitude: number;
    longitude: number;
    label: string;
  }) => void;
};

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.setView([lat, lng], map.getZoom(), { animate: true });
  return null;
}

export default function LocationPicker({ onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState<number>(6.9271);
  const [lng, setLng] = useState<number>(79.8612);

  const searchLocation = async () => {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        search
      )}`
    );
    const data = res.data;
    if (!data.length) return;

    const newLat = parseFloat(data[0].lat);
    const newLng = parseFloat(data[0].lon);

    setLat(newLat);
    setLng(newLng);

    onSelect({
      latitude: newLat,
      longitude: newLng,
      label: data[0].display_name,
    });
  };

  function DragHandler() {
    useMapEvents({
      dragend(e) {
        const { lat, lng } = e.target.getCenter();
        setLat(lat);
        setLng(lng);
        onSelect({ latitude: lat, longitude: lng, label: search });
      },
    });
    return null;
  }

  return (
    <div className="space-y-3 flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search place or address"
        />
        <button
          type="button"
          className="border px-3 rounded-lg hover:bg-[#0f1f3d]  hover:text-white transition-transform duration-300 text-[#0f1f3d] dark:text-white font-medium cursor-pointer text-sm"
          onClick={searchLocation}
        >
          Search
        </button>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={14}
        style={{ height: 400, width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker icon={redIcon} position={[lat, lng]} draggable />
        <DragHandler />
        <RecenterMap lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
}
