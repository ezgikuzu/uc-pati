import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function AdoptionDetail() {
  const { id } = useParams();

  const adoptionPets = useSelector((state) => state.adoptions.pets);

  const pet = adoptionPets.find((item) => item.id === Number(id));

  if (!pet) {
    return (
      <PageContainer>
        <PageHeader
          label="Sahiplendirme Detayı"
          title="İlan bulunamadı"
          description="Aradığınız sahiplendirme ilanı sistemde bulunamadı."
        />

        <Link
          to="/sahiplendirme"
          className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
        >
          İlanlara Dön
        </Link>
      </PageContainer>
    );
  }

  const otherPets = adoptionPets.filter((item) => item.id !== pet.id);

  return (
    <PageContainer>
      <PageHeader
        label="Sahiplendirme Detayı"
        title={`${pet.name} için yuva aranıyor`}
        description={`${pet.city} konumunda, ${pet.age} ${pet.type.toLowerCase()} sahiplendirme ilanı.`}
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm">
          <div className="h-[520px] bg-[#e7f4f2]">
            <img
              src={pet.image}
              alt={pet.name}
              className={
                pet.type === "Kuş"
                  ? "w-full h-full object-contain bg-[#f3f8f7]"
                  : "w-full h-full object-cover"
              }
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

            <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
              🐾 {pet.type}
            </span>

            <h2 className="relative text-5xl font-black mt-6 leading-tight">
              {pet.name}
            </h2>

            <p className="relative text-white/80 text-xl mt-3">
              {pet.breed} • {pet.age} • {pet.city}
            </p>

            <p className="relative text-white/80 leading-8 mt-5">
              {pet.description}
            </p>

            <div className="relative grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white/15 rounded-2xl p-5">
                <p className="text-white/60 text-sm">İlan Sahibi</p>
                <h3 className="font-black mt-1">{pet.ownerName}</h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5">
                <p className="text-white/60 text-sm">Konum</p>
                <h3 className="font-black mt-1">{pet.city}</h3>
              </div>
            </div>

            <div className="relative flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to="/iletisim"
                className="bg-white text-[#0f766e] px-6 py-3 rounded-full font-black text-center"
              >
                İletişime Geç
              </Link>

              <Link
                to="/sahiplendirme"
                className="bg-white/15 text-white px-6 py-3 rounded-full font-black text-center"
              >
                İlanlara Dön
              </Link>
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-3xl font-black text-[#134e4a]">
              Sahiplendirme Nedeni
            </h3>

            <p className="text-slate-500 leading-8 mt-4">{pet.reason}</p>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-3xl font-black text-[#134e4a]">
              Genel Bilgiler
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Adı</p>
                <h4 className="font-black text-[#134e4a] mt-1">{pet.name}</h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Tür</p>
                <h4 className="font-black text-[#134e4a] mt-1">{pet.type}</h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Cins</p>
                <h4 className="font-black text-[#134e4a] mt-1">{pet.breed}</h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Yaş</p>
                <h4 className="font-black text-[#134e4a] mt-1">{pet.age}</h4>
              </div>
            </div>
          </div>

          {otherPets.length > 0 && (
            <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
              <h3 className="text-3xl font-black text-[#134e4a]">
                Diğer İlanlar
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                {otherPets.slice(0, 2).map((item) => (
                  <Link
                    key={item.id}
                    to={`/sahiplendirme/${item.id}`}
                    className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 hover:bg-[#e7f4f2] transition"
                  >
                    <h4 className="font-black text-[#134e4a]">{item.name}</h4>
                    <p className="text-slate-500 mt-1">
                      {item.type} • {item.city}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}