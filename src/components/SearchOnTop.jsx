import { useRouter } from "next/navigation";
import React from "react";

import { IoSearch } from "react-icons/io5";

const SearchOnTop = ({ showButton, navigateTo }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white h-[50px] rounded-[8px] flex flex-1 items-center px-[25px] gap-4 shadow-sm w-[100%]">
        <IoSearch className="text-[var(--text-color-body)] text-[20px]" />
        <input
          className="flex-1 w-[100%] focus:outline-none text-[15px]"
          placeholder="Search Here"
        />
      </div>
      {showButton && (
        <div
          className="cursor-pointer bg-[var(--text-color)] h-[50px] rounded-[8px] min-w-[120px] text-white flex shadow-sm items-center justify-center font-[500]"
          onClick={() => router.push(`${navigateTo}`)}
        >
          Add New
        </div>
      )}
    </div>
  );
};

export default SearchOnTop;
