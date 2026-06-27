import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  approveRequest,
  deleteRequest,
  rejectRequest,
} from "../../store/approvalSlice";
import {
  approveProduct,
  deletePendingProduct,
  rejectProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../store/productSlice";
import {
  approveLabResult,
  deletePendingLabResult,
  rejectLabResult,
} from "../../store/labSlice";
import {
  approveBlog,
  deletePendingBlog,
  rejectBlog,
} from "../../store/blogSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function AdminPanel() {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("approvals");
  const [isEditing, setIsEditing] = useState(false);
  const [productMessage, setProductMessage] = useState("");
  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    category: "Mama",
    price: "",
    image: "",
    description: "",
  });

  const approvedProducts = useSelector((state) => state.products.approvedProducts);
  const totalEarnings = useSelector((state) => state.products.totalEarnings);
  const requests = useSelector((state) => state.approvals.requests);
  const pendingProducts = useSelector((state) => state.products.pendingProducts);
  const pendingLabResults = useSelector(
    (state) => state.labResults.pendingResults
  );
  const pendingBlogs = useSelector((state) => state.blogs.pendingBlogs);

  const allRequests = [
    ...requests,
    ...pendingProducts,
    ...pendingLabResults,
    ...pendingBlogs,
  ];

  const waitingAll = allRequests.filter((item) => {
    return item.status === "Beklemede";
  });

  const approvedAll = allRequests.filter((item) => {
    return item.status === "Onaylandı";
  });

  const rejectedAll = allRequests.filter((item) => {
    return item.status === "Reddedildi";
  });

  const waitingProducts = pendingProducts.filter((item) => {
    return item.status === "Beklemede";
  });

  const waitingLabResults = pendingLabResults.filter((item) => {
    return item.status === "Beklemede";
  });

  const waitingBlogs = pendingBlogs.filter((item) => {
    return item.status === "Beklemede";
  });

  const customerRequests = requests.filter((item) => item.source === "Müşteri");
  const doctorRequests = requests.filter((item) => item.source === "Hekim");

  const getStatusClass = (status) => {
    if (status === "Onaylandı") {
      return "bg-[#e7f4f2] text-[#0f766e]";
    }

    if (status === "Beklemede") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-red-100 text-red-600";
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.description) {
      setProductMessage("Lütfen tüm alanları doldurun.");
      return;
    }

    if (isEditing) {
      dispatch(editProduct(productForm));
      setProductMessage("Ürün başarıyla güncellendi.");
      setIsEditing(false);
    } else {
      dispatch(addProduct(productForm));
      setProductMessage("Ürün başarıyla eklendi.");
    }

    setProductForm({
      id: null,
      name: "",
      category: "Mama",
      price: "",
      image: "",
      description: "",
    });

    setTimeout(() => setProductMessage(""), 3000);
  };

  const handleEditInit = (product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    setIsEditing(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      dispatch(deleteProduct(id));
      setProductMessage("Ürün silindi.");
      setTimeout(() => setProductMessage(""), 3000);
    }
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <PageContainer>
      <PageHeader
        label="Admin Paneli"
        title="Kontrol Paneli"
        description="Müşteri ve hekim tarafından yapılan işlemler admin onayından geçer."
      />

      <div className="flex gap-4 mb-8 border-b border-[#d8e7e4] pb-4">
        <button
          onClick={() => setActiveTab("approvals")}
          className={
            activeTab === "approvals"
              ? "bg-[#0f766e] text-white px-6 py-3 rounded-2xl font-black transition cursor-pointer"
              : "bg-white border border-[#d8e7e4] text-[#0f766e] px-6 py-3 rounded-2xl font-black hover:bg-[#e7f4f2] transition cursor-pointer"
          }
        >
          Talepler ve Onaylar
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={
            activeTab === "products"
              ? "bg-[#0f766e] text-white px-6 py-3 rounded-2xl font-black transition cursor-pointer"
              : "bg-white border border-[#d8e7e4] text-[#0f766e] px-6 py-3 rounded-2xl font-black hover:bg-[#e7f4f2] transition cursor-pointer"
          }
        >
          Pet Shop Ürün Yönetimi
        </button>
      </div>

      {activeTab === "approvals" && (
        <>
          <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-8">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            👑 Admin Kontrol Merkezi
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Bekleyen işlemler burada onaylanır.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Hekim ürün, laboratuvar sonucu ve blog yazısı eklediğinde admin
            onayı bekler. Müşteri randevu, sahiplendirme ve evcil hayvan kaydı
            gibi işlemler de admin kontrolünden geçer.
          </p>

          <div className="relative grid sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{waitingAll.length}</h3>
              <p className="text-white/70 text-sm mt-1">Bekleyen</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{approvedAll.length}</h3>
              <p className="text-white/70 text-sm mt-1">Onaylanan</p>
            </div>

            <div className="bg-white/15 rounded-2xl p-5">
              <h3 className="text-3xl font-black">{rejectedAll.length}</h3>
              <p className="text-white/70 text-sm mt-1">Reddedilen</p>
            </div>

            <div className="bg-[#f97316] text-white rounded-2xl p-5 shadow-lg border border-orange-400">
              <h3 className="text-3xl font-black">{totalEarnings.toLocaleString('tr-TR')} ₺</h3>
              <p className="text-white/90 text-sm mt-1 font-bold">Toplam Kazanç</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Link
            to="/admin-mesajlar"
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm min-h-[255px] h-full flex flex-col justify-between hover:shadow-xl transition"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-3xl mb-5">
                📩
              </div>

              <h3 className="text-2xl font-black text-[#134e4a] leading-tight min-h-[64px]">
                Gelen Mesajlar
              </h3>

              <p className="text-slate-500 leading-7 mt-3 min-h-[72px]">
                İletişim sayfasından gönderilen mesajları görüntüle ve kontrol
                et.
              </p>
            </div>

            <span className="inline-flex bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black mt-5 self-start">
              Mesajlar
            </span>
          </Link>

          <Link
            to="/musteri-kontrol"
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm min-h-[255px] h-full flex flex-col justify-between hover:shadow-xl transition"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl mb-5">
                👤
              </div>

              <h3 className="text-2xl font-black text-[#134e4a] leading-tight min-h-[64px]">
                Müşteri Kontrolü
              </h3>

              <p className="text-slate-500 leading-7 mt-3 min-h-[72px]">
                Randevu, sahiplendirme, sipariş ve evcil hayvan kayıtlarını
                kontrol et.
              </p>
            </div>

            <span className="inline-flex bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-black mt-5 self-start">
              {customerRequests.length} kayıt
            </span>
          </Link>

          <Link
            to="/hekim-kontrol"
            className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm min-h-[255px] h-full flex flex-col justify-between hover:shadow-xl transition sm:col-span-2"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-3xl mb-5">
                🩺
              </div>

              <h3 className="text-2xl font-black text-[#134e4a] leading-tight min-h-[64px]">
                Hekim Kontrolü
              </h3>

              <p className="text-slate-500 leading-7 mt-3 min-h-[72px]">
                Ürün, blog, laboratuvar sonucu, hasta ve randevu işlemlerini
                kontrol et.
              </p>
            </div>

            <span className="inline-flex bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-black mt-5 self-start">
              {doctorRequests.length} kayıt
            </span>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-5 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Bekleyen Toplam</p>
          <h3 className="text-4xl font-black text-orange-600 mt-2">
            {waitingAll.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Ürün Onayı</p>
          <h3 className="text-4xl font-black text-orange-600 mt-2">
            {waitingProducts.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Lab Onayı</p>
          <h3 className="text-4xl font-black text-orange-600 mt-2">
            {waitingLabResults.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Blog Onayı</p>
          <h3 className="text-4xl font-black text-orange-600 mt-2">
            {waitingBlogs.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Tüm Kayıt</p>
          <h3 className="text-4xl font-black text-[#134e4a] mt-2">
            {allRequests.length}
          </h3>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Onaylanan İşlem</p>
          <h3 className="text-4xl font-black text-[#0f766e] mt-2">
            {approvedAll.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">Reddedilen İşlem</p>
          <h3 className="text-4xl font-black text-red-600 mt-2">
            {rejectedAll.length}
          </h3>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <p className="text-slate-500 font-bold">İşlem Durumu</p>
          <h3 className="text-2xl font-black text-[#134e4a] mt-2">
            {waitingAll.length > 0 ? "Onay Bekliyor" : "Temiz"}
          </h3>
        </div>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Blog Yazısı Onayları
            </h2>
            <p className="text-slate-500 mt-2">
              Hekim tarafından eklenen blog yazıları admin onayından sonra Blog
              sayfasında görünür.
            </p>
          </div>

          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black">
            {waitingBlogs.length} bekleyen
          </span>
        </div>

        <div className="space-y-4">
          {pendingBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
            >
              <div className="grid md:grid-cols-[160px_1fr_auto] gap-5 items-center">
                <div className="h-32 rounded-2xl overflow-hidden bg-[#e7f4f2]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-black">
                      Hekim Blog Talebi
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black ${getStatusClass(
                        blog.status
                      )}`}
                    >
                      {blog.status}
                    </span>

                    <span className="bg-white text-[#134e4a] px-4 py-2 rounded-full text-xs font-black">
                      {blog.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#134e4a]">
                    {blog.title}
                  </h3>

                  <p className="text-slate-500 leading-7 mt-2">
                    {blog.summary}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    Ekleyen: {blog.createdBy} • Tarih: {blog.createdAt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {blog.status === "Beklemede" && (
                    <>
                      <button
                        onClick={() => dispatch(approveBlog(blog.id))}
                        className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black"
                      >
                        Onayla
                      </button>

                      <button
                        onClick={() => dispatch(rejectBlog(blog.id))}
                        className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black"
                      >
                        Reddet
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => dispatch(deletePendingBlog(blog.id))}
                    className="bg-white border border-[#d8e7e4] text-[#134e4a] px-5 py-3 rounded-full font-black"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}

          {pendingBlogs.length === 0 && (
            <p className="text-slate-500">Henüz blog yazısı onay talebi yok.</p>
          )}
        </div>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Laboratuvar Sonucu Onayları
            </h2>
            <p className="text-slate-500 mt-2">
              Hekimin girdiği lab sonuçları admin onayından sonra müşteriye
              görünür.
            </p>
          </div>

          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black">
            {waitingLabResults.length} bekleyen
          </span>
        </div>

        <div className="space-y-4">
          {pendingLabResults.map((result) => (
            <div
              key={result.id}
              className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-black">
                      Hekim Lab Talebi
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black ${getStatusClass(
                        result.status
                      )}`}
                    >
                      {result.status}
                    </span>

                    <span className="bg-white text-[#134e4a] px-4 py-2 rounded-full text-xs font-black">
                      {result.resultStatus}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#134e4a]">
                    {result.petName} - {result.testType}
                  </h3>

                  <p className="text-slate-500 leading-7 mt-2">
                    {result.summary}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    Hekim: {result.doctor} • Sahip: {result.ownerName} • Tarih:{" "}
                    {result.createdAt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  {result.status === "Beklemede" && (
                    <>
                      <button
                        onClick={() => dispatch(approveLabResult(result.id))}
                        className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black"
                      >
                        Onayla
                      </button>

                      <button
                        onClick={() => dispatch(rejectLabResult(result.id))}
                        className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black"
                      >
                        Reddet
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => dispatch(deletePendingLabResult(result.id))}
                    className="bg-white border border-[#d8e7e4] text-[#134e4a] px-5 py-3 rounded-full font-black"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}

          {pendingLabResults.length === 0 && (
            <p className="text-slate-500">Henüz lab sonucu onay talebi yok.</p>
          )}
        </div>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Hekim Ürün Onayları
            </h2>
            <p className="text-slate-500 mt-2">
              Hekim tarafından eklenen ürünler onaylandıktan sonra Pet Shop'ta
              görünür.
            </p>
          </div>

          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-black">
            {waitingProducts.length} bekleyen
          </span>
        </div>

        <div className="space-y-4">
          {pendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
            >
              <div className="grid md:grid-cols-[120px_1fr_auto] gap-5 items-center">
                <div className="h-28 rounded-2xl overflow-hidden bg-[#e7f4f2]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-black">
                      Hekim Ürün Talebi
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black ${getStatusClass(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#134e4a]">
                    {product.name}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    {product.category} • {product.price} TL
                  </p>

                  <p className="text-slate-500 leading-7 mt-2">
                    {product.description}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    Ekleyen: {product.createdBy} • Tarih: {product.createdAt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.status === "Beklemede" && (
                    <>
                      <button
                        onClick={() => dispatch(approveProduct(product.id))}
                        className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black"
                      >
                        Onayla
                      </button>

                      <button
                        onClick={() => dispatch(rejectProduct(product.id))}
                        className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black"
                      >
                        Reddet
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => dispatch(deletePendingProduct(product.id))}
                    className="bg-white border border-[#d8e7e4] text-[#134e4a] px-5 py-3 rounded-full font-black"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}

          {pendingProducts.length === 0 && (
            <p className="text-slate-500">Henüz ürün onay talebi yok.</p>
          )}
        </div>
      </section>

      <section className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Genel Onay Akışı
            </h2>
            <p className="text-slate-500 mt-2">
              Müşteri ve hekim tarafından oluşturulan genel talepler burada
              listelenir.
            </p>
          </div>

          <span className="bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
            {requests.length} kayıt
          </span>
        </div>

        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white text-[#134e4a] px-4 py-2 rounded-full text-xs font-black">
                      {request.source}
                    </span>

                    <span className="bg-white text-[#134e4a] px-4 py-2 rounded-full text-xs font-black">
                      {request.type}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#134e4a]">
                    {request.title}
                  </h3>

                  <p className="text-slate-500 leading-7 mt-2">
                    {request.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  {request.status === "Beklemede" && (
                    <>
                      <button
                        onClick={() => dispatch(approveRequest(request.id))}
                        className="bg-[#0f766e] text-white px-5 py-3 rounded-full font-black"
                      >
                        Onayla
                      </button>

                      <button
                        onClick={() => dispatch(rejectRequest(request.id))}
                        className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black"
                      >
                        Reddet
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => dispatch(deleteRequest(request.id))}
                    className="bg-white border border-[#d8e7e4] text-[#134e4a] px-5 py-3 rounded-full font-black"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <p className="text-slate-500">Henüz genel onay kaydı yok.</p>
          )}
        </div>
      </section>
        </>
      )}

      {activeTab === "products" && (
        <div className="animate-fade-in space-y-8">
          {productMessage && (
            <div className="bg-[#e7f4f2] border border-[#0f766e]/20 text-[#0f766e] rounded-3xl p-5 shadow-sm">
              <h3 className="font-black">Bilgi</h3>
              <p className="mt-1">{productMessage}</p>
            </div>
          )}

          <div className="grid xl:grid-cols-[1fr_1.2fr] gap-8 items-start">
            <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
              <h2 className="text-3xl font-black text-[#134e4a]">
                {isEditing ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h2>
              <p className="text-slate-500 mt-2">
                {isEditing
                  ? "Seçilen ürünün bilgilerini güncelleyin."
                  : "Pet Shop sayfasında listelenecek yeni ürünü ekleyin."}
              </p>

              <form onSubmit={handleProductSubmit} className="grid gap-4 mt-6">
                <div>
                  <label className="font-bold text-[#134e4a] text-sm">Ürün Adı</label>
                  <input
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Örn: Premium Kedi Maması"
                    className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-2 text-sm"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#134e4a] text-sm">Kategori</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-2 text-sm"
                    >
                      <option>Mama</option>
                      <option>Oyuncak</option>
                      <option>Aksesuar</option>
                      <option>Bakım</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#134e4a] text-sm">Fiyat (TL)</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      placeholder="Fiyat girin"
                      className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-2 text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#134e4a] text-sm">Açıklama</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Ürün özelliklerini ve detaylarını yazın..."
                    rows="4"
                    className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-2 resize-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#134e4a] text-sm block mb-2">Ürün Görseli</label>
                  <label className="border border-dashed border-[#0f766e] bg-[#f3f8f7] p-4 rounded-2xl cursor-pointer text-[#0f766e] font-black text-center block hover:bg-[#e7f4f2] transition text-sm">
                    Görsel Seç (Dosya veya Link)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageChange}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="Veya görsel linkini buraya yapıştırın"
                    className="w-full border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] mt-3 text-sm"
                  />
                </div>

                {productForm.image && (
                  <div className="h-52 rounded-3xl overflow-hidden bg-[#e7f4f2] border border-[#d8e7e4]">
                    <img
                      src={productForm.image}
                      alt="Ürün önizleme"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition cursor-pointer text-sm"
                  >
                    {isEditing ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setProductForm({
                          id: null,
                          name: "",
                          category: "Mama",
                          price: "",
                          image: "",
                          description: "",
                        });
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-[#134e4a] px-6 py-4 rounded-2xl font-black transition cursor-pointer text-sm"
                    >
                      İptal Et
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
              <h2 className="text-3xl font-black text-[#134e4a]">
                Mevcut Ürünler
              </h2>
              <p className="text-slate-500 mt-2">
                Pet Shop sayfasındaki tüm aktif ürünlerin listesi ({approvedProducts.length} adet).
              </p>

              <div className="space-y-4 mt-6 max-h-[700px] overflow-y-auto pr-2">
                {approvedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 flex gap-4 items-center justify-between animate-fade-in"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#e7f4f2] shrink-0 border border-[#d8e7e4]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-black text-[#134e4a] text-lg leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                          {product.category} • <span className="font-bold text-[#0f766e]">{product.price} TL</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleEditInit(product)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2.5 rounded-full font-black text-xs transition cursor-pointer"
                      >
                        Düzenle
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2.5 rounded-full font-black text-xs transition cursor-pointer"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}

                {approvedProducts.length === 0 && (
                  <p className="text-slate-500 text-center py-10">Mevcut ürün bulunmuyor.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}