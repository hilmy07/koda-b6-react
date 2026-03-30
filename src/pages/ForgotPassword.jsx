import React from "react";
import Input from "../components/Input";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import forgot from "../assets/forgot.png";
import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import http from "../lib/http";

function ForgotPassword() {
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
      const body = await http("/auth/forgot-password", null, {
        method: "POST",
        body: data,
      });

      if (!body.success) {
        throw new Error(body.message || "Forgot Failed");
      }

      navigate("/auth/reset-password");
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
            Fill out the form correctly
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            We will send new password to your email
          </p>

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

          {/* Submit Button */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mt-4 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
