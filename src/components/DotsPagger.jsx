import React from "react";

function DotsPager({ page, count, onChange, ...res }) {
  const canNext = page < count;
  return (
    <div className="flex items-center justify-center gap-3 mb-10" {...res}>
      {Array.from({ length: count }, (_, i) => i + 1).map((p) => {
        const active = p === page;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-10 h-10 rounded-full shrink-0 grow-0 flex items-center justify-center border
              ${
                active
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-zinc-100 text-zinc-400 border-zinc-200"
              }`}
          >
            {p}
          </button>
        );
      })}
      <button
        onClick={() => canNext && onChange(page + 1)}
        className="w-10 h-10 rounded-full shrink-0 grow-0 flex items-center justify-center
                   bg-orange-500 text-white"
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
}

export default DotsPager;
