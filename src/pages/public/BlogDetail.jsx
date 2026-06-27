import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function BlogDetail() {
  const { id } = useParams();

  const blogs = useSelector((state) => state.blogs.approvedBlogs);

  const blog = blogs.find((item) => {
    return item.id === Number(id);
  });

  const otherBlogs = blogs.filter((item) => {
    return item.id !== Number(id);
  });

  if (!blog) {
    return (
      <PageContainer>
        <PageHeader
          label="Blog"
          title="Blog yazısı bulunamadı"
          description="Aradığınız blog yazısı sistemde bulunamadı."
        />

        <Link
          to="/blog"
          className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
        >
          Blog Sayfasına Dön
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        label={blog.category}
        title={blog.title}
        description={blog.summary}
      />

      <article className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm">
        <div className="h-[420px] bg-[#e7f4f2]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 md:p-10">
          <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
            {blog.category}
          </span>

          <h1 className="text-4xl font-black text-[#134e4a] mt-5">
            {blog.title}
          </h1>

          <p className="text-slate-500 leading-8 mt-6 text-lg">
            {blog.content}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/blog"
              className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
            >
              Blog Sayfasına Dön
            </Link>

            <Link
              to="/randevu-al"
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black"
            >
              Randevu Al
            </Link>
          </div>
        </div>
      </article>

      <section className="mt-10">
        <h2 className="text-3xl font-black text-[#134e4a] mb-6">
          Diğer Yazılar
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {otherBlogs.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to={`/blog/${item.id}`}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition"
            >
              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                {item.category}
              </span>

              <h3 className="text-xl font-black text-[#134e4a] mt-4">
                {item.title}
              </h3>

              <p className="text-slate-500 mt-3 leading-7">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}