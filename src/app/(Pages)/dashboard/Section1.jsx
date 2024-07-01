import React from "react";

import { Circle } from "rc-progress";

import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const Section1 = ({ ordersLength }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      <div className="flex-1 bg-white px-[20px] py-[30px] rounded-[8px] shadow-sm flex justify-between items-center">
        <div>
          <div className="h-[32px] rounded-[44px] px-3 bg-[#E9FFF6] text-[#06E775] flex gap-1 items-center w-[max-content]">
            <FaArrowUp />
            <label className="text-[12px]">33.77 %</label>
          </div>
          <p className="mt-4 mb-1">Total Sales</p>
          <p className="text-[32px] text-black font-[600]">{ordersLength}</p>
        </div>
        <div className="flex items-center justify-center">
          <Circle
            percent={90}
            strokeWidth={10}
            trailWidth={10}
            trailColor={"#F4F7FE"}
            strokeColor="#77B1FF"
            style={{ width: "90px" }}
          />
          <p className="text-[20px] text-center absolute font-[500]">90%</p>
        </div>
      </div>
      <div className="flex-1 bg-white px-[20px] py-[30px] rounded-[8px] shadow-sm flex justify-between items-center">
        <div>
          <div className="h-[32px] rounded-[44px] px-3 bg-[#FFF2F2] text-[#F70000] flex gap-1 items-center w-[max-content]">
            <FaArrowDown />
            <label className="text-[12px]">33.77 %</label>
          </div>
          <p className="mt-4 mb-1">Conversation Rates</p>
          <p className="text-[32px] text-black font-[600]">500</p>
        </div>
        <div className="flex items-center justify-center">
          <Circle
            percent={60}
            strokeWidth={10}
            trailWidth={10}
            trailColor={"#FFF2F2"}
            strokeColor="#F70000"
            style={{ width: "90px" }}
          />
          <p className="text-[20px] text-center absolute font-[500]">60%</p>
        </div>
      </div>
      <div className="flex-1 bg-white px-[20px] py-[30px] rounded-[8px] shadow-sm flex justify-between items-center">
        <div>
          <div className="h-[32px] rounded-[44px] px-3 bg-[#E9FFF6] text-[#06E775] flex gap-1 items-center w-[max-content]">
            <FaArrowUp />
            <label className="text-[12px]">33.77 %</label>
          </div>
          <p className="mt-4 mb-1">Average Order Value</p>
          <p className="text-[32px] text-black font-[600]">₹45,000</p>
        </div>
        <div className="flex items-center justify-center">
          <Circle
            percent={70}
            strokeWidth={10}
            trailWidth={10}
            trailColor={"#F4F7FE"}
            strokeColor="#FEB6B7"
            style={{ width: "90px" }}
          />
          <p className="text-[20px] text-center absolute font-[500]">70%</p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
