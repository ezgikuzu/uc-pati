import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../store/appointmentSlice";
import { addApprovalRequest } from "../../store/approvalSlice";
import { fetchPatients } from "../../store/patientSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Appointment() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const selectedDoctorFromUrl = searchParams.get("doctor") || "";
  const selectedServiceFromUrl = searchParams.get("service") || "";

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const doctorSchedules = useSelector((state) => {
    return state.doctorSchedule.schedules;
  });

  const { patients, status: patientStatus } = useSelector((state) => {
    return state.patients;
  });

  const [form, setForm] = useState({
    petName: "",
    ownerName: user?.name || "",
    doctorName: selectedDoctorFromUrl,
    service: selectedServiceFromUrl || "Genel Muayene",
    date: "",
    time: "",
    note: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (patientStatus === "idle") {
      dispatch(fetchPatients());
    }
  }, [dispatch, patientStatus]);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      ownerName: user?.name || prevForm.ownerName,
    }));
  }, [user]);

  const customerEmail = user?.email;

  const myPatients = customerEmail
    ? patients.filter((patient) => {
        return patient.ownerEmail === customerEmail;
      })
    : patients.slice(0, 2);

  useEffect(() => {
    if (myPatients.length > 0 && !form.petName) {
      setForm((prevForm) => ({
        ...prevForm,
        petName: myPatients[0].petName,
      }));
    }
  }, [myPatients, form.petName]);

  const doctors = doctorSchedules.map((item) => {
    return item.doctorName;
  });

  const selectedDoctorSchedule = doctorSchedules.find((item) => {
    return item.doctorName === form.doctorName;
  });

  const availableTimes = selectedDoctorSchedule
    ? selectedDoctorSchedule.availableTimes
    : [];

  const services = [
    "Genel Muayene",
    "Aşı Takibi",
    "Laboratuvar Kontrolü",
    "Biyokimya Kontrolü",
    "Diş Bakımı",
    "Acil Destek",
  ];

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const isoDate = date.toISOString().slice(0, 10);

      const dayName = date.toLocaleDateString("tr-TR", {
        weekday: "short",
      });

      const dayNumber = date.toLocaleDateString("tr-TR", {
        day: "2-digit",
      });

      const monthName = date.toLocaleDateString("tr-TR", {
        month: "short",
      });

      days.push({
        isoDate,
        dayName,
        dayNumber,
        monthName,
      });
    }

    return days;
  }, []);

  const handleChange = (e) => {
    setIsSubmitted(false);

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDoctorChange = (e) => {
    setIsSubmitted(false);

    setForm({
      ...form,
      doctorName: e.target.value,
      date: "",
      time: "",
    });
  };

  const handleDateSelect = (date) => {
    setIsSubmitted(false);

    setForm({
      ...form,
      date,
      time: "",
    });
  };

  const handleTimeSelect = (time) => {
    setIsSubmitted(false);

    setForm({
      ...form,
      time,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      ...form,
      status: "Beklemede",
      note: form.note || "Müşteri tarafından randevu talebi oluşturuldu.",
    };

    dispatch(addAppointment(newAppointment));

    dispatch(
      addApprovalRequest({
        source: "Müşteri",
        type: "Randevu Talebi",
        title: `${form.ownerName} yeni randevu talebi oluşturdu`,
        description: `${form.petName} için ${form.service} hizmetine, ${form.doctorName} hekiminden ${form.date} tarihinde saat ${form.time} için randevu talebi oluşturuldu. Admin onayı bekliyor.`,
        createdBy: form.ownerName,
      })
    );

    setIsSubmitted(true);

    setForm({
      petName: myPatients[0]?.petName || "",
      ownerName: user?.name || "",
      doctorName: selectedDoctorFromUrl,
      service: selectedServiceFromUrl || "Genel Muayene",
      date: "",
      time: "",
      note: "",
    });
  };

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <PageHeader
          label="Randevu Al"
          title="Randevu oluşturmak için giriş yapmalısınız"
          description="Randevu işlemleri kullanıcıya özel olduğu için önce hesabınıza giriş yapmanız gerekir."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 md:p-10 shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-6">
            🔐
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Giriş yapmadan randevu alınamaz
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Evcil dostunuz için randevu oluşturmak istiyorsanız önce giriş
            yapmalısınız.
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

  return (
    <PageContainer>
      <PageHeader
        label="Randevu Al"
        title="Takvimden uygun randevu saati seçin"
        description="Önce hekimi seçin, ardından takvimden gün ve hekimin müsait saatlerinden birini işaretleyin."
      />

      <div className="grid xl:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden h-full">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            📅 Takvimli Randevu
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Randevu artık takvim üzerinden seçiliyor.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Hekim panelinde hangi saatleri uygun olarak belirlediyse müşteri
            randevu alırken sadece o saatleri seçebilir. Oluşturulan randevu
            admin onayına gönderilir.
          </p>

          <div className="relative grid gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">1. Hekim Seç</h3>
              <p className="text-white/75 mt-2">
                Randevu almak istediğiniz veteriner hekimi seçin.
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">2. Takvimden Gün Seç</h3>
              <p className="text-white/75 mt-2">
                Önümüzdeki günlerden size uygun tarihi işaretleyin.
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">3. Müsait Saati Seç</h3>
              <p className="text-white/75 mt-2">
                Sadece seçilen hekimin uygun saatleri gösterilir.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Randevu Formu
          </h2>

          <p className="text-slate-500 mt-2">
            Formu doldurun, takvimden gün ve saat seçerek randevu talebinizi
            admin onayına gönderin.
          </p>

          {isSubmitted && (
            <div className="bg-[#e7f4f2] border border-[#0f766e]/20 text-[#0f766e] rounded-3xl p-5 mt-6">
              <h3 className="font-black text-lg">
                Randevu talebiniz admin onayına gönderildi.
              </h3>

              <p className="mt-1 text-[#0f766e]/80">
                Admin onayladıktan sonra randevu durumunuz güncellenmiş kabul
                edilir.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-6 mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="petName"
                value={form.petName}
                onChange={handleChange}
                className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
                required
              >
                <option value="">Evcil hayvan seçin</option>

                {myPatients.map((patient) => (
                  <option key={patient.id} value={patient.petName}>
                    {patient.petName} - {patient.petType}
                  </option>
                ))}
              </select>

              <input
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                placeholder="Hasta sahibi"
                className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
                required
              />

              <select
                name="doctorName"
                value={form.doctorName}
                onChange={handleDoctorChange}
                className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
                required
              >
                <option value="">Hekim seçin</option>

                {doctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
                required
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-[2rem] p-5">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
                <div>
                  <p className="text-[#0f766e] font-black mb-1">
                    Takvimden Gün Seç
                  </p>

                  <h3 className="text-2xl font-black text-[#134e4a]">
                    Uygun tarih
                  </h3>
                </div>

                {form.date && (
                  <span className="bg-[#0f766e] text-white px-4 py-2 rounded-full text-sm font-black">
                    Seçilen gün: {form.date}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {calendarDays.map((day) => (
                  <button
                    key={day.isoDate}
                    type="button"
                    onClick={() => handleDateSelect(day.isoDate)}
                    className={
                      form.date === day.isoDate
                        ? "bg-[#0f766e] text-white border border-[#0f766e] rounded-2xl p-4 text-center font-black"
                        : "bg-white text-[#134e4a] border border-[#d8e7e4] rounded-2xl p-4 text-center font-black hover:bg-[#e7f4f2] transition"
                    }
                  >
                    <span className="block text-sm opacity-80">
                      {day.dayName}
                    </span>

                    <span className="block text-3xl mt-1">
                      {day.dayNumber}
                    </span>

                    <span className="block text-xs mt-1">
                      {day.monthName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-[2rem] p-5">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
                <div>
                  <p className="text-[#0f766e] font-black mb-1">
                    Müsait Saat Seç
                  </p>

                  <h3 className="text-2xl font-black text-[#134e4a]">
                    Hekimin uygun saatleri
                  </h3>
                </div>

                {form.time && (
                  <span className="bg-[#0f766e] text-white px-4 py-2 rounded-full text-sm font-black">
                    Seçilen saat: {form.time}
                  </span>
                )}
              </div>

              {!form.doctorName && (
                <div className="bg-white border border-[#d8e7e4] rounded-2xl p-5 text-slate-500 font-bold">
                  Saatleri görmek için önce hekim seçin.
                </div>
              )}

              {form.doctorName && availableTimes.length === 0 && (
                <div className="bg-orange-100 text-orange-700 rounded-2xl p-5 font-bold">
                  Bu hekimin henüz uygun saati yok. Hekim panelinden uygun saat
                  eklenmelidir.
                </div>
              )}

              {form.doctorName && availableTimes.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      disabled={!form.date}
                      className={
                        form.time === time
                          ? "bg-[#0f766e] text-white border border-[#0f766e] px-5 py-4 rounded-2xl font-black"
                          : !form.date
                          ? "bg-slate-100 text-slate-400 border border-slate-200 px-5 py-4 rounded-2xl font-black cursor-not-allowed"
                          : "bg-white text-[#134e4a] border border-[#d8e7e4] px-5 py-4 rounded-2xl font-black hover:bg-[#e7f4f2] transition"
                      }
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}

              {form.doctorName && availableTimes.length > 0 && !form.date && (
                <p className="text-slate-500 mt-4 font-bold">
                  Saat seçmek için önce takvimden gün işaretleyin.
                </p>
              )}
            </div>

            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Ek not"
              rows="4"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            />

            <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5">
              <h3 className="text-xl font-black text-[#134e4a] mb-3">
                Randevu Özeti
              </h3>

              <div className="grid md:grid-cols-2 gap-3 text-slate-600">
                <p>
                  <span className="font-black text-[#134e4a]">Hasta:</span>{" "}
                  {form.petName || "Seçilmedi"}
                </p>

                <p>
                  <span className="font-black text-[#134e4a]">Hekim:</span>{" "}
                  {form.doctorName || "Seçilmedi"}
                </p>

                <p>
                  <span className="font-black text-[#134e4a]">Tarih:</span>{" "}
                  {form.date || "Seçilmedi"}
                </p>

                <p>
                  <span className="font-black text-[#134e4a]">Saat:</span>{" "}
                  {form.time || "Seçilmedi"}
                </p>

                <p className="md:col-span-2">
                  <span className="font-black text-[#134e4a]">Hizmet:</span>{" "}
                  {form.service}
                </p>
              </div>
            </div>

            <button
              disabled={!form.petName || !form.doctorName || !form.date || !form.time}
              className={
                !form.petName || !form.doctorName || !form.date || !form.time
                  ? "bg-slate-300 text-white px-6 py-4 rounded-2xl font-black cursor-not-allowed"
                  : "bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition"
              }
            >
              Admin Onayına Randevu Gönder
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}