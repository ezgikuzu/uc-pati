import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  deleteAppointment,
} from "../../store/appointmentSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function MyAppointments() {
  const dispatch = useDispatch();

  const appointments = useSelector((state) => state.appointments.appointments);
  const { isLoggedIn, user, role } = useSelector((state) => state.auth);

  const myAppointments =
    role === "customer" && user?.name
      ? appointments.filter((appointment) => appointment.ownerName === user.name)
      : appointments;

  const approvedCount = myAppointments.filter((item) => {
    return item.status === "Onaylandı";
  }).length;

  const waitingCount = myAppointments.filter((item) => {
    return item.status === "Beklemede";
  }).length;

  const cancelledCount = myAppointments.filter((item) => {
    return item.status === "İptal Edildi";
  }).length;

  const getStatusClass = (status) => {
    if (status === "Onaylandı") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    if (status === "Beklemede") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-600";
  };

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <PageHeader
          label="Randevularım"
          title="Randevuları görmek için giriş yapmalısınız"
          description="Randevu kayıtları kullanıcıya özel olduğu için giriş yaptıktan sonra görüntülenebilir."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 md:p-10 shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-6">
            🔐
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Giriş yapmadan randevular görüntülenemez
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Randevularınızı görmek için önce hesabınıza giriş yapmanız gerekir.
          </p>

          <Link
            to="/giris-yap"
            className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black mt-7 hover:bg-[#134e4a] transition"
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
        label="Randevularım"
        title="Randevu takip ekranı"
        description="Geçmiş ve yaklaşan randevularınızı buradan görüntüleyebilir, bekleyen randevuları iptal edebilirsiniz."
      />

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl mb-4">
            📅
          </div>
          <p className="text-slate-500 font-bold">Toplam</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {myAppointments.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-2xl mb-4">
            ✅
          </div>
          <p className="text-slate-500 font-bold">Onaylandı</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {approvedCount}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-2xl mb-4">
            ⏳
          </div>
          <p className="text-slate-500 font-bold">Beklemede</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {waitingCount}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4">
            ✖️
          </div>
          <p className="text-slate-500 font-bold">İptal</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {cancelledCount}
          </h3>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p className="text-[#0f766e] font-black mb-2">
            Randevu Listesi
          </p>
          <h2 className="text-3xl font-black text-[#134e4a]">
            Kayıtlı randevular
          </h2>
        </div>

        <Link
          to="/randevu-al"
          className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition text-center"
        >
          Yeni Randevu Al
        </Link>
      </div>

      {myAppointments.length === 0 ? (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">📅</div>
          <h2 className="text-3xl font-black text-[#134e4a]">
            Randevu bulunamadı
          </h2>
          <p className="text-slate-500 mt-3">
            Yeni bir randevu oluşturduğunuzda burada listelenir.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {myAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-flex px-4 py-2 rounded-full text-sm font-black ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>

                  <h3 className="text-3xl font-black text-[#134e4a] mt-4">
                    {appointment.petName}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    {appointment.service}
                  </p>
                </div>

                <div className="text-4xl">📅</div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Tarih</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {appointment.date}
                  </h4>
                </div>

                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4">
                  <p className="text-sm text-slate-500">Saat</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {appointment.time}
                  </h4>
                </div>

                <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-4 sm:col-span-2">
                  <p className="text-sm text-slate-500">Hekim</p>
                  <h4 className="font-black text-[#134e4a] mt-1">
                    {appointment.doctorName}
                  </h4>
                </div>
              </div>

              <p className="text-slate-500 leading-7 mt-5">
                {appointment.note}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {appointment.status !== "İptal Edildi" && (
                  <button
                    onClick={() => dispatch(cancelAppointment(appointment.id))}
                    className="bg-orange-100 text-orange-700 px-5 py-3 rounded-full font-black hover:bg-orange-200 transition"
                  >
                    İptal Et
                  </button>
                )}

                {role === "admin" && (
                  <button
                    onClick={() => dispatch(deleteAppointment(appointment.id))}
                    className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black hover:bg-red-200 transition"
                  >
                    Sil
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}