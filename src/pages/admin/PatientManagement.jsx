import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePatient,
  fetchPatients,
  updatePatientRisk,
} from "../../store/patientSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function PatientManagement() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isDoctorRoute = location.pathname.startsWith("/hekim-hastalari");
  const detailBasePath = isDoctorRoute ? "/hekim-hastalari" : "/hasta-yonetimi";

  const { patients, status, error } = useSelector((state) => state.patients);
  const { role } = useSelector((state) => state.auth);

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("Tümü");
  const [selectedRisk, setSelectedRisk] = useState("Tümü");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status]);

  const petTypes = useMemo(() => {
    return ["Tümü", ...new Set(patients.map((patient) => patient.petType))];
  }, [patients]);

  const riskTypes = ["Tümü", "Düşük", "Orta", "Yüksek"];

  const filteredPatients = patients.filter((patient) => {
    const searchMatch =
      patient.petName.toLowerCase().includes(searchText.toLowerCase()) ||
      patient.ownerName.toLowerCase().includes(searchText.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchText.toLowerCase());

    const typeMatch =
      selectedType === "Tümü" || patient.petType === selectedType;

    const riskMatch =
      selectedRisk === "Tümü" || patient.riskStatus === selectedRisk;

    return searchMatch && typeMatch && riskMatch;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const lowRiskCount = patients.filter(
    (patient) => patient.riskStatus === "Düşük"
  ).length;

  const mediumRiskCount = patients.filter(
    (patient) => patient.riskStatus === "Orta"
  ).length;

  const highRiskCount = patients.filter(
    (patient) => patient.riskStatus === "Yüksek"
  ).length;

  const getRiskClass = (risk) => {
    if (risk === "Düşük") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    if (risk === "Orta") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-600";
  };

  const handleRiskChange = (id, riskStatus) => {
    dispatch(
      updatePatientRisk({
        id,
        riskStatus,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deletePatient(id));
  };

  const resetFilters = () => {
    setSearchText("");
    setSelectedType("Tümü");
    setSelectedRisk("Tümü");
    setCurrentPage(1);
  };

  const exportCsv = () => {
    const headers = [
      "Hasta Adı",
      "Tür",
      "Cins",
      "Yaş",
      "Sahip",
      "Telefon",
      "Hekim",
      "Risk",
      "Son Muayene",
      "Sonraki Kontrol",
    ];

    const rows = filteredPatients.map((patient) => [
      patient.petName,
      patient.petType,
      patient.breed,
      patient.age,
      patient.ownerName,
      patient.ownerPhone,
      patient.doctor,
      patient.riskStatus,
      patient.lastVisit,
      patient.nextControl,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "hasta-listesi.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (status === "loading") {
    return (
      <PageContainer>
        <PageHeader
          label="Hasta Yönetimi"
          title="Hasta bilgileri yükleniyor"
          description="Hasta kayıtları sistemden alınıyor."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-3xl font-black text-[#134e4a]">
            Veriler yükleniyor
          </h2>
          <p className="text-slate-500 mt-3">
            Lütfen birkaç saniye bekleyin.
          </p>
        </div>
      </PageContainer>
    );
  }

  if (status === "failed") {
    return (
      <PageContainer>
        <PageHeader
          label="Hasta Yönetimi"
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

  return (
    <PageContainer>
      <PageHeader
        label={isDoctorRoute ? "Hekim Hasta Listesi" : "Hasta Yönetimi"}
        title="Hasta bilgileri ve sağlık takipleri"
        description="Evcil hayvan hastalarını, sahip bilgilerini, risk durumlarını ve kontrol tarihlerini buradan takip edebilirsiniz."
      />

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl mb-4">
            🐾
          </div>

          <p className="text-slate-500 font-bold">Toplam Hasta</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {patients.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl mb-4">
            ✅
          </div>

          <p className="text-slate-500 font-bold">Düşük Risk</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {lowRiskCount}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl mb-4">
            🟠
          </div>

          <p className="text-slate-500 font-bold">Orta Risk</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {mediumRiskCount}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4">
            🔴
          </div>

          <p className="text-slate-500 font-bold">Yüksek Risk</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {highRiskCount}
          </h3>
        </div>
      </div>

      <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Hasta Listesi
            </h2>

            <p className="text-slate-500 mt-2">
              Hasta adı, sahip adı veya hekim adına göre arama yapabilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportCsv}
              className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
            >
              CSV İndir
            </button>

            <Link
              to={role === "doctor" ? "/hekim-panel" : "/admin-panel"}
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
            >
              Panele Dön
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_220px_220px] gap-4 mt-6">
          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Hasta, sahip veya hekim ara"
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          />

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          >
            {petTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => {
              setSelectedRisk(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
          >
            {riskTypes.map((risk) => (
              <option key={risk}>{risk}</option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="bg-[#f3f8f7] text-[#0f766e] px-6 py-3 rounded-full font-black mt-5 hover:bg-[#e7f4f2] transition"
        >
          Filtreleri Temizle
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {paginatedPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
                  {patient.petType}
                </span>

                <h3 className="text-3xl font-black text-[#134e4a] mt-4">
                  {patient.petName}
                </h3>

                <p className="text-slate-500 mt-1">
                  {patient.breed} • {patient.age} • {patient.gender}
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

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Sahip</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {patient.ownerName}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Hekim</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {patient.doctor}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Son Muayene</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {patient.lastVisit}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Sonraki Kontrol</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {patient.nextControl}
                </h4>
              </div>
            </div>

            <p className="text-slate-500 leading-7 mt-5">
              {patient.treatmentNote}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
              <Link
                to={`${detailBasePath}/${patient.id}`}
                className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
              >
                Detay Gör
              </Link>

              <select
                value={patient.riskStatus}
                onChange={(e) =>
                  handleRiskChange(patient.id, e.target.value)
                }
                className="border border-[#d8e7e4] px-4 py-3 rounded-full outline-none text-sm font-bold text-[#134e4a]"
              >
                <option>Düşük</option>
                <option>Orta</option>
                <option>Yüksek</option>
              </select>

              {role === "admin" && (
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black hover:bg-red-200 transition"
                >
                  Sil
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm mt-6">
          <div className="text-5xl mb-4">🔍</div>

          <h3 className="text-2xl font-black text-[#134e4a]">
            Hasta bulunamadı
          </h3>

          <p className="text-slate-500 mt-2">
            Arama veya filtreleri değiştirerek tekrar deneyebilirsiniz.
          </p>
        </div>
      )}

      {filteredPatients.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentPage === index + 1
                  ? "w-11 h-11 rounded-full bg-[#0f766e] text-white font-black"
                  : "w-11 h-11 rounded-full bg-white border border-[#d8e7e4] text-[#134e4a] font-black"
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </PageContainer>
  );
}