import React from "react";
import {
  FaThLarge,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
      ${active ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function SideBar() {
  return (
    <>
      <aside className="w-65 bg-white border-r border-[#e8e8e8] px-6 py-6">
        <div className="space-y-2">
          <SidebarItem active icon={<FaThLarge />} label="Dashboard" />
          <SidebarItem icon={<FaBox />} label="Product" />
          <SidebarItem icon={<FaShoppingCart />} label="Order" />
          <SidebarItem icon={<FaUsers />} label="User" />
          <div className="pt-4">
            <SidebarItem icon={<FaSignOutAlt />} label="Keluar" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
