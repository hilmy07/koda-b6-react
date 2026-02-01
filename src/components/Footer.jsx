import React from "react";
import logo from "../assets/logo.png";
import textLogo from "../assets/textLogo.png";
import { useNavigate } from "react-router-dom";
import fb from "../assets/Facebook.png";
import twt from "../assets/Twitter.png";
import ig from "../assets/Instagram.png";

function Footer() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // ⬅️ arahkan ke halaman Home
  };

  return (
    <footer className="bg-gray-100 pb-10 font-sans text-sm text-gray-600">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-1 justify-items-start pt-10">
        {/* About Section */}
        <div className="px-8">
          <div onClick={handleGoHome} className="flex gap-4 mb-6">
            <img src={logo} alt="logo" />
            <img src={textLogo} alt="logo" />
          </div>
          <p className="leading-relaxed mb-2">
            Coffee shop is a store that sells some good
          </p>
          <p className="leading-relaxed mb-2">
            meels, and especially coffee. We provide
          </p>
          <p className="leading-relaxed mb-2">high quality beans</p>
        </div>

        {/* Products Section */}
        <div className="hidden lg:block lg:ml-20">
          <h3 className="text-lg text-gray-900 mb-4">Product</h3>
          <ul className="list-none p-0">
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Our Product
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Pricing
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Locations
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Countries
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Engage Section */}
        <div className="hidden lg:block lg:ml-30">
          <h3 className="text-lg text-gray-900 mb-4">Engage</h3>
          <ul className="list-none p-0">
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Partner
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Faq
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Privacy Policy
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-600 no-underline hover:text-gray-900"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        {/* mobile view */}
        <div className="lg:hidden flex gap-x-20 px-8 py-4">
          <div className="lg:hidden">
            <h3 className="text-lg text-gray-900 mb-4">Product</h3>
            <ul className="list-none p-0">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Our Product
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Locations
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Countries
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:hidden">
            <h3 className="text-lg text-gray-900 mb-4">Engage</h3>
            <ul className="list-none p-0">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Partner
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Faq
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gray-600 no-underline hover:text-gray-900"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="lg:block hidden">
          <div className="ml-4">
            <h3 className="text-lg text-gray-900 mb-4">Social Media</h3>
            <div className="flex gap-4">
              <a href="#" className="no-underline">
                <img src={fb} alt="Facebook" />
              </a>
              <a href="#" className="no-underline">
                <img src={twt} alt="Twitter" />
              </a>
              <a href="#" className="no-underline">
                <img src={ig} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        {/* mobile view */}
        <div className="lg:hidden block">
          <div className="px-8">
            <h3 className="text-lg text-gray-900 mb-4">SocialMedia</h3>
            <div className="flex -ml-4">
              <a href="#" className="text-2xl no-underline">
                <img src={fb} alt="Facebook" />
              </a>
              <a href="#" className="text-2xl no-underline">
                <img src={twt} alt="Twitter" />
              </a>
              <a href="#" className="text-2xl no-underline">
                <img src={ig} alt="Instagram" />
              </a>
            </div>
          </div>
          <p className="text-lg px-8">©2020CoffeeStore</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
