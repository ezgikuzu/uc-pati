import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function FAQ() {
  const [openIds, setOpenIds] = useState([1]);

const faqItems = [
  {
    id: 1,
    question: "Evcil hayvanım için nasıl randevu alabilirim?",
    answer:
      "Randevu Al sayfasına girerek önce evcil hayvanınızı seçebilirsiniz. Daha sonra hizmet türünü, veteriner hekimi, takvimden uygun günü ve hekimin müsait saatlerinden birini işaretleyerek randevu talebi oluşturabilirsiniz.",
  },
  {
    id: 2,
    question: "Randevu saatleri nasıl belirleniyor?",
    answer:
      "Randevu saatleri veteriner hekimin panelinden belirlediği müsait saatlere göre gösterilir. Bu yüzden müşteri randevu alırken sadece seçilen hekimin uygun saatlerini görebilir.",
  },
  {
    id: 3,
    question: "Randevum hemen onaylanır mı?",
    answer:
      "Randevu oluşturduğunuzda talebiniz önce admin kontrolüne gönderilir. Admin onayladıktan sonra randevu durumunuz sistemde güncellenmiş olarak görünür.",
  },
  {
    id: 4,
    question: "Evcil hayvanımı sisteme nasıl ekleyebilirim?",
    answer:
      "Müşteri panelinden Evcil Hayvanlarım sayfasına girerek evcil hayvanınızın adını, türünü, cinsini, yaşını, mikroçip numarasını, kronik hastalık ve alerji bilgilerini ekleyebilirsiniz.",
  },
  {
    id: 5,
    question: "Hayvan pasaportunda hangi bilgiler yer alır?",
    answer:
      "Hayvan pasaportunda evcil hayvanınızın adı, türü, cinsi, yaşı, mikroçip numarası, aşı durumu, risk bilgisi, hasta sahibi ve sorumlu veteriner hekim bilgileri yer alır.",
  },
  {
    id: 6,
    question: "Laboratuvar sonuçlarımı nereden görebilirim?",
    answer:
      "Laboratuvar Sonuçları sayfasından evcil hayvanınıza ait test sonuçlarını görüntüleyebilirsiniz. Sonuçlar veteriner hekim tarafından girilir ve admin onayından sonra müşteriye görünür.",
  },
  {
    id: 7,
    question: "Laboratuvar sonucum neden görünmüyor?",
    answer:
      "Laboratuvar sonucu henüz hekim tarafından girilmemiş veya admin tarafından onaylanmamış olabilir. Onaylanan sonuçlar sistemde Laboratuvar Sonuçları alanında görünür.",
  },
  {
    id: 8,
    question: "Sağlık karnesinde neleri takip edebilirim?",
    answer:
      "Sağlık karnesinde evcil hayvanınızın aşı durumu, son kontrol tarihi, sonraki kontrol bilgisi, kronik hastalık notları ve veteriner tarafından eklenen tedavi notları görüntülenebilir.",
  },
  {
    id: 9,
    question: "Pet Shop ürünlerini nasıl satın alabilirim?",
    answer:
      "Pet Shop sayfasından ürünleri inceleyebilir, sepete ekleyebilir ve ödeme sayfasına geçebilirsiniz. Bu proje örnek bir frontend proje olduğu için ödeme işlemi gerçek ödeme almaz.",
  },
  {
    id: 10,
    question: "Sahiplendirme ilanlarını nasıl inceleyebilirim?",
    answer:
      "Sahiplendirme sayfasından yuva arayan hayvanları inceleyebilirsiniz. İlan detayına girerek hayvanın yaşını, türünü, açıklamasını ve konum bilgisini görebilirsiniz.",
  },
];

  const toggleQuestion = (id) => {
  if (openIds.includes(id)) {
    setOpenIds(
      openIds.filter((openId) => {
        return openId !== id;
      })
    );
  } else {
    setOpenIds([...openIds, id]);
  }
};

  return (
    <PageContainer>
      <PageHeader
        label="FAQ"
        title="Sık Sorulan Sorular"
        description="Üç Pati sistemindeki randevu, laboratuvar, pet shop, hayvan pasaportu ve admin onay süreçleri hakkında sık sorulan sorular."
      />

      <section className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🐾 Yardım Merkezi
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Sistemi kullanırken aklınıza takılanlar burada.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Randevu oluşturma, hekim uygun saatleri, admin onayı, laboratuvar
            sonuçları ve hayvan pasaportu gibi alanları bu sayfadan hızlıca
            inceleyebilirsiniz.
          </p>

          <div className="relative grid gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-2xl font-black">{faqItems.length}</h3>
              <p className="text-white/70 mt-1">Soru Cevap</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-2xl font-black">Admin Onaylı</h3>
              <p className="text-white/70 mt-1">
                İşlemler kontrol panelinden yönetilir.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleQuestion(item.id)}
                className="w-full flex items-center justify-between gap-4 text-left p-6"
              >
                <span className="text-xl font-black text-[#134e4a]">
                  {item.question}
                </span>

                <span className="w-10 h-10 rounded-full bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center font-black shrink-0">
                  {openIds.includes(item.id) ? "−" : "+"}
                </span>
              </button>

              {openIds.includes(item.id) && (
                <div className="px-6 pb-6">
                  <p className="text-slate-500 leading-8">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}