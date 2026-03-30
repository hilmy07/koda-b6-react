import React, { useEffect, useState } from "react";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import cart from "../../assets/ShoppingCart.png";
import { useNavigate } from "react-router";
import http from "../../lib/http";

function CardProduct() {
  // const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Mapping nama file ke modul image
  const imageMap = {
    "americano.jpg": product1,
    "mocha.jpg": product2,
    "vanilla.jpg": product3,
    "thaitea.jpg": product4,
  };

  const handleDetailProduct = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const getDataProducts = async () => {
      const result = await http("/recommended-products");

      setData(result.data);
    };

    getDataProducts();
  }, []);

  return (
    <form className="flex flex-wrap justify-center gap-10 mb-55">
      {data.map((prod) => (
        <div key={prod.id} className="relative mt-50 ml-3">
          <div
            className="w-70 h-70 bg-cover bg-center"
            style={{ backgroundImage: `url(${prod.image})` }}
          ></div>
          <div className="absolute top-59 left-2 w-66 h-52 bg-white z-10 px-3 py-2 shadow-md flex flex-col justify-between">
            <div>
              <p className="text-[#0b132a] text-xl font-semibold line-clamp-1">
                {prod.name_product}
              </p>

              <p className="text-sm text-[#4f5665] mt-2 line-clamp-3">
                {prod.description}
              </p>
            </div>

            <div>
              <p className="text-[#ff8906] text-xl">IDR {prod.base_price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 cursor-pointer py-1 bg-[#ff8906] rounded-sm text-black"
                  onClick={() => handleDetailProduct(prod.id)}
                >
                  Buy
                </button>

                <button className="cursor-pointer px-2 py-1 rounded-sm border-2 border-[#ff8906]">
                  <img src={cart} alt="cart" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </form>
  );
}

export default CardProduct;
