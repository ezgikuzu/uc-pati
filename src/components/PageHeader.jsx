export default function PageHeader({ label, title, description }) {
  return (
    <section className="mb-8">
      <div className="rounded-3xl bg-white border border-[#d8e7e4] p-8 md:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-56 h-56 bg-[#0f766e]/10 rounded-full blur-3xl"></div>

        {label && (
          <span className="relative inline-flex items-center rounded-full bg-[#e7f4f2] px-4 py-2 text-sm font-black text-[#0f766e] mb-5">
            {label}
          </span>
        )}

        <h1 className="relative text-3xl md:text-5xl font-black tracking-tight text-[#134e4a]">
          {title}
        </h1>

        {description && (
          <p className="relative mt-4 max-w-2xl text-slate-500 leading-7">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}