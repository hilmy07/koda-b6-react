import React from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/AdminPage/SideBar";
import Input from "../../components/Input";

function ProductList() {
  return (
    <>
      <Navbar variant="light" />

      <main className="flex mt-18 min-h-screen bg-[#f9fafb]">
        {/* SIDEBAR */}
        <SideBar />

        {/* MAIN */}
        <div className="flex-1 px-8 py-7">
          {/* HEADER */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Product List
              </h1>

              <button className="mt-3 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow text-sm font-medium">
                + Add Product
              </button>
            </div>

            {/* SEARCH */}
            <div className="w-65">
              <label className="text-sm text-gray-500">Search Product</label>

              <div className="mt-1 flex gap-2">
                <Input />
                <button className="px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm">
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* TABLE CARD */}
          <div className="mt-6 bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
            <table className="w-full text-sm">
              {/* HEAD */}
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Product Name</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Desc</th>
                  <th className="px-4 py-3 text-left">Product Size</th>
                  <th className="px-4 py-3 text-left">Method</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <input type="checkbox" />
                    </td>

                    <td className="px-4 py-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-200" />
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      Caramel Macchiato
                    </td>

                    <td className="px-4 py-4 text-gray-600">IDR 40.000</td>

                    <td className="px-4 py-4 text-gray-500 max-w-55 truncate">
                      Cold brewing is a method of brewing that...
                    </td>

                    <td className="px-4 py-4 text-gray-500">R, L, XL, 250gr</td>

                    <td className="px-4 py-4 text-gray-500">
                      Deliver, Dine In
                    </td>

                    <td className="px-4 py-4 text-gray-700 font-medium">200</td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-md bg-orange-100 text-orange-500 hover:bg-orange-200">
                          ✏
                        </button>

                        <button className="w-8 h-8 rounded-md bg-red-100 text-red-500 hover:bg-red-200">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* FOOTER */}
            <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500">
              <p>Show 5 product of 100 product</p>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded border bg-white hover:bg-gray-50">
                  Prev
                </button>

                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={`px-3 py-1 rounded border ${
                      p === 1
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button className="px-3 py-1 rounded border bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductList;
