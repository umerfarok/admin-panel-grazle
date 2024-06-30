"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import data from "@/components/customers";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SearchOnTop from "@/components/SearchOnTop";
import { updatePageLoader, updatePageNavigation } from "@/features/features";

import img from "@/assets/customer.png";
import { BsThreeDots } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

const Feedback = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("customer");
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("feedback"));
  }, [dispatch]);
  const fn_viewDetails = (id) => {
    if (id === selectedCustomer) {
      return setSelectedCustomer(0);
    }
    setSelectedCustomer(id);
  };
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[22px]">
            <SearchOnTop />
            <div className="mt-[25px] bg-white rounded-[8px] p-[10px] sm:p-[25px]">
              <div className="flex gap-10 mb-[15px]">
                <p
                  className={`cursor-pointer hover:text-[var(--text-color)] font-[500] border-b-[2px] hover:border-[var(--text-color)] ${
                    selectedTab === "customer"
                      ? "text-[var(--text-color)] border-[var(--text-color)]"
                      : "text-[var(--text-color-body)] border-transparent"
                  }`}
                  onClick={() => setSelectedTab("customer")}
                >
                  Customer
                </p>
                <p
                  className={`cursor-pointer hover:text-[var(--text-color)] font-[500] border-b-[2px] hover:border-[var(--text-color)] ${
                    selectedTab === "seller"
                      ? "text-[var(--text-color)] border-[var(--text-color)]"
                      : "text-[var(--text-color-body)] border-transparent"
                  }`}
                  onClick={() => setSelectedTab("seller")}
                >
                  Seller
                </p>
              </div>
              <div className="mt-[30px] flex flex-col gap-[20px]">
                {data?.map((item) => (
                  <Lists
                    item={item}
                    key={item.id}
                    fn_viewDetails={fn_viewDetails}
                    selectedCustomer={selectedCustomer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;

const Lists = ({ item, fn_viewDetails, selectedCustomer }) => {
  const navigate = useRouter();
  return (
    <div
      className="border border-gray-200 rounded-[8px] p-[20px] relative"
      key={item.id}
    >
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <Image
          alt=""
          src={img}
          className="h-[50px] w-[50px] rounded-full bg-[#E0D5C9]"
        />
        <p className="text-[14px]">AvivGeffen</p>
        <p className="text-[11px] text-[var(--text-color-body)] mt-[-9px] sm:mt-0 sm:ms-10">
          8 hours ago
        </p>
      </div>
      <p className="font-[500] mt-4 text-center sm:text-start">
        Frustrating experience, overcomplicated tool
      </p>
      <p className="text-[14px] text-[var(--text-color-body)] mt-1 sm:w-[85%] text-center sm:text-start">
        Lorem ipsum dolor sit amet consectetur. Nulla id vel senectus odio
        tempus eu porttitor. Elementum id eu nec et lectus. Lorem ipsum dolor
        sit amet consectetur. Nulla id vel senectus odio tempus eu porttitor.
        Elementum id eu nec et lectus.
      </p>
      <div className="sm:absolute sm:right-[20px] sm:top-[20px] flex items-center justify-center mt-4 sm:mt-0 gap-3">
        <button
          className="rounded-[4px] h-[30px] w-[75px] text-[12px] border border-[#00A1FF] text-[#00A1FF] hover:bg-[#00A1FF] hover:text-white"
          onClick={() => navigate.push(`/feedback/${item.id}`)}
        >
          Open
        </button>
        <BsThreeDots
          className="text-[var(--text-color-body)] hidden sm:block cursor-pointer"
          onClick={() => fn_viewDetails(item.id)}
        />
        {selectedCustomer === item.id && (
          <div className="absolute right-[25px] top-0">
            <ViewDetails id={item.id} />
          </div>
        )}
      </div>
    </div>
  );
};

const ViewDetails = ({ id }) => {
  const navigate = useRouter();
  return (
    <div
      className="absolute py-[10px] px-[10px] flex flex-col items-center text-[var(--text-color-body)] bg-white rounded-[8px] shadow-md border border-gray-100 w-[max-content] left-[-145px] top-[13px] cursor-pointer"
      onClick={() => navigate.push(`/feedback/${id}`)}
    >
      <div className="flex items-center gap-2.5 w-full px-2 py-1.5 hover:bg-gray-100 rounded-sm">
        <IoEye className="w-[20px] h-[20px]" />
        <p className="text-[14px]">View Details</p>
      </div>
    </div>
  );
};
