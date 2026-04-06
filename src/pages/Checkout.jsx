import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import product from "../assets/product1.png";
import bri from "../assets/bri.png";
import dana from "../assets/dana.png";
import bca from "../assets/bca.png";
import gopay from "../assets/gopay.png";
import ovo from "../assets/ovo.png";
import paypal from "../assets/paypal.png";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import http from "../lib/http";

function Checkout() {
  const [delivery, setDelivery] = useState({ key: "dinein", label: "Dine In" });
  const [items, setItems] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);

  // Ambil cart dari backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser?.[0]?.id) return;

      try {
        const res = await http("/cart", null, {
          method: "POST",
          body: { user_id: currentUser[0].id },
        });

        if (res.success) {
          setItems(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [currentUser]);

  const handleRemove = (item) => {
    // Kalau backend ada API remove, panggil backend di sini
    setItems((prev) => prev.filter((i) => i.cart_id !== item.cart_id));
  };

  const handleCheckout = () => {
    console.log("CHECKOUT DATA:", items);
    setItems([]); // reset local state, jangan pake Redux
  };

  const orderTotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const tax = orderTotal * 0.1;
  const subTotal = orderTotal + tax;

  return (
    <>
      <Navbar variant="dark" />

      <div className="mt-30">
        <h2 className="text-5xl font-semibold my-10 ml-35">Payment Details</h2>
      </div>

      <section className="max-w-7xl mx-auto grid grid-cols-[60%_40%] gap-6 px-6 items-start">
        {/* LEFT - CART */}
        <aside>
          <h3 className="text-xl font-semibold mb-3">Your Order</h3>
          <div className="space-y-5 mt-10">
            {items.length > 0 ? (
              items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 border border-zinc-200 bg-[#fcf8f8] p-5 shadow-sm"
                >
                  <img
                    src={item.image || product}
                    alt={item.name}
                    className="w-30 h-28 object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-zinc-600 mt-1">
                      {item.quantity} pcs | {item.size} | {item.variant} |{" "}
                      {delivery.label}
                    </p>
                    <p className="text-orange-500 font-semibold mt-2">
                      IDR {item.price?.toLocaleString()}
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemove(item)}
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

        {/* RIGHT - TOTAL */}
        <aside>
          <h3 className="text-xl font-semibold mb-3">Total</h3>
          <div className="border border-zinc-200 bg-[#fcf8f8] p-4 mt-12">
            <div className="flex justify-between py-1">
              <span>Order</span>
              <span>IDR {orderTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Delivery</span>
              <span>IDR 0</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax</span>
              <span>IDR {tax.toLocaleString()}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold py-1">
              <span>Sub Total</span>
              <span>IDR {subTotal.toLocaleString()}</span>
            </div>

            <button
              className="mt-3 w-full h-11 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <div className="mt-3">
              <p className="text-sm text-zinc-600 mb-2">We Accept</p>
              <div className="flex gap-3 opacity-80">
                <img src={bri} className="h-4" />
                <img src={dana} className="h-4" />
                <img src={bca} className="h-4" />
                <img src={gopay} className="h-4" />
                <img src={ovo} className="h-4" />
                <img src={paypal} className="h-4" />
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* FORM */}
      <div className="w-1/2 ml-36 mt-10">
        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          icon={<FaEnvelope />}
        />
        <Input
          label="Fullname"
          placeholder="Enter Your Fullname"
          icon={<FaUser />}
        />
        <Input
          label="Address"
          placeholder="Enter Your Address"
          icon={<IoLocation />}
        />
      </div>

      {/* DELIVERY */}
      <div className="pl-36 mt-5">
        <p className="text-sm font-medium text-gray-700">Delivery</p>
        <div className="flex gap-4 mt-2">
          {[
            { key: "dinein", label: "Dine In" },
            { key: "door", label: "Door Delivery" },
            { key: "pickup", label: "Pick Up" },
          ].map((opt) => {
            const active = delivery.key === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setDelivery(opt)}
                className={`px-4 py-2 border rounded ${active ? "border-orange-500" : "border-zinc-300"}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}

export default Checkout;
