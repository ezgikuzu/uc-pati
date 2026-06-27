import { Link } from "react-router-dom";

export default function VetCard({ vet }) {
  return (
    <Link
      to={`/veterinerlerimiz/${vet.id}`}
      className="group bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col"
    >
      <div className="relative h-[330px] overflow-hidden bg-[#e7f4f2]">
        <img
          src={vet.image}
          alt={vet.name}
          style={{ objectPosition: vet.position || "center" }}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#134e4a]/85 via-[#134e4a]/25 to-transparent"></div>

        <div className="absolute left-5 right-5 bottom-5">
          <div className="h-[34px] flex items-center">
            <span className="inline-flex bg-white text-[#0f766e] px-4 py-2 rounded-full text-xs font-black shadow-sm">
              {vet.field}
            </span>
          </div>

          <h3 className="text-2xl font-black text-white mt-3 leading-tight h-[64px] flex items-end">
            {vet.name}
          </h3>

          <p className="text-white/85 font-semibold mt-1 h-[24px]">
            Deneyim: {vet.experience}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-slate-500 leading-7 h-[84px] overflow-hidden">
          {vet.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
            Uygun hekim
          </span>

          <span className="text-[#0f766e] font-black group-hover:text-[#134e4a]">
            Detay →
          </span>
        </div>
      </div>
    </Link>
  );
}