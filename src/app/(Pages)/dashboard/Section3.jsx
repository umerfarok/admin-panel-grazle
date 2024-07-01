import Image from "next/image";
import React from "react";
import electronicLED from "@/assets/Electronic-LED.png";
import { cn } from "@/lib/utils";

const Section3 = ({allOrders}) => {
  
  return (
    <div className="my-[30px] px-[25px] py-[20px] bg-white rounded-[8px] shadow-sm overflow-x-auto w-[94vw] md:w-[67vw] lg:w-[75vw] xl:w-auto">
      <h2 className="text-lg font-bold my-2">Recent Orders</h2>
      <table className="w-[1000px] xl:w-[100%] table-fixed">
        <thead>
          <tr className="font-[500] text-[var(--text-color-body)] text-[15px]">
            <td>Order No</td>
            <td>Product Name</td>
            <td>Price</td>
            {/* <td>Seller</td> */}
            <td>Date</td>
            <td className="w-[80px]">Status</td>
          </tr>
        </thead>
        {/* <tbody>
          {allOrder?.map((item, index) => (
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
        </tbody> */}
        <tbody>
          {allOrders?.map((item) => (
            <>
              <tr key={item?.id} className="h-[50px] text-[14px]">
                <td>{item?.id}</td>
                <td className="flex items-center gap-1.5 h-[50px] capitalize">
                  <Image
                    alt=""
                    src={electronicLED}
                    className="h-[26px] w-[26px]"
                  />
                  {item?.products?.map(
                    (pro, index) =>
                      `${pro?.title}${
                        index < item.products.length - 1 ? ", " : ""
                      }`
                  )}
                </td>
                <td>
                  ₹
                  {item?.products?.reduce((acc, pro) => {
                    return acc + pro?.quantity * pro?.price;
                  }, 0)}
                </td>
                <td>{item?.date}</td>
                <td className="w-[130px]">
                  <p
                    className={cn(
                      item?.status == "new" &&
                        "bg-[var(--bg-color-delivered)] text-[var(--text-color-delivered)]",
                      item?.status == "cancelled" && "bg-red-100 text-red-500",
                      "h-[23px] w-[60px] rounded-[5px]  text-[10px] font-[500] flex items-center justify-center px-4 py-2"
                    )}
                  >
                    {item?.status == "new" && "Pending"}
                    {item?.status == "cancelled" && "Cancelled"}
                    {item?.status == "completed" && "Delivered"}
                  </p>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Section3;
