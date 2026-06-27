import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../store/patientSlice";
import { fetchLabResults } from "../../store/labSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function CustomerPanel() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const appointments = useSelector((state) => {
    return state.appointments.appointments;
  });

  const { patients, status: patientStatus } = useSelector((state) => {
    return state.patients;
  });

  const {
    results: labResults,
    status: labStatus,
  } = useSelector((state) => {
    return state.labResults;
  });

  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    if (patientStatus === "idle") {
      dispatch(fetchPatients());
    }

    if (labStatus === "idle") {
      dispatch(fetchLabResults());
    }
  }, [dispatch, patientStatus, labStatus]);

  const customerEmail = user?.email;

  const myPatients = customerEmail
    ? patients.filter((patient) => patient.ownerEmail === customerEmail)
    : patients.slice(0, 2);

  const myPatientIds = myPatients.map((patient) => patient.id);

  const myLabResults = labResults.filter((result) => {
    return myPatientIds.includes(result.patientId);
  });

  const myAppointments = user?.name
    ? appointments.filter((appointment) => {
        return appointment.ownerName === user.name;
      })
    : appointments;

  const highRiskPatients = myPatients.filter((patient) => {
    return patient.riskStatus === "Yüksek";
  });

  const waitingAppointments = myAppointments.filter((appointment) => {
    return appointment.status === "Beklemede";
  });

  const myMessages = customerEmail
    ? messages.filter((msg) => msg.email === customerEmail)
    : [];

  const customerCards = [
    {
      icon: "🐾",
      title: "Evcil Hayvanlarım",
      text: "Kayıtlı evcil dostlarınızı görüntüleyin.",
      path: "/evcil-hayvanlarim",
    },
    {
      icon: "📘",
      title: "Hayvan Pasaportu",
      text: "Evcil dostunuzun kimlik, mikroçip ve aşı bilgilerini görüntüleyin.",
      path: "/hayvan-pasaportu",
    },
    {
      icon: "📅",
      title: "Randevularım",
      text: "Geçmiş ve gelecek randevularınızı takip edin.",
      path: "/randevularim",
    },
    {
      icon: "📌",
      title: "Randevu Al",
      text: "Hekimin uygun saatlerine göre yeni randevu talebi oluşturun.",
      path: "/randevu-al",
    },
    {
      icon: "🩺",
      title: "Sağlık Karnesi",
      text: "Aşı, tedavi ve kontrol geçmişini inceleyin.",
      path: "/saglik-karnesi",
    },
    {
      icon: "🧪",
      title: "Laboratuvar Sonuçları",
      text: "Admin tarafından onaylanan laboratuvar sonuçlarını görüntüleyin.",
      path: "/laboratuvar-sonuclari",
    },
    {
      icon: "🛒",
      title: "Pet Shop",
      text: "Evcil dostunuz için ürünleri inceleyin.",
      path: "/pet-shop",
    },
    {
      icon: "🏠",
      title: "Sahiplendirme",
      text: "Yuva arayan dostları inceleyin veya ilan oluşturun.",
      path: "/sahiplendirme",
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        label="Müşteri Paneli"
        title="Evcil dostlarınızın kontrol merkezi"
        description="Randevu, sağlık karnesi, laboratuvar sonuçları, hayvan pasaportu ve pet shop işlemlerini buradan takip edebilirsiniz."
      />

      <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-8">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            👤 Müşteri Paneli
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Merhaba, {user?.name || "Üç Pati Kullanıcısı"}.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Bu panelden evcil hayvanlarınızın sağlık kayıtlarını, dijital
            pasaportunu, randevularını ve laboratuvar sonuçlarını takip
            edebilirsiniz.
          </p>

          <div className="relative grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{myPatients.length}</h3>
              <p className="text-white/70 text-sm mt-1">Kayıtlı Dost</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{myAppointments.length}</h3>
              <p className="text-white/70 text-sm mt-1">Randevu</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{myLabResults.length}</h3>
              <p className="text-white/70 text-sm mt-1">Lab Sonucu</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl mb-4">
              🐾
            </div>

            <p className="text-slate-500 font-bold">Evcil Hayvan</p>

            <h3 className="text-4xl font-black text-[#134e4a] mt-2">
              {myPatients.length}
            </h3>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl mb-4">
              ⏳
            </div>

            <p className="text-slate-500 font-bold">Bekleyen Randevu</p>

            <h3 className="text-4xl font-black text-[#134e4a] mt-2">
              {waitingAppointments.length}
            </h3>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4">
              🔴
            </div>

            <p className="text-slate-500 font-bold">Yüksek Risk</p>

            <h3 className="text-4xl font-black text-[#134e4a] mt-2">
              {highRiskPatients.length}
            </h3>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-6">
          <p className="text-[#0f766e] font-black mb-2">Hızlı İşlemler</p>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Müşteri işlemleri
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {customerCards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition block"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-3xl mb-5">
                {card.icon}
              </div>

              <h3 className="text-xl font-black text-[#134e4a]">
                {card.title}
              </h3>

              <p className="text-slate-500 leading-7 mt-3">{card.text}</p>

              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black mt-5">
                Git →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Evcil Hayvan Özeti
          </h2>

          <p className="text-slate-500 mt-2">
            Size ait kayıtlı evcil hayvanlar burada özetlenir.
          </p>

          <div className="space-y-4 mt-6">
            {myPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-[#134e4a]">
                      {patient.petName}
                    </h3>

                    <p className="text-slate-500 mt-1">
                      {patient.petType} • {patient.breed} • {patient.age}
                    </p>

                    <p className="text-slate-500 mt-2">
                      Mikroçip: {patient.microchipNo}
                    </p>
                  </div>

                  <span
                    className={
                      patient.riskStatus === "Yüksek"
                        ? "bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-black"
                        : patient.riskStatus === "Orta"
                        ? "bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black"
                        : "bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black"
                    }
                  >
                    {patient.riskStatus} Risk
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                  <Link
                    to="/hayvan-pasaportu"
                    className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black"
                  >
                    Pasaportu Gör
                  </Link>

                  <Link
                    to="/saglik-karnesi"
                    className="bg-[#e7f4f2] text-[#0f766e] px-5 py-3 rounded-full font-black"
                  >
                    Sağlık Karnesi
                  </Link>
                </div>
              </div>
            ))}

            {myPatients.length === 0 && (
              <p className="text-slate-500">
                Size ait kayıtlı evcil hayvan bulunamadı.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Son Laboratuvar Sonuçları
          </h2>

          <p className="text-slate-500 mt-2">
            Admin tarafından onaylanan laboratuvar sonuçları burada görünür.
          </p>

          <div className="space-y-4 mt-6">
            {myLabResults.slice(0, 4).map((result) => (
              <Link
                key={result.id}
                to={`/laboratuvar-sonuclari/${result.id}`}
                className="block bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 hover:bg-[#e7f4f2] transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-[#134e4a]">
                      {result.petName} - {result.testType}
                    </h3>

                    <p className="text-slate-500 mt-2">{result.summary}</p>

                    <p className="text-slate-400 text-sm mt-2">
                      Hekim: {result.doctor} • Tarih: {result.date}
                    </p>
                  </div>

                  <span
                    className={
                      result.resultStatus === "Normal"
                        ? "bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black"
                        : "bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black"
                    }
                  >
                    {result.resultStatus}
                  </span>
                </div>
              </Link>
            ))}

            {myLabResults.length === 0 && (
              <p className="text-slate-500">
                Henüz onaylanmış laboratuvar sonucu bulunamadı.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mt-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Soru ve Taleplerim
            </h2>
            <p className="text-slate-500 mt-2">
              İletişim formundan gönderdiğiniz sorular ve veteriner hekimlerimizin yanıtları burada listelenir.
            </p>
          </div>

          <span className="bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black self-start">
            {myMessages.length} mesaj
          </span>
        </div>

        <div className="space-y-6">
          {[...myMessages].reverse().map((msg) => (
            <div key={msg.id} className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-black text-[#134e4a]">
                    {msg.subject}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">Tarih: {msg.date}</p>
                </div>

                <span
                  className={
                    msg.status === "Beklemede"
                      ? "bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs font-black self-start"
                      : msg.status === "Onaylandı"
                      ? "bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-black self-start"
                      : msg.status === "Cevaplandı"
                      ? "bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-black self-start"
                      : "bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-black self-start"
                  }
                >
                  {msg.status === "Beklemede"
                    ? "Onay Bekliyor"
                    : msg.status === "Onaylandı"
                    ? "Hekime İletildi (Cevap Bekliyor)"
                    : msg.status === "Cevaplandı"
                    ? "Cevaplandı"
                    : "Reddedildi"}
                </span>
              </div>

              <div className="bg-white border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-[#134e4a] leading-7">{msg.message}</p>
              </div>

              {msg.responses && msg.responses.length > 0 && (
                <div className="mt-5 border-t border-slate-100 pt-5 space-y-4">
                  <h4 className="font-bold text-[#134e4a] text-sm">Hekim Yanıtı:</h4>
                  {msg.responses.map((resp) => (
                    <div
                      key={resp.id}
                      className="bg-[#f0f9ff] border border-blue-100 rounded-2xl p-5 text-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-blue-700">{resp.doctorName}</span>
                        <span className="text-slate-400 text-xs">{resp.date}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{resp.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {myMessages.length === 0 && (
            <p className="text-slate-500 text-center py-6">
              Henüz gönderilmiş bir sorunuz bulunmuyor.
            </p>
          )}
        </div>
      </section>
    </PageContainer>
  );
}