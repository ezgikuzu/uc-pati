import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group bg-white border border-[#d8e7e4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col"
    >
      <div className="h-[220px] bg-[#e7f4f2] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 mb-5">
          <span className="text-sm bg-[#e7f4f2] text-[#0f766e] px-3 py-1 rounded-full font-black">
            {blog.category}
          </span>

          <span className="text-xs text-slate-400 font-bold">
            {blog.readTime}
          </span>
        </div>

        <h3 className="text-xl font-black text-[#134e4a] min-h-[56px]">
          {blog.title}
        </h3>

        <p className="text-slate-500 mt-3 leading-7 flex-1">
          {blog.description}
        </p>

        <span className="mt-5 text-[#0f766e] font-black group-hover:text-[#134e4a]">
          Devamını Oku →
        </span>
      </div>
    </Link>
  );
}