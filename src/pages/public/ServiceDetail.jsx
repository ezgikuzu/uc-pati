import { Link, useParams } from "react-router-dom";
import { services } from "../../data/data";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function ServiceDetail() {
  const { id } = useParams();

  const service = services.find((item) => item.id === Number(id));

  if (!service) {
    return (
      <PageContainer>
        <PageHeader
          label="Hizmet Detayı"
          title="Hizmet bulunamadı"
          description="Aradığınız hizmet sistemde bulunamadı."
        />

        <Link
          to="/hizmetler"
          className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
        >
          Hizmetlere Dön
        </Link>
      </PageContainer>
    );
  }

  const otherServices = services.filter((item) => item.id !== service.id);

  return (
    <PageContainer>
      <PageHeader
        label={service.category}
        title={service.title}
        description={service.shortDescription}
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center text-5xl">
            {service.icon}
          </div>

          <h2 className="relative text-5xl font-black mt-6 leading-tight">
            {service.title}
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            {service.description}
          </p>

          <div className="relative grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <p className="text-white/60 text-sm">Kategori</p>
              <h3 className="text-xl font-black mt-1">
                {service.category}
              </h3>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <p className="text-white/60 text-sm">Ücret</p>
              <h3 className="text-xl font-black mt-1">
                {service.price} TL
              </h3>
            </div>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              to={`/randevu-al?service=${encodeURIComponent(service.title)}`}
              className="bg-white text-[#0f766e] px-6 py-3 rounded-full font-black text-center"
            >
              Bu Hizmet İçin Randevu Al
            </Link>

            <Link
              to="/hizmetler"
              className="bg-white/15 text-white px-6 py-3 rounded-full font-black text-center"
            >
              Hizmetlere Dön
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-3xl font-black text-[#134e4a]">
              Hizmet Açıklaması
            </h3>

            <p className="text-slate-500 leading-8 mt-4">
              {service.detail}
            </p>

            <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 mt-6">
              <h4 className="font-black text-[#134e4a]">
                Bilgilendirme
              </h4>

              <p className="text-slate-500 leading-7 mt-2">
                Bu proje örnek amaçlıdır. Hizmet ücretleri ve açıklamaları demo
                veridir. Gerçek veteriner hizmetleri için klinik bilgisi esas
                alınmalıdır.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-3xl font-black text-[#134e4a]">
              Diğer Hizmetler
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              {otherServices.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  to={`/hizmetler/${item.id}`}
                  className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 hover:bg-[#e7f4f2] transition"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>

                  <h4 className="font-black text-[#134e4a]">
                    {item.title}
                  </h4>

                  <p className="text-[#0f766e] font-black mt-2">
                    {item.price} TL
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}