import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function FilterSidebar({
  values,
  onChange,
  onApply,
  onReset,
  minPrice = 0,
  maxPrice = 700,
}) {
  const v = values;

  const handleCheckbox = (key) => (e) =>
    onChange({
      ...v,
      categories: { ...v.categories, [key]: e.target.checked },
    });

  const handleSort = (value) => onChange({ ...v, sortBy: value });

  return (
    <aside className="w-full lg:w-76 bg-zinc-900 text-white rounded-xl p-5 space-y-5 h-max ml-25 mb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filter</h3>
        <button
          onClick={onReset}
          className="text-white hover:text-orange-300 text-sm"
        >
          Reset Filter
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm opacity-80">Search</label>
        <input
          value={v.search}
          onChange={(e) => onChange({ ...v, search: e.target.value })}
          placeholder="Search Your Product"
          className="w-full text-black bg-white rounded-lg px-3 py-2 outline-none placeholder-zinc-500 mt-1 mb-2"
        />
      </div>

      <div className="space-y-3">
        <p className="font-medium">Category</p>
        {[
          ["favorite", "Favorite Product"],
          ["coffee", "Coffee"],
          ["nonCoffee", "Non Coffee"],
          ["foods", "Foods"],
          ["addon", "Add-On"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!v.categories[key]}
              onChange={handleCheckbox(key)}
              className="w-4 h-4 rounded-sm border border-zinc-400
                         appearance-none bg-black
                       checked:bg-orange-500
                         relative
                         checked:after:content-['✓'] checked:after:text-black
                         checked:after:text-[10px] checked:after:leading-none
                         checked:after:absolute checked:after:inset-0
                         checked:after:flex checked:after:items-center checked:after:justify-center"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="space-y-3">
        <p className="font-medium">Sort By</p>
        {[
          ["b1g1", "Buy 1 get 1"],
          ["flash", "Flash sale"],
          ["birthday", "Birthday Package"],
          ["cheap", "Cheap"],
        ].map(([value, label]) => (
          <label key={value} className="flex items-center gap-3">
            <input
              type="checkbox"
              name="sort"
              checked={v.sortBy === value}
              onChange={() => handleSort(value)}
              className="w-4 h-4 rounded-sm border border-zinc-400
                         appearance-none bg-black
                       checked:bg-orange-500
                         relative
                         checked:after:content-['✓'] checked:after:text-black
                         checked:after:text-[10px] checked:after:leading-none
                         checked:after:absolute checked:after:inset-0
                         checked:after:flex checked:after:items-center checked:after:justify-center"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <p className="font-medium">Range Price</p>

        <RangeSlider
          min={minPrice}
          max={maxPrice}
          value={v.price} // [min, max]
          onInput={([min, max]) => onChange({ ...v, price: [min, max] })}
          className="text-blue-500!"
        />

        <div className="text-sm opacity-80">
          IDR {v.price[0].toLocaleString()} - {v.price[1].toLocaleString()}
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full bg-orange-500 hover:bg-orange-600 text-black rounded-lg py-2.5"
      >
        Apply Filter
      </button>
    </aside>
  );
}

export default FilterSidebar;
