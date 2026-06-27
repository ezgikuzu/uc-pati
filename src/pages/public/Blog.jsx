import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Blog() {
  const blogs = useSelector((state) => state.blogs.approvedBlogs);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  const categories = ["Tümü", ...new Set(blogs.map((blog) => blog.category))];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.summary.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Tümü" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, selectedCategory]);

  return (
    <PageContainer>
      <PageHeader
        label="Blog"
        title="Veteriner hekimlerden bilgilendirici yazılar"
        description="Evcil hayvan sağlığı, bakım, beslenme ve laboratuvar sonuçları hakkında blog yazılarını inceleyebilirsiniz."
      />

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm mb-8">
        <div className="grid md:grid-cols-[1fr_auto] gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Blog yazısı ara..."
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.id}`}
            className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition block"
          >
            <div className="h-64 bg-[#e7f4f2]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-7">
              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                {blog.category}
              </span>

              <h3 className="text-2xl font-black text-[#134e4a] mt-4">
                {blog.title}
              </h3>

              <p className="text-slate-500 leading-7 mt-3 min-h-[84px]">
                {blog.summary}
              </p>

              <span className="inline-flex bg-[#0f766e] text-white px-5 py-3 rounded-full font-black mt-5">
                Yazıyı Oku →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {filteredBlogs.length === 0 && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">📚</div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Blog yazısı bulunamadı
          </h2>

          <p className="text-slate-500 mt-3">
            Arama kriterlerini değiştirerek tekrar deneyebilirsiniz.
          </p>
        </div>
      )}
    </PageContainer>
  );
}