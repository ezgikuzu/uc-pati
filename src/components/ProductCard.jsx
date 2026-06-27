import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoriteSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const favoriteItems = useSelector((state) => state.favorites.items);
  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  const handleCartClick = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(product));
  };

  return (
    <Link
      to={`/pet-shop/${product.id}`}
      className="group bg-white border border-[#d8e7e4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col"
    >
      <div className="relative h-[260px] bg-[#e7f4f2] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#134e4a]/45 via-transparent to-transparent"></div>

        <span className="absolute left-4 top-4 bg-white text-[#0f766e] px-3 py-1 rounded-full text-xs font-black shadow-sm">
          {product.category}
        </span>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={
            isFavorite
              ? "absolute right-4 top-4 w-10 h-10 rounded-full bg-red-100 text-red-600 font-black shadow-sm"
              : "absolute right-4 top-4 w-10 h-10 rounded-full bg-white text-[#0f766e] font-black shadow-sm"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-black text-[#134e4a] min-h-[56px]">
          {product.name}
        </h3>

        <p className="text-slate-500 mt-2 leading-6 h-[72px] overflow-hidden">
          {product.description}
        </p>

        <div className="mt-auto pt-5">
          <p className="text-2xl font-black text-[#134e4a]">
            {product.price} TL
          </p>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={handleCartClick}
              className="bg-[#0f766e] text-white px-4 py-3 rounded-2xl font-black hover:bg-[#134e4a] transition"
            >
              Sepete Ekle
            </button>

            <span className="bg-[#e7f4f2] text-[#0f766e] px-4 py-3 rounded-2xl font-black text-center">
              Detay →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}