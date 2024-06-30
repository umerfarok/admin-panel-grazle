import Image from "next/image";
import React from "react";

import product from "@/assets/Electronic-LED.png";

const Section3 = ({ allProducts }) => {
  return (
    <div className="my-[30px] px-[25px] py-[20px] bg-white rounded-[8px] shadow-sm overflow-x-auto w-[94vw] md:w-[67vw] lg:w-[75vw] xl:w-auto">
      <table className="w-[1000px] xl:w-[100%] table-fixed">
        <thead>
          <tr className="font-[500] text-[var(--text-color-body)] text-[15px]">
            <td>No</td>
            <td>Product Name</td>
            <td>Price</td>
            <td>Seller</td>
            <td>Date</td>
            <td className="w-[80px]">Status</td>
          </tr>
        </thead>
        <tbody>
          {allProducts?.map((item, index) => (
            <tr className="h-[50px] text-[14px]" key={index}>
              <td>{item.id}</td>
              <td className="flex items-center gap-1.5 h-[50px]">
                <Image
                  alt=""
                  src={product}
                  className="h-[26px] w-[26px] rounded-[5px]"
                />
                {item.title}
              </td>
              <td>₹{item.price}</td>
              <td>John Due</td>
              <td>12 Jan, 2024</td>
              <td className="w-[150px]">
                <p className="h-[23px] w-[60px] rounded-[5px] bg-[var(--bg-color-pending)] text-[10px] text-[var(--text-color-pending)] font-[500] flex items-center justify-center">
                  Pending
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Section3;
