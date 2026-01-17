import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";

type Job = {
  title: string;
  companyName?: string;   
  location?: string;
  salary?: string;
  time?: string;
  applicants?: number | string;
  postedDate?: string;     
  description?: string;
  requirements?: string[] | string;
  benefits?: string[] | string;
};

type Props = {
  job: Job;
};


function renderList(
  data?: string[] | string,
  emptyText = "No data provided"
) {
  if (!data) {
    return <p className="text-gray-500 italic">{emptyText}</p>;
  }

  if (Array.isArray(data) && data.length > 0) {
    return (
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  if (typeof data === "string" && data.trim().length > 0) {
    return (
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
        {data}
      </p>
    );
  }

  return <p className="text-gray-500 italic">{emptyText}</p>;
}

/* ================= MAIN COMPONENT ================= */
export default function JobDetailsView({ job }: Props) {
  return (
    <div className="p-8 space-y-10">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
          {job.title}
        </h1>

        {job.companyName && (
          <p className="text-blue-600 font-semibold text-lg">
            {job.companyName}
          </p>
        )}
      </div>

      {/* ================= META INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 border-t pt-6">
        {job.location && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="text-yellow-500" />
            {job.location}
          </div>
        )}

        {job.salary && (
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
            <DollarSign className="text-yellow-500" />
            {job.salary}
          </div>
        )}

        {job.time && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock className="text-yellow-500" />
            {job.time}
          </div>
        )}

        {job.applicants !== undefined && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Users className="text-yellow-500" />
            {job.applicants} Applicants
          </div>
        )}

        {job.postedDate && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar className="text-yellow-500" />
            Posted on{" "}
            {new Date(job.postedDate).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* ================= DESCRIPTION ================= */}
      {job.description && (
        <section>
          <h3 className="text-lg font-bold mb-3 border-l-4 border-yellow-500 pl-3">
            Job Description
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </section>
      )}

      {/* ================= REQUIREMENTS ================= */}
      <section>
        <h3 className="text-lg font-bold mb-3 border-l-4 border-yellow-500 pl-3">
          Requirements
        </h3>
        {renderList(job.requirements, "No requirements provided")}
      </section>

      {/* ================= BENEFITS ================= */}
      <section>
        <h3 className="text-lg font-bold mb-3 border-l-4 border-yellow-500 pl-3">
          Benefits
        </h3>
        {renderList(job.benefits, "No benefits provided")}
      </section>
    </div>
  );
}
