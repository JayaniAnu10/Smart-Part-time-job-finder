import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { NearJobResponse } from "@/pages/NearByJobPage";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  userLat: number;
  userLng: number;
  jobs: NearJobResponse[];
}

const NearbyMap = ({ userLat, userLng, jobs }: Props) => {
  return (
    <MapContainer
      center={[userLat, userLng]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User marker */}
      <Marker position={[userLat, userLng]} icon={defaultIcon}>
        <Popup>
          <div className="text-center">
            <strong>You are here</strong>
          </div>
        </Popup>
      </Marker>

      {/* Job markers */}
      {jobs.map((job) => (
        <Marker
          key={job.id}
          position={[job.latitude, job.longitude]}
          icon={redIcon}
        >
          <Popup>
            <div className="min-w-50">
              <h3 className="font-bold text-lg mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Status: <span className="font-medium">{job.status}</span>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Salary: <span className="font-medium">Rs.{job.salary}</span>
              </p>
              <button
                className="w-full font-semibold bg-yellow-400 text-[#0f1f3d] px-4 py-2 rounded hover:bg-yellow-500 cursor-pointer transition-transform duration-300"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${job.latitude},${job.longitude}`,
                    "_blank"
                  )
                }
              >
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NearbyMap;
