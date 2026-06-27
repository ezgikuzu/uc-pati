export const heroData = {
  label: "Üç Pati Veteriner Kliniği",
  title: "Evcil dostlarınız için modern veteriner takip sistemi",
  description:
    "Üç Pati; randevu, sağlık karnesi, laboratuvar sonuçları, pet shop ve sahiplendirme süreçlerini tek platformda birleştiren örnek bir veteriner yönetim projesidir.",
  image: "/images/team.jpg",
};

export const services = [
  {
    id: 1,
    title: "Genel Muayene",
    category: "Muayene",
    icon: "🩺",
    shortDescription:
      "Evcil dostunuzun genel sağlık durumunun hekim tarafından değerlendirilmesi.",
    description:
      "Genel muayene kapsamında evcil hayvanın ağız, göz, kulak, deri, kalp, solunum ve genel vücut durumu kontrol edilir. Düzenli muayene, olası sağlık sorunlarının erken fark edilmesini sağlar.",
    detail:
      "Bu hizmet özellikle rutin sağlık kontrolü, halsizlik, iştahsızlık, davranış değişikliği veya kontrol amaçlı klinik ziyaretlerde tercih edilir.",
    price: 650,
  },
  {
    id: 2,
    title: "Aşı Takibi",
    category: "Koruyucu Hekimlik",
    icon: "💉",
    shortDescription:
      "Kedi, köpek ve diğer evcil hayvanlar için aşı planlama ve takip süreci.",
    description:
      "Aşı takibi, evcil hayvanların yaşına, türüne ve sağlık geçmişine göre düzenlenir. Yapılan aşılar ve yaklaşan aşı tarihleri dijital sağlık karnesi üzerinden takip edilebilir.",
    detail:
      "Karma aşı, kuduz aşısı ve parazit uygulamaları gibi koruyucu işlemler planlanabilir.",
    price: 500,
  },
  {
    id: 3,
    title: "Laboratuvar Testleri",
    category: "Tetkik",
    icon: "🧪",
    shortDescription:
      "Kan tahlili, biyokimya ve parazit testleri gibi tetkiklerin takibi.",
    description:
      "Laboratuvar testleri sayesinde evcil hayvanların iç organ fonksiyonları, kan değerleri ve enfeksiyon belirtileri değerlendirilebilir. Sonuçlar sistem üzerinden görüntülenebilir.",
    detail:
      "Kan tahlili, biyokimya, böbrek fonksiyon testi ve parazit testleri örnek olarak sisteme eklenmiştir.",
    price: 900,
  },
  {
    id: 4,
    title: "Diş Bakımı",
    category: "Bakım",
    icon: "🦷",
    shortDescription:
      "Ağız ve diş sağlığını korumaya yönelik bakım ve kontrol hizmeti.",
    description:
      "Diş taşı, ağız kokusu, diş eti hassasiyeti ve beslenme sorunları ağız sağlığı ile ilişkili olabilir. Diş bakımı, genel sağlık takibinin önemli bir parçasıdır.",
    detail:
      "Düzenli ağız ve diş kontrolü, özellikle yaşlı kedi ve köpeklerde önerilir.",
    price: 750,
  },
  {
    id: 5,
    title: "Acil Destek",
    category: "Acil",
    icon: "🚑",
    shortDescription:
      "Ani gelişen sağlık sorunlarında hızlı ön değerlendirme ve yönlendirme.",
    description:
      "Acil destek hizmeti, travma, ani halsizlik, solunum güçlüğü, zehirlenme şüphesi veya ciddi davranış değişikliği gibi durumlarda hızlı değerlendirme sağlar.",
    detail:
      "Bu proje kapsamında acil destek bilgilendirme amaçlıdır. Gerçek acil durumlarda veteriner kliniğine başvurulmalıdır.",
    price: 1200,
  },
  {
    id: 6,
    title: "Beslenme Danışmanlığı",
    category: "Danışmanlık",
    icon: "🥣",
    shortDescription:
      "Yaş, tür, kilo ve sağlık durumuna göre beslenme önerileri.",
    description:
      "Evcil hayvanların beslenme düzeni yaşına, türüne, kilosuna ve sağlık durumuna göre planlanmalıdır. Yanlış beslenme kilo, deri, sindirim veya metabolik sorunlara yol açabilir.",
    detail:
      "Kilo kontrolü, mama seçimi ve hassasiyet durumları için örnek danışmanlık modülü eklenmiştir.",
    price: 550,
  },
];

export const veterinarians = [
  {
    id: 1,
    name: "Veteriner Hekim Mehmet Kaya",
    title: "Kedi ve Köpek Sağlığı",
    experience: "8 yıl deneyim",
    image: "/images/vet1.jpg",
    shortDescription:
      "Genel muayene, koruyucu hekimlik ve aşı takibi alanlarında çalışır.",
    description:
      "Mehmet Kaya, kedi ve köpeklerde genel sağlık kontrolü, rutin muayene, aşı takibi ve koruyucu hekimlik alanlarında deneyimlidir.",
    specialties: ["Genel Muayene", "Aşı Takibi", "Koruyucu Hekimlik"],
    availableDays: ["Pazartesi", "Çarşamba", "Cuma"],
  },
  {
    id: 2,
    name: "Veteriner Hekim Ali Yılmaz",
    title: "Laboratuvar ve İç Hastalıkları",
    experience: "6 yıl deneyim",
    image: "/images/vet2.jpg",
    shortDescription:
      "Laboratuvar sonuçları, biyokimya takibi ve iç hastalıklarıyla ilgilenir.",
    description:
      "Ali Yılmaz, laboratuvar sonuçlarının değerlendirilmesi, biyokimya takipleri ve kronik hastalık izleminde görev alır.",
    specialties: ["Laboratuvar", "Biyokimya", "İç Hastalıkları"],
    availableDays: ["Salı", "Perşembe", "Cumartesi"],
  },
  {
    id: 3,
    name: "Veteriner Hekim Zeynep Arslan",
    title: "Egzotik Hayvanlar ve Takip",
    experience: "5 yıl deneyim",
    image: "/images/vet3.jpg",
    shortDescription:
      "Kuş, hamster ve küçük dostların sağlık takibiyle ilgilenir.",
    description:
      "Zeynep Arslan, kuş, hamster ve küçük evcil hayvanların muayene, takip ve bakım süreçlerinde görev alır.",
    specialties: ["Kuş Sağlığı", "Küçük Memeliler", "Kontrol Takibi"],
    availableDays: ["Pazartesi", "Perşembe", "Cumartesi"],
  },
];

export const products = [
  {
    id: 1,
    name: "Kedi Maması",
    category: "Mama",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80",
    description:
      "Yetişkin kediler için dengeli içerikli kuru mama. Günlük beslenme ihtiyacını destekler.",
  },
  {
    id: 2,
    name: "Köpek Maması",
    category: "Mama",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80",
    description:
      "Orta ve büyük ırk köpekler için protein destekli kuru mama.",
  },
  {
    id: 3,
    name: "Kedi Oyuncağı",
    category: "Oyuncak",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    description:
      "Kedilerin hareket etmesini ve oyun ihtiyacını destekleyen eğlenceli oyuncak.",
  },
  {
    id: 4,
    name: "Köpek Tasması",
    category: "Aksesuar",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
    description:
      "Günlük yürüyüşler için dayanıklı ve ayarlanabilir köpek tasması.",
  },
  {
    id: 5,
    name: "Tüy Bakım Fırçası",
    category: "Bakım",
    price: 190,
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80",
    description:
      "Kedi ve köpeklerde tüy bakımını kolaylaştıran pratik bakım fırçası.",
  },
  {
    id: 6,
    name: "Kuş Yemi",
    category: "Mama",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=900&q=80",
    description:
      "Muhabbet kuşları için günlük beslenmeye uygun karışık yem.",
  },
  {
    id: 7,
    name: "Mama Kabı",
    category: "Aksesuar",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80",
    description:
      "Evcil dostlar için kolay temizlenebilir mama ve su kabı.",
  },
  {
    id: 8,
    name: "Kedi Kumu",
    category: "Bakım",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=80",
    description:
      "Koku kontrolü sağlayan, günlük kullanıma uygun kedi kumu.",
  },
];

export const blogs = [
  {
    id: 1,
    title: "Kedilerde Aşı Takibi Neden Önemlidir?",
    category: "Kedi Sağlığı",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=90",
    summary:
      "Kedilerde düzenli aşı takibi, bulaşıcı hastalıklara karşı koruyucu bir sağlık adımıdır.",
    content:
      "Kedilerde aşı takibi, özellikle yavru dönemden itibaren düzenli şekilde planlanmalıdır. Karma aşı, kuduz aşısı ve parazit uygulamaları veteriner hekimin önerisine göre takip edilir. Dijital sağlık karnesi bu süreçte yapılan ve yaklaşan uygulamaların düzenli izlenmesini kolaylaştırır.",
  },
  {
    id: 2,
    title: "Köpeklerde Beslenme Düzeni Nasıl Planlanır?",
    category: "Köpek Sağlığı",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=90",
    summary:
      "Yaş, kilo, ırk ve sağlık durumu köpeklerde beslenme planını doğrudan etkiler.",
    content:
      "Köpeklerde beslenme düzeni oluşturulurken hayvanın yaşı, kilosu, aktivite düzeyi ve sağlık geçmişi dikkate alınmalıdır. Alerji, kilo problemi veya kronik hastalık varsa mama seçimi veteriner önerisiyle yapılmalıdır. Ani mama değişimleri sindirim sorunlarına yol açabileceği için geçiş süreci kontrollü olmalıdır.",
  },
  {
    id: 3,
    title: "Evcil Hayvanlarda Acil Belirtiler",
    category: "Acil Bilgilendirme",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=90",
    summary:
      "Ani halsizlik, solunum güçlüğü veya zehirlenme şüphesi gibi durumlar hızlı değerlendirilmelidir.",
    content:
      "Evcil hayvanlarda ani gelişen halsizlik, solunum güçlüğü, uzun süren kusma, bilinç bulanıklığı, travma veya zehirlenme şüphesi gibi durumlar acil değerlendirme gerektirir. Bu proje bilgilendirme amaçlıdır. Gerçek acil durumlarda en yakın veteriner kliniğine başvurulmalıdır.",
  },
  {
    id: 4,
    title: "Laboratuvar Sonuçları Nasıl Okunur?",
    category: "Laboratuvar",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=90",
    summary:
      "Kan tahlili ve biyokimya değerleri veteriner hekimin yorumu ile değerlendirilmelidir.",
    content:
      "Laboratuvar sonuçları, evcil hayvanların genel sağlık durumu hakkında önemli bilgiler verir. Ancak tek bir değer üzerinden kesin yorum yapmak doğru değildir. Değerler hayvanın türü, yaşı, klinik bulguları ve sağlık geçmişi ile birlikte değerlendirilmelidir.",
  },
];

export const adoptionPets = [
  {
    id: 1,
    name: "Misket",
    type: "Kedi",
    breed: "Tekir",
    age: "1 yaşında",
    city: "İstanbul",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    ownerName: "Ezgi Kuzu",
    description:
      "Oyuncu, insanlara alışkın ve ev ortamına uyumlu bir kedi. Sevgi dolu bir yuva arıyor.",
    reason:
      "Sahibi taşınacağı için Misket’e daha uygun ve kalıcı bir yuva arıyor.",
  },
  {
    id: 2,
    name: "Tarçın",
    type: "Köpek",
    breed: "Golden Retriever",
    age: "2 yaşında",
    city: "İstanbul",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    ownerName: "Beyza Mensur",
    description:
      "Sosyal, oyuncu ve çocuklarla uyumlu bir köpek. Bahçeli veya aktif bir aile ortamı onun için uygun olur.",
    reason:
      "Aile yoğun iş temposu nedeniyle Tarçın’a daha fazla vakit ayırabilecek bir sahip arıyor.",
  },
  {
    id: 3,
    name: "Limon",
    type: "Kuş",
    breed: "Muhabbet Kuşu",
    age: "2 yaşında",
    city: "Ankara",
    image:
      "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=900&q=80",
    ownerName: "Ali Yılmaz",
    description:
      "Neşeli, ötüşü güzel ve insan sesine alışık bir muhabbet kuşu.",
    reason:
      "Sahibinin alerji problemi nedeniyle yeni yuva arıyor.",
  },
  {
    id: 4,
    name: "Pamuk",
    type: "Hamster",
    breed: "Suriye Hamsterı",
    age: "8 aylık",
    city: "İzmir",
    image:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=900&q=80",
    ownerName: "Zeynep Arslan",
    description:
      "Sakin, elde durmaya alışık ve bakımı kolay bir hamster.",
    reason:
      "Sahibi şehir dışına taşınacağı için güvenli bir yuva arıyor.",
  },
];

export const faqItems = [
  {
    id: 1,
    question: "Randevu almak için giriş yapmak zorunlu mu?",
    answer:
      "Evet. Randevular kullanıcıya özel olduğu için randevu oluşturmak ve randevuları görüntülemek için giriş yapılmalıdır.",
  },
  {
    id: 2,
    question: "Laboratuvar sonuçlarını herkes görebilir mi?",
    answer:
      "Hayır. Laboratuvar sonuçları sağlık kaydı niteliğinde olduğu için giriş yapıldıktan sonra görüntülenebilir.",
  },
  {
    id: 3,
    question: "Ödeme işlemi gerçek mi?",
    answer:
      "Hayır. Bu proje örnek amaçlıdır. Ödeme ekranı demo olarak hazırlanmıştır ve gerçek ödeme almaz.",
  },
  {
    id: 4,
    question: "Sahiplendirme ilanı eklenebilir mi?",
    answer:
      "Evet. Kullanıcı giriş yaptıktan sonra sahiplendirme sayfasından örnek ilan oluşturabilir.",
  },
  {
    id: 5,
    question: "Admin paneli ne işe yarar?",
    answer:
      "Admin paneli kullanıcı, hasta, randevu, laboratuvar ve sistem özetlerini yönetmek için hazırlanmıştır.",
  },
];