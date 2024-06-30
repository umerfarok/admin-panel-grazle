import React from "react";
import Image from "next/image";

import svgOne from "@/assets/svgs/sales-overview-icon1.svg";

import { FaArrowRight, FaArrowUp } from "react-icons/fa6";

const Section3 = () => {
  return (
    <div className="my-[30px]">
      <p className="text-[24px] font-[600]">All Sales</p>
      <div className="mt-[20px] bg-white rounded-[8px] shadow-sm p-[20px] sm:p-[30px] grid justify-between grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
        <Boxs />
        <Boxs />
        <Boxs />
        <Boxs />
        <Boxs />
        <Boxs />
        <Boxs />
        <Boxs />
      </div>
    </div>
  );
};

export default Section3;

const Boxs = () => {
  return (
    <div className="flex gap-2 items-center">
      <Image alt="" src={svgOne} className="w-[40px] h-[56px]" />
      <div>
        <p className="text-[13px] text-[var(--text-color-body)] font-[500]">
          Housing
        </p>
        <p className="text-[14px] sm:text-[16px] font-[600]">₹250.00</p>
        <p className="flex items-center gap-4">
          <span className="text-[11px] sm:text-[13px] font-[500]">15%</span>
          <span className="text-[var(--text-color-body-minus)]">
            <FaArrowUp />
          </span>
        </p>
      </div>
      <div className="ms-1 sm:ms-5">
        <FaArrowRight className="text-[#299D91] h-[20px] w-[20px]" />
      </div>
    </div>
  );
};
