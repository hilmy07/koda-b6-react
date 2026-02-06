import React from "react";
import background from "../assets/Rectangle 289.png";
import Input from "../components/Input";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import fb from "../assets/fb.png";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";

import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slice/authSlice";
import { useForm } from "react-hook-form";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    // cek email sudah ada
    const emailExists = users.some((u) => u.email === data.email);
    if (emailExists) {
      alert("Email sudah terdaftar!");
      return;
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(data.password, salt);

    const id = crypto.randomUUID();

    dispatch(
      registerUser({
        id,
        name: data.name,
        email: data.email,
        passwordHash,
      }),
    );

    alert("Register berhasil!");
    navigate("/auth");
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4 overflow-hidden">
      {/* LEFT SIDE */}
      <div
        className="hidden md:block max-w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <div className="flex flex-col md:items-start px-8 mt-8 col-span-3 md:ml-20">
        <div className="flex gap-6 mb-2">
          <img src={logo} alt="logo" />
          <img src={textLogo} alt="logo" />
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
            {...register("name", { required: "Nama wajib diisi" })}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            icon={<FaEnvelope />}
            {...register("email", { required: "Email wajib diisi" })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter Your Password"
            icon={<FaLock />}
            {...register("password", {
              required: "Password wajib diisi",
              minLength: { value: 6, message: "Minimal 6 karakter" },
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
                value === getValues("password") || "Password tidak salah",
            })}
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Have an account?{" "}
            <Link to="/auth" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>

          <div className="flex items-center my-2">
            <hr className="grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">Or</span>
            <hr className="grow border-gray-300" />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
            >
              <span className="mr-2">
                <img src={fb} alt="facebook" />
              </span>
              Facebook
            </button>

            <button
              type="button"
              className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
            >
              <span className="mr-2">
                <img src={google} alt="google" />
              </span>
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
