import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function About() {
  const values = [
    {
      icon: "🐾",
      title: "Hasta Odaklı Takip",
      text: "Evcil hayvanların sağlık geçmişi, randevuları ve laboratuvar sonuçları düzenli şekilde takip edilir.",
    },
    {
      icon: "🩺",
      title: "Hekim Paneli",
      text: "Hekimlerin hasta bilgisi, risk durumu ve tedavi notlarını görüntüleyebilmesi hedeflenmiştir.",
    },
    {
      icon: "👤",
      title: "Müşteri Paneli",
      text: "Hasta sahipleri evcil hayvanlarıyla ilgili temel bilgilere tek panelden ulaşabilir.",
    },
    {
      icon: "🛡️",
      title: "Admin Yönetimi",
      text: "Admin rolü kullanıcı, hasta ve sistem özetlerini yönetebilecek şekilde planlanmıştır.",
    },
  ];

  const team = [
    {
      name: "Ezgi Kuzu",
      role: "Frontend Geliştirici",
      text: "React, Redux Toolkit, Router ve sayfa yapılarının hazırlanması.",
      icon: "👩‍💻",
    },
    {
      name: "Beyza Mensur",
      role: "İçerik ve Panel Planlama",
      text: "Müşteri paneli, sağlık karnesi ve içerik akışlarının planlanması.",
      icon: "📝",
    },
    {
      name: "Ali Yılmaz",
      role: "Hekim Paneli Planlama",
      text: "Hasta bilgileri, laboratuvar sonuçları ve hekim tarafı akışlarının kurgulanması.",
      icon: "🩺",
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        label="Hakkımızda"
        title="Üç Pati Veteriner Kliniği"
      />

      <section className="grid lg:grid-cols-[1fr_0.9fr] gap-6 mb-10">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-8 shadow-sm">
          <p className="text-[#0f766e] font-black mb-2">Biz Kimiz?</p>

          <h2 className="text-4xl font-black text-[#134e4a] leading-tight">
            Veteriner süreçlerini tek panelde toplayan modern ortam
          </h2>

          <p className="text-slate-500 leading-8 mt-5">
            Üç Pati projesi; müşteri, hekim ve admin rollerini içeren bir veteriner yönetim sistemi olarak tasarlanmıştır. Projede randevu alma, sağlık karnesi görüntüleme, laboratuvar sonuçlarını takip etme, hasta yönetimi, pet shop ve sahiplendirme gibi modüller yer alır. Sistem, evcil hayvan sahipleri ile veteriner klinikleri arasındaki iletişimi dijitalleştirerek operasyonel süreçlerin minimum hata ve maksimum hızla yürütülmesini hedefler. Gelişmiş hasta takibi ve entegre laboratuvar modülleri sayesinde, patili dostlarımızın sağlık geçmişleri güvenli bir veri tabanında saklanarak hekimlerin teşhis ve tedavi süreçlerine hız kazandırır. Ayrıca pet shop ve sahiplendirme gibi topluluk odaklı modüller, platformu sadece bir klinik yönetim aracı olmaktan çıkarıp hayvanseverleri bir araya getiren kapsamlı bir ekosisteme dönüştürür.
          </p>

        </div>

        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Müşteri, hekim ve admin için ayrı deneyim.
          </h2>

          <div className="relative space-y-4 mt-7">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="font-black text-xl">Müşteri</h3>
              <p className="text-white/75 mt-2">
                Randevu, sağlık karnesi, lab sonucu ve pet shop işlemleri.
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="font-black text-xl">Hekim</h3>
              <p className="text-white/75 mt-2">
                Hasta takibi, risk durumu, tetkik ve tedavi notları.
              </p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="font-black text-xl">Admin</h3>
              <p className="text-white/75 mt-2">
                Kullanıcı, hasta ve sistem yönetimi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-6">
          <p className="text-[#0f766e] font-black mb-2">Değerlerimiz</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-3xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-black text-[#134e4a]">
                {item.title}
              </h3>

              <p className="text-slate-500 leading-7 mt-3">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

    </PageContainer>
  );
}