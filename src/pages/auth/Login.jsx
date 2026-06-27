import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("customer");

  const users = {
    customer: {
      name: "Ezgi Kuzu",
      email: "ezgi@ucpati.com",
      role: "customer",
      panelPath: "/musteri-panel",
      title: "Müşteri Girişi",
      description:
        "Evcil hayvanlarım, randevularım, sağlık karnesi ve laboratuvar sonuçları.",
      icon: "👤",
    },
    doctor: {
      name: "Ali Yılmaz",
      email: "ali.yilmaz@ucpati.com",
      role: "doctor",
      panelPath: "/hekim-panel",
      title: "Hekim Girişi",
      description:
        "Hasta bilgileri, laboratuvar sonuçları, randevu ve tedavi notları.",
      icon: "🩺",
    },
    admin: {
      name: "Admin Kullanıcısı",
      email: "admin@ucpati.com",
      role: "admin",
      panelPath: "/admin-panel",
      title: "Admin Girişi",
      description:
        "Kullanıcı yönetimi, hasta yönetimi, sistem özeti ve panel kontrolü.",
      icon: "👑",
    },
  };

  const selectedUser = users[selectedRole];

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      })
    );

    navigate(selectedUser.panelPath);
  };

  return (
    <PageContainer>
      <PageHeader
        label="Giriş Yap"
        title="Üç Pati hesabınıza giriş yapın"
        description="Proje demosunda müşteri, hekim veya admin rolü seçerek ilgili panele giriş yapabilirsiniz."
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🔐 Rol Bazlı Giriş
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Her rol kendi paneline yönlendirilir.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Müşteri, hekim ve admin için farklı yetki alanları vardır. Bu yapı
            sayesinde projede ProtectedRoute, Redux auth state ve panel
            yönlendirmesi birlikte kullanılır.
          </p>

          <div className="relative space-y-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">Müşteri</h3>
              <p className="text-white/75 mt-2">
                Randevu alır, sağlık karnesini ve laboratuvar sonuçlarını görür.
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">Hekim</h3>
              <p className="text-white/75 mt-2">
                Hasta bilgilerini ve tetkik sonuçlarını takip eder.
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-xl font-black">Admin</h3>
              <p className="text-white/75 mt-2">
                Kullanıcı, hasta ve sistem yönetim alanlarına erişir.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Demo Giriş Paneli
          </h2>

          <p className="text-slate-500 mt-2">
            Şifre sistemi yerine derste anlatması kolay olsun diye rol seçimiyle
            giriş yaptırıyoruz.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {Object.entries(users).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedRole(key)}
                className={
                  selectedRole === key
                    ? "border-2 border-[#0f766e] bg-[#e7f4f2] rounded-3xl p-5 text-left"
                    : "border border-[#d8e7e4] bg-white rounded-3xl p-5 text-left hover:bg-[#f3f8f7] transition"
                }
              >
                <div className="text-4xl mb-4">{item.icon}</div>

                <h3 className="font-black text-[#134e4a]">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm leading-6 mt-2">
                  {item.description}
                </p>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="mt-7">
            <div className="grid gap-4">
              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Ad Soyad</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {selectedUser.name}
                </h3>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">E-posta</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {selectedUser.email}
                </h3>
              </div>

              <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-2xl p-5">
                <p className="text-sm text-slate-500">Gidilecek Panel</p>
                <h3 className="font-black text-[#134e4a] mt-1">
                  {selectedUser.panelPath}
                </h3>
              </div>
            </div>

            <button className="w-full bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition mt-6">
              {selectedUser.title} Yap
            </button>

            <Link
              to="/"
              className="block text-center bg-[#e7f4f2] text-[#0f766e] px-6 py-4 rounded-2xl font-black hover:bg-[#d8e7e4] transition mt-3"
            >
              Ana Sayfaya Dön
            </Link>

            <p className="text-center text-sm text-slate-500 mt-4">
              Hesabınız yok mu?{" "}
              <Link
                to="/kayit-ol"
                className="text-[#0f766e] font-black hover:underline"
              >
                Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}