import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);
  const { isLoggedIn, role, user } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const panelPath =
    role === "admin"
      ? "/admin-panel"
      : role === "doctor"
      ? "/hekim-panel"
      : "/musteri-panel";

  const panelLabel =
    role === "admin"
      ? "Admin Panel"
      : role === "doctor"
      ? "Hekim Panel"
      : "Müşteri Paneli";

  // Main links — always visible in the navbar
  const mainLinks = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hakkımızda", path: "/hakkimizda" },
    { name: "Hizmetler", path: "/hizmetler" },
    { name: "Randevu", path: "/randevu-al" },
    { name: "Veterinerler", path: "/veterinerlerimiz" },
    { name: "Pet Shop", path: "/pet-shop" },
  ];

  // Secondary links — shown in the side drawer
  const drawerLinks = [
    { name: "Sahiplendirme", path: "/sahiplendirme", icon: "🐶" },
    { name: "Laboratuvar", path: "/laboratuvar-sonuclari", icon: "🔬" },
    { name: "Blog", path: "/blog", icon: "📝" },
    { name: "SSS", path: "/faq", icon: "❓" },
    { name: "İletişim", path: "/iletisim", icon: "📬" },
    { name: "Vet AI", path: "/chatbot", icon: "🤖" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setDrawerOpen(false);
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header className="bg-white border-b border-[#d8e7e4] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col gap-4">

            {/* Top row: Logo + Auth actions */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <Link to="/" className="flex items-center gap-3 shrink-0">
                <span className="text-3xl lg:text-4xl leading-none text-[#0f766e]">
                  🐾
                </span>

                <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-[#134e4a] leading-none">
                    Üç Pati
                  </h1>

                  <p className="text-sm lg:text-base text-slate-500 font-black mt-1">
                    Veteriner Kliniği
                  </p>
                </div>
              </Link>

              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                {isLoggedIn && (
                  <Link
                    to={panelPath}
                    className="bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black"
                  >
                    Panelim
                  </Link>
                )}

                <Link
                  to="/favoriler"
                  className="bg-white border border-[#d8e7e4] text-[#134e4a] px-4 py-2 rounded-full text-sm font-black hover:bg-[#f3f8f7] transition"
                >
                  Favoriler{" "}
                  {favoriteItems.length > 0 && `(${favoriteItems.length})`}
                </Link>

                <Link
                  to="/sepet"
                  className="bg-white border border-[#d8e7e4] text-[#134e4a] px-4 py-2 rounded-full text-sm font-black hover:bg-[#f3f8f7] transition"
                >
                  Sepet {cartCount > 0 && `(${cartCount})`}
                </Link>

                {isLoggedIn ? (
                  <>
                    <span className="text-sm text-slate-500 font-bold px-2">
                      {user?.name}
                    </span>

                    <button
                      onClick={handleLogout}
                      className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-black hover:bg-red-200 transition cursor-pointer"
                    >
                      Çıkış
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/giris-yap"
                      className="bg-[#0f766e] text-white px-4 py-2 rounded-full text-sm font-black hover:bg-[#134e4a] transition"
                    >
                      Giriş Yap
                    </Link>

                    <Link
                      to="/kayit-ol"
                      className="bg-white border border-[#0f766e] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black hover:bg-[#e7f4f2] transition"
                    >
                      Kayıt Ol
                    </Link>
                  </>
                )}

                {/* Drawer toggle button */}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Menüyü aç"
                  className="bg-[#f3f8f7] border border-[#d8e7e4] text-[#134e4a] px-4 py-2 rounded-full text-sm font-black hover:bg-[#e7f4f2] transition cursor-pointer flex items-center gap-2"
                >
                  <span className="text-base leading-none">☰</span>
                  <span className="hidden sm:inline">Menü</span>
                </button>
              </div>
            </div>

            {/* Bottom row: Main nav links */}
            <nav className="flex flex-wrap items-center justify-center gap-2 border-t border-[#d8e7e4] pt-4">
              {mainLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#0f766e] text-white px-4 py-2 rounded-full text-sm font-black"
                      : "bg-[#f3f8f7] text-[#134e4a] px-4 py-2 rounded-full text-sm font-black hover:bg-[#e7f4f2] transition"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={closeDrawer}
        />
      )}

      {/* Side drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-white shadow-2xl border-l border-[#d8e7e4] flex flex-col transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="bg-[#f3f8f7] border-b border-[#d8e7e4] px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <p className="font-black text-[#134e4a] text-lg">Diğer Sayfalar</p>
            <p className="text-slate-500 text-xs mt-0.5">Tüm bölümlere erişin</p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Menüyü kapat"
            className="w-9 h-9 rounded-full bg-white border border-[#d8e7e4] flex items-center justify-center text-[#134e4a] font-black text-lg hover:bg-[#e7f4f2] transition cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
          {drawerLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition ${
                  isActive
                    ? "bg-[#0f766e] text-white"
                    : "bg-[#f3f8f7] text-[#134e4a] hover:bg-[#e7f4f2]"
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}

          {/* Separator */}
          {isLoggedIn && (
            <>
              <div className="border-t border-[#d8e7e4] my-3" />
              <p className="text-xs font-black text-slate-400 px-4 pb-1 uppercase tracking-wide">
                Panelim
              </p>
              <NavLink
                to={panelPath}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition ${
                    isActive
                      ? "bg-[#0f766e] text-white"
                      : "bg-[#f3f8f7] text-[#134e4a] hover:bg-[#e7f4f2]"
                  }`
                }
              >
                <span className="text-base">👤</span>
                {panelLabel}
              </NavLink>
            </>
          )}
        </nav>

        {/* Drawer footer */}
        <div className="border-t border-[#d8e7e4] px-4 py-5 shrink-0 space-y-2">
          {isLoggedIn ? (
            <>
              <p className="text-sm text-slate-500 font-bold px-1">
                {user?.name} olarak giriş yapıldı
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-black hover:bg-red-200 transition cursor-pointer"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <Link
              to="/giris-yap"
              onClick={closeDrawer}
              className="block text-center bg-[#0f766e] text-white px-4 py-3 rounded-2xl text-sm font-black hover:bg-[#134e4a] transition"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </>
  );
}