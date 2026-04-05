import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardProduct from "../components/DetailProduct/CardProduct";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DotsPager from "../components/DotsPager";

import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";

import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { addToCart } from "../redux/slice/cartSlice";
import http from "../lib/http";

function DetailTop({ product, thumbnails }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [temp, setTemp] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainImage = selectedImage ?? product.images?.[0];

  const selectedSize = size || product.sizes?.[0] || "";
  const selectedTemp = temp || product.variants?.[0] || "";

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
        image: product.images?.[0],
        qty,
        size: selectedSize,
        temp: selectedTemp,
      }),
    );
  };

  const handleBuy = () => {
    if (!isLoggedIn) {
      alert("Silakan login dulu");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name_product,
        price: product.base_price,
        image: product.images?.[0],
        qty,
        size: selectedSize,
        temp: selectedTemp,
      }),
    );

    navigate("/checkout");
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
              type="button"
              onClick={() => setSelectedImage(src)}
              className={`h-28 overflow-hidden border ${
                mainImage === src ? "border-orange-500" : "border-zinc-200"
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

      {/* RIGHT CONTENT */}
      <div>
        <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          FLASH SALE!
        </span>

        <h1 className="mt-3 text-4xl font-semibold">{product.name_product}</h1>

        <div className="mt-2 flex items-baseline gap-4">
          <span className="text-orange-500 text-2xl font-bold">
            IDR {product.base_price.toLocaleString()}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <div className="flex gap-1 text-amber-500">
            {Array.from({ length: product.rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-zinc-500">{product.rating}.0</span>
          <span className="text-zinc-500">• {product.review_count} Review</span>
        </div>

        <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
          {product.description}
        </p>

        {/* QTY */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 border rounded"
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

        {/* SIZE */}
        <div className="mt-6">
          <p className="font-medium mb-2">Choose Size</p>
          <div className="grid grid-cols-3 gap-4">
            {product.sizes.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setSize(val)}
                className={`h-11 border rounded ${
                  selectedSize === val
                    ? "border-orange-500 text-orange-600"
                    : "border-zinc-300"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* VARIANT */}
        <div className="mt-6">
          <p className="font-medium mb-2">Hot / Ice</p>
          <div className="grid grid-cols-2 gap-4">
            {product.variants.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTemp(val)}
                className={`h-11 border rounded ${
                  selectedTemp === val
                    ? "border-orange-500 text-orange-600"
                    : "border-zinc-300"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            className="h-12 rounded bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleBuy}
          >
            Buy
          </button>

          <button
            type="button"
            className="h-12 rounded border border-orange-400 text-orange-500 hover:bg-orange-50"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeDot, setActiveDot] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await http(`/product/${id}`);
        setProduct(res.data?.[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const thumbnails = useMemo(() => {
    return [product1, product2, product3];
  }, []);

  if (!product) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <>
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
