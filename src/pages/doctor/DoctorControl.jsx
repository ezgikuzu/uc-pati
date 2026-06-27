import { useDispatch, useSelector } from "react-redux";
import {
  approveRequest,
  deleteRequest,
  rejectRequest,
} from "../../store/approvalSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function DoctorControl() { 
  const dispatch = useDispatch();

  const requests = useSelector((state) => state.approvals.requests);
  const patients = useSelector((state) => state.patients.patients);
  const labResults = useSelector((state) => state.labResults.results);
  const appointments = useSelector((state) => state.appointments.appointments);

  const doctorRequests = requests.filter((item) => {
    return item.source === "Hekim";
  });

  const pendingRequests = doctorRequests.filter((item) => {
    return item.status === "Beklemede";
  });

  const approvedRequests = doctorRequests.filter((item) => {
    return item.status === "Onaylandı";
  });

  const rejectedRequests = doctorRequests.filter((item) => {
    return item.status === "Reddedildi";
  });

  const getStatusClass = (status) => {
    if (status === "Onaylandı") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    if (status === "Beklemede") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-600";
  };

  return (
    <PageContainer>
      <PageHeader
        label="Admin Kontrol Paneli"
        title="Hekim Kontrolü"
        description="Hekim tarafından yapılan ürün ekleme, hasta işlemleri, randevu takibi ve laboratuvar sonuçları admin tarafından onaylanır."
      />

      <section className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Bekleyen</p>
          <h3 className="text-4xl font-black text-orange-600 mt-2">
            {pendingRequests.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Onaylanan</p>
          <h3 className="text-4xl font-black text-[#0f766e] mt-2">
            {approvedRequests.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Reddedilen</p>
          <h3 className="text-4xl font-black text-red-600 mt-2">
            {rejectedRequests.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Toplam Hekim İşlemi</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {doctorRequests.length}
          </h3>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-xl font-black text-[#134e4a]">
            Hasta Kontrolü
          </h3>
          <p className="text-slate-500 mt-2">
            Sistemde {patients.length} hasta kaydı var. Hekim notları ve risk güncellemeleri admin onayına bağlıdır.
          </p>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-xl font-black text-[#134e4a]">
            Laboratuvar Kontrolü
          </h3>
          <p className="text-slate-500 mt-2">
            Sistemde {labResults.length} laboratuvar sonucu var. Yeni eklenen sonuçlar admin tarafından onaylanır.
          </p>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-xl font-black text-[#134e4a]">
            Randevu Kontrolü
          </h3>
          <p className="text-slate-500 mt-2">
            Sistemde {appointments.length} randevu kaydı var. Hekim randevu işlemleri admin kontrolünden geçer.
          </p>
        </div>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
        <h2 className="text-3xl font-black text-[#134e4a] mb-4">
          Hekim Ürün Ekleme Onayı
        </h2>

        <p className="text-slate-500 leading-7">
          Hekim pet shop için ürün eklediğinde ürün doğrudan yayına alınmaz.
          Önce bu panelde admin tarafından onaylanır. Bu örnek projede ürün
          ekleme talebi approvalSlice içinde “Ürün Ekleme” olarak tutulur.
        </p>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
        <h2 className="text-3xl font-black text-[#134e4a] mb-6">
          Hekim Onay Listesi
        </h2>

        <div className="space-y-4">
          {doctorRequests.map((request) => (
            <div
              key={request.id}
              className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-black">
                      {request.source}
                    </span>

                    <span className="bg-white text-[#134e4a] px-4 py-2 rounded-full text-xs font-black">
                      {request.type}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#134e4a]">
                    {request.title}
                  </h3>

                  <p className="text-slate-500 leading-7 mt-2">
                    {request.description}
                  </p>

                  <p className="text-sm text-slate-400 mt-3">
                    Oluşturan: {request.createdBy} • Tarih: {request.date}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  {request.status === "Beklemede" && (
                    <>
                      <button
                        onClick={() => dispatch(approveRequest(request.id))}
                        className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black"
                      >
                        Onayla
                      </button>

                      <button
                        onClick={() => dispatch(rejectRequest(request.id))}
                        className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black"
                      >
                        Reddet
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => dispatch(deleteRequest(request.id))}
                    className="bg-white border border-[#d8e7e4] text-[#134e4a] px-5 py-3 rounded-full font-black"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}