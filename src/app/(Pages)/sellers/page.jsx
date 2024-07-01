"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import SearchOnTop from "@/components/SearchOnTop";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { updatePageLoader, updatePageNavigation } from "@/features/features";

import electronicLED from "@/assets/Electronic-LED.png";
// import tableAction from "@/assets/svgs/table-action.svg";
import Image from "next/image";
import { axiosPrivate } from "@/axios";
import Loading from "@/components/loading";
// import { useRouter } from "next/navigation";
// import { IoEye } from "react-icons/io5";

const Sellers = () => {
  const dispatch = useDispatch();
  // const [sellerId, setSellerId] = useState(0);
  const [selectedTab, setSelectedTab] = useState("recent");
  const [allSellers, setAllSellers] = useState([]);
  const sellerRef = useRef([]);

  useEffect(() => {
    const getAllSellers = async () => {
      const { data } = await axiosPrivate.get("/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      // setAllSellers([data?.user]) // to show data on web
      // sellerRef.current=[data?.user] //to made a whole copy of data and can filter it
      setAllSellers(data?.users); // to show data on web
      sellerRef.current = data?.users; //to made a whole copy of data and can filter it
    };
    getAllSellers();
  }, [!selectedTab]);

  const filterData = (value) => {
    const tempArr = sellerRef?.current;
    setSelectedTab(value);
    if (value === "recent") {
      setAllSellers(sellerRef?.current);
    } else if (value === "all") {
      const filterData = tempArr.filter((item) => item.active === true);
      setAllSellers(filterData);
    } else {
      const filterData = tempArr.filter(
        (item) => item.profile.phone == 12345678
      );
      setAllSellers(filterData);
    }
  };

  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("sellers"));
  }, [dispatch]);

  // const fn_viewDetails = (id) => {
  //   if (id === sellerId) {
  //     return setSellerId(0);
  //   }
  //   setSellerId(id);
  // };
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[10px] sm:px-[25px]">
            <SearchOnTop />
            <div className="my-[20px] p-[30px] bg-white rounded-[8px] shadow-sm overflow-x-auto w-[94vw] md:w-[67vw] lg:w-[75vw] xl:w-auto">
              <div className="flex gap-10 mb-[15px] w-[max-content]">
                <p
                  className={`cursor-pointer hover:text-[var(--text-color)] font-[500] border-b-[2px] hover:border-[var(--text-color)] ${
                    selectedTab === "recent"
                      ? "text-[var(--text-color)] border-[var(--text-color)]"
                      : "text-[var(--text-color-body)] border-transparent"
                  }`}
                  // onClick={() => setSelectedTab("recent")}
                  onClick={() => filterData("recent")}
                >
                  Recent
                </p>
                <p
                  className={`cursor-pointer hover:text-[var(--text-color)] font-[500] border-b-[2px] hover:border-[var(--text-color)] ${
                    selectedTab === "all"
                      ? "text-[var(--text-color)] border-[var(--text-color)]"
                      : "text-[var(--text-color-body)] border-transparent"
                  }`}
                  // onClick={() => setSelectedTab("all")}
                  onClick={() => filterData("all")}
                >
                  All
                </p>
                {/* <p
                  className={`cursor-pointer hover:text-[var(--text-color)] font-[500] border-b-[2px] hover:border-[var(--text-color)] ${
                    selectedTab === "top"
                      ? "text-[var(--text-color)] border-[var(--text-color)]"
                      : "text-[var(--text-color-body)] border-transparent"
                  }`}
                  onClick={() => filterData("top")}
                >
                  Top
                </p> */}
              </div>
              <table className="w-[850px] xl:w-[100%]">
                <thead>
                  <tr className="font-[500] text-[var(--text-color-body)] text-[15px] h-[50px]">
                    <td>Seller Name</td>
                    <td>Email Address</td>
                    <td>Phone Number</td>
                    <td>Status</td>
                    {/* <td className="w-[80px]">Action</td> */}
                  </tr>
                </thead>
                <tbody>
                  {allSellers?.map((item) => (
                    <tr key={item.id} className="h-[50px] text-[14px]">
                      <td className="flex items-center gap-1.5 h-[50px]">
                        <Image
                          alt=""
                          src={electronicLED}
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
                          onClick={() => fn_viewDetails(item?.id)}
                        />
                        {sellerId === item?.id && <ViewDetails id={item.id} />}
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

export default Sellers;

// const ViewDetails = ({ id }) => {
//   const navigate = useRouter();
//   const dispatch = useDispatch();
//   return (
//     <div className="absolute py-[10px] px-[10px] flex flex-col items-center text-[var(--text-color-body)] bg-white rounded-[8px] shadow-md border border-gray-100 w-[max-content] left-[-145px] top-[13px] cursor-pointer">
//       <div
//         className="flex items-center gap-2.5 w-full px-2 py-1.5 hover:bg-gray-100 rounded-sm"
//         onClick={() => {
//           dispatch(updatePageLoader(true));
//           navigate.push(`/sellers/${id}`);
//         }}
//       >
//         <IoEye className="w-[20px] h-[20px]" />
//         <p className="text-[14px]">View Details</p>
//       </div>
//     </div>
//   );
// };
