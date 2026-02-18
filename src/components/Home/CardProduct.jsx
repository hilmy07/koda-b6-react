import React, { useEffect, useState } from "react";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import cart from "../../assets/ShoppingCart.png";
import { useNavigate } from "react-router";

function CardProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Mapping nama file ke modul image
  const imageMap = {
    "product1.png": product1,
    "product2.png": product2,
    "product3.png": product3,
    "product4.png": product4,
  };

  const handleDetailProduct = (id) => {
    navigate(`/product/${id}`);
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
    <form className="flex flex-wrap justify-center gap-10 mb-55">
      {products.map((prod) => (
        <div key={prod.id} className="relative mt-50 ml-3">
          <div
            className="w-70 h-70 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageMap[prod.image]})` }}
          ></div>
          <div className="absolute top-59 left-2 w-66 h-45 bg-white z-10 px-2 shadow-md border border-transparent">
            <p className="text-[#0b132a] text-2xl">{prod.name}</p>
            <p className="text-[10px] text-[#4f5665] text-xl mt-2">
              {prod.description}
            </p>
            <p className="mt-1 text-[#ff8906] text-xl">{prod.price}</p>
            <div className="flex gap-1">
              <button
                className="cursor-pointer px-23 py-1 bg-[#ff8906] mt-5 rounded-sm text-black"
                onClick={() => handleDetailProduct(prod.id)}
              >
                Buy
              </button>
              <button className="cursor-pointer px-2 py-0.5 mt-5 rounded-sm text-black border-2 border-[#ff8906]">
                <img src={cart} alt="cart" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </form>
  );
}

export default CardProduct;
