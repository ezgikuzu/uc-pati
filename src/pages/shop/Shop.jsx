import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toggleFavorite } from "../../store/favoriteSlice";
import PageContainer from "../../components/PageContainer";
import PageHeader from "../../components/PageHeader";

export default function Shop() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.approvedProducts);

  const favoriteItems = useSelector((state) => state.favorites.items);

  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("Varsayılan");

  const categories = useMemo(() => {
    return ["Tümü", ...new Set(products.map((product) => product.category))];
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch =
        selectedCategory === "Tümü" || product.category === selectedCategory;

      const searchMatch =
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase());

      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortType === "Fiyat Artan") {
        return a.price - b.price;
      }

      if (sortType === "Fiyat Azalan") {
        return b.price - a.price;
      }

      return 0;
    });

  const isFavorite = (id) => {
    return favoriteItems.some((item) => item.id === id);
  };

  const resetFilters = () => {
    setSelectedCategory("Tümü");
    setSearchText("");
    setSortType("Varsayılan");
  };

  return (
    <PageContainer>
      <PageHeader
        label="Pet Shop"
        title="Evcil dostlarınız için ürünler"
        description="Mama, bakım ürünü, oyuncak ve temel ihtiyaç ürünlerini inceleyebilir, favorilere veya sepete ekleyebilirsiniz."
      />

      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 mb-8">
        <div className="bg-[#0f766e] text-white rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>

          <span className="relative inline-flex bg-white/15 px-4 py-2 rounded-full text-sm font-black">
            🛒 Üç Pati Pet Shop
          </span>

          <h2 className="relative text-4xl font-black mt-6 leading-tight">
            Bakım, mama ve oyun ürünleri tek yerde.
          </h2>

          <p className="relative text-white/80 leading-8 mt-5">
            Ürünleri kategoriye göre filtreleyebilir, favorilerinize
            ekleyebilir veya sepetinize gönderebilirsiniz.
          </p>
        </div>

        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-7 shadow-sm">
          <h2 className="text-3xl font-black text-[#134e4a]">
            Ürünleri Filtrele
          </h2>

          <p className="text-slate-500 mt-2">
            Ürün adı, kategori veya açıklama üzerinden arama yapabilirsiniz.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Ürün ara"
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e] md:col-span-3"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-[#d8e7e4] p-4 rounded-2xl outline-none focus:border-[#0f766e]"
            >
              <option>Varsayılan</option>
              <option>Fiyat Artan</option>
              <option>Fiyat Azalan</option>
            </select>

            <button
              onClick={resetFilters}
              className="bg-[#e7f4f2] text-[#0f766e] px-6 py-3 rounded-2xl font-black hover:bg-[#d8e7e4] transition"
            >
              Temizle
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[#0f766e] font-black mb-2">Ürünler</p>
          <h2 className="text-3xl font-black text-[#134e4a]">
            Pet shop listesi
          </h2>
        </div>

        <p className="text-slate-500 font-bold">
          {filteredProducts.length} ürün gösteriliyor
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#d8e7e4] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition"
          >
            <div className="relative h-56 bg-[#e7f4f2]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => dispatch(toggleFavorite(product))}
                className={
                  isFavorite(product.id)
                    ? "absolute top-4 right-4 w-12 h-12 rounded-full bg-red-500 text-white text-xl"
                    : "absolute top-4 right-4 w-12 h-12 rounded-full bg-white text-red-500 text-xl"
                }
              >
                ♥
              </button>
            </div>

            <div className="p-6">
              <span className="inline-flex bg-[#e7f4f2] text-[#0f766e] px-4 py-2 rounded-full text-xs font-black">
                {product.category}
              </span>

              <h3 className="text-2xl font-black text-[#134e4a] mt-4">
                {product.name}
              </h3>

              <p className="text-slate-500 leading-7 mt-3 min-h-[84px]">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-5">
                <h4 className="text-3xl font-black text-[#0f766e]">
                  {product.price} TL
                </h4>

                <Link
                  to={`/pet-shop/${product.id}`}
                  className="text-[#0f766e] font-black"
                >
                  Detay →
                </Link>
              </div>

              <button
                onClick={() => dispatch(addToCart(product))}
                className="w-full bg-[#0f766e] text-white px-6 py-4 rounded-2xl font-black hover:bg-[#134e4a] transition mt-5"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm mt-6">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-black text-[#134e4a]">
            Ürün bulunamadı
          </h3>
          <p className="text-slate-500 mt-2">
            Arama veya filtreyi değiştirerek tekrar deneyebilirsiniz.
          </p>
        </div>
      )}
    </PageContainer>
  );
}