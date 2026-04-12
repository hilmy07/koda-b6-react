import React, { useEffect, useState } from "react";
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
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { useSelector } from "react-redux";
import http from "../lib/http";
import { useForm } from "react-hook-form";

function Checkout() {
  const [items, setItems] = useState([]);
  // const [selectedId, setSelectedId] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const { register, handleSubmit } = useForm();

  const [delivery, setDelivery] = useState({
    key: "dinein",
    label: "Dine In",
  });

  // 🔥 STATUS MAP (1–4)
  const statusMap = {
    pending: 1,
    onprogress: 2,
    delivered: 3,
    cancel: 4,
  };

  // REMOVE CART ITEM
  const handleRemove = async (item) => {
    try {
      await http("/cart-item", null, {
        method: "DELETE",
        token,
        body: {
          cart_id: item.id,
        },
      });

      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      console.log("ERROR DELETE:", err);
    }
  };

  // FETCH CART
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await http("/cart-user", null, {
          method: "GET",
          token,
        });

        if (res.success) {
          const mapped = res.data.map((item) => ({
            id: item.cart_id,
            name: item.name_product,
            price: item.price,
            qty: item.quantity,
            size: item.size,
            temp: item.variant,
            image: product,
          }));

          setItems(mapped);
        }
      } catch (err) {
        console.log("ERROR FETCH CART:", err);
      }
    };

    if (token) fetchCart();
  }, [token]);

  // TOTAL
  const orderTotal = items.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );

  const tax = orderTotal * 0.1;
  const subTotal = orderTotal + tax;

  // CHECKOUT SUBMIT
  const onSubmit = async (data) => {
    const payload = {
      cart_id: items[0].id, // ✅ dari item.id
      total: subTotal,
      status: statusMap.pending, // ✅ 1
      fullname: data.fullname,
      phone: data.phone || "",
      email: data.email,
      address: data.address,
      delivery: delivery.key,
    };

    try {
      const res = await http("/order", payload, {
        method: "POST",
        token,
      });

      console.log("ORDER SUCCESS:", res);

      setItems([]);
    } catch (err) {
      console.log("CHECKOUT ERROR:", err);
    }
  };

  return (
    <>
      <Navbar variant="dark" />

      <div className="mt-30">
        <h2 className="text-5xl font-semibold my-10 ml-35">Payment Details</h2>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="max-w-7xl mx-auto grid grid-cols-[60%_40%] gap-6 px-6 items-start">
          {/* LEFT CART */}
          <aside>
            <h3 className="text-xl font-semibold mb-3">Your Order</h3>

            <div className="space-y-5 mt-10">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border border-zinc-200 bg-[#fcf8f8] p-5 shadow-sm"
                  >
                    <input
                      type="hidden"
                      value={item.id}
                      {...register("cart_id")}
                    />

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-30 h-28 object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-zinc-600 mt-1">
                        {item.qty} pcs | {item.size} | {item.temp} |{" "}
                        {delivery.label}
                      </p>
                      <p className="text-orange-500 font-semibold mt-2">
                        IDR {item.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="text-red-500"
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

          {/* RIGHT TOTAL */}
          <aside>
            <h3 className="text-xl font-semibold mb-3">Total</h3>

            <div className="border border-zinc-200 bg-[#fcf8f8] p-4 mt-12">
              <div className="flex justify-between">
                <span>Order</span>
                <span>IDR {orderTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>IDR 0</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>IDR {tax.toLocaleString()}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>IDR {subTotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="mt-3 w-full h-11 bg-orange-500 text-white rounded"
              >
                Checkout
              </button>

              <div className="mt-3 flex gap-3 opacity-80">
                <img src={bri} className="h-4" />
                <img src={dana} className="h-4" />
                <img src={bca} className="h-4" />
                <img src={gopay} className="h-4" />
                <img src={ovo} className="h-4" />
                <img src={paypal} className="h-4" />
              </div>
            </div>
          </aside>
        </section>

        {/* FORM INPUT */}
        <div className="w-1/2 ml-36 mt-10">
          <Input label="Email" {...register("email")} icon={<FaEnvelope />} />

          <Input label="Fullname" {...register("fullname")} icon={<FaUser />} />

          <Input label="Phone" {...register("phone")} icon={<FaPhone />} />

          <Input
            label="Address"
            {...register("address")}
            icon={<IoLocation />}
          />
        </div>

        {/* DELIVERY */}
        <div className="pl-36 mt-5">
          <p className="text-sm font-medium">Delivery</p>

          <div className="flex gap-4 mt-2">
            {[
              { key: "dinein", label: "Dine In" },
              { key: "door", label: "Door Delivery" },
              { key: "pickup", label: "Pick Up" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setDelivery(opt)}
                className={`px-4 py-2 border rounded ${
                  delivery.key === opt.key
                    ? "border-orange-500"
                    : "border-zinc-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
}

export default Checkout;
