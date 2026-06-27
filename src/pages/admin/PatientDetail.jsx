import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  updatePatientNote,
  updatePatientRisk,
} from "../../store/patientSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function PatientDetail() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const isDoctorRoute = location.pathname.startsWith("/hekim-hastalari");
  const backPath = isDoctorRoute ? "/hekim-hastalari" : "/hasta-yonetimi";

  const { patients, status, error } = useSelector((state) => state.patients);
  const { role } = useSelector((state) => state.auth);

  const patient = patients.find((item) => item.id === Number(id));

  const [note, setNote] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (patient) {
      setNote(patient.treatmentNote);
    }
  }, [patient]);

  const getRiskClass = (risk) => {
    if (risk === "Düşük") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    if (risk === "Orta") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-600";
  };

  const handleRiskChange = (riskStatus) => {
    dispatch(
      updatePatientRisk({
        id: Number(id),
        riskStatus,
      })
    );
  };

  const handleNoteSave = () => {
    dispatch(
      updatePatientNote({
        id: Number(id),
        treatmentNote: note,
      })
    );
  };

  if (status === "loading") {
    return (
      <PageContainer>
        <PageHeader
          label="Hasta Detayı"
          title="Hasta bilgileri yükleniyor"
          description="Hasta kaydı sistemden alınıyor."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-3xl font-black text-[#134e4a]">
            Veriler yükleniyor
          </h2>
        </div>
      </PageContainer>
    );
  }

  if (status === "failed") {
    return (
      <PageContainer>
        <PageHeader
          label="Hasta Detayı"
          title="Hasta bilgileri alınamadı"
          description="Veriler yüklenirken bir sorun oluştu."
        />

        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-3xl font-black text-red-600">
            Hata oluştu
          </h2>
          <p className="text-red-500 mt-3">{error}</p>
        </div>
      </PageContainer>
    );
  }

  if (!patient) {
    return (
      <PageContainer>
        <PageHeader
          label="Hasta Detayı"
          title="Hasta bulunamadı"
          description="Aradığınız hasta kaydı sistemde bulunamadı."
        />

        <Link
          to={backPath}
          className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
        >
          Hasta Listesine Dön
        </Link>
      </PageContainer>
    );
  }

  const infoCards = [
    {
      title: "Tür",
      value: patient.petType,
    },
    {
      title: "Cins",
      value: patient.breed,
    },
    {
      title: "Yaş",
      value: patient.age,
    },
    {
      title: "Cinsiyet",
      value: patient.gender,
    },
    {
      title: "Mikroçip",
      value: patient.microchipNo,
    },
    {
      title: "Sorumlu Hekim",
      value: patient.doctor,
    },
  ];

  const healthCards = [
    {
      title: "Kronik Hastalık",
      value: patient.chronicDisease,
      icon: "🩺",
    },
    {
      title: "Alerji",
      value: patient.allergy,
      icon: "⚠️",
    },
    {
      title: "Aşı Durumu",
      value: patient.vaccineStatus,
      icon: "💉",
    },
    {
      title: "Son Muayene",
      value: patient.lastVisit,
      icon: "📅",
    },
    {
      title: "Sonraki Kontrol",
      value: patient.nextControl,
      icon: "🗓️",
    },
    {
      title: "Risk Durumu",
      value: `${patient.riskStatus} Risk`,
      icon: "📌",
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        label="Hasta Detayı"
        title={`${patient.petName} sağlık kaydı`}
        description={`${patient.ownerName} adlı kullanıcıya ait ${patient.petType.toLowerCase()} hasta bilgileri.`}
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="space-y-6">
          <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

            <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
              🐾 {patient.petType}
            </span>

            <h2 className="relative text-5xl font-black mt-6 leading-tight">
              {patient.petName}
            </h2>

            <p className="relative text-white/80 leading-8 mt-4">
              {patient.breed} • {patient.age} • {patient.gender}
            </p>

            <div className="relative grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white/15 rounded-2xl p-5">
                <p className="text-white/60 text-sm">Sahip</p>
                <h3 className="text-xl font-black mt-1">
                  {patient.ownerName}
                </h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5">
                <p className="text-white/60 text-sm">Telefon</p>
                <h3 className="text-xl font-black mt-1">
                  {patient.ownerPhone}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-2xl font-black text-[#134e4a] mb-5">
              Sahip Bilgileri
            </h3>

            <div className="space-y-4">
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Ad Soyad</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {patient.ownerName}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Telefon</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {patient.ownerPhone}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">E-posta</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {patient.ownerEmail}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-black text-[#134e4a]">
                  Genel Hasta Bilgileri
                </h3>

                <p className="text-slate-500 mt-1">
                  Hasta kimlik ve takip bilgileri.
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-black ${getRiskClass(
                  patient.riskStatus
                )}`}
              >
                {patient.riskStatus} Risk
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {infoCards.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5"
                >
                  <p className="text-sm text-slate-500">{item.title}</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {item.value}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-2xl font-black text-[#134e4a] mb-5">
              Sağlık Bilgileri
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {healthCards.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <p className="text-sm text-slate-500">{item.title}</p>
                  <h4 className="font-black text-[#134e4a] mt-1 leading-6">
                    {item.value}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-2xl font-black text-[#134e4a]">
              Tedavi Notu
            </h3>

            <p className="text-slate-500 mt-2">
              Hekim veya admin bu alandan tedavi notunu güncelleyebilir.
            </p>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="5"
              className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-5"
            />

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={handleNoteSave}
                className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
              >
                Notu Kaydet
              </button>

              <select
                value={patient.riskStatus}
                onChange={(e) => handleRiskChange(e.target.value)}
                className="border border-[#d8e7e4] px-5 py-3 rounded-full outline-none font-bold text-[#134e4a]"
              >
                <option>Düşük</option>
                <option>Orta</option>
                <option>Yüksek</option>
              </select>

              <Link
                to={backPath}
                className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
              >
                Listeye Dön
              </Link>

              {role === "admin" && (
                <Link
                  to="/admin-panel"
                  className="bg-white border border-[#d8e7e4] text-[#134e4a] px-6 py-3 rounded-full font-black hover:bg-[#f3f8f7] transition"
                >
                  Admin Paneli
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}