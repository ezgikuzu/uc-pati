import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabResults } from "../../store/labSlice";
import { fetchPatients } from "../../store/patientSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function LabResults() {
  const dispatch = useDispatch();

  const { results: labResults, status, error } = useSelector(
    (state) => state.labResults
  );

  const { patients, status: patientStatus } = useSelector(
    (state) => state.patients
  );

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [selectedPet, setSelectedPet] = useState("Tümü");
  const [selectedTest, setSelectedTest] = useState("Tümü");
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLabResults());
    }

    if (patientStatus === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status, patientStatus]);

  const enrichedResults = labResults.map((result) => {
    const patient = patients.find((item) => item.id === result.patientId);

    return {
      ...result,
      patient,
    };
  });

  const pets = useMemo(() => {
    return ["Tümü", ...new Set(enrichedResults.map((item) => item.petName))];
  }, [enrichedResults]);

  const testTypes = useMemo(() => {
    return ["Tümü", ...new Set(enrichedResults.map((item) => item.testType))];
  }, [enrichedResults]);

  const statuses = ["Tümü", "Normal", "Takip Gerekli", "Bekleniyor"];

  const filteredResults = enrichedResults.filter((item) => {
    const petMatch = selectedPet === "Tümü" || item.petName === selectedPet;

    const testMatch =
      selectedTest === "Tümü" || item.testType === selectedTest;

    const statusMatch =
      selectedStatus === "Tümü" || item.resultStatus === selectedStatus;

    const searchMatch =
      item.petName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchText.toLowerCase()) ||
      item.testType.toLowerCase().includes(searchText.toLowerCase());

    return petMatch && testMatch && statusMatch && searchMatch;
  });

  const normalCount = labResults.filter((item) => {
    return item.resultStatus === "Normal";
  }).length;

  const followCount = labResults.filter((item) => {
    return item.resultStatus === "Takip Gerekli";
  }).length;

  const waitingCount = labResults.filter((item) => {
    return item.resultStatus === "Bekleniyor";
  }).length;

  const getStatusClass = (statusText) => {
    if (statusText === "Normal") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    if (statusText === "Takip Gerekli") {
      return "bg-orange-100 text-orange-700";
    }

    if (statusText === "Bekleniyor") {
      return "bg-slate-100 text-slate-500";
    }

    return "bg-red-100 text-red-600";
  };

  const resetFilters = () => {
    setSelectedPet("Tümü");
    setSelectedTest("Tümü");
    setSelectedStatus("Tümü");
    setSearchText("");
  };

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <PageHeader
          label="Laboratuvar Sonuçları"
          title="Laboratuvar sonuçlarını görmek için giriş yapmalısınız"
          description="Evcil hayvanlara ait laboratuvar ve tetkik sonuçları kullanıcıya özel olduğu için giriş yaptıktan sonra görüntülenebilir."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 md:p-10 shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-6">
            🔐
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Giriş yapmadan sonuçlara ulaşılamaz
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Kan tahlili, biyokimya, parazit testi ve diğer tetkik sonuçlarını
            görüntülemek için önce hesabınıza giriş yapmanız gerekir.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
            <Link
              to="/giris-yap"
              className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
            >
              Giriş Yap
            </Link>

            <Link
              to="/"
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (status === "loading" || patientStatus === "loading") {
    return (
      <PageContainer>
        <PageHeader
          label="Laboratuvar Sonuçları"
          title="Laboratuvar sonuçları yükleniyor"
          description="Tetkik kayıtları sistemden alınıyor."
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
          label="Laboratuvar Sonuçları"
          title="Sonuçlar alınamadı"
          description="Veriler yüklenirken bir sorun oluştu."
        />

        <div className="bg-red-50 border border-red-100 rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-3xl font-black text-red-600">Hata oluştu</h2>
          <p className="text-red-500 mt-3">{error}</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        label="Laboratuvar Sonuçları"
        title="Tetkik ve laboratuvar kayıtları"
        description="Kan tahlili, biyokimya, parazit testi ve diğer laboratuvar sonuçlarını buradan takip edebilirsiniz."
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-8">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🧪 Laboratuvar Takibi
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Tüm tetkik sonuçları hasta bilgileriyle birlikte görüntülenir.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Evcil dostunuzun test türü, sonuç durumu, hekim yorumu, referans
            değerleri ve hasta bilgileri sistem üzerinden takip edilebilir.
          </p>

          <div className="relative grid sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{labResults.length}</h3>
              <p className="text-white/70 text-sm mt-1">Toplam sonuç</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{normalCount}</h3>
              <p className="text-white/70 text-sm mt-1">Normal</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{followCount}</h3>
              <p className="text-white/70 text-sm mt-1">Takip gerekli</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{waitingCount}</h3>
              <p className="text-white/70 text-sm mt-1">Bekleniyor</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h3 className="text-2xl font-black text-[#134e4a]">
            Sonuçları Filtrele
          </h3>

          <p className="text-slate-500 mt-2">
            Hasta adı, sahip adı, hekim, test türü veya sonuç durumuna göre
            filtreleme yapabilirsiniz.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Hasta, sahip, hekim veya test ara"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
            />

            <select
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              {pets.map((pet) => (
                <option key={pet}>{pet}</option>
              ))}
            </select>

            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              {testTypes.map((test) => (
                <option key={test}>{test}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
            >
              {statuses.map((statusText) => (
                <option key={statusText}>{statusText}</option>
              ))}
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black mt-5 hover:bg-[#d8e7e4] transition"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[#0f766e] font-black mb-2">
            Laboratuvar Kayıtları
          </p>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Sonuç listesi
          </h2>
        </div>

        <p className="text-slate-500 font-bold">
          {filteredResults.length} kayıt gösteriliyor
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {filteredResults.map((result) => (
          <Link
            key={result.id}
            to={`/laboratuvar-sonuclari/${result.id}`}
            className="group bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl">
                🧪
              </div>

              <span
                className={`px-4 py-2 rounded-full text-xs font-black ${getStatusClass(
                  result.resultStatus
                )}`}
              >
                {result.resultStatus}
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#134e4a] mt-5">
              {result.petName}
            </h3>

            <p className="text-slate-500 mt-1">
              {result.petType} • {result.ownerName}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Test Türü</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {result.testType}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Tarih</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {result.date}
                </h4>
              </div>
            </div>

            {result.patient && (
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4 mt-4">
                <p className="text-sm text-slate-500">Hasta Risk Durumu</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {result.patient.riskStatus} Risk
                </h4>
              </div>
            )}

            <p className="text-slate-500 leading-7 mt-5 flex-1">
              {result.summary}
            </p>

            <div className="flex items-center justify-between mt-6">
              <span className="bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
                Detay Gör
              </span>

              <span className="text-[#0f766e] font-black group-hover:text-[#134e4a]">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm mt-6">
          <div className="text-5xl mb-4">🔍</div>

          <h3 className="text-2xl font-black text-[#134e4a]">
            Sonuç bulunamadı
          </h3>

          <p className="text-slate-500 mt-2">
            Filtreleri değiştirerek tekrar deneyebilirsiniz.
          </p>
        </div>
      )}
    </PageContainer>
  );
}