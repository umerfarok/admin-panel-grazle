"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SearchOnTop from "@/components/SearchOnTop";
import { updatePageLoader, updatePageNavigation } from "@/features/features";

import tableAction from "@/assets/svgs/table-action.svg";
import { IoEye } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { axiosPrivate } from "@/axios";
import Loading from "@/components/loading";

const Customers = () => {
  const dispatch = useDispatch();
  // const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [allCustomers, setAllCustomers] = useState([]);
  useEffect(() => {
    const getAllCustomers = async () => {
      const { data } = await axiosPrivate.get("/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAllCustomers(data?.users);
    };
    getAllCustomers();
  }, []);
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("customers"));
  }, [dispatch]);
  // const fn_viewDetails = (id) => {
  //   if (id === selectedCustomer) {
  //     return setSelectedCustomer(0);
  //   }
  //   setSelectedCustomer(id);
  // };
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[10px] sm:px-[22px]">
            <SearchOnTop />
            <div className="my-[20px] px-[30px] py-[20px] bg-white rounded-[8px] shadow-sm overflow-x-auto w-[94vw] md:w-[67vw] lg:w-[75vw] xl:w-auto">
              <table className={`w-[850px] xl:w-[100%]`}>
                <thead>
                  <tr className="font-[500] text-[var(--text-color-body)] text-[15px] h-[50px]">
                    <td>Name</td>
                    <td>Email Address</td>
                    <td>Phone Number</td>
                    <td>Status</td>
                    {/* <td className="w-[80px]">Action</td> */}
                  </tr>
                </thead>
                <tbody>
                  {allCustomers?.map((item) => (
                    <tr key={item.id} className="h-[50px] text-[14px]">
                      <td className="flex items-center gap-1.5 h-[50px]">
                        <Image
                          alt=""
                          width={50}
                          height={50}
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            "/" +
                            item?.profile?.image
                          }
                          className="h-[26px] w-[26px]"
                        />
                        {item?.profile?.first_name +
                          " " +
                          item?.profile?.last_name}
                      </td>
                      <td>{item?.email}</td>
                      <td>{item?.profile?.phone}</td>
                      <td className="w-[130px]">
                        <p
                          className={cn(
                            "h-[23px] w-[60px] rounded-[5px] flex items-center font-[500]  justify-center text-[10px]",
                            item?.active
                              ? "bg-[var(--bg-color-delivered)] text-[var(--text-color-delivered)]"
                              : "bg-[var(--bg-color-pending)]  text-[var(--text-color-pending)]"
                          )}
                        >
                          {item?.active ? "Active" : "Pending"}
                        </p>
                      </td>
                      {/* <td className="px-[17px] relative">
                        <Image
                          alt=""
                          src={tableAction}
                          className="cursor-pointer"
                          onClick={() => fn_viewDetails(item.id)}
                        />
                        {selectedCustomer === item.id && <ViewDetails />}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;

// const ViewDetails = () => {
//   return (
//     <div className="absolute py-[10px] px-[10px] flex flex-col items-center text-[var(--text-color-body)] bg-white rounded-[8px] shadow-md border border-gray-100 w-[max-content] left-[-145px] top-[13px] cursor-pointer z-[999]">
//       <div className="flex items-center gap-2.5 w-full px-2 py-1.5 hover:bg-gray-100 rounded-sm">
//         <IoEye className="w-[20px] h-[20px]" />
//         <p className="text-[14px]">Enable</p>
//       </div>
//       <div className="flex items-center gap-2.5 w-full px-2 py-1.5 hover:bg-gray-100 rounded-sm">
//         <RiDeleteBin6Fill className="w-[20px] h-[20px]" />
//         <p className="text-[14px]">Disable</p>
//       </div>
//     </div>
//   );
// };
