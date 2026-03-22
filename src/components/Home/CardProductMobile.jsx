import React, { useEffect, useState } from "react";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import cart from "../../assets/ShoppingCart.png";
import http from "../../lib/http";

function CardProductMobile() {
  const [products, setProducts] = useState([]);

  // Mapping nama file ke modul image
  const imageMap = {
    "americano.jpg": product1,
    "mocha.jpg": product2,
    "vanilla.jpg": product3,
    "thaitea.jpg": product4,
  };

  useEffect(() => {
    const getDataProducts = async () => {
      const result = await http("/recommended-products");

      setProducts(result.data);
    };

    getDataProducts();
  }, []);

  return (
    <>
      <form className="grid grid-cols-2 gap-2 mb-60">
        {products.map((prod) => (
          <div key={prod.id} className="relative mt-50 mx-3 mb-4">
            <div
              className="w-40 h-50 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageMap[prod.image]})` }}
            ></div>
            <div className="absolute top-45 w-40 h-50 bg-white z-10 px-2 border border-transparent">
              <p className="text-[#0b132a] text-xl line-clamp-1">
                {prod.name_product}
              </p>
              <p className="text-[10px] text-[#4f5665] text-xl mt-2 line-clamp-3">
                {prod.description}
              </p>
              <p className="mt-1 text-[#ff8906] text-xl">{prod.base_price}</p>
              <div className="flex flex-col gap-1">
                <button className="cursor-pointer px-10 py-1 bg-[#ff8906] mt-2 rounded-sm text-black">
                  Buy
                </button>
                <button className="cursor-pointer px-15 py-1 mt-2 rounded-sm text-black border-2 border-[#ff8906]">
                  <img src={cart} alt="cart" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </form>
    </>
  );
}

export default CardProductMobile;
