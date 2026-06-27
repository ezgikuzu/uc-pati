import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { removeFavorite } from "../../store/favoriteSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Favorites() {
  const dispatch = useDispatch();

  const favoriteItems = useSelector((state) => state.favorites.items);

  return (
    <PageContainer>
      <PageHeader
        label="Favoriler"
        title="Beğendiğiniz ürünler"
        description="Favoriye eklediğiniz ürünleri buradan inceleyebilir, sepete ekleyebilir veya favorilerden kaldırabilirsiniz."
      />

      {favoriteItems.length === 0 ? (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">🤍</div>

          <h2 className="text-3xl font-black text-[#134e4a]">
            Favori ürününüz yok
          </h2>

          <p className="text-slate-500 mt-3">
            Pet shop ürünlerini inceleyip kalp ikonuna basarak favorilere
            ekleyebilirsiniz.
          </p>

          <Link
            to="/pet-shop"
            className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black mt-7 hover:bg-[#134e4a] transition"
          >
            Pet Shop'a Git
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="h-56 bg-[#e7f4f2]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                  {item.category}
                </span>

                <h3 className="text-2xl font-black text-[#134e4a] mt-4">
                  {item.name}
                </h3>

                <p className="text-slate-500 leading-7 mt-3 min-h-[84px]">
                  {item.description}
                </p>

                <h4 className="text-3xl font-black text-[#0f766e] mt-5">
                  {item.price} TL
                </h4>

                <div className="grid gap-3 mt-5">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition"
                  >
                    Sepete Ekle
                  </button>

                  <button
                    onClick={() => dispatch(removeFavorite(item.id))}
                    className="bg-red-100 text-red-600 px-6 py-4 rounded-2xl font-black hover:bg-red-200 transition"
                  >
                    Favorilerden Kaldır
                  </button>

                  <Link
                    to={`/pet-shop/${item.id}`}
                    className="text-center bg-[#e7f4f2] text-[#0f766e] px-6 py-4 rounded-2xl font-black hover:bg-[#d8e7e4] transition"
                  >
                    Detay Gör
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}