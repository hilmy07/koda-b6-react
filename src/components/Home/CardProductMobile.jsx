import React, { useEffect, useState } from "react";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import cart from "../../assets/ShoppingCart.png";

function CardProductMobile() {
  const [products, setProducts] = useState([]);

  // Mapping nama file ke modul image
  const imageMap = {
    "product1.png": product1,
    "product2.png": product2,
    "product3.png": product3,
    "product4.png": product4,
  };

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
      })
      .catch((err) => {
        console.error("Error loading products JSON:", err);
      });
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
              <p className="text-[#0b132a] text-xl">{prod.name}</p>
              <p className="text-[10px] text-[#4f5665] text-xl mt-2">
                {prod.description}
              </p>
              <p className="mt-1 text-[#ff8906] text-xl">{prod.price}</p>
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
