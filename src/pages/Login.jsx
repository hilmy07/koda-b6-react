import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import fb from "../assets/fb.png";
import google from "../assets/google.png";
import loginbg from "../assets/login.png";
import Input from "../components/Input";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { login } = useAuth();

  const validUser = {
    email: "admin@mail.com",
    password: "123456",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === validUser.email && password === validUser.password) {
      // login();
      navigate("/"); // ⬅️ ke Home dulu
    } else {
      setError("Email atau password salah!");
    }
  };

  const handleGoHome = () => {
    navigate("/"); // ⬅️ arahkan ke halaman Home
  };

  return (
    <>
      <div className="h-screen grid grid-cols-1 md:grid-cols-4 overflow-hidden">
        {/* LEFT SIDE - Background pakai Tailwind */}
        <div
          className="hidden md:block max-w-full  bg-cover bg-center"
          style={{ backgroundImage: `url(${loginbg})` }}
        ></div>

        {/* RIGHT SIDE - Register Card */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col md:items-start px-8 my-2 col-span-3 md:ml-20"
        >
          <div onClick={handleGoHome} className="flex gap-6 mb-6 mt-20">
            <img src={logo} alt="logo" />
            <img src={textLogo} alt="logo" />
          </div>

          <div className="max-w-3xl w-full bg-white">
            {/* Header */}
            <h2 className="text-2xl font-bold text-[#8E6447] mb-2">Login</h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill out the form correctly
            </p>

            <Input
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              icon={<FaEnvelope />}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              icon={<FaLock />}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Lupa password */}
            <div className="text-right mt-2 mb-2">
              <Link
                to="/auth/forgot"
                className="text-sm text-orange-500 hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

            {/* Login Button */}
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mt-4 transition">
              Login
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Have an account?{" "}
              <Link to="/auth/new" className="text-orange-500 hover:underline">
                Register
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center mt-4">
              <hr className="grow border-gray-300" />
              <span className="px-2 text-gray-500 text-sm">Or</span>
              <hr className="grow border-gray-300" />
            </div>

            {/* Social login */}
            <div className="flex gap-4 my-4">
              <button className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                <span className="mr-2">
                  <img src={fb} alt="facebook" />
                </span>{" "}
                Facebook
              </button>
              <button className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                <span className="mr-2">
                  <img src={google} alt="google" />
                </span>{" "}
                Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
