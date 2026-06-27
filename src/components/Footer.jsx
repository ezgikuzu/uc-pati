import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#134e4a] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#0f766e] flex items-center justify-center text-2xl">
                🐾
              </div>

              <div>
                <h2 className="text-2xl font-black">Üç Pati</h2>
                <p className="text-white/60 text-sm">Veteriner Kliniği</p>
              </div>
            </Link>

            <p className="text-white/70 leading-7 mt-5">
              Randevu, sağlık karnesi, laboratuvar sonuçları, pet shop ve
              sahiplendirme süreçlerini tek çatı altında toplayan bir veteriner kliniğidir.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black mb-4">Sayfalar</h3>

            <div className="space-y-3">
              <Link to="/" className="block text-white/70 hover:text-white">
                Ana Sayfa
              </Link>

              <Link
                to="/hakkimizda"
                className="block text-white/70 hover:text-white"
              >
                Hakkımızda
              </Link>

              <Link
                to="/hizmetler"
                className="block text-white/70 hover:text-white"
              >
                Hizmetler
              </Link>

              <Link
                to="/veterinerlerimiz"
                className="block text-white/70 hover:text-white"
              >
                Veterinerler
              </Link>

              <Link
                to="/iletisim"
                className="block text-white/70 hover:text-white"
              >
                İletişim
              </Link>
            </div>
          </div>

  

          <div>
            <h3 className="text-xl font-black mb-4">İletişim</h3>

            <div className="space-y-3 text-white/70">
              <p>📍 İstanbul, Türkiye</p>
              <p>📞 0212 000 00 00</p>
              <p>📩 info@ucpati.com</p>
              <p>⏰ 09:00 - 18:00</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/60">
            © 2026 Üç Pati. 
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/sss" className="text-white/60 hover:text-white">
              SSS
            </Link>

            <Link to="/blog" className="text-white/60 hover:text-white">
              Blog
            </Link>

            <Link to="/pet-shop" className="text-white/60 hover:text-white">
              Pet Shop
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}