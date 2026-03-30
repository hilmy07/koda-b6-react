import React, { useEffect, useState } from "react";
import cart from "../../assets/ShoppingCart.png";
import rating from "../../assets/rating.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

function ProductCard({ page }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const handleDetailProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://hilmy-backend.camps.fahrul.id/product?page=${page}`,
        );
        const data = await res.json();

        setProducts(data.products); // 🔥 penting
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <>
      <div className="lg:block hidden">
        <form className="grid grid-cols-[min-content_min-content] gap-2 justify-center">
          {products.map((prod) => (
            <div key={prod.id} className="relative ml-20 mb-50">
              <div
                className="w-108 h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${prod.image})` }} // 🔥 langsung dari backend
              ></div>

              <div className="absolute px-4 py-2 top-5 text-white text-xl left-5 rounded-3xl bg-red-700">
                <p>FLASH SALE!</p>
              </div>

              <div className="absolute top-65 left-2 w-104 h-55 bg-white z-10 px-2 shadow-md border border-transparent">
                <p className="text-[#0b132a] text-4xl">{prod.name_product}</p>
                <p className="text-[15px] text-[#4f5665] text-xl mt-2">
                  {prod.description}
                </p>
                <div className="mt-2">
                  <img src={rating} alt="rating" />
                </div>
                <div className="flex gap-5 mt-2 items-center">
                  <p className="text-[#ff8906] text-3xl">
                    IDR {prod.base_price}
                  </p>
                </div>
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => handleDetailProduct(prod.id)}
                    className="cursor-pointer px-40 py-2 bg-[#ff8906] rounded-sm text-black"
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(prod)}
                    className="cursor-pointer px-4 py-1 rounded-sm text-black border-2 border-[#ff8906]"
                  >
                    <img src={cart} alt="cart" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>

      {/* mobile tetap sama */}
      <div className="lg:hidden">
        <form className="grid grid-cols-[min-content_min-content] gap-2 justify-center">
          {products.map((prod) => (
            <div key={prod.id} className="relative ml-4 mb-90">
              <div
                className="w-40 h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${prod.image})` }} // 🔥 fix juga disini
              ></div>

              <div className="absolute px-2 py-2 top-2 text-white text-sm left-2 rounded-3xl bg-red-700">
                <p>FLASH SALE!</p>
              </div>

              <div className="absolute top-40 left-0 w-40 h-80 bg-white z-10 px-2 border border-transparent">
                <p className="text-[#0b132a] text-xl">{prod.name_product}</p>
                <p className="text-[15px] text-[#4f5665] text-sm mt-2 line-clamp-3">
                  {prod.description}
                </p>
                <div className="mt-2">
                  <img src={rating} alt="rating" />
                </div>
                <div className="flex gap-5 mt-2 items-center">
                  <p className="text-[#ff8906] text-xl">
                    IDR {prod.base_price}
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <button
                    onClick={() => handleDetailProduct(prod.id)}
                    className="cursor-pointer px-10 py-2 bg-[#ff8906] rounded-sm text-black"
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(prod)}
                    className="cursor-pointer px-16 py-2 rounded-sm text-black border-2 border-[#ff8906]"
                  >
                    <img src={cart} alt="cart" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
    </>
  );
}

export default ProductCard;
