import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import fb from "../assets/fb.png";
import google from "../assets/google.png";
import loginbg from "../assets/login.png";

import Input from "../components/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { loginSuccess, loginFail } from "../redux/slice/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const adminUser = {
    email: "admin@mail.com",
    password: "123456",
    role: "admin",
    name: "Admin",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");

    try {
      // =========================
      // 1. LOGIN ADMIN
      // =========================
      if (
        data.email === adminUser.email &&
        data.password === adminUser.password
      ) {
        dispatch(
          loginSuccess({
            id: "admin",
            name: adminUser.name,
            email: adminUser.email,
            role: "admin",
          }),
        );

        navigate("/Dashboard");
        return;
      }

      // =========================
      // 2. LOGIN VIA API
      // =========================
      const res = await fetch(import.meta.env.VITE_BASE_URL + "/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message || "Login gagal");
      }

      dispatch(
        loginSuccess({
          id: body.data?.id,
          name: body.data?.name,
          email: body.data?.email,
          role: body.data?.role || "user",
        }),
      );

      navigate("/");
      console.log(body);
    } catch (err) {
      console.error(err);
      setError("Email atau password salah");
      dispatch(loginFail("Login gagal"));
    }
  };

  const handleGoHome = () => navigate("/");

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4 overflow-hidden">
      {/* LEFT IMAGE */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${loginbg})` }}
      />

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-8 my-2 col-span-3 md:ml-20"
      >
        {/* LOGO */}
        <div
          onClick={handleGoHome}
          className="flex gap-6 mb-6 mt-20 cursor-pointer"
        >
          <img src={logo} alt="logo" />
          <img src={textLogo} alt="text logo" />
        </div>

        <div className="max-w-3xl w-full bg-white">
          <h2 className="text-2xl font-bold text-[#8E6447] mb-2">Login</h2>

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter Your Password"
            icon={<FaLock />}
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* ERROR */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="text-orange-500 text-sm hover:underline"
              onClick={() => navigate("/auth/forgot")}
            >
              Forgot Password?
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mt-4"
          >
            Login
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Belum punya akun?{" "}
            <Link to="/auth/new" className="text-orange-500 hover:underline">
              Register
            </Link>
          </p>

          {/* OR */}
          <div className="flex items-center mt-4">
            <hr className="grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Or</span>
            <hr className="grow border-gray-300" />
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 my-4">
            <button
              type="button"
              className="flex-1 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <img src={fb} alt="facebook" className="mr-2" />
              Facebook
            </button>

            <button
              type="button"
              className="flex-1 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <img src={google} alt="google" className="mr-2" />
              Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
