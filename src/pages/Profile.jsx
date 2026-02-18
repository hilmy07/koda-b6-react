import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { FaUser, FaEnvelope } from "react-icons/fa";
import userProfile from "../assets/userProfile.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineKey } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";

function Profile() {
  return (
    <>
      <Navbar variant="dark" />
      <section className="max-w-6xl mx-auto px-6 mt-30">
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[28%_72%] gap-6">
          {/* Sidebar kiri */}
          <aside className="border border-zinc-200 bg-white p-5 h-75">
            <div className="text-center">
              <h3 className="font-semibold">Ghaluh Wizard</h3>
              <p className="text-sm text-zinc-600">ghaluhwizz@gmail.com</p>

              <img
                src={userProfile}
                alt="Avatar"
                className="mx-auto mt-4 w-28 h-28 rounded-full object-cover"
              />

              <button className="mt-4 w-full h-10 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm">
                Upload New Photo
              </button>

              <p className="mt-3 text-xs text-zinc-500">
                Since 20 January 2022
              </p>
            </div>
          </aside>

          {/* Form kanan: hanya pakai <Input /> */}
          <main className="border border-zinc-200 bg-white p-6">
            <form className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Ghaluh Wizard"
                icon={<FaUser className="text-zinc-400" />}
                className="w-full"
              />
              <Input
                label="Email"
                type="email"
                placeholder="ghaluhwizz@gmail.com"
                icon={<FaEnvelope className="text-zinc-400" />}
                className="w-full"
              />
              <Input
                label="Phone"
                type="text"
                placeholder="082116304338"
                className="w-full"
                icon={<FaPhoneVolume />}
              />
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm text-zinc-600 mb-1">
                    Password
                  </label>
                  <button type="button" className="text-xs text-orange-600">
                    Set New Password
                  </button>
                </div>
                <Input
                  type="password"
                  placeholder="********"
                  className="w-full"
                  icon={<MdOutlineKey />}
                  hideLabel
                />
              </div>
              <Input
                label="Address"
                type="text"
                placeholder="Griya Bandung Indah"
                icon={<IoLocationSharp className="text-zinc-400" />}
                className="w-full"
              />

              <button className="mt-4 w-full h-10 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium">
                Submit
              </button>
            </form>
          </main>
        </div>
      </section>

      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
