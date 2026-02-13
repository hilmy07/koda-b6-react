import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardProduct from "../components/DetailProduct/CardProduct";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DotsPager from "../components/DotsPagger";

import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { addToCart } from "../redux/slice/cartSlice";

// mapping gambar dari json -> import
const imageMap = {
  "product1.png": product1,
  "product2.png": product2,
  "product3.png": product3,
  "product4.png": product4,
  "product5.png": product5,
  "product6.png": product6,
};

// ============================
// DetailTop
// ============================
function DetailTop({ product, thumbnails }) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("regular");
  const [temp, setTemp] = useState("ice");

  const { isLoggedIn } = useContext(AuthContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      qty: "",
      size: "",
      temp: "",
    },
  });

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Silakan login dulu untuk menambahkan ke keranjang.");
      return;
    }
    // console.log();
    dispatch(
      addToCart({
        ...product,
        qty,
        size,
        temp,
      }),
    );
  };

  // override kalau user klik thumbnail
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product) return null;

  // default gambar dari product
  const mainImage = selectedImage ?? imageMap[product.image];

  return (
    <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 mt-35">
      {/* Kiri */}
      <div>
        <div className="w-full h-105 overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* thumbnail bawah */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {thumbnails.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImage(src)} // ✅ FIX DISINI
              className={`h-28 overflow-hidden border border-zinc-200 ${
                mainImage === src ? "border-orange-500" : ""
              }`}
            >
              <img
                src={src}
                alt={`thumb-${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Kanan */}
      <div>
        <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          FLASH SALE!
        </span>

        <form action="">
          {/* product name */}
          <h1 className="mt-3 text-4xl font-semibold" {...register("name")}>
            {product.name}
          </h1>

          {/* product price */}
          <div className="mt-2 flex items-baseline gap-4">
            <span className="text-zinc-400 line-through text-sm">
              {product.price}
            </span>
            <span
              className="text-orange-500 text-2xl font-bold"
              {...register("price")}
            >
              IDR 10.000
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="text-amber-500">★★★★★</div>
            <span className="text-zinc-500">5.0</span>
            <span className="text-zinc-500">• 200+ Review</span>
            <span className="text-zinc-500">• Recommendation</span>
            <span className="text-orange-500">👍</span>
          </div>
          <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Qty */}
          <div className="mt-4">
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border rounded text-zinc-700"
              >
                −
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-8 h-8 bg-orange-500 text-white rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Choose Size */}
          <div className="mt-6">
            <p className="font-medium mb-2">Choose Size</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["regular", "Regular"],
                ["medium", "Medium"],
                ["large", "Large"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSize(val)}
                  className={`h-11 border rounded ${
                    size === val
                      ? "border-orange-500 text-orange-600"
                      : "border-zinc-300 text-zinc-600"
                  }`}
                  {...register("size")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Hot / Ice / temp */}
          <div className="mt-6">
            <p className="font-medium mb-2">Hot/Ice?</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["ice", "Ice"],
                ["hot", "Hot"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTemp(val)}
                  className={`h-11 border rounded ${
                    temp === val
                      ? "border-orange-500 text-orange-600"
                      : "border-zinc-300 text-zinc-600"
                  }`}
                  {...register("temp")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              className="h-12 rounded bg-orange-500 text-white hover:bg-orange-600"
              onClick={() => navigate("/checkout")}
            >
              Buy
            </button>
            <button
              className="h-12 rounded border border-orange-400 text-orange-500 hover:bg-orange-50"
              onClick={handleAddToCart}
            >
              add to cart
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

// ============================
// DetailProduct
// ============================
export default function DetailProduct() {
  const [activeDot, setActiveDot] = useState(1);
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  // ambil semua product json
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ product TIDAK perlu state lagi
  const product = useMemo(() => {
    return products.find((p) => p.id === Number(id));
  }, [products, id]);

  // thumbnail bawah (ambil 3 produk lain selain yg sedang dibuka)
  const thumbnails = useMemo(() => {
    return products
      .filter((p) => p.id !== Number(id))
      .slice(0, 3)
      .map((p) => imageMap[p.image]);
  }, [products, id]);

  if (!product) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <>
      {/* <NavbarProduct /> */}
      <Navbar variant="dark" />

      <DetailTop product={product} thumbnails={thumbnails} />

      <div>
        <h2 className="text-5xl font-semibold mt-20 mb-7 ml-52">
          Recommendation <span className="text-[#8e6447]">For You</span>
        </h2>
      </div>

      <div className="mb-50">
        <CardProduct limit={3} excludeId={id} />
      </div>

      <DotsPager page={activeDot} count={4} onChange={setActiveDot} />
      <Footer />
    </>
  );
}
