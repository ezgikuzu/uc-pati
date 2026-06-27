import { Link } from "react-router-dom";
import { blogs, heroData, products, services, veterinarians } from "../../data/data";
import PageContainer from "../../components/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <section className="grid lg:grid-cols-2 gap-8 items-stretch mb-14">
  <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-8 md:p-10 shadow-sm min-h-[560px] flex flex-col justify-center">
    <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black mb-6 w-fit">
      {heroData.label}
    </span>

    <h1 className="text-4xl md:text-5xl font-black text-[#134e4a] leading-tight max-w-xl">
      {heroData.title}
    </h1>

    <p className="text-slate-500 leading-8 mt-6 max-w-xl">
      {heroData.description}
    </p>

    <div className="flex flex-wrap gap-4 mt-8">
      <Link
        to="/randevu-al"
        className="bg-[#0f766e] text-white px-7 py-4 rounded-full font-black hover:bg-[#134e4a] transition"
      >
        Randevu Al
      </Link>

      <Link
        to="/hizmetler"
        className="bg-[#e7f4f2] text-[#0f766e] px-7 py-4 rounded-full font-black hover:bg-[#d8e7e4] transition"
      >
        Hizmetleri İncele
      </Link>
    </div>

    <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
      <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
        <h3 className="text-3xl font-black text-[#0f766e]">6+</h3>
        <p className="text-slate-500 font-bold mt-1">Hizmet</p>
      </div>

      <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
        <h3 className="text-3xl font-black text-[#0f766e]">3</h3>
        <p className="text-slate-500 font-bold mt-1">Veteriner Hekim</p>
      </div>

      <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
        <h3 className="text-3xl font-black text-[#0f766e]">24/7</h3>
        <p className="text-slate-500 font-bold mt-1">Dijital Takip</p>
      </div>
    </div>
  </div>

  <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-4 shadow-sm min-h-[560px]">
    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-[#e7f4f2]">
      <img
        src={heroData.image}
        alt="Üç Pati ekibi"
        className="w-full h-full object-cover object-center"
      />
    </div>
  </div>
</section>

      <section className="mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-[#0f766e] font-black mb-2">Hızlı İşlemler</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#134e4a]">
              Sık kullanılan alanlar
            </h2>
          </div>

          <Link
            to="/randevu-al"
            className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black w-fit"
          >
            Randevu Oluştur
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Link
            to="/evcil-hayvanlarim"
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">🐾</div>
            <h3 className="text-xl font-black text-[#134e4a]">
              Evcil Hayvanlarım
            </h3>
            <p className="text-slate-500 mt-3 leading-7">
              Evcil dostlarınızı ekleyin ve kayıtlarını yönetin.
            </p>
          </Link>

          <Link
            to="/hayvan-pasaportu"
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">📘</div>
            <h3 className="text-xl font-black text-[#134e4a]">
              Hayvan Pasaportu
            </h3>
            <p className="text-slate-500 mt-3 leading-7">
              Kimlik, mikroçip ve aşı bilgilerini görüntüleyin.
            </p>
          </Link>

          <Link
            to="/laboratuvar-sonuclari"
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">🧪</div>
            <h3 className="text-xl font-black text-[#134e4a]">
              Laboratuvar Sonuçları
            </h3>
            <p className="text-slate-500 mt-3 leading-7">
              Admin onaylı test sonuçlarını inceleyin.
            </p>
          </Link>

          <Link
            to="/pet-shop"
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-black text-[#134e4a]">Pet Shop</h3>
            <p className="text-slate-500 mt-3 leading-7">
              Onaylı ürünleri inceleyin ve sepete ekleyin.
            </p>
          </Link>
        </div>
      </section>

      <section className="mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-[#0f766e] font-black mb-2">Hizmetlerimiz</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#134e4a]">
              Veteriner hizmetleri
            </h2>
          </div>

          <Link
            to="/hizmetler"
            className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black w-fit"
          >
            Tüm Hizmetler
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <Link
              key={service.id}
              to={`/hizmetler/${service.id}`}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>

              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                {service.category}
              </span>

              <h3 className="text-2xl font-black text-[#134e4a] mt-4">
                {service.title}
              </h3>

              <p className="text-slate-500 leading-7 mt-3">
                {service.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-[#0f766e] font-black mb-2">Veterinerlerimiz</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#134e4a]">
              Uzman hekim kadromuz
            </h2>
          </div>

          <Link
            to="/veterinerlerimiz"
            className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black w-fit"
          >
            Tüm Hekimler
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {veterinarians.map((vet) => (
            <Link
              key={vet.id}
              to={`/veterinerlerimiz/${vet.id}`}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="h-64 bg-[#e7f4f2]">
                <img
                  src={vet.image}
                  alt={vet.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6">
                <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                  {vet.experience}
                </span>

                <h3 className="text-xl font-black text-[#134e4a] mt-4">
                  {vet.name}
                </h3>

                <p className="text-slate-500 mt-2">{vet.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-[#0f766e] font-black mb-2">Pet Shop</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#134e4a]">
              Öne çıkan ürünler
            </h2>
          </div>

          <Link
            to="/pet-shop"
            className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black w-fit"
          >
            Mağazaya Git
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              to={`/pet-shop/${product.id}`}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="h-52 bg-[#e7f4f2]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6">
                <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                  {product.category}
                </span>

                <h3 className="text-xl font-black text-[#134e4a] mt-4">
                  {product.name}
                </h3>

                <p className="text-2xl font-black text-[#0f766e] mt-3">
                  {product.price} TL
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-[#0f766e] font-black mb-2">Blog</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#134e4a]">
              Bilgilendirici yazılar
            </h2>
          </div>

          <Link
            to="/blog"
            className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black w-fit"
          >
            Tüm Yazılar
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="h-56 bg-[#e7f4f2]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6">
                <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                  {blog.category}
                </span>

                <h3 className="text-xl font-black text-[#134e4a] mt-4">
                  {blog.title}
                </h3>

                <p className="text-slate-500 leading-7 mt-3">
                  {blog.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}