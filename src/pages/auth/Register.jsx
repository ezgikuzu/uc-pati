import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Ad soyad alanı boş bırakılamaz.");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    // Save user to Redux auth state (same structure as login)
    dispatch(
      login({
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
      })
    );

    // Redirect to the correct panel
    if (form.role === "doctor") {
      navigate("/hekim-panel");
    } else {
      navigate("/musteri-panel");
    }
  };

  return (
    <PageContainer>
      <PageHeader
        label="Kayıt Ol"
        title="Üç Pati hesabı oluşturun"
        description="Müşteri veya veteriner hekim olarak kayıt olabilirsiniz. Admin hesabı yalnızca sistem yöneticileri tarafından oluşturulur."
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        {/* Left info panel */}
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🐾 Kayıt Ol
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Evcil dostunuz için hesap açın.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Kayıt olduktan sonra randevu alabilir, sağlık karnesini takip
            edebilir, laboratuvar sonuçlarınıza ulaşabilirsiniz.
          </p>

          <div className="relative space-y-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">👤 Müşteri</h3>
              <p className="text-white/75 mt-2">
                Randevu alır, sağlık karnesini ve laboratuvar sonuçlarını görür.
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">🩺 Veteriner Hekim</h3>
              <p className="text-white/75 mt-2">
                Hasta bilgilerini ve tetkik sonuçlarını takip eder.
              </p>
            </div>
          </div>
        </div>

        {/* Right register form */}
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Yeni Hesap Oluştur
          </h2>

          <p className="text-slate-500 mt-2">
            Bilgilerinizi doldurun ve hesabınızı oluşturun.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mt-5 font-bold text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
            {/* Full name */}
            <div>
              <label className="font-bold text-[#134e4a] text-sm">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Adınızı ve soyadınızı girin"
                className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-2 text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-bold text-[#134e4a] text-sm">
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ornek@mail.com"
                className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-2 text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-bold text-[#134e4a] text-sm">
                Şifre
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="En az 6 karakter"
                className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-2 text-sm"
                required
              />
            </div>

            {/* Role selection */}
            <div>
              <label className="font-bold text-[#134e4a] text-sm">
                Hesap Türü
              </label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "customer" })}
                  className={`border-2 rounded-2xl p-4 text-left transition cursor-pointer ${
                    form.role === "customer"
                      ? "border-[#0f766e] bg-[#e7f4f2]"
                      : "border-[#d8e7e4] bg-white hover:bg-[#f3f8f7]"
                  }`}
                >
                  <div className="text-2xl mb-2">👤</div>
                  <p className="font-black text-[#134e4a] text-sm">Müşteri</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Randevu ve takip
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "doctor" })}
                  className={`border-2 rounded-2xl p-4 text-left transition cursor-pointer ${
                    form.role === "doctor"
                      ? "border-[#0f766e] bg-[#e7f4f2]"
                      : "border-[#d8e7e4] bg-white hover:bg-[#f3f8f7]"
                  }`}
                >
                  <div className="text-2xl mb-2">🩺</div>
                  <p className="font-black text-[#134e4a] text-sm">
                    Veteriner Hekim
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    Hasta yönetimi
                  </p>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition mt-2 cursor-pointer"
            >
              Kayıt Ol
            </button>

            <div className="text-center text-sm text-slate-500 mt-1">
              Zaten hesabınız var mı?{" "}
              <Link
                to="/giris-yap"
                className="text-[#0f766e] font-black hover:underline"
              >
                Giriş Yap
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
