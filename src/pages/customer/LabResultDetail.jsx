import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabResults } from "../../store/labSlice";
import { fetchPatients } from "../../store/patientSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function LabResultDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { results: labResults, status, error } = useSelector(
    (state) => state.labResults
  );

  const { patients, status: patientStatus } = useSelector(
    (state) => state.patients
  );

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLabResults());
    }

    if (patientStatus === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status, patientStatus]);

  const result = labResults.find((item) => item.id === Number(id));

  const patient = result
    ? patients.find((item) => item.id === result.patientId)
    : null;

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

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <PageHeader
          label="Laboratuvar Detayı"
          title="Bu sonucu görüntülemek için giriş yapmalısınız"
          description="Laboratuvar sonuçları kullanıcıya özel olduğu için detayları görmek için hesabınıza giriş yapmanız gerekir."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 md:p-10 shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-6">
            🔐
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Giriş yapmadan detay görüntülenemez
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Laboratuvar detayları sağlık kaydı niteliğinde olduğu için giriş
            yaptıktan sonra görüntülenebilir.
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
          label="Laboratuvar Detayı"
          title="Sonuç detayı yükleniyor"
          description="Laboratuvar ve hasta bilgileri sistemden alınıyor."
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
          label="Laboratuvar Detayı"
          title="Sonuç alınamadı"
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

  if (!result) {
    return (
      <PageContainer>
        <PageHeader
          label="Laboratuvar Detayı"
          title="Sonuç bulunamadı"
          description="Aradığınız laboratuvar sonucu sistemde bulunamadı."
        />

        <Link
          to="/laboratuvar-sonuclari"
          className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
        >
          Laboratuvar Sonuçlarına Dön
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        label="Laboratuvar Detayı"
        title={`${result.petName} - ${result.testType}`}
        description={`${result.date} tarihli laboratuvar sonucu, hekim yorumu ve hasta bilgileri.`}
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="space-y-6">
          <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

            <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
              🧪 {result.testType}
            </span>

            <h2 className="relative text-4xl font-black mt-6 leading-tight">
              {result.petName}
            </h2>

            <p className="relative text-white/80 leading-8 mt-4">
              {result.petType} • {result.ownerName}
            </p>

            <div className="relative grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white/15 rounded-2xl p-5">
                <p className="text-white/60 text-sm">Sonuç Durumu</p>
                <h3 className="text-2xl font-black mt-1">
                  {result.resultStatus}
                </h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5">
                <p className="text-white/60 text-sm">Test Tarihi</p>
                <h3 className="text-2xl font-black mt-1">
                  {result.date}
                </h3>
              </div>
            </div>
          </div>

          {patient && (
            <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
              <h3 className="text-2xl font-black text-[#134e4a]">
                Hasta Bilgileri
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Cins</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {patient.breed}
                  </h4>
                </div>

                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Yaş</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {patient.age}
                  </h4>
                </div>

                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Risk</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {patient.riskStatus} Risk
                  </h4>
                </div>

                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                  <p className="text-sm text-slate-500">Sorumlu Hekim</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {patient.doctor}
                  </h4>
                </div>

                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 sm:col-span-2">
                  <p className="text-sm text-slate-500">Tedavi Notu</p>
                  <h4 className="font-bold text-[#134e4a] mt-1 leading-7">
                    {patient.treatmentNote}
                  </h4>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-2xl font-black text-[#134e4a]">
              Genel Bilgiler
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Hekim</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {result.doctor}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Durum</p>
                <h4 className="font-black text-[#134e4a] mt-1">
                  {result.status}
                </h4>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 sm:col-span-2">
                <p className="text-sm text-slate-500">Özet</p>
                <h4 className="font-bold text-[#134e4a] mt-1 leading-7">
                  {result.summary}
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-2xl font-black text-[#134e4a]">
              Hekim Yorumu
            </h3>

            <p className="text-slate-500 leading-8 mt-4">
              {result.doctorNote}
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-black text-[#134e4a]">
                Test Değerleri
              </h3>

              <p className="text-slate-500 mt-1">
                Parametre, sonuç değeri ve referans aralıkları.
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-black ${getStatusClass(
                result.resultStatus
              )}`}
            >
              {result.resultStatus}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-slate-500 text-sm">
                  <th className="px-4 py-2">Parametre</th>
                  <th className="px-4 py-2">Değer</th>
                  <th className="px-4 py-2">Referans</th>
                  <th className="px-4 py-2">Durum</th>
                </tr>
              </thead>

              <tbody>
                {result.values.map((item, index) => (
                  <tr key={index} className="bg-[#f3f8f7]">
                    <td className="px-4 py-4 rounded-l-2xl font-black text-[#134e4a]">
                      {item.parameter}
                    </td>

                    <td className="px-4 py-4 text-slate-600 font-bold">
                      {item.value}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {item.reference}
                    </td>

                    <td className="px-4 py-4 rounded-r-2xl">
                      <span
                        className={`px-3 py-2 rounded-full text-xs font-black ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 mt-6">
            <h4 className="font-black text-[#134e4a]">Bilgilendirme</h4>

            <p className="text-slate-500 leading-7 mt-2">
              Bu değerler örnek proje verisidir. Gerçek sağlık değerlendirmesi
              için veteriner hekimin yorumu esas alınmalıdır.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/laboratuvar-sonuclari"
              className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
            >
              Sonuçlara Dön
            </Link>

            <Link
              to="/randevu-al"
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
            >
              Hekime Danış
            </Link>

            {patient && (
              <Link
                to={`/hasta-yonetimi/${patient.id}`}
                className="bg-white border border-[#d8e7e4] text-[#134e4a] px-6 py-3 rounded-full font-black hover:bg-[#f3f8f7] transition"
              >
                Hasta Detayına Git
              </Link>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}