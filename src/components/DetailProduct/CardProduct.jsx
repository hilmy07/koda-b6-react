import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import product5 from "../../assets/product5.png";
import product6 from "../../assets/product6.png";
import cart from "../../assets/ShoppingCart.png";

function CardProduct({ limit = 3, excludeId = null }) {
  const [products, setProducts] = useState([]);

  const imageMap = {
    "product1.png": product1,
    "product2.png": product2,
    "product3.png": product3,
    "product4.png": product4,
    "product5.png": product5,
    "product6.png": product6,
  };

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        let result = data;

        if (excludeId !== null) {
          result = result.filter((p) => p.id !== Number(excludeId));
        }

        setProducts(result.slice(0, limit));
      })
      .catch((err) => console.error(err));
  }, [limit, excludeId]);

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {products.map((prod) => (
        <div key={prod.id} className="relative ml-3">
          {/* ✅ KLIK GAMBAR -> DETAIL */}
          <Link to={`/product/${prod.id}`}>
            <div
              className="w-84 h-84 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageMap[prod.image]})` }}
            />
          </Link>

          <div className="absolute top-70 left-2 w-80 h-45 bg-white z-10 px-2 shadow-md border border-transparent">
            {/* ✅ KLIK NAMA -> DETAIL */}
            <Link to={`/product/${prod.id}`}>
              <p className="text-[#0b132a] text-2xl hover:underline cursor-pointer">
                {prod.name}
              </p>
            </Link>

            <p className="text-[10px] text-[#4f5665] text-xl mt-2">
              {prod.description}
            </p>

            <p className="mt-1 text-[#ff8906] text-xl">{prod.price}</p>

            <div className="flex gap-1">
              {/* ✅ KLIK BUY -> DETAIL */}
              <Link
                to={`/product/${prod.id}`}
                className="cursor-pointer px-30 py-1 bg-[#ff8906] mt-5 rounded-sm text-black text-center"
              >
                Buy
              </Link>

              <button
                type="button"
                className="cursor-pointer px-2 py-0.5 mt-5 rounded-sm text-black border-2 border-[#ff8906]"
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
