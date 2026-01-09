import { useEffect, useState } from "react";
import axios from "axios";
import NearbyMap from "@/components/map/NearByMap";
import { Spinner } from "@/components/ui/spinner";

export interface NearJobResponse {
  id: string;
  title: string;
  status: string;
  salary: number;
  latitude: number;
  longitude: number;
}

const NearByJobPage = () => {
  const DEFAULT_LAT = 5.939647107591209;
  const DEFAULT_LNG = 80.57449256992793;
  const [lat, setLat] = useState<number>(DEFAULT_LAT);
  const [lng, setLng] = useState<number>(DEFAULT_LNG);
  const [jobs, setJobs] = useState<NearJobResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  {
    /*useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Location permission denied");
      }
    );
  }, []);*/
  }

  useEffect(() => {
    if (lat && lng) {
      setLoading(true);
      setError(null);

      axios
        .get<NearJobResponse>("http://localhost:8080/jobs/nearby", {
          params: {
            latitude: lat,
            longitude: lng,
            radius: 10,
          },
        })
        .then((res) => {
          setJobs(Array.isArray(res.data) ? res.data : []);
        })
        .catch(() => {
          setError("Failed to fetch nearby jobs");
          setJobs([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [lat, lng]);

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!lat || !lng) {
    return (
      <div className="p-4 mt-25">
        <p className="text-[#0f1f3d] dark:text-white">
          Getting your location...
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner className=" mt-60" />
      </div>
    );
  }

  return (
    <div className="p-4 mt-25 mx-9 flex flex-col gap-3">
      <div>
        <span className="text-5xl font-bold  dark:text-white  text-secondary">
          Find{" "}
        </span>
        <span className="text-5xl font-bold  text-yellow-400">Nearby Jobs</span>
      </div>
      <p className="text-xl mb-2 text-muted-foreground/90">
        Discover day job opportunities near you on the map
      </p>
      <p className="mb-4 text-secondary/90 dark:text-white font-semibold ">
        Found {jobs.length} jobs near you
      </p>
      <NearbyMap userLat={lat} userLng={lng} jobs={jobs} />
    </div>
  );
};

export default NearByJobPage;
