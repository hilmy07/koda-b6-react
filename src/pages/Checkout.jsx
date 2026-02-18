import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import product from "../assets/product1.png";
import bri from "../assets/bri.png";
import dana from "../assets/dana.png";
import bca from "../assets/bca.png";
import gopay from "../assets/gopay.png";
import ovo from "../assets/ovo.png";
import paypal from "../assets/paypal.png";
import Input from "../components/Input";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../redux/slice/cartSlice";
import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";

const images = {
  "product1.png": product1,
  "product2.png": product2,
  "product3.png": product3,
  "product4.png": product4,
};

function Checkout() {
  const [delivery, setDelivery] = React.useState("dinein");

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
  };

  function parsePrice(priceStr) {
    // hapus "IDR" dan titik, ubah jadi number
    return Number(priceStr.replace(/[^0-9]/g, ""));
  }

  const orderTotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.qty || 1),
    0,
  );

  const tax = orderTotal * 0.1; // contoh 10% tax
  const subTotal = orderTotal + tax;

  return (
    <>
      <Navbar variant="dark" />

      <div className="mt-30">
        <h2 className="text-5xl font-semibold my-10 ml-35">Payment Details</h2>
      </div>

      <section className="max-w-7xl mx-auto grid grid-cols-[60%_40%] gap-6 px-6 items-start">
        {/* Kiri */}
        <aside className="col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold">Your Order</h3>
            <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded">
              <span className="text-lg leading-none">+</span> Add Menu
            </button>
          </div>

          <div className="space-y-5 mt-10">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border border-zinc-200 bg-[#fcf8f8] p-5 shadow-sm"
                >
                  <img
                    src={images[item.image] || product}
                    alt={item.name}
                    className="w-30 h-28 object-cover"
                  />

                  <div className="flex-1">
                    {item.flashSale && (
                      <span className="inline-block bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                        FLASH SALE!
                      </span>
                    )}

                    <h4 className="mt-1 font-semibold">{item.name}</h4>

                    <p className="mt-1 text-sm text-zinc-600">
                      {item.qty}pcs <span className="mx-1">|</span> {item.size}{" "}
                      <span className="mx-1">|</span> {item.ice ? "Ice" : "Hot"}{" "}
                      <span className="mx-1">|</span> {item.type}
                    </p>

                    <div className="mt-2 flex items-baseline gap-3">
                      {item.originalPrice && (
                        <span className="text-zinc-400 line-through text-xs">
                          IDR {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-orange-500 font-semibold">
                        IDR {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    className="self-start text-red-500 hover:text-red-600 cursor-pointer"
                    aria-label="Remove"
                    title="Remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    ⨉
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-500">Cart is empty</p>
            )}
          </div>
        </aside>

        {/* Kanan */}
        <aside className="col-start-2 col-span-1">
          <h3 className="text-xl font-semibold mb-3">Total</h3>

          <div className="border border-zinc-200 bg-[#fcf8f8] p-4 h-82.5 mt-12">
            <div>
              <div className="pb-2 flex items-center justify-between">
                <span className="text-zinc-600">Order</span>
                <span className="font-medium">
                  IDR {orderTotal.toLocaleString()}
                </span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-zinc-600">Delivery</span>
                <span className="font-medium">IDR 0</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-zinc-600">Tax</span>
                <span className="font-medium">{tax.toLocaleString()}</span>
              </div>
              <hr className="border-0 h-px bg-[#e8e8e8]" />
              <div className="py-2 flex items-center justify-between">
                <span className="text-zinc-600">Sub Total</span>
                <span className="font-semibold">
                  {subTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className="mt-3 w-full h-11 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium"
              onClick={() => {
                handleCheckout();
              }}
            >
              Checkout
            </button>

            <div className="mt-2">
              <p className="text-sm text-zinc-600 mb-2">We Accept</p>
              <div className="flex flex-nowrap items-center gap-4 opacity-80 overflow-x-auto">
                <img src={bri} alt="BRI" className="h-4 w-auto shrink-0" />
                <img src={dana} alt="Dana" className="h-4 w-auto shrink-0" />
                <img src={bca} alt="BCA" className="h-4 w-auto shrink-0" />
                <img src={gopay} alt="Gopay" className="h-4 w-auto shrink-0" />
                <img src={ovo} alt="OVO" className="h-4 w-auto shrink-0" />
                <img
                  src={paypal}
                  alt="PayPal"
                  className="h-4 w-auto shrink-0"
                />
              </div>
              <p className="mt-8 text-xs text-zinc-500">
                *Get Discount if you pay with Bank Central Asia
              </p>
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-0">
        <h2 className="text-xl font-semibold my-10 ml-35">
          Payment Info & Delivery
        </h2>
      </div>

      <div className="w-full">
        <div className="w-1/2 ml-36">
          <Input
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            icon={<FaEnvelope />}
          />
        </div>
        <div className="w-1/2 ml-36">
          <Input
            label="Fullname"
            type="fullname"
            placeholder="Enter Your Fullname"
            icon={<FaUser />}
          />
        </div>
        <div className="w-1/2 ml-36">
          <Input
            label="Address"
            type="address"
            placeholder="Enter Your Address"
            icon={<IoLocation />}
          />
        </div>
        <div>
          <div>
            <p className="pl-36 mt-5 text-sm font-medium text-gray-700">
              Delivery
            </p>
          </div>

          <div className="flex gap-4 pl-36 pr-154 mt-2">
            {[
              { key: "dinein", label: "Dine In" },
              { key: "door", label: "Door Delivery" },
              { key: "pickup", label: "Pick Up" },
            ].map((opt) => {
              const active = delivery === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setDelivery(opt.key)}
                  aria-pressed={active}
                  className={`flex-1 h-11 rounded-lg border px-3 py-2 transition-colors
                  ${
                    active
                      ? "bg-white border-orange-500 text-gray-700"
                      : "bg-white border-[#dedede] text-gray-700 hover:bg-orange-50"
                  }
                  focus:outline-none focus:ring-2 focus:ring-orange-400`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}

export default Checkout;
