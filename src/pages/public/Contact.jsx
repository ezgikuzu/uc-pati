import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitMessage } from "../../store/messagesSlice";

export default function Contact() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      submitMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      })
    );

    setSuccessMessage("Mesajınız başarıyla admine gönderildi.");

    setFormData({
      name: isLoggedIn && user ? user.name : "",
      email: isLoggedIn && user ? user.email : "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#f3f8f7] px-4 py-12">
      <section className="max-w-5xl mx-auto bg-white border border-[#d8e7e4] rounded-[2rem] p-8 shadow-sm">
        <span className="inline-flex bg-[#e8f5f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
          İletişim
        </span>

        <h1 className="text-4xl font-black text-[#134e4a] mt-5">
          Bizimle İletişime Geçin
        </h1>

        <p className="text-slate-500 mt-4 leading-7">
          Sorularınız, randevu talepleriniz veya önerileriniz için formu
          doldurabilirsiniz. Gönderilen mesajlar admin paneline düşer.
        </p>

        {successMessage && (
          <div className="mt-6 bg-green-100 border border-green-300 text-green-700 rounded-2xl px-5 py-4 font-bold">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5 mt-8">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-bold text-[#134e4a]">Ad Soyad</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Adınızı yazın"
                className="w-full mt-2 border border-[#d8e7e4] rounded-2xl p-4 outline-none focus:border-[#0f766e]"
              />
            </div>

            <div>
              <label className="font-bold text-[#134e4a]">E-posta</label>

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="E-posta adresiniz"
                className="w-full mt-2 border border-[#d8e7e4] rounded-2xl p-4 outline-none focus:border-[#0f766e]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-bold text-[#134e4a]">Telefon</label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telefon numaranız"
                className="w-full mt-2 border border-[#d8e7e4] rounded-2xl p-4 outline-none focus:border-[#0f766e]"
              />
            </div>

            <div>
              <label className="font-bold text-[#134e4a]">Konu</label>

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Mesaj konusu"
                className="w-full mt-2 border border-[#d8e7e4] rounded-2xl p-4 outline-none focus:border-[#0f766e]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#134e4a]">Mesaj</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Mesajınızı yazın"
              className="w-full mt-2 border border-[#d8e7e4] rounded-2xl p-4 outline-none focus:border-[#0f766e] resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0f766e] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition"
          >
            Mesaj Gönder
          </button>
        </form>
      </section>
    </main>
  );
}