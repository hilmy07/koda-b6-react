import React from "react";
import { NavbarProduct } from "../components/Navbar";
import Footer from "../components/Footer";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <span className="w-6 text-center">{icon}</span>
        <span className="text-zinc-600">{label}</span>
      </div>
      <div className="font-medium text-right">{value}</div>
    </div>
  );
}

const imageMap = {
  "product1.png": product1,
  "product2.png": product2,
};

function DetailOrder() {
  const orderId = "#12354–09893";
  const orderDate = "21 March 2023 at 10:30 AM";
  const info = {
    fullName: "Ghaluh Wizard Anggoro",
    address: "Griya bandung indah",
    phone: "082116304338",
    payment: "Cash",
    shipping: "Dine In",
    status: "Done",
    total: "Idr 40.000",
  };

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const two = data.slice(0, 2);
        const mapped = two.map((p) => ({
          id: p.id,
          name: p.name,
          image: imageMap[p.image] ?? product1,
          original: "IDR 40.000",
          price: p.price,
          meta: "2pcs • Regular • Ice • Dine In",
        }));
        setItems(mapped);
      })
      .catch((e) => console.error("Failed to load products:", e));
  }, []);

  return (
    <>
      <NavbarProduct />
      <section className="max-w-6xl mx-auto px-6 mt-35">
        <header className="mb-7">
          <h1 className="text-3xl md:text-5xl">
            Order <span className="tracking-wide font-bold">{orderId}</span>
          </h1>
          <p className="text-l text-zinc-500 mt-1">{orderDate}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Information</h2>
            <div className="divide-y divide-zinc-200 border-zinc-200">
              <Row icon="👤" label="Full Name" value={info.fullName} />
              <Row icon="📍" label="Address" value={info.address} />
              <Row icon="📞" label="Phone" value={info.phone} />
              <Row icon="💳" label="Payment Method" value={info.payment} />
              <Row icon="🚚" label="Shipping" value={info.shipping} />
              <Row
                icon="✅"
                label="Status"
                value={
                  <span className="inline-flex items-center px-5 py-1 rounded-full text-l bg-green-100 text-green-700">
                    Done
                  </span>
                }
              />
              <div className="flex items-center justify-between p-3">
                <span className="text-zinc-600">Total Transaksi</span>
                <span className="font-semibold text-[#ff8906]">
                  {info.total}
                </span>
              </div>
            </div>
          </div>

          <aside>
            <h2 className="text-lg font-semibold mb-3">Your Order</h2>
            <div className="space-y-4">
              {items.map((it) => (
                <article
                  key={it.id}
                  className="flex gap-4 border border-zinc-200 bg-white p-3"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-28 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <span className="inline-block bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-2xl">
                      FLASH SALE!
                    </span>
                    <h3 className="mt-1 font-semibold">{it.name}</h3>
                    <p className="text-sm text-zinc-600">{it.meta}</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-[#d00000] line-through text-xs">
                        {it.original}
                      </span>
                      <span className="text-[#ff8906] text-xl font-semibold">
                        {it.price}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}

export default DetailOrder;
