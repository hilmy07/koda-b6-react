import React, { useState } from "react";
import CardProduct from "../components/DetailProduct/CardProduct";
// import NavbarProduct from "../components/NavbarProduct";
import { NavbarProduct } from "../components/Navbar";
import Footer from "../components/Footer";
import DotsPager from "../components/DotsPagger";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";

// Tempelkan di dalam DetailProduct, sebelum <div className="mb-50">...
function DetailTop() {
  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState("regular");
  const [temp, setTemp] = React.useState("ice");

  return (
    <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 mt-35">
      {/* Kiri: gambar utama + thumbnail */}
      <div>
        <div className="w-full h-105 overflow-hidden">
          <img
            src={product1} // ganti sesuai sumber gambar
            alt="Hazelnut Latte"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {[product2, product3, product4].map((src, i) => (
            <button
              key={i}
              type="button"
              className="h-28 overflow-hidden border border-zinc-200"
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

      {/* Kanan: detail */}
      <div>
        <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          FLASH SALE!
        </span>

        <h1 className="mt-3 text-4xl font-semibold">Hazelnut Latte</h1>

        <div className="mt-2 flex items-baseline gap-4">
          <span className="text-zinc-400 line-through text-sm">IDR 20.000</span>
          <span className="text-orange-500 text-2xl font-bold">IDR 10.000</span>
        </div>

        <div className="mt-3 flex items-center gap-3 text-sm">
          <div className="text-amber-500">★★★★★</div>
          <span className="text-zinc-500">5.0</span>
          <span className="text-zinc-500">• 200+ Review</span>
          <span className="text-zinc-500">• Recommendation</span>
          <span className="text-orange-500">👍</span>
        </div>

        <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
          Cold brewing is a method of brewing that combines ground coffee and
          cool water and uses time instead of heat to extract the flavor.
        </p>

        {/* Qty */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 border rounded text-zinc-700"
              aria-label="minus"
            >
              −
            </button>
            <span className="w-10 text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 bg-orange-500 text-white rounded"
              aria-label="plus"
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
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Hot / Ice */}
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
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="h-12 rounded bg-orange-500 text-white hover:bg-orange-600">
            Buy
          </button>
          <button className="h-12 rounded border border-orange-400 text-orange-500 hover:bg-orange-50">
            add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

function DetailProduct() {
  const [activeDot, setActiveDot] = useState(1);
  return (
    <>
      <NavbarProduct />
      <DetailTop />
      <div>
        <h2 className="text-5xl font-semibold mt-20 mb-7 ml-52">
          Recommendation <span className="text-[#8e6447]">For You</span>
        </h2>
      </div>
      <div className="mb-50">
        <CardProduct />
      </div>
      <DotsPager page={activeDot} count={4} onChange={setActiveDot} />
      <Footer />
    </>
  );
}

export default DetailProduct;
