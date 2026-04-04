import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardProduct from "../components/DetailProduct/CardProduct";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DotsPager from "../components/DotsPager";

import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";

import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { addToCart } from "../redux/slice/cartSlice";
import http from "../lib/http";

function DetailTop({ product, thumbnails }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product?.sizes?.[0] || "");
  const [temp, setTemp] = useState(product?.variants?.[0] || "");

  const { isLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainImage = selectedImage ?? thumbnails[0];

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Silakan login dulu untuk menambahkan ke keranjang.");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name_product,
        price: product.base_price,
        image: mainImage,
        qty,
        size,
        temp,
      }),
    );
  };

  return (
    <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 mt-35">
      {/* LEFT IMAGE */}
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
              className={`h-28 overflow-hidden border ${
                mainImage === src ? "border-orange-500" : "border-zinc-200"
              }`}
            >
              <img
                src={src}
                alt={`thumb-${i}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div>
        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
          FLASH SALE!
        </span>

        <h1 className="mt-3 text-4xl font-semibold">{product.name_product}</h1>

        <div className="mt-2">
          <span className="text-orange-500 text-2xl font-bold">
            IDR {product.base_price.toLocaleString()}
          </span>
        </div>

        <p className="mt-3 text-zinc-600 text-sm">{product.description}</p>

        {/* QTY */}
        <div className="mt-4 flex gap-2 items-center">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)}>+</button>
        </div>

        {/* SIZE */}
        <div className="mt-4">
          <p>Size</p>
          <div className="flex gap-2">
            {product.sizes?.map((s) => (
              <button key={s} onClick={() => setSize(s)}>
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
              <button key={v} onClick={() => setTemp(v)}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button onClick={() => navigate("/checkout")}>Buy</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}

export default function DetailProduct() {
  const [activeDot, setActiveDot] = useState(1);
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await http(`/products`);
        setProducts(res.data || []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const product = useMemo(() => {
    if (!Array.isArray(products)) return null;
    return products.find((p) => p.id === Number(id));
  }, [products, id]);

  const thumbnails = useMemo(() => {
    const allImages = [
      product1,
      product2,
      product3,
      product4,
      product5,
      product6,
    ];

    return allImages.slice(0, 3);
  }, []);

  if (!product) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <>
      <Navbar variant="dark" />

      <DetailTop product={product} thumbnails={thumbnails} />

      <h2 className="text-5xl font-semibold mt-20 mb-7 ml-52">
        Recommendation <span className="text-[#8e6447]">For You</span>
      </h2>

      <div className="mb-50">
        <CardProduct limit={3} excludeId={id} />
      </div>

      <DotsPager page={activeDot} count={4} onChange={setActiveDot} />
      <Footer />
    </>
  );
}
