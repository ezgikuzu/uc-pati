import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { addEarnings } from "../../store/productSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isPaid, setIsPaid] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
  });

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shippingPrice = totalPrice > 0 ? 60 : 0;
  const discountPrice = totalPrice >= 500 ? 50 : 0;
  const finalPrice = totalPrice + shippingPrice - discountPrice;

  const formatCardNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
    return numbersOnly.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 4);

    if (numbersOnly.length >= 3) {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    }

    return numbersOnly;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      setForm({
        ...form,
        cardNumber: formatCardNumber(value),
      });
      return;
    }

    if (name === "expiryDate") {
      setForm({
        ...form,
        expiryDate: formatExpiryDate(value),
      });
      return;
    }

    if (name === "cvv") {
      setForm({
        ...form,
        cvv: value.replace(/\D/g, "").slice(0, 3),
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();

    setIsPaid(true);
    dispatch(addEarnings(finalPrice));
    dispatch(clearCart());
  };

  const previewCardNumber = form.cardNumber || "•••• •••• •••• ••••";
  const previewName = form.fullName || "AD SOYAD";
  const previewExpiry = form.expiryDate || "AA/YY";
  const previewCvv = form.cvv || "•••";

  if (!isLoggedIn) {
    return (
      <PageContainer>
        <PageHeader
          label="Ödeme"
          title="Ödeme yapmak için giriş yapmalısınız"
          description="Sepetinizdeki ürünleri satın alabilmek için önce hesabınıza giriş yapmanız gerekir."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 md:p-10 shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-6">
            🔐
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Giriş yapmadan ödeme yapılamaz
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Ödeme işlemini tamamlamak için önce Üç Pati hesabınıza giriş
            yapmanız gerekiyor. Giriş yaptıktan sonra sepetinize geri dönüp
            ödemeye devam edebilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
            <Link
              to="/giris-yap"
              className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
            >
              Giriş Yap
            </Link>

            <Link
              to="/sepet"
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
            >
              Sepete Dön
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (cartItems.length === 0 && !isPaid) {
    return (
      <PageContainer>
        <PageHeader
          label="Ödeme"
          title="Sepetiniz boş"
          description="Ödeme yapabilmek için önce sepete ürün eklemelisiniz."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-5">
            🛒
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Sepette ürün bulunmuyor
          </h2>

          <p className="text-slate-500 mt-3">
            Pet Shop sayfasından ürün ekleyerek ödeme işlemine devam
            edebilirsiniz.
          </p>

          <Link
            to="/pet-shop"
            className="inline-flex mt-6 bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
          >
            Pet Shop'a Git
          </Link>
        </div>
      </PageContainer>
    );
  }

  if (isPaid) {
    return (
      <PageContainer>
        <PageHeader
          label="Ödeme Başarılı"
          title="Siparişiniz oluşturuldu"
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 md:p-10 text-center shadow-sm max-w-3xl mx-auto">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-5xl mb-6">
            ✓
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Ödeme tamamlandı
          </h2>

          <p className="text-slate-500 mt-4 leading-7">
            Siparişiniz başarıyla alındı. Sepetiniz temizlendi ve sipariş
            süreci tamamlandı.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
            <button
              onClick={() => navigate("/")}
              className="bg-[#0f766e] text-white px-6 py-3 rounded-full font-black hover:bg-[#134e4a] transition"
            >
              Ana Sayfaya Dön
            </button>

            <Link
              to="/pet-shop"
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-full font-black hover:bg-[#d8e7e4] transition"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        label="Ödeme"
        title="Siparişi tamamla"
      />

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
        <form
          onSubmit={handlePayment}
          className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm"
        >
          <h3 className="text-2xl font-black text-[#134e4a]">
            Ödeme Bilgileri
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              onFocus={() => setFocusedField("front")}
              placeholder="Kart üzerindeki ad soyad"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            />

            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              onFocus={() => setFocusedField("front")}
              placeholder="Kart numarası"
              maxLength="19"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            />

            <input
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              onFocus={() => setFocusedField("front")}
              placeholder="Son kullanma tarihi Örn: 12/28"
              maxLength="5"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              onFocus={() => setFocusedField("back")}
              placeholder="CVV"
              maxLength="3"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
              required
            />

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              onFocus={() => setFocusedField("front")}
              placeholder="Teslimat adresi"
              rows="5"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-2"
              required
            />
          </div>

          <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 mt-6">
            <h4 className="font-black text-[#134e4a]">
              Güvenli ödeme notu
            </h4>

            <p className="text-slate-500 mt-2 leading-7 text-sm">
              Girilen kart bilgileri herhangi bir yere gönderilmez.
            </p>
          </div>

          <button className="w-full bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black mt-6 hover:bg-[#134e4a] transition">
            Ödemeyi Tamamla
          </button>
        </form>

        <aside className="space-y-6 sticky top-28">
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-2xl font-black text-[#134e4a]">
              Temsili Kart
            </h3>

            <p className="text-slate-500 mt-2">
              CVV alanına tıklayınca kart arka yüze döner.
            </p>

            <div className="mt-6 [perspective:1000px]">
              <div
                className={
                  focusedField === "back"
                    ? "relative min-h-[240px] transition-transform duration-700 [transform-style:preserve-3d] [transform:rotateY(180deg)]"
                    : "relative min-h-[240px] transition-transform duration-700 [transform-style:preserve-3d]"
                }
              >
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#134e4a] via-[#0f766e] to-[#14b8a6] text-white p-7 shadow-xl [backface-visibility:hidden]">
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-xl"></div>

                  <div className="relative flex items-center justify-between">
                    <h4 className="font-black text-xl">Card</h4>

                    <div className="w-14 h-10 rounded-xl bg-white/25 border border-white/30"></div>
                  </div>

                  <div className="relative mt-10">
                    <p className="text-2xl md:text-3xl tracking-[0.18em] font-black">
                      {previewCardNumber}
                    </p>
                  </div>

                  <div className="relative flex items-end justify-between mt-10 gap-4">
                    <div>
                      <p className="text-white/55 text-xs uppercase">
                        Kart Sahibi
                      </p>
                      <h4 className="font-black tracking-wide uppercase">
                        {previewName}
                      </h4>
                    </div>

                    <div className="text-right">
                      <p className="text-white/55 text-xs uppercase">SKT</p>
                      <h4 className="font-black">{previewExpiry}</h4>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-slate-900 text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="h-14 bg-slate-700 mt-8"></div>

                  <div className="px-7 mt-10">
                    <div className="bg-white text-slate-900 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-slate-400 font-bold">CVV</span>
                      <strong className="tracking-[0.3em]">
                        {previewCvv}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
            <h3 className="text-2xl font-black text-[#134e4a]">
              Sipariş Özeti
            </h3>

            <div className="space-y-4 mt-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border border-[#d8e7e4] rounded-2xl p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-black text-[#134e4a]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {item.quantity} adet x {item.price} TL
                    </p>
                  </div>

                  <p className="font-black text-[#0f766e]">
                    {item.quantity * item.price} TL
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#d8e7e4] mt-6 pt-5 space-y-4">
              <div className="flex items-center justify-between text-slate-500">
                <span>Ürün adedi</span>
                <strong className="text-[#134e4a]">{totalQuantity}</strong>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Ara toplam</span>
                <strong className="text-[#134e4a]">{totalPrice} TL</strong>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Kargo</span>
                <strong className="text-[#134e4a]">{shippingPrice} TL</strong>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>İndirim</span>
                <strong className="text-[#0f766e]">-{discountPrice} TL</strong>
              </div>

              <div className="flex items-center justify-between border-t border-[#d8e7e4] pt-5">
                <span className="text-lg font-black text-[#134e4a]">
                  Ödenecek Tutar
                </span>

                <strong className="text-3xl font-black text-[#0f766e]">
                  {finalPrice} TL
                </strong>
              </div>
            </div>

            <Link
              to="/sepet"
              className="w-full inline-flex justify-center bg-[#e7f4f2] text-[#0f766e] px-6 py-4 rounded-2xl font-black mt-6 hover:bg-[#d8e7e4] transition"
            >
              Sepete Geri Dön
            </Link>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}