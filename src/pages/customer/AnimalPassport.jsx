import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../store/patientSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function AnimalPassport() {
  const dispatch = useDispatch();

  const { patients, status } = useSelector((state) => state.patients);
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, status]);

  const visiblePatients =
    role === "customer" && user?.email
      ? patients.filter((patient) => patient.ownerEmail === user.email)
      : patients;

  return (
    <PageContainer>
      <PageHeader
        label="Hayvan Pasaportu"
        title="Evcil dostların dijital pasaportu"
        description="Kimlik, mikroçip, aşı, sahip ve sağlık bilgilerini pasaport formatında görüntüleyebilirsiniz."
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visiblePatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm"
          >
            <div className="bg-[#0f766e] text-white p-6">
              <span className="inline-flex bg-white/15 px-4 py-2 rounded-full text-xs font-black">
                Dijital Pasaport
              </span>

              <h2 className="text-4xl font-black mt-5">
                {patient.petName}
              </h2>

              <p className="text-white/75 mt-2">
                {patient.petType} • {patient.breed}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Pasaport No</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  UCP-{patient.id.toString().padStart(4, "0")}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Yaş</p>
                  <h3 className="font-black text-[#134e4a] mt-1">
                    {patient.age}
                  </h3>
                </div>

                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Cinsiyet</p>
                  <h3 className="font-black text-[#134e4a] mt-1">
                    {patient.gender}
                  </h3>
                </div>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Mikroçip No</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {patient.microchipNo}
                </h3>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Hasta Sahibi</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {patient.ownerName}
                </h3>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Aşı Durumu</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {patient.vaccineStatus}
                </h3>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                <p className="text-sm text-slate-500">Risk Durumu</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {patient.riskStatus} Risk
                </h3>
              </div>

              <div className="bg-[#e7f4f2] border border-[#0f766e]/20 rounded-2xl p-4">
                <p className="text-sm text-[#0f766e] font-bold">
                  Sorumlu Hekim
                </p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {patient.doctor}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visiblePatients.length === 0 && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">📘</div>
          <h2 className="text-3xl font-black text-[#134e4a]">
            Pasaport kaydı bulunamadı
          </h2>
          <p className="text-slate-500 mt-3">
            Hayvan bilgileri sisteme eklendiğinde burada görünecek.
          </p>
        </div>
      )}
    </PageContainer>
  );
}