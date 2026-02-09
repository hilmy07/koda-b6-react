import React from "react";
import Navbar from "../components/Navbar";
import {
  FaThLarge,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdLocalShipping, MdDoneAll } from "react-icons/md";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

function formatIDR(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

function DashboardAdmin() {
  // ====== 1 DATA SOURCE ======
  const salesData = [
    { name: "Caramel Machiato", sold: 300, profit: 9000000 },
    { name: "Hazelnut Latte", sold: 200, profit: 8000000 },
    { name: "Kopi Susu", sold: 100, profit: 7000000 },
    { name: "Espresso Supreme", sold: 90, profit: 6000000 },
    { name: "Caramel Velvet Latte", sold: 80, profit: 5000000 },
    { name: "Hazelnut Dream Brew", sold: 70, profit: 4000000 },
    { name: "Vanilla Silk Mocha", sold: 60, profit: 3000000 },
    { name: "Dark Roast Delight", sold: 50, profit: 2000000 },
    { name: "Ethiopian Yirgacheffe Euphoria", sold: 40, profit: 1000000 },
    { name: "Indonesian Sumatra Reserve", sold: 30, profit: 500000 },
  ];

  // labels chart diambil dari range tanggal
  const labels = [
    "16 Jan",
    "17 Jan",
    "18 Jan",
    "19 Jan",
    "20 Jan",
    "21 Jan",
    "22 Jan",
    "23 Jan",
  ];

  // ====== CHART DATA dari salesData ======
  // misal chart menampilkan sold 8 hari (kamu bisa custom)
  const chartSold = [90, 110, 95, 140, 150, 145, 200, 230];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Penjualan",
        data: chartSold,
        borderColor: "#16a34a",
        backgroundColor: "rgba(34,197,94,0.15)",
        fill: true,
        tension: 0.45,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        grid: { borderDash: [6, 6] },
        ticks: {
          callback: (value) => `${value}c`,
        },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <>
      <Navbar variant="light" />

      <div className="flex mt-18 min-h-screen bg-gray-50">
        {/* SIDEBAR */}
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

        {/* MAIN */}
        <main className="flex-1 px-8 py-7">
          {/* TOP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Order On Progress"
              value="200"
              percent="+11.01%"
              bg="bg-green-500"
              icon={<FaShoppingCart />}
            />
            <StatCard
              title="Order Shipping"
              value="100"
              percent="+4.01%"
              bg="bg-indigo-500"
              icon={<MdLocalShipping />}
            />
            <StatCard
              title="Order Done"
              value="50"
              percent="+2.01%"
              bg="bg-purple-500"
              icon={<MdDoneAll />}
            />
          </div>

          {/* CHART */}
          <section className="mt-7 bg-white border border-[#e8e8e8] rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-gray-800">Total Penjualan</h2>
                <p className="text-sm text-gray-500">
                  1000 cup (16 - 23 January 2023)
                </p>
              </div>

              <select className="border rounded-lg px-4 py-2 text-sm text-gray-700 outline-none bg-white">
                <option>16 - 23 January 2023</option>
                <option>24 - 31 January 2023</option>
              </select>
            </div>

            <div className="h-75">
              <Line data={chartData} options={chartOptions} />
            </div>
          </section>

          {/* TABLE: Produk Terlaris (datanya dari salesData yg sama) */}
          <section className="mt-7 bg-white border border-[#e8e8e8] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Produk Terlaris</h2>

              <select className="border rounded-lg px-4 py-2 text-sm text-gray-700 outline-none bg-white">
                <option>16 - 23 January 2023</option>
                <option>24 - 31 January 2023</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3 px-3 font-medium w-15">No</th>
                    <th className="py-3 px-3 font-medium">Nama Produk</th>
                    <th className="py-3 px-3 font-medium w-35">Terjual</th>
                    <th className="py-3 px-3 font-medium w-45 text-right">
                      Keuntungan
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {salesData.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-[#e8e8e8] last:border-b-0 ${
                        idx % 2 === 0 ? "bg-gray-50/40" : "bg-white"
                      }`}
                    >
                      <td className="py-4 px-3 text-gray-600">{idx + 1}</td>
                      <td className="py-4 px-3 text-gray-700">{item.name}</td>
                      <td className="py-4 px-3 text-gray-600">
                        {item.sold} Cup
                      </td>
                      <td className="py-4 px-3 text-right font-medium text-green-600">
                        {formatIDR(item.profit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default DashboardAdmin;

/* ================= COMPONENTS ================= */

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

function StatCard({ title, value, percent, icon, bg }) {
  return (
    <div className={`${bg} rounded-xl p-5 text-white shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm opacity-90">{title}</p>
        <div className="flex items-end justify-between mt-1">
          <h3 className="text-3xl font-bold">{value}</h3>
          <span className="text-xs opacity-90">{percent} ↗</span>
        </div>
      </div>
    </div>
  );
}
