import React, { useContext, useEffect, useState } from "react";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import product5 from "../../assets/product5.png";
import product6 from "../../assets/product6.png";
import cart from "../../assets/ShoppingCart.png";
import rating from "../../assets/rating.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/reducers/chart";

/**
 * Komponen kartu produk yang menampilkan daftar produk dari file JSON.
 * Pengguna dapat melihat detail produk, membeli, atau menambahkannya ke keranjang.
 *
 * @component
 * @returns {JSX.Element}
 */
function ProductCard() {
  const useAuth = () => useContext(AuthContext);
  const { isLoggedIn } = useAuth();
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Menyimpan daftar produk yang dimuat dari file JSON.
   * @type {[Object[], Function]}
   */
  const [products, setProducts] = useState([]);

  /**
   * Menangani navigasi ke halaman detail produk.
   */
  const handleDetailProduct = () => {
    navigate("/DetailProduct");
  };

  /**
   * Menambahkan produk ke keranjang melalui Redux.
   * Jika belum login, akan menampilkan peringatan.
   *
   * @param {Object} prod - Produk yang akan ditambahkan ke keranjang.
   */
  const handleAddToCart = (prod) => {
    if (!isLoggedIn) {
      alert("Silakan login dulu untuk menambahkan ke keranjang.");
      return;
    }
    console.log(prod);
    // dispatch(addToCart(prod));
  };

  /**
   * Mapping nama file gambar dari JSON ke import statis gambar.
   * Ini mencegah error karena tidak bisa load gambar dari path string langsung.
   *
   * @type {Object.<string, string>}
   */
  const imageMap = {
    "product1.png": product1,
    "product2.png": product2,
    "product3.png": product3,
    "product4.png": product4,
    "product5.png": product5,
    "product6.png": product6,
  };

  // Load data produk dari file JSON ketika komponen pertama kali dirender
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error loading products JSON:", err);
      });
  }, []);

  return (
    <>
      <div className="lg:block hidden">
        <form className="grid grid-cols-[min-content_min-content] gap-2 justify-center">
          {products.map((prod) => (
            <div key={prod.id} className="relative ml-20 mb-50">
              <div
                className="w-108 h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageMap[prod.image]})` }}
              ></div>

              <div className="absolute px-4 py-2 top-5 text-white text-xl left-5 rounded-3xl bg-red-700">
                <p>FLASH SALE!</p>
              </div>

              <div className="absolute top-65 left-2 w-104 h-55 bg-white z-10 px-2 shadow-md border border-transparent">
                <p className="text-[#0b132a] text-4xl">{prod.name}</p>
                <p className="text-[15px] text-[#4f5665] text-xl mt-2">
                  {prod.description}
                </p>
                <div className="mt-2">
                  <img src={rating} alt="rating" />
                </div>
                <div className="flex gap-5 mt-2 items-center">
                  <p className="text-[#d00000] text-xl line-through">
                    {prod.price}
                  </p>
                  <p className="text-[#ff8906] text-3xl">IDR 10.000</p>
                </div>
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={handleDetailProduct}
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

      {/* mobile view */}
      <div className="lg:hidden">
        <form className="grid grid-cols-[min-content_min-content] gap-2 justify-center">
          {products.map((prod) => (
            <div key={prod.id} className="relative ml-4 mb-90">
              <div
                className="w-40 h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageMap[prod.image]})` }}
              ></div>

              <div className="absolute px-2 py-2 top-2 text-white text-sm left-2 rounded-3xl bg-red-700">
                <p>FLASH SALE!</p>
              </div>

              <div className="absolute top-40 left-0 w-40 h-80 bg-white z-10 px-2 border border-transparent">
                <p className="text-[#0b132a] text-xl">{prod.name}</p>
                <p className="text-[15px] text-[#4f5665] text-sm mt-2">
                  {prod.description}
                </p>
                <div className="mt-2">
                  <img src={rating} alt="rating" />
                </div>
                <div className="flex gap-5 mt-2 items-center">
                  {/* <p className="text-[#d00000] text-xl line-through">
                  {prod.price}
                </p> */}
                  <p className="text-[#ff8906] text-xl">IDR 10.000</p>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  <button
                    onClick={handleDetailProduct}
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
