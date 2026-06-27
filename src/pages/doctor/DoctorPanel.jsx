import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDoctorSchedule } from "../../store/doctorScheduleSlice";
import { addPendingLabResult, fetchLabResults } from "../../store/labSlice";
import { fetchPatients } from "../../store/patientSlice";
import { addPendingBlog } from "../../store/blogSlice";
import { respondToMessage } from "../../store/messagesSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function DoctorPanel() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { patients, status: patientStatus } = useSelector((state) => {
    return state.patients;
  });

  const {
    results: labResults,
    pendingResults,
    status: labStatus,
  } = useSelector((state) => {
    return state.labResults;
  });

  const appointments = useSelector((state) => {
    return state.appointments.appointments;
  });

  const messages = useSelector((state) => {
    return state.messages.messages;
  });

  const schedules = useSelector((state) => {
    return state.doctorSchedule.schedules;
  });

  const pendingBlogs = useSelector((state) => {
    return state.blogs.pendingBlogs;
  });

  const doctorName = user?.name?.startsWith("Veteriner Hekim")
    ? user.name
    : "Veteriner Hekim Ali Yılmaz";

  const doctorSchedule = schedules.find((item) => {
    return item.doctorName === doctorName;
  });

  const [selectedTimes, setSelectedTimes] = useState(
    doctorSchedule?.availableTimes || []
  );

  const [message, setMessage] = useState("");

  const [replies, setReplies] = useState({});

  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "Kedi Sağlığı",
    image: "",
    summary: "",
    content: "",
  });

  const [labForm, setLabForm] = useState({
    patientId: "",
    testType: "Kan Tahlili",
    resultStatus: "Normal",
    summary: "",
    doctorNote: "",
    parameter1: "WBC",
    value1: "",
    reference1: "5.5 - 19.5",
    status1: "Normal",
    parameter2: "RBC",
    value2: "",
    reference2: "5.0 - 10.0",
    status2: "Normal",
  });

  const allTimes = [
    "09:00",
    "10:00",
    "11:00",
    "13:30",
    "14:30",
    "15:30",
    "16:30",
  ];

  useEffect(() => {
    if (patientStatus === "idle") {
      dispatch(fetchPatients());
    }

    if (labStatus === "idle") {
      dispatch(fetchLabResults());
    }
  }, [dispatch, patientStatus, labStatus]);

  const waitingAppointments = appointments.filter((appointment) => {
    return appointment.status === "Beklemede";
  });

  const approvedMessages = messages.filter((msg) => msg.status === "Onaylandı");

  const doctorPendingLabs = pendingResults.filter((result) => {
    return result.doctor === doctorName;
  });

  const doctorPendingBlogs = pendingBlogs.filter((blog) => {
    return blog.createdBy === doctorName;
  });

  const selectedPatient = patients.find((patient) => {
    return patient.id === Number(labForm.patientId);
  });

  const handleTimeToggle = (time) => {
    setMessage("");

    if (selectedTimes.includes(time)) {
      setSelectedTimes(
        selectedTimes.filter((selectedTime) => {
          return selectedTime !== time;
        })
      );
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const saveSchedule = () => {
    dispatch(
      updateDoctorSchedule({
        doctorName,
        availableTimes: selectedTimes,
      })
    );

    setMessage(
      "Uygun saatler kaydedildi. Müşteri randevu alırken bu saatleri görecek."
    );
  };

  const handleSendReply = (e, messageId) => {
    e.preventDefault();
    const replyText = replies[messageId]?.trim();
    if (!replyText) return;

    dispatch(
      respondToMessage({
        id: messageId,
        response: replyText,
        doctorName: doctorName,
      })
    );

    setReplies((prev) => ({
      ...prev,
      [messageId]: "",
    }));

    setMessage("Mesaj başarıyla yanıtlandı ve müşteriye iletildi.");
  };

  const handleBlogChange = (e) => {
    setMessage("");

    setBlogForm({
      ...blogForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlogImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setBlogForm((prevForm) => ({
        ...prevForm,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addPendingBlog({
        ...blogForm,
        createdBy: doctorName,
        image:
          blogForm.image ||
          "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=90",
      })
    );

    setBlogForm({
      title: "",
      category: "Kedi Sağlığı",
      image: "",
      summary: "",
      content: "",
    });

    setMessage(
      "Blog yazısı admin onayına gönderildi. Onaylanınca Blog sayfasında görünecek."
    );
  };

  const handleLabChange = (e) => {
    setMessage("");

    setLabForm({
      ...labForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLabSubmit = (e) => {
    e.preventDefault();

    if (!selectedPatient) {
      setMessage("Lütfen hasta seçin.");
      return;
    }

    dispatch(
      addPendingLabResult({
        patientId: selectedPatient.id,
        petName: selectedPatient.petName,
        petType: selectedPatient.petType,
        ownerName: selectedPatient.ownerName,
        testType: labForm.testType,
        date: new Date().toISOString().slice(0, 10),
        doctor: doctorName,
        resultStatus: labForm.resultStatus,
        summary: labForm.summary,
        doctorNote: labForm.doctorNote,
        values: [
          {
            parameter: labForm.parameter1,
            value: labForm.value1,
            reference: labForm.reference1,
            status: labForm.status1,
          },
          {
            parameter: labForm.parameter2,
            value: labForm.value2,
            reference: labForm.reference2,
            status: labForm.status2,
          },
        ],
      })
    );

    setLabForm({
      patientId: "",
      testType: "Kan Tahlili",
      resultStatus: "Normal",
      summary: "",
      doctorNote: "",
      parameter1: "WBC",
      value1: "",
      reference1: "5.5 - 19.5",
      status1: "Normal",
      parameter2: "RBC",
      value2: "",
      reference2: "5.0 - 10.0",
      status2: "Normal",
    });

    setMessage(
      "Laboratuvar sonucu admin onayına gönderildi. Onaylandıktan sonra sonuçlar sayfasında görünecek."
    );
  };

  return (
    <PageContainer>
      <PageHeader
        label="Hekim Paneli"
        title="Hekim Kontrol Alanı"
        description="Hasta bilgileri, randevular, laboratuvar sonuçları, hayvan pasaportu, blog yazısı, ürün ekleme ve uygun saat yönetimi."
      />

      {message && (
        <div className="bg-[#e7f4f2] border border-[#0f766e]/20 text-[#0f766e] rounded-3xl p-5 mb-8">
          <h3 className="font-black">İşlem tamamlandı</h3>
          <p className="mt-1">{message}</p>
        </div>
      )}

      <section className="grid md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Hasta</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {patients.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Bekleyen Randevu</p>
          <h3 className="text-4xl font-black text-orange-600 mt-2">
            {waitingAppointments.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Lab Sonucu</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {labResults.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Onay Bekleyen</p>
          <h3 className="text-4xl font-black text-orange-600 mt-2">
            {doctorPendingLabs.length + doctorPendingBlogs.length}
          </h3>
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-5 mb-8">
        <Link
          to="/hekim-hastalari"
          className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">🐾</div>
          <h3 className="text-xl font-black text-[#134e4a]">Hasta Bilgileri</h3>
          <p className="text-slate-500 mt-2">Hasta detayları ve risk takibi.</p>
        </Link>

        <Link
          to="/laboratuvar-sonuclari"
          className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">🧪</div>
          <h3 className="text-xl font-black text-[#134e4a]">Lab Sonuçları</h3>
          <p className="text-slate-500 mt-2">Onaylı sonuçları görüntüle.</p>
        </Link>

        <Link
          to="/randevularim"
          className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-black text-[#134e4a]">Randevular</h3>
          <p className="text-slate-500 mt-2">Hasta randevularını takip et.</p>
        </Link>

        <Link
          to="/hayvan-pasaportu"
          className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">📘</div>
          <h3 className="text-xl font-black text-[#134e4a]">
            Hayvan Pasaportu
          </h3>
          <p className="text-slate-500 mt-2">Kimlik ve sağlık kayıtları.</p>
        </Link>
      </section>

      <section className="grid xl:grid-cols-2 gap-8 items-start mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm h-full">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Laboratuvar Sonucu Gir
          </h2>

          <p className="text-slate-500 mt-2">
            Hekim lab sonucu girer. Sonuç admin onayından sonra sistemde görünür.
          </p>

          <form
            onSubmit={handleLabSubmit}
            className="grid md:grid-cols-2 gap-4 mt-6"
          >
            <select
              name="patientId"
              value={labForm.patientId}
              onChange={handleLabChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            >
              <option value="">Hasta seçin</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.petName} - {patient.ownerName}
                </option>
              ))}
            </select>

            {selectedPatient && (
              <div className="md:col-span-2 bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Seçilen Hasta</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {selectedPatient.petName} • {selectedPatient.petType} •{" "}
                  {selectedPatient.breed}
                </h3>
                <p className="text-slate-500 mt-2">
                  Sahip: {selectedPatient.ownerName} • Risk:{" "}
                  {selectedPatient.riskStatus}
                </p>
              </div>
            )}

            <select
              name="testType"
              value={labForm.testType}
              onChange={handleLabChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Kan Tahlili</option>
              <option>Biyokimya</option>
              <option>Parazit Testi</option>
              <option>Böbrek Fonksiyon Testi</option>
            </select>

            <select
              name="resultStatus"
              value={labForm.resultStatus}
              onChange={handleLabChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Normal</option>
              <option>Takip Gerekli</option>
              <option>Bekleniyor</option>
            </select>

            <input
              name="parameter1"
              value={labForm.parameter1}
              onChange={handleLabChange}
              placeholder="Parametre 1"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <input
              name="value1"
              value={labForm.value1}
              onChange={handleLabChange}
              placeholder="Değer 1"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <input
              name="reference1"
              value={labForm.reference1}
              onChange={handleLabChange}
              placeholder="Referans 1"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <select
              name="status1"
              value={labForm.status1}
              onChange={handleLabChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Normal</option>
              <option>Takip Gerekli</option>
            </select>

            <input
              name="parameter2"
              value={labForm.parameter2}
              onChange={handleLabChange}
              placeholder="Parametre 2"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <input
              name="value2"
              value={labForm.value2}
              onChange={handleLabChange}
              placeholder="Değer 2"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <input
              name="reference2"
              value={labForm.reference2}
              onChange={handleLabChange}
              placeholder="Referans 2"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <select
              name="status2"
              value={labForm.status2}
              onChange={handleLabChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Normal</option>
              <option>Takip Gerekli</option>
            </select>

            <textarea
              name="summary"
              value={labForm.summary}
              onChange={handleLabChange}
              placeholder="Sonuç özeti"
              rows="3"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            />

            <textarea
              name="doctorNote"
              value={labForm.doctorNote}
              onChange={handleLabChange}
              placeholder="Hekim notu"
              rows="3"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            />

            <button className="md:col-span-2 bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition">
              Lab Sonucunu Admin Onayına Gönder
            </button>
          </form>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm h-full">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Uygun Saatleri Belirle
          </h2>

          <p className="text-slate-500 mt-2">
            Müşteri randevu alırken sadece seçtiğiniz saatleri görebilecek.
          </p>

          <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5 mt-6">
            <p className="text-slate-500 text-sm">Hekim</p>
            <h3 className="font-black text-[#134e4a] mt-1">{doctorName}</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
            {allTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeToggle(time)}
                className={
                  selectedTimes.includes(time)
                    ? "bg-[#0f766e] text-white px-5 py-4 rounded-2xl font-black"
                    : "bg-[#f3f8f7] border border-[#d8e7e4] text-[#134e4a] px-5 py-4 rounded-2xl font-black"
                }
              >
                {time}
              </button>
            ))}
          </div>

          <button
            onClick={saveSchedule}
            className="w-full bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition mt-6"
          >
            Uygun Saatleri Kaydet
          </button>

          <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 mt-6">
            <h3 className="font-black text-[#134e4a]">Seçili Saatler</h3>
            <p className="text-slate-500 mt-2">
              {selectedTimes.length > 0
                ? selectedTimes.join(", ")
                : "Henüz saat seçilmedi."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-2 gap-8 items-start mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm h-full">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Cevap Bekleyen Sorular
          </h2>

          <p className="text-slate-500 mt-2">
            Müşteriler tarafından gönderilen ve admin tarafından onaylanan soruları buradan yanıtlayabilirsiniz.
          </p>

          <div className="space-y-6 mt-6 max-h-[500px] overflow-y-auto pr-2">
            {approvedMessages.map((msg) => (
              <div key={msg.id} className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 animate-fade-in">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-black text-[#134e4a] text-lg">{msg.subject}</h4>
                    <p className="text-slate-500 text-sm mt-1">Gönderen: {msg.name} • {msg.date}</p>
                  </div>
                </div>

                <div className="bg-white border border-[#d8e7e4] rounded-2xl p-4 text-[#134e4a] text-sm leading-6 mb-4">
                  {msg.message}
                </div>

                <form onSubmit={(e) => handleSendReply(e, msg.id)} className="grid gap-3">
                  <textarea
                    value={replies[msg.id] || ""}
                    onChange={(e) => setReplies({ ...replies, [msg.id]: e.target.value })}
                    placeholder="Yanıtınızı yazın..."
                    rows="3"
                    className="w-full border border-[#d8e7e4] p-3 rounded-2xl outline-none focus:border-[#0f766e] text-sm resize-none"
                    required
                  />

                  <button className="w-full bg-[#0f766e] text-white px-5 py-3 rounded-2xl font-black text-sm hover:bg-[#134e4a] transition">
                    Cevap Gönder
                  </button>
                </form>
              </div>
            ))}

            {approvedMessages.length === 0 && (
              <p className="text-slate-500 text-center py-6">
                Cevaplanacak onaylı soru bulunmuyor.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm h-full">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Blog Yazısı Ekle
          </h2>

          <p className="text-slate-500 mt-2">
            Hekim blog yazısı ekler. Admin onayladıktan sonra Blog sayfasında
            görünür.
          </p>

          <form onSubmit={handleBlogSubmit} className="grid gap-4 mt-6">
            <input
              name="title"
              value={blogForm.title}
              onChange={handleBlogChange}
              placeholder="Blog başlığı"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <select
              name="category"
              value={blogForm.category}
              onChange={handleBlogChange}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Kedi Sağlığı</option>
              <option>Köpek Sağlığı</option>
              <option>Laboratuvar</option>
              <option>Acil Bilgilendirme</option>
              <option>Beslenme</option>
              <option>Koruyucu Hekimlik</option>
            </select>

            <label className="border border-dashed border-[#0f766e] bg-[#f3f8f7] p-4 rounded-2xl cursor-pointer text-[#0f766e] font-black text-center">
              Blog Görseli Seç
              <input
                type="file"
                accept="image/*"
                onChange={handleBlogImageChange}
                className="hidden"
              />
            </label>

            {blogForm.image && (
              <div className="h-52 rounded-3xl overflow-hidden bg-[#e7f4f2]">
                <img
                  src={blogForm.image}
                  alt="Blog ön izleme"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <textarea
              name="summary"
              value={blogForm.summary}
              onChange={handleBlogChange}
              placeholder="Kısa özet"
              rows="3"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <textarea
              name="content"
              value={blogForm.content}
              onChange={handleBlogChange}
              placeholder="Blog içeriği"
              rows="4"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <button className="bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition">
              Blog Yazısını Admin Onayına Gönder
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
        <h2 className="text-3xl font-black text-[#134e4a]">
          Onay Bekleyen İşlemlerim
        </h2>

        <div className="space-y-4 mt-6">
          {doctorPendingLabs.map((result) => (
            <div
              key={result.id}
              className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
            >
              <h3 className="font-black text-[#134e4a]">
                {result.petName} - {result.testType}
              </h3>
              <p className="text-slate-500 mt-1">{result.summary}</p>
              <span className="inline-flex bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black mt-3">
                {result.status}
              </span>
            </div>
          ))}

          {doctorPendingBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
            >
              <h3 className="font-black text-[#134e4a]">{blog.title}</h3>
              <p className="text-slate-500 mt-1">{blog.summary}</p>
              <span className="inline-flex bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black mt-3">
                {blog.status}
              </span>
            </div>
          ))}

          {doctorPendingLabs.length === 0 &&
            doctorPendingBlogs.length === 0 && (
              <p className="text-slate-500">
                Henüz admin onayı bekleyen işlem yok.
              </p>
            )}
        </div>
      </section>
    </PageContainer>
  );
}