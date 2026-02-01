import React from "react";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

function HomeLayout() {
  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default HomeLayout;
