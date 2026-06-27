import { Link, useParams } from "react-router-dom";
import { veterinarians } from "../../data/data";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function VetDetail() {
  const { id } = useParams();

  const vet = veterinarians.find((item) => item.id === Number(id));

  if (!vet) {
    return (
      <PageContainer>
        <PageHeader
          label="Veteriner Detayı"
          title="Veteriner bulunamadı"
          description="Aradığınız veteriner hekim sistemde bulunamadı."
        />

        <Link
          to="/veterinerlerimiz"
          className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
        >
          Veterinerlere Dön
        </Link>
      </PageContainer>
    );
  }

  const otherVets = veterinarians.filter((item) => item.id !== vet.id);

  return (
    <PageContainer>
      <PageHeader
        label="Veteriner Detayı"
        title={vet.name}
        description={vet.shortDescription}
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm">
          <div className="h-[520px] bg-[#e7f4f2]">
            <img
              src={vet.image}
              alt={vet.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

            <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
              {vet.experience}
            </span>

            <h2 className="relative text-5xl font-black mt-6 leading-tight">
              {vet.name}
            </h2>

            <p className="relative text-white/80 text-xl mt-3">
              {vet.title}
            </p>

            <p className="relative text-white/80 leading-8 mt-5">
              {vet.description}
            </p>

            <div className="relative flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to={`/randevu-al?doctor=${encodeURIComponent(vet.name)}`}
                className="bg-white text-[#0f766e] px-6 py-3 rounded-full font-black text-center"
              >
                Bu Hekimden Randevu Al
              </Link>

              <Link
                to="/veterinerlerimiz"
                className="bg-white/15 text-white px-6 py-3 rounded-full font-black text-center"
              >
                Hekimlere Dön
              </Link>
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-3xl font-black text-[#134e4a]">
              Uzmanlık Alanları
            </h3>

            <div className="flex flex-wrap gap-3 mt-5">
              {vet.specialties.map((item) => (
                <span
                  key={item}
                  className="bg-[#e7f4f2] text-[#0f766e] px-5 py-3 rounded-full font-black"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-3xl font-black text-[#134e4a]">
              Uygun Günler
            </h3>

            <div className="grid sm:grid-cols-3 gap-4 mt-5">
              {vet.availableDays.map((day) => (
                <div
                  key={day}
                  className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 text-center"
                >
                  <h4 className="font-black text-[#134e4a]">{day}</h4>
                </div>
              ))}
            </div>
          </div>

          {otherVets.length > 0 && (
            <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
              <h3 className="text-3xl font-black text-[#134e4a]">
                Diğer Hekimler
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                {otherVets.map((item) => (
                  <Link
                    key={item.id}
                    to={`/veterinerlerimiz/${item.id}`}
                    className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 hover:bg-[#e7f4f2] transition"
                  >
                    <h4 className="font-black text-[#134e4a]">
                      {item.name}
                    </h4>

                    <p className="text-[#0f766e] font-black mt-2">
                      {item.title}
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