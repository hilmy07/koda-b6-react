import React from "react";
import { NavbarProduct } from "../components/Navbar";
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

function Checkout() {
  const [delivery, setDelivery] = React.useState("dinein");

  return (
    <>
      <NavbarProduct />

      <div className="mt-30">
        <h2 className="text-5xl font-semibold my-10 ml-35">Payment Details</h2>
      </div>

      {/* Order */}
      <section className="max-w-7xl mx-auto grid grid-cols-[60%_40%] gap-6 px-6 items-start">
        {/* Kiri: Your Order + Add Menu */}
        <aside className="col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold">Your Order</h3>
            <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded">
              <span className="text-lg leading-none">+</span> Add Menu
            </button>
          </div>

          <div className="space-y-5 mt-10">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex gap-4 border border-zinc-200 bg-[#fcf8f8] p-5 shadow-sm"
              >
                <img
                  src={product}
                  alt="Hazelnut Latte"
                  className="w-30 h-28 object-cover"
                />

                <div className="flex-1">
                  <span className="inline-block bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                    FLASH SALE!
                  </span>

                  <h4 className="mt-1 font-semibold">Hazelnut Latte</h4>

                  <p className="mt-1 text-sm text-zinc-600">
                    2pcs <span className="mx-1">•</span> Regular{" "}
                    <span className="mx-1">•</span> Ice{" "}
                    <span className="mx-1">•</span> Dine In
                  </p>

                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-zinc-400 line-through text-xs">
                      IDR 24.000
                    </span>
                    <span className="text-orange-500 font-semibold">
                      IDR 20.000
                    </span>
                  </div>
                </div>

                <button
                  className="self-start text-red-500 hover:text-red-600"
                  aria-label="Remove"
                  title="Remove"
                >
                  ⨉
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Kanan: judul + kotak total dalam kolom ke-3 */}
        <aside className="col-start-2 col-span-1">
          <h3 className="text-xl font-semibold mb-3">Total</h3>

          <div className="border border-zinc-200 bg-[#fcf8f8] p-4 h-82.5 mt-12">
            <div>
              <div className="pb-2 flex items-center justify-between">
                <span className="text-zinc-600">Order</span>
                <span className="font-medium">Idr. 40.000</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-zinc-600">Delivery</span>
                <span className="font-medium">Idr. 0</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-zinc-600">Tax</span>
                <span className="font-medium">Idr. 4.000</span>
              </div>
              <hr className="border-0 h-px bg-[#e8e8e8]" />
              <div className="py-2 flex items-center justify-between">
                <span className="text-zinc-600">Sub Total</span>
                <span className="font-semibold">Idr. 44.000</span>
              </div>
            </div>

            <button className="mt-3 w-full h-11 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium">
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

      <div>
        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          icon={<FaEnvelope />}
          className="pl-35 pr-160"
        />
        <Input
          label="Fullname"
          type="fullname"
          placeholder="Enter Your Fullname"
          icon={<FaUser />}
          className="pl-35 pr-160 mt-5"
        />
        <Input
          label="Address"
          type="address"
          placeholder="Enter Your Address"
          icon={<IoLocation />}
          className="pl-35 pr-160 mt-5"
        />
        <div>
          <div>
            <p className="pl-35 mt-5 text-sm font-medium text-gray-700">
              Delivery
            </p>
          </div>

          <div className="flex gap-4 pl-35 pr-160 mt-2">
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
