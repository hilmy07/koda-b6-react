import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../lib/http";
import cart from "../../assets/ShoppingCart.png";

function CardProduct({ limit = 3, excludeId = null }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getDataProducts = async () => {
      try {
        const res = await http("/recommended-products");

        let result = res.data?.products || res.data || [];

        if (excludeId !== null) {
          result = result.filter((p) => p.id !== Number(excludeId));
        }

        setProducts(result.slice(0, limit));
      } catch (err) {
        console.error(err);
      }
    };

    getDataProducts();
  }, [limit, excludeId]);

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {products.map((prod) => (
        <div key={prod.id} className="relative ml-3">
          <Link to={`/product/${prod.id}`}>
            <div
              className="w-84 h-84 bg-cover bg-center"
              style={{ backgroundImage: `url(${prod.image})` }}
            ></div>
          </Link>
          <div className="absolute top-70 left-2 w-80 h-54 bg-white z-10 px-2 shadow-md border border-transparent">
            <Link to={`/product/${prod.id}`}>
              <p className="text-[#0b132a] text-2xl hover:underline cursor-pointer">
                {prod.name_product}
              </p>
            </Link>

            <p className="text-[#4f5665] text-sm mt-2 line-clamp-3">
              {prod.description}
            </p>

            <div className="flex gap-1">
              {Array.from({ length: prod.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>

            <p className="text-[#ff8906] text-xl">{prod.base_price}</p>

            <div className="flex gap-1">
              <Link
                to={`/product/${prod.id}`}
                className="cursor-pointer px-30 py-1 bg-[#ff8906] mt-2 rounded-sm text-black text-center"
              >
                Buy
              </Link>

              <button
                type="button"
                className="cursor-pointer px-2 py-0.5 mt-2 rounded-sm text-black border-2 border-[#ff8906]"
              >
                <img src={cart} alt="cart" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardProduct;
