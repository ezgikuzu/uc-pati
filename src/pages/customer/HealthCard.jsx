import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../store/patientSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function HealthCard() {
  const dispatch = useDispatch();

  const { patients, status, error } = useSelector((state) => state.patients);
  const { user } = useSelector((state) => state.auth);

  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status]);

  const customerEmail = user?.email;

  const myPatients = customerEmail
    ? patients.filter((patient) => patient.ownerEmail === customerEmail)
    : patients.slice(0, 2);

  useEffect(() => {
    if (myPatients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(String(myPatients[0].id));
    }
  }, [myPatients, selectedPatientId]);

  const selectedPatient = myPatients.find((patient) => {
    return patient.id === Number(selectedPatientId);
  });

  const getRiskClass = (risk) => {
    if (risk === "Düşük") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    if (risk === "Orta") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-600";
  };

  if (status === "loading") {
    return (
      <PageContainer>
        <PageHeader
          label="Sağlık Karnesi"
          title="Sağlık bilgileri yükleniyor"
          description="Evcil dostunuzun sağlık kayıtları sistemden alınıyor."
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
          label="Sağlık Karnesi"
          title="Sağlık bilgileri alınamadı"
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
        label="Sağlık Karnesi"
        title="Dijital sağlık karnesi"
        description="Evcil dostunuzun aşı, kronik hastalık, alerji, tedavi notu ve kontrol tarihlerini buradan takip edebilirsiniz."
      />

      {myPatients.length === 0 ? (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">🐾</div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Sağlık kaydı bulunamadı
          </h2>

          <p className="text-slate-500 mt-3">
            Evcil hayvan bilgileriniz eklendiğinde sağlık karnesi burada
            görünecek.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <h2 className="text-3xl font-black text-[#134e4a]">
                  Evcil Dost Seçimi
                </h2>

                <p className="text-slate-500 mt-2">
                  Sağlık karnesini görüntülemek istediğiniz evcil dostunuzu
                  seçin.
                </p>
              </div>

              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] min-w-[260px]"
              >
                {myPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.petName} - {patient.petType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedPatient && (
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
              <div className="space-y-6">
                <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

                  <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
                    🐾 {selectedPatient.petType}
                  </span>

                  <h2 className="relative text-5xl font-black mt-6 leading-tight">
                    {selectedPatient.petName}
                  </h2>

                  <p className="relative text-white/80 leading-8 mt-4">
                    {selectedPatient.breed} • {selectedPatient.age} •{" "}
                    {selectedPatient.gender}
                  </p>

                  <div className="relative grid sm:grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/15 rounded-2xl p-5">
                      <p className="text-white/60 text-sm">Sahip</p>
                      <h3 className="text-xl font-black mt-1">
                        {selectedPatient.ownerName}
                      </h3>
                    </div>

                    <div className="bg-white/15 rounded-2xl p-5">
                      <p className="text-white/60 text-sm">Mikroçip</p>
                      <h3 className="text-xl font-black mt-1">
                        {selectedPatient.microchipNo}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
                  <h3 className="text-2xl font-black text-[#134e4a]">
                    Genel Bilgiler
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mt-5">
                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <p className="text-sm text-slate-500">Tür</p>
                      <h4 className="font-black text-[#134e4a] mt-1">
                        {selectedPatient.petType}
                      </h4>
                    </div>

                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <p className="text-sm text-slate-500">Cins</p>
                      <h4 className="font-black text-[#134e4a] mt-1">
                        {selectedPatient.breed}
                      </h4>
                    </div>

                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <p className="text-sm text-slate-500">Yaş</p>
                      <h4 className="font-black text-[#134e4a] mt-1">
                        {selectedPatient.age}
                      </h4>
                    </div>

                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <p className="text-sm text-slate-500">Cinsiyet</p>
                      <h4 className="font-black text-[#134e4a] mt-1">
                        {selectedPatient.gender}
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
                        Sağlık Durumu
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Aşı, alerji, kronik hastalık ve risk bilgileri.
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-black ${getRiskClass(
                        selectedPatient.riskStatus
                      )}`}
                    >
                      {selectedPatient.riskStatus} Risk
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <div className="text-2xl mb-3">💉</div>
                      <p className="text-sm text-slate-500">Aşı Durumu</p>
                      <h4 className="font-black text-[#134e4a] mt-1 leading-6">
                        {selectedPatient.vaccineStatus}
                      </h4>
                    </div>

                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <div className="text-2xl mb-3">🩺</div>
                      <p className="text-sm text-slate-500">Kronik Hastalık</p>
                      <h4 className="font-black text-[#134e4a] mt-1 leading-6">
                        {selectedPatient.chronicDisease}
                      </h4>
                    </div>

                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <div className="text-2xl mb-3">⚠️</div>
                      <p className="text-sm text-slate-500">Alerji</p>
                      <h4 className="font-black text-[#134e4a] mt-1 leading-6">
                        {selectedPatient.allergy}
                      </h4>
                    </div>

                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <div className="text-2xl mb-3">👩‍⚕️</div>
                      <p className="text-sm text-slate-500">Sorumlu Hekim</p>
                      <h4 className="font-black text-[#134e4a] mt-1 leading-6">
                        {selectedPatient.doctor}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
                  <h3 className="text-2xl font-black text-[#134e4a]">
                    Tedavi ve Kontrol Bilgisi
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mt-5">
                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <p className="text-sm text-slate-500">Son Muayene</p>
                      <h4 className="font-black text-[#134e4a] mt-1">
                        {selectedPatient.lastVisit}
                      </h4>
                    </div>

                    <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                      <p className="text-sm text-slate-500">Sonraki Kontrol</p>
                      <h4 className="font-black text-[#134e4a] mt-1">
                        {selectedPatient.nextControl}
                      </h4>
                    </div>
                  </div>

                  <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 mt-5">
                    <p className="text-sm text-slate-500">Tedavi Notu</p>
                    <h4 className="font-bold text-[#134e4a] mt-1 leading-7">
                      {selectedPatient.treatmentNote}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}