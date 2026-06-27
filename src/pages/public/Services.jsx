import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../../data/data";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchText, setSearchText] = useState("");

  const categories = useMemo(() => {
    return ["Tümü", ...new Set(services.map((service) => service.category))];
  }, []);

  const filteredServices = services.filter((service) => {
    const categoryMatch =
      selectedCategory === "Tümü" || service.category === selectedCategory;

    const searchMatch =
      service.title.toLowerCase().includes(searchText.toLowerCase()) ||
      service.description.toLowerCase().includes(searchText.toLowerCase()) ||
      service.category.toLowerCase().includes(searchText.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <PageContainer>
      <PageHeader
        label="Hizmetlerimiz"
        title="Veteriner sağlık hizmetleri"
        description="Genel muayene, aşı takibi, laboratuvar testleri, acil destek ve bakım hizmetlerini buradan inceleyebilirsiniz."
      />

      <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
        <h2 className="text-3xl font-black text-[#134e4a]">
          Hizmetleri Filtrele
        </h2>

        <p className="text-slate-500 mt-2">
          Hizmet adına veya kategoriye göre arama yapabilirsiniz.
        </p>

        <div className="grid md:grid-cols-[1fr_260px] gap-4 mt-6">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Hizmet ara"
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
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Link
            key={service.id}
            to={`/hizmetler/${service.id}`}
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition block"
          >
            <div className="w-16 h-16 rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-5">
              {service.icon}
            </div>

            <span className="inline-flex bg-[#f3f8f7] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
              {service.category}
            </span>

            <h3 className="text-2xl font-black text-[#134e4a] mt-4">
              {service.title}
            </h3>

            <p className="text-slate-500 leading-7 mt-3 min-h-[84px]">
              {service.shortDescription}
            </p>

            <div className="flex items-center justify-between mt-6">
              <p className="text-2xl font-black text-[#0f766e]">
                {service.price} TL
              </p>

              <span className="text-[#0f766e] font-black">
                Detay →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm mt-6">
          <div className="text-5xl mb-4">🔍</div>

          <h3 className="text-2xl font-black text-[#134e4a]">
            Hizmet bulunamadı
          </h3>

          <p className="text-slate-500 mt-2">
            Arama veya kategori filtresini değiştirerek tekrar deneyebilirsiniz.
          </p>
        </div>
      )}
    </PageContainer>
  );
}