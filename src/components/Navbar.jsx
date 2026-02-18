import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import { useSelector } from "react-redux";

export default function Navbar({ variant = "dark" }) {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/dashboard");

  const isDark = variant === "dark";
  const isTransparent = variant === "transparent";

  const cartItems = useSelector((state) => state.cart.items);

  // Hitung total quantity
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleSignIn = () => navigate("/auth");
  const handleSignUp = () => navigate("/auth/new");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  // 🎨 Style berdasarkan variant
  const navClass = isTransparent
    ? "bg-[#1d1d1d]/20 backdrop-filter backdrop-saturate-150 backdrop-brightness-90 text-white"
    : isDark
      ? "bg-black text-white"
      : "bg-white text-black shadow";

  const borderColor = isDark || isTransparent ? "border-white" : "border-black";

  const logoFilter =
    isDark || isTransparent ? "filter invert brightness-10" : "";

  console.log(isLoggedIn);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 ${navClass}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src={logo} className={`${logoFilter} w-8 h-8`} />
            <img
              src={textLogo}
              className={`${logoFilter} h-6 hidden sm:block`}
            />
          </div>

          {/* Desktop Menu */}
          {!isAdminPage && (
            <ul className="hidden sm:flex gap-6 text-sm">
              {["/", "/product"].map((path, i) => (
                <li
                  key={i}
                  onClick={() => navigate(path)}
                  className={`cursor-pointer pb-1 ${
                    isActive(path)
                      ? "border-b-2 border-orange-500"
                      : "border-b-2 border-transparent hover:border-orange-500"
                  }`}
                >
                  {path === "/" ? "Home" : "Product"}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden sm:flex items-center gap-6">
          <FaSearch className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <FaShoppingCart onClick={() => navigate("/checkout")} />
            {isLoggedIn && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 border ${borderColor} rounded text-sm hover:bg-white hover:text-black transition`}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={handleSignIn}
                className={`px-4 py-2 border ${borderColor} rounded text-sm hover:bg-white hover:text-black transition`}
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="px-4 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-4">
          {!isAdminPage && (
            <ul className="flex flex-col gap-4 mb-4">
              {["/", "/product"].map((path, i) => (
                <li
                  key={i}
                  onClick={() => navigate(path)}
                  className={`cursor-pointer pb-1 border-b-2 ${
                    isActive(path) ? "border-orange-500" : "border-gray-600"
                  }`}
                >
                  {path === "/" ? "Home" : "Product"}
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-6 text-lg mb-4">
            <FaSearch />
            <div className="relative">
              <FaShoppingCart />
              {isLoggedIn && totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 border ${borderColor} rounded`}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className={`px-4 py-2 border ${borderColor} rounded`}
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
