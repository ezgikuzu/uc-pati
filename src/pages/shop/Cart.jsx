import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../../store/cartSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shippingPrice = totalPrice > 0 ? 60 : 0;
  const discountPrice = totalPrice >= 500 ? 50 : 0;
  const finalPrice = totalPrice + shippingPrice - discountPrice;

  if (cartItems.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          label="Sepet"
          title="Sepetiniz boş"
          description="Pet Shop sayfasından evcil dostunuz için ürün seçip sepete ekleyebilirsiniz."
        />

        <div className="bg-white border border-[#d8e7e4] rounded-3xl p-8 md:p-10 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#e7f4f2] text-[#0f766e] flex items-center justify-center text-4xl mb-5">
            🛒
          </div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Sepetinizde ürün yok
          </h2>

          <p className="text-slate-500 mt-3">
            Mama, oyuncak, aksesuar ve bakım ürünlerini inceleyerek alışverişe
            başlayabilirsiniz.
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

  return (
    <PageContainer>
      <PageHeader
        label="Sepet"
        title="Sepetim"
        description="Sepete eklediğiniz ürünleri, adetlerini ve toplam tutarı buradan kontrol edebilirsiniz."
      />

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-black text-[#134e4a]">
                Sepetteki Ürünler
              </h3>

              <p className="text-slate-500 mt-1">
                Toplam {totalQuantity} ürün bulunuyor.
              </p>
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-100 text-red-600 px-5 py-3 rounded-full font-black hover:bg-red-200 transition"
            >
              Sepeti Temizle
            </button>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid md:grid-cols-[130px_1fr_auto] gap-5 border border-[#d8e7e4] rounded-3xl p-4"
              >
                <Link
                  to={`/pet-shop/${item.id}`}
                  className="h-[130px] rounded-2xl overflow-hidden bg-[#e7f4f2]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition duration-300"
                  />
                </Link>

                <div>
                  <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-3 py-1 rounded-full text-xs font-black">
                    {item.category}
                  </span>

                  <Link to={`/pet-shop/${item.id}`}>
                    <h4 className="text-xl font-black text-[#134e4a] mt-3 hover:text-[#0f766e] transition">
                      {item.name}
                    </h4>
                  </Link>

                  <p className="text-slate-500 mt-2 leading-6">
                    {item.description}
                  </p>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="mt-4 text-red-500 font-black hover:text-red-700"
                  >
                    Ürünü Sil
                  </button>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-4">
                  <p className="text-2xl font-black text-[#134e4a]">
                    {item.price * item.quantity} TL
                  </p>

                  <div className="flex items-center gap-2 bg-[#f3f8f7] border border-[#d8e7e4] rounded-full p-1">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-9 h-9 rounded-full bg-white text-[#0f766e] font-black border border-[#d8e7e4]"
                    >
                      -
                    </button>

                    <span className="w-8 text-center font-black text-[#134e4a]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-9 h-9 rounded-full bg-[#0f766e] text-white font-black"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-slate-500">
                    Birim fiyat: {item.price} TL
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm sticky top-28">
          <h3 className="text-2xl font-black text-[#134e4a]">
            Sipariş Özeti
          </h3>

          <div className="space-y-4 mt-6">
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

            <div className="border-t border-[#d8e7e4] pt-5 flex items-center justify-between">
              <span className="text-lg font-black text-[#134e4a]">
                Toplam
              </span>

              <strong className="text-3xl font-black text-[#0f766e]">
                {finalPrice} TL
              </strong>
            </div>
          </div>

          <div className="bg-[#f3f8f7] border border-[#d8e7e4] rounded-3xl p-5 mt-6">
            <h4 className="font-black text-[#134e4a]">
              Sepet Bilgilendirmesi
            </h4>

            <p className="text-slate-500 mt-2 leading-7 text-sm">
            Sepetinizdeki ürünleri ödeme adımına geçmeden önce kontrol edebilirsiniz. Ürün adetlerini artırabilir, azaltabilir veya sepetten kaldırabilirsiniz. 
            </p>
          </div>

          <Link
            to="/odeme"
            className="w-full inline-flex justify-center bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black mt-6 hover:bg-[#134e4a] transition"
          >
          Siparişi Tamamla
          </Link>

          <Link
            to="/pet-shop"
            className="w-full inline-flex justify-center bg-[#e7f4f2] text-[#0f766e] px-6 py-4 rounded-2xl font-black mt-3 hover:bg-[#d8e7e4] transition"
          >
            Alışverişe Devam Et
          </Link>
        </aside>
      </div>
    </PageContainer>
  );
}