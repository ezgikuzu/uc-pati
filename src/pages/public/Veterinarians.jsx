import { Link } from "react-router-dom";
import { veterinarians } from "../../data/data";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Veterinarians() {
  return (
    <PageContainer>
      <PageHeader
        label="Veterinerlerimiz"
        title="Uzman veteriner hekim ekibimiz"
        description="Evcil dostlarınızın sağlık takibi için görev alan veteriner hekimleri buradan inceleyebilirsiniz."
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-8">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🩺 Üç Pati Hekimleri
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Her hasta için doğru takip, doğru hekimle başlar.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Hekimlerimiz genel muayene, laboratuvar değerlendirme, koruyucu
            hekimlik ve küçük dostların sağlık takibi gibi farklı alanlarda
            görev alır.
          </p>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-3xl font-black text-[#134e4a]">
            Hekim Seçimi
          </h3>

          <p className="text-slate-500 leading-8 mt-4">
            Veteriner detay sayfasından hekimin uzmanlık alanlarını ve uygun
            günlerini görebilir, doğrudan randevu sayfasına geçebilirsiniz.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
              <h4 className="text-3xl font-black text-[#0f766e]">
                {veterinarians.length}
              </h4>
              <p className="text-slate-500 font-bold mt-1">Hekim</p>
            </div>

            <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
              <h4 className="text-3xl font-black text-[#0f766e]">3+</h4>
              <p className="text-slate-500 font-bold mt-1">Uzmanlık</p>
            </div>

            <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
              <h4 className="text-3xl font-black text-[#0f766e]">6 Gün</h4>
              <p className="text-slate-500 font-bold mt-1">Takip</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {veterinarians.map((vet) => (
          <Link
            key={vet.id}
            to={`/veterinerlerimiz/${vet.id}`}
            className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition block"
          >
            <div className="h-80 bg-[#e7f4f2]">
              <img
                src={vet.image}
                alt={vet.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-7">
              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                {vet.experience}
              </span>

              <h3 className="text-2xl font-black text-[#134e4a] mt-4">
                {vet.name}
              </h3>

              <p className="text-[#0f766e] font-black mt-2">
                {vet.title}
              </p>

              <p className="text-slate-500 leading-7 mt-3 min-h-[84px]">
                {vet.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {vet.specialties.slice(0, 2).map((item) => (
                  <span
                    key={item}
                    className="bg-[#f3f8f7] text-[#134e4a] px-3 py-2 rounded-full text-xs font-black"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black mt-6">
                Detay Gör →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}