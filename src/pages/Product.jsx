import React, { useState } from "react";
import productBg from "../assets/productBg.png";
import Promo from "../components/Product/Promo";
import FilterSidebar from "../components/Product/FilterSidebar";
import ProductCard from "../components/Product/ProductCard";
import DotsPager from "../components/DotsPager";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const [activeDot, setActiveDot] = useState(page);

  const [filters, setFilters] = useState({
    search: "",
    categories: {
      coffee: true,
      favorite: false,
      nonCoffee: false,
      foods: false,
      addon: false,
    },
    sortBy: "flash",
    price: [0, 700],
  });

  const handleChangePage = ({ newPage }) => {
    setActiveDot(newPage);

    setSearchParams({
      page: newPage,
    });
  };

  return (
    <>
      <Navbar variant="dark" />
      <div className="lg:block hidden">
        <div
          className="w-full flex items-center justify-start px-40 py-36"
          style={{
            backgroundImage: `url(${productBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-5xl text-white">
            We Provide Good Coffee and Healthy Meals
          </h1>
        </div>
      </div>

      <div className="lg:block hidden">
        <h2 className="text-4xl font-semibold mt-10 ml-25">
          Today <span className="text-[#8e6447]">Promo</span>
        </h2>
        <Promo />
      </div>

      <div className="mt-20 px-4 lg:hidden">
        <Input placeholder="Find Product" icon={<FaSearch />} />
      </div>

      <hr className="border-spacing-0.2 border-[#E8E8E8] lg:hidden" />

      {/* mobile view */}
      <div className="lg:hidden">
        <h2 className="text-3xl font-medium mt-4 ml-4">
          Today <span className="text-[#8e6447]">Promo</span>
        </h2>
        <Promo />
      </div>

      <div className="lg:block hidden">
        <h2 className="text-4xl font-semibold my-10 ml-25">
          Our <span className="text-[#8e6447]">Product</span>
        </h2>
        <div className="flex">
          <FilterSidebar
            values={filters}
            onChange={setFilters}
            onApply={() => {}}
            onReset={() =>
              setFilters({
                search: "",
                categories: {},
                sortBy: "flash",
                price: [0, 700],
              })
            }
            minPrice={0}
            maxPrice={700}
          />
          <ProductCard page={activeDot} onChangePage={handleChangePage} />
        </div>
      </div>

      <div className="lg:hidden">
        <h2 className="text-3xl font-semibold my-10 ml-4">
          Our <span className="text-[#8e6447]">Product</span>
        </h2>
        <div className="flex">
          <ProductCard onChangePage={handleChangePage} page={activeDot} />
        </div>
      </div>

      <div className="lg:block hidden">
        <div className="ml-100">
          <DotsPager page={activeDot} count={9} onChange={handleChangePage} />
        </div>
      </div>

      <div className="lg:hidden ">
        <div className="ml-2">
          <DotsPager page={activeDot} count={9} onChange={handleChangePage} />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Product;
