import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPatient, fetchPatients } from "../../store/patientSlice";
import { addApprovalRequest } from "../../store/approvalSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Pets() {
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const { patients, status } = useSelector((state) => {
    return state.patients;
  });

  const [form, setForm] = useState({
    petName: "",
    petType: "Kedi",
    breed: "",
    age: "",
    gender: "Dişi",
    microchipNo: "",
    chronicDisease: "",
    allergy: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status]);

  const customerEmail = user?.email;

  const myPatients = customerEmail
    ? patients.filter((patient) => patient.ownerEmail === customerEmail)
    : [];

  const handleChange = (e) => {
    setMessage("");

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      petName: form.petName,
      petType: form.petType,
      breed: form.breed,
      age: form.age,
      gender: form.gender,
      microchipNo:
        form.microchipNo || `UCP-MC-${Math.floor(Math.random() * 90000) + 10000}`,
      ownerName: user?.name || "Müşteri",
      ownerEmail: user?.email || "",
      phone: "Belirtilmedi",
      chronicDisease: form.chronicDisease || "Yok",
      allergy: form.allergy || "Yok",
      vaccineStatus: "Kontrol Bekliyor",
      riskStatus: "Düşük",
      doctor: "Henüz atanmadı",
      lastControl: "-",
      nextControl: "-",
      treatmentNote: "Müşteri tarafından yeni evcil hayvan kaydı oluşturuldu.",
    };

    dispatch(addPatient(newPatient));

    dispatch(
      addApprovalRequest({
        source: "Müşteri",
        type: "Evcil Hayvan Kaydı",
        title: `${user?.name} yeni evcil hayvan ekledi`,
        description: `${form.petName} isimli ${form.petType} sisteme eklendi. Admin kontrolü bekliyor.`,
        createdBy: user?.name || "Müşteri",
      })
    );

    setForm({
      petName: "",
      petType: "Kedi",
      breed: "",
      age: "",
      gender: "Dişi",
      microchipNo: "",
      chronicDisease: "",
      allergy: "",
    });

    setMessage(
      "Evcil hayvan kaydı eklendi. Admin kontrol paneline de onay talebi gönderildi."
    );
  };

  const getRiskClass = (riskStatus) => {
    if (riskStatus === "Yüksek") {
      return "bg-red-100 text-red-600";
    }

    if (riskStatus === "Orta") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-[#e7f4f2] text-[#0f766e]";
  };

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <PageHeader
          label="Evcil Hayvanlarım"
          title="Evcil hayvanlarınızı görüntülemek için giriş yapmalısınız"
          description="Bu sayfada size ait evcil hayvan kayıtları listelenir."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🔐</div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Giriş yapmanız gerekiyor
          </h2>

          <p className="text-slate-500 mt-3">
            Evcil hayvan eklemek ve kayıtlarınızı görmek için müşteri hesabıyla
            giriş yapmalısınız.
          </p>

          <Link
            to="/giris-yap"
            className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black mt-6"
          >
            Giriş Yap
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        label="Evcil Hayvanlarım"
        title="Kayıtlı evcil dostlarınız"
        description="Evcil hayvan ekleyebilir, sağlık karnesi ve hayvan pasaportu bilgilerine ulaşabilirsiniz."
      />

      {message && (
        <div className="bg-[#e7f4f2] border border-[#0f766e]/20 text-[#0f766e] rounded-3xl p-5 mb-8">
          <h3 className="font-black">İşlem tamamlandı</h3>
          <p className="mt-1">{message}</p>
        </div>
      )}

      <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Evcil Hayvan Ekle
          </h2>

          <p className="text-slate-500 mt-2">
            Müşteri yeni evcil hayvan kaydı oluşturabilir. Kayıt admin kontrol
            paneline onay talebi olarak da düşer.
          </p>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-6">
            <input
              name="petName"
              value={form.petName}
              onChange={handleChange}
              placeholder="Evcil hayvan adı"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <select
              name="petType"
              value={form.petType}
              onChange={handleChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Kedi</option>
              <option>Köpek</option>
              <option>Kuş</option>
              <option>Balık</option>
              <option>Hamster</option>
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

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Dişi</option>
              <option>Erkek</option>
            </select>

            <input
              name="microchipNo"
              value={form.microchipNo}
              onChange={handleChange}
              placeholder="Mikroçip no"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            />

            <input
              name="chronicDisease"
              value={form.chronicDisease}
              onChange={handleChange}
              placeholder="Kronik hastalık"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            />

            <input
              name="allergy"
              value={form.allergy}
              onChange={handleChange}
              placeholder="Alerji bilgisi"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            />

            <button className="md:col-span-2 bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition">
              Evcil Hayvanı Ekle
            </button>
          </form>
        </div>

        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🐾 Evcil Hayvan Yönetimi
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Dostlarınızın sağlık kayıtları tek alanda.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Eklenen evcil hayvanlar sağlık karnesi, laboratuvar sonuçları,
            randevu ve hayvan pasaportu sayfalarında kullanılabilir.
          </p>

          <div className="relative grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{myPatients.length}</h3>
              <p className="text-white/70 text-sm mt-1">Kayıtlı Dost</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">
                {myPatients.filter((item) => item.riskStatus === "Yüksek").length}
              </h3>
              <p className="text-white/70 text-sm mt-1">Yüksek Risk</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-[#0f766e] font-black mb-2">Kayıtlar</p>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Evcil hayvan listem
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black mb-4">
                    {patient.petType}
                  </span>

                  <h3 className="text-3xl font-black text-[#134e4a]">
                    {patient.petName}
                  </h3>

                  <p className="text-slate-500 mt-2">
                    {patient.breed} • {patient.age}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-xs font-black ${getRiskClass(
                    patient.riskStatus
                  )}`}
                >
                  {patient.riskStatus} Risk
                </span>
              </div>

              <div className="space-y-3 mt-6">
                <div className="bg-[#f3f8f7] rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Mikroçip No</p>
                  <p className="font-black text-[#134e4a] mt-1">
                    {patient.microchipNo}
                  </p>
                </div>

                <div className="bg-[#f3f8f7] rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Aşı Durumu</p>
                  <p className="font-black text-[#134e4a] mt-1">
                    {patient.vaccineStatus}
                  </p>
                </div>

                <div className="bg-[#f3f8f7] rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Kronik Hastalık</p>
                  <p className="font-black text-[#134e4a] mt-1">
                    {patient.chronicDisease}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to="/hayvan-pasaportu"
                  className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black"
                >
                  Pasaport
                </Link>

                <Link
                  to="/saglik-karnesi"
                  className="bg-[#e7f4f2] text-[#0f766e] px-5 py-3 rounded-full font-black"
                >
                  Sağlık Karnesi
                </Link>

                <Link
                  to="/randevu-al"
                  className="bg-white border border-[#d8e7e4] text-[#134e4a] px-5 py-3 rounded-full font-black"
                >
                  Randevu Al
                </Link>
              </div>
            </div>
          ))}
        </div>

        {myPatients.length === 0 && (
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
            <div className="text-5xl mb-4">🐾</div>

            <h2 className="text-3xl font-black text-[#134e4a]">
              Henüz evcil hayvan eklenmedi
            </h2>

            <p className="text-slate-500 mt-3">
              Yukarıdaki formdan ilk evcil hayvan kaydınızı oluşturabilirsiniz.
            </p>
          </div>
        )}
      </section>
    </PageContainer>
  );
}