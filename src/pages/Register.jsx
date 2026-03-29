import React from "react";
import background from "../assets/Rectangle 289.png";
import Input from "../components/Input";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import fb from "../assets/fb.png";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import http from "../lib/http";

import { useForm } from "react-hook-form";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const body = await http("/auth/new", null, {
        method: "POST",
        body: {
          fullName: data.fullname,
          email: data.email,
          password: data.password,
        },
      });

      if (!body.success) {
        throw new Error(body.message || "Register gagal");
      }

      alert("Register berhasil!");
      navigate("/auth");
    } catch (err) {
      console.error(err);
      alert(err.message || "Register error!");
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4 overflow-hidden">
      {/* LEFT */}
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* RIGHT */}
      <div className="flex flex-col px-8 mt-8 col-span-3 md:ml-20">
        {/* LOGO */}
        <div className="flex gap-6 mb-4">
          <img src={logo} alt="logo" />
          <img src={textLogo} alt="text logo" />
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl w-full bg-white"
        >
          <h2 className="text-2xl font-bold text-[#8E6447] mb-2">Register</h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill out the form correctly
          </p>

          <Input
            label="Full Name"
            placeholder="Enter Your Full Name"
            icon={<FaUser />}
            {...register("fullname", { required: "Nama wajib diisi" })}
            error={errors.fullname?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            icon={<FaEnvelope />}
            {...register("email", {
              required: "Email wajib diisi",
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter Your Password"
            icon={<FaLock />}
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                value: 6,
                message: "Minimal 6 karakter",
              },
            })}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Enter Your Password Again"
            icon={<FaLock />}
            {...register("confirmPassword", {
              required: "Confirm password wajib diisi",
              validate: (value) =>
                value === getValues("password") || "Password tidak sama",
            })}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mt-2"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Have an account?{" "}
            <Link to="/auth" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>

          {/* OR */}
          <div className="flex items-center my-3">
            <hr className="grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Or</span>
            <hr className="grow border-gray-300" />
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4">
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
        </form>
      </div>
    </div>
  );
}

export default Register;
