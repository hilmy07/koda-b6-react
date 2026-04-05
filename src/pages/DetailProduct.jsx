import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DotsPager from "../components/DotsPager";
import CardProduct from "../components/DetailProduct/CardProduct";

import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";

import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { addToCart } from "../redux/slice/cartSlice";
import http from "../lib/http";

// ============================
// COMPONENT: DetailTop
// ============================
function DetailTop({ product, thumbnails }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [qty, setQty] = useState(1);

  const [size, setSize] = useState("");
  const [temp, setTemp] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainImage = selectedImage ?? thumbnails[0];

  // ✅ derived state (NO useEffect)
  const selectedSize = size || product?.sizes?.[0] || "";
  const selectedTemp = temp || product?.variants?.[0] || "";

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Login dulu bro.");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name_product,
        price: product.base_price,
        image: mainImage,
        qty,
        size: selectedSize,
        temp: selectedTemp,
      }),
    );
  };

  return (
    <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 mt-35">
      {/* LEFT */}
      <div>
        <div className="w-full h-105 overflow-hidden">
          <img
            src={mainImage}
            alt={product.name_product}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {thumbnails.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(src)}
              className={`h-28 border ${
                mainImage === src ? "border-orange-500" : "border-zinc-200"
              }`}
            >
              <img src={src} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div>
        <h1 className="text-4xl font-semibold">{product.name_product}</h1>

        <p className="text-orange-500 text-2xl font-bold mt-2">
          IDR {product.base_price}
        </p>

        <p className="mt-3 text-zinc-600">{product.description}</p>

        {/* QTY */}
        <div className="mt-4 flex gap-3 items-center">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)}>+</button>
        </div>

        {/* SIZE */}
        <div className="mt-4">
          <p>Size</p>
          <div className="flex gap-2">
            {product.sizes?.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 border ${
                  selectedSize === s ? "bg-black text-white" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* VARIANT */}
        <div className="mt-4">
          <p>Variant</p>
          <div className="flex gap-2">
            {product.variants?.map((v) => (
              <button
                key={v}
                onClick={() => setTemp(v)}
                className={`px-3 py-1 border ${
                  selectedTemp === v ? "bg-black text-white" : ""
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* ACTION */}
        <div className="mt-6 flex gap-4">
          <button onClick={() => navigate("/checkout")}>Buy</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}

// ============================
// PAGE: DetailProduct
// ============================
export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeDot, setActiveDot] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await http(`/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const thumbnails = [product1, product2, product3];

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      <Navbar variant="dark" />

      <DetailTop product={product} thumbnails={thumbnails} />

      <h2 className="text-4xl mt-20 text-center">Recommendation</h2>

      <div className="mb-20">
        <CardProduct limit={3} excludeId={id} />
      </div>

      <DotsPager page={activeDot} count={4} onChange={setActiveDot} />

      <Footer />
    </>
  );
}
