import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white border border-[#d8e7e4] rounded-3xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition h-full flex flex-col">
      <div className="w-14 h-14 bg-[#e7f4f2] text-[#0f766e] rounded-2xl flex items-center justify-center font-black text-2xl mb-5">
        {service.icon || "+"}
      </div>

      <h3 className="text-xl font-black text-[#134e4a] mb-3">
        {service.title}
      </h3>

      <p className="text-slate-500 leading-7 flex-1">
        {service.shortDescription || service.description}
      </p>

      <div className="flex items-center justify-between gap-3 mt-6">
        <span className="bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
          {service.duration}
        </span>

        <Link
          to={`/hizmetler/${service.id}`}
          className="text-[#0f766e] font-black hover:text-[#134e4a]"
        >
          Detay →
        </Link>
      </div>
    </div>
  );
}