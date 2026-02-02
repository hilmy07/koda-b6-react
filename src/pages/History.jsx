import React, { useState } from "react";
import { NavbarProduct } from "../components/Navbar";
import Footer from "../components/Footer";
import DotsPager from "../components/DotsPagger";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";

function History() {
  const [items, setItems] = React.useState([]);
  const [activeDot, setActiveDot] = useState(1);
  const base = new Date("2023-01-23");

  const imageMap = {
    "product1.png": product1,
    "product2.png": product2,
    "product3.png": product3,
    "product4.png": product4,
  };

  React.useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        // ambil 4 item pertama
        setItems(data.slice(0, 4));
      })
      .catch((e) => console.error("Failed to load products:", e));
  }, []);

  return (
    <>
      <NavbarProduct />
      <div className="mt-35">
        <h2 className="text-5xl font-semibold my-10 ml-35">History Order</h2>
      </div>
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 px-6">
        {/* Kiri: daftar order */}
        <div>
          {/* Tab / Filter bar sederhana */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-3 h-9 rounded bg-zinc-100 text-zinc-700">
              OnProgress
            </button>
            <button className="px-3 h-9 rounded bg-zinc-100 text-zinc-700">
              Sending Goods
            </button>
            <button className="px-3 h-9 rounded bg-zinc-100 text-zinc-700">
              Finish Order
            </button>
            <div className="ml-auto px-3 h-9 rounded border border-zinc-200 flex items-center gap-2 text-sm">
              <span>January 2023</span>
              <span>▾</span>
            </div>
          </div>

          {/* List */}
          <div className="mt-4 space-y-4">
            {items.map((p, idx) => {
              const date = new Date(base.getTime());
              date.setDate(base.getDate() + idx);
              const dateStr = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });

              return (
                <article
                  key={p.id}
                  className="flex items-start gap-4 border border-zinc-200 bg-white p-3"
                >
                  <img
                    src={imageMap[p.image] ?? product1}
                    alt={p.name}
                    className="w-20 h-16 object-cover"
                  />
                  <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-1 text-sm">
                      <div className="text-zinc-600">
                        <span className="block font-medium">No. Order</span>
                        <span className="font-semibold">
                          #12354–0989{3 + idx}
                        </span>
                      </div>
                      <div className="text-zinc-600">
                        <span className="block font-medium">Date</span>
                        <span className="font-semibold">{dateStr}</span>
                      </div>
                      <div className="text-zinc-600">
                        <span className="block font-medium">Total</span>
                        <span className="font-semibold">Idr 40.000</span>
                      </div>
                      <div className="text-zinc-600">
                        <span className="block font-medium">Status</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-orange-100 text-orange-700">
                          On Progress
                        </span>
                      </div>
                    </div>

                    <button className="mt-2 text-[13px] text-orange-600 hover:underline">
                      Views Order Detail
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Kanan: panel pesan */}
        <aside className="border border-zinc-200 bg-white p-4 h-max">
          <div className="flex flex-col gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center">
              ☰
            </div>
            <div>
              <h4 className="font-semibold">Send Us Message</h4>
              <p className="text-sm text-zinc-600">
                If unable to find answer or product quickly, describe your
                problem and we will help you.
              </p>
            </div>
          </div>
          <button className="mt-3 w-full h-10 rounded bg-orange-500 hover:bg-orange-600 text-white">
            Send Message
          </button>
        </aside>
      </section>
      <div className="mt-10 mr-100">
        <DotsPager page={activeDot} count={4} onChange={setActiveDot} />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}

export default History;
