import React from "react";
import Input from "../components/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import forgot from "../assets/forgot.png";
import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import http from "../lib/http";

function Reset() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoHome = () => {
    navigate("/"); // ⬅️ arahkan ke halaman Home
  };

  const onSubmit = async (data) => {
    try {
      const body = await http("/reset-password", null, {
        method: "PATCH",
        body: data,
      });

      if (!body.success) {
        throw new Error(body.message || "Reset Failed");
      }

      navigate("/auth");
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4 overflow-hidden">
      {/* LEFT SIDE - Background pakai Tailwind */}
      <div
        className="hidden md:block max-w-full  bg-cover bg-center"
        style={{ backgroundImage: `url(${forgot})` }}
      ></div>

      {/* RIGHT SIDE - Register Card */}
      <div className="flex flex-col md:items-start px-8 my-25 col-span-3 md:ml-20">
        <div onClick={handleGoHome} className="flex gap-6 mb-6 mt-20">
          <img src={logo} alt="logo" />
          <img src={textLogo} alt="logo" />
        </div>

        <form
          className="max-w-3xl w-full bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Header */}
          <h2 className="text-2xl font-bold text-[#8E6447] mb-2">
            Reset Password
          </h2>

          <Input
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            icon={<FaEnvelope />}
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email tidak valid",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Input
            label="New Password"
            type="password"
            placeholder="Enter Your New Password"
            icon={<FaLock />}
            {...register("new_password", {
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
            })}
          />
          {errors.new_password && (
            <p className="text-red-500 text-sm">
              {errors.new_password.message}
            </p>
          )}

          <Input
            label="Kode OTP"
            type="text"
            placeholder="Enter Your OTP Code"
            {...register("code", { required: "OTP wajib diisi" })}
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}

          {/* Login Button */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mt-4 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reset;
