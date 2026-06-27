import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAdoptionPet, deleteAdoptionPet } from "../../store/adoptionSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Adoption() {
  const dispatch = useDispatch();

  const adoptionPets = useSelector((state) => state.adoptions.pets);
  const { isLoggedIn, user, role } = useSelector((state) => state.auth);

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("Tümü");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "Kedi",
    breed: "",
    age: "",
    city: "",
    image: "",
    description: "",
    reason: "",
  });

  const petTypes = ["Tümü", ...new Set(adoptionPets.map((pet) => pet.type))];

  const filteredPets = adoptionPets.filter((pet) => {
    const typeMatch = selectedType === "Tümü" || pet.type === selectedType;

    const searchMatch =
      pet.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pet.city.toLowerCase().includes(searchText.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchText.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchText.toLowerCase());

    return typeMatch && searchMatch;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prevForm) => ({
        ...prevForm,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPet = {
      id: Date.now(),
      ...form,
      ownerName: user?.name || "Üç Pati Kullanıcısı",
      image:
        form.image ||
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    };

    dispatch(addAdoptionPet(newPet));

    setForm({
      name: "",
      type: "Kedi",
      breed: "",
      age: "",
      city: "",
      image: "",
      description: "",
      reason: "",
    });

    setIsFormOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader
        label="Sahiplendirme"
        title="Yuva arayan dostlar"
        description="Sahiplendirme ilanlarını inceleyebilir, giriş yaptıktan sonra yeni ilan oluşturabilirsiniz."
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-8">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🐾 Sahiplendirme Alanı
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Sevgi dolu bir yuva arayan dostlar.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Bu sayfada sahiplendirme ilanları listelenir. Kullanıcı giriş
            yaptıktan sonra yeni ilan oluşturabilir.
          </p>

          <div className="relative grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{adoptionPets.length}</h3>
              <p className="text-white/70 text-sm mt-1">İlan</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{petTypes.length - 1}</h3>
              <p className="text-white/70 text-sm mt-1">Tür</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">Yeni</h3>
              <p className="text-white/70 text-sm mt-1">İlan ekleme</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-[#134e4a]">
                İlanları Filtrele
              </h2>

              <p className="text-slate-500 mt-2">
                İsim, şehir, cins veya açıklamaya göre arama yapabilirsiniz.
              </p>
            </div>

            {isLoggedIn ? (
              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
              >
                {isFormOpen ? "Formu Kapat" : "İlan Ekle"}
              </button>
            ) : (
              <Link
                to="/giris-yap"
                className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
              >
                Giriş Yap
              </Link>
            )}
          </div>

          <div className="grid md:grid-cols-[1fr_220px] gap-4 mt-6">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="İlan ara"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            />

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              {petTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isFormOpen && isLoggedIn && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Yeni Sahiplendirme İlanı
          </h2>

          <p className="text-slate-500 mt-2">
            Yuva arayan evcil dost için ilan bilgilerini doldurun.
          </p>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Adı"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Kedi</option>
              <option>Köpek</option>
              <option>Kuş</option>
              <option>Hamster</option>
              <option>Balık</option>
            </select>

            <input
              name="breed"
              value={form.breed}
              onChange={handleChange}
              placeholder="Cins"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Yaş"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Şehir"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <label className="border border-dashed border-[#0f766e] bg-[#f3f8f7] p-4 rounded-2xl cursor-pointer text-[#0f766e] font-black text-center">
              Fotoğraf Seç
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {form.image && (
              <div className="md:col-span-2 h-64 rounded-3xl overflow-hidden bg-[#e7f4f2]">
                <img
                  src={form.image}
                  alt="Ön izleme"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Kısa açıklama"
              rows="4"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            />

            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Neden sahiplendiriliyor?"
              rows="4"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            />

            <button className="md:col-span-2 bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition">
              İlanı Yayınla
            </button>
          </form>
        </div>
      )}

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[#0f766e] font-black mb-2">İlanlar</p>
          <h2 className="text-3xl font-black text-[#134e4a]">
            Aktif sahiplendirme ilanları
          </h2>
        </div>

        <p className="text-slate-500 font-bold">
          {filteredPets.length} ilan gösteriliyor
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition"
          >
            <div className="h-72 bg-[#e7f4f2]">
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

            <div className="p-7">
              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                {pet.type}
              </span>

              <h3 className="text-3xl font-black text-[#134e4a] mt-4">
                {pet.name}
              </h3>

              <p className="text-slate-500 mt-1">
                {pet.breed} • {pet.age} • {pet.city}
              </p>

              <p className="text-slate-500 leading-7 mt-4 min-h-[112px]">
                {pet.description}
              </p>

              <div className="grid gap-3 mt-6">
                <Link
                  to={`/sahiplendirme/${pet.id}`}
                  className="bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition text-center"
                >
                  Detay Gör
                </Link>

                {role === "admin" && (
                  <button
                    onClick={() => dispatch(deleteAdoptionPet(pet.id))}
                    className="bg-red-100 text-red-600 px-6 py-4 rounded-2xl font-black hover:bg-red-200 transition"
                  >
                    İlanı Sil
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm mt-6">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-black text-[#134e4a]">
            İlan bulunamadı
          </h3>
          <p className="text-slate-500 mt-2">
            Arama veya tür filtresini değiştirerek tekrar deneyebilirsiniz.
          </p>
        </div>
      )}
    </PageContainer>
  );
}