import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toggleFavorite } from "../../store/favoriteSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.approvedProducts);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <PageContainer>
        <PageHeader
          label="Ürün Detayı"
          title="Ürün bulunamadı"
          description="Aradığınız ürün sistemde bulunamadı."
        />

        <Link
          to="/pet-shop"
          className="inline-flex bg-[#0f766e] text-white px-6 py-3 rounded-full font-black"
        >
          Pet Shop'a Dön
        </Link>
      </PageContainer>
    );
  }

  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  const similarProducts = products.filter((item) => {
    return item.category === product.category && item.id !== product.id;
  });

  return (
    <PageContainer>
      <PageHeader
        label="Ürün Detayı"
        title={product.name}
        description={product.description}
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm">
          <div className="h-[430px] bg-[#e7f4f2]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-8 shadow-sm">
            <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-sm font-black">
              {product.category}
            </span>

            <h2 className="text-5xl font-black text-[#134e4a] mt-5">
              {product.name}
            </h2>

            <p className="text-slate-500 leading-8 mt-5">
              {product.description}
            </p>

            <h3 className="text-5xl font-black text-[#0f766e] mt-6">
              {product.price} TL
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition"
              >
                Sepete Ekle
              </button>

              <button
                onClick={() => dispatch(toggleFavorite(product))}
                className={
                  isFavorite
                    ? "bg-red-500 text-white px-6 py-4 rounded-2xl font-black hover:bg-red-600 transition"
                    : "bg-[#e7f4f2] text-[#0f766e] px-6 py-4 rounded-2xl font-black hover:bg-[#d8e7e4] transition"
                }
              >
                {isFavorite ? "Favoriden Çıkar" : "Favoriye Ekle"}
              </button>
            </div>

            <Link
              to="/pet-shop"
              className="inline-flex bg-white border border-[#d8e7e4] text-[#134e4a] px-6 py-3 rounded-full font-black hover:bg-[#f3f8f7] transition mt-5"
            >
              Pet Shop'a Dön
            </Link>
          </div>

        </div>
      </div>

      {similarProducts.length > 0 && (
        <section className="mt-10">
          <div className="mb-6">
            <p className="text-[#0f766e] font-black mb-2">Benzer Ürünler</p>
            <h2 className="text-3xl font-black text-[#134e4a]">
              Aynı kategorideki ürünler
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {similarProducts.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/pet-shop/${item.id}`}
                className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <div className="h-44 bg-[#e7f4f2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-[#134e4a]">
                    {item.name}
                  </h3>

                  <p className="text-[#0f766e] font-black mt-2">
                    {item.price} TL
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}