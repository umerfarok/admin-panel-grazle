"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { updatePageLoader, updatePageNavigation } from "@/features/features";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import img from "@/assets/profile.jpeg";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { MdOutlineStorefront } from "react-icons/md";
import { LiaStoreAltSolid } from "react-icons/lia";
import { HiOutlineCreditCard } from "react-icons/hi2";
import Loading from "@/components/loading";

const CreditLimit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("credit-limit"));
  }, [dispatch]);
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[10px] sm:px-[22px]">
            <div className="bg-white rounded-[8px] shadow-sm p-[10px] sm:p-[25px]">
              <SellerData />
              <SellerData />
              <SellerData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditLimit;

const SellerData = () => {
  return (
    <div>
      <div className="border border-gray-200 rounded-[8px] p-[25px] grid grid-cols-1 lg:grid-cols-2 xl:flex gap-10 xl:gap-16">
        <div className="lg:col-span-2">
          <p className="text-[18px] sm:text-[20px] font-[500]">
            Seller Overview
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5 xl:gap-10 mt-5">
            <Image
              alt=""
              src={img}
              className="w-[80px] h-[80px] rounded-full col-span-2 md:col-span-1"
            />
            <div className="text-[var(--text-color-body)]">
              <p className="text-[17px] text-center sm:text-start">
                Patrick Thomas
              </p>
              <p className="text-[15px] text-center sm:text-start">ID: 12345</p>
              <p className="h-[30px] w-[70px] rounded-[5px] bg-[var(--bg-color-delivered)] text-[14px] text-[var(--text-color-delivered)] font-[500] flex items-center justify-center mt-[20px]">
                Active
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 hidden xl:block"></div>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex gap-3 items-center text-[var(--text-color-body)]">
            <TfiEmail className="h-[19px] w-[19px]" />
            <p>john@techstore.com</p>
          </div>
          <div className="flex gap-3 items-center text-[var(--text-color-body)]">
            <BsTelephone className="h-[19px] w-[19px]" />
            <p>(123) 456-7890</p>
          </div>
          <div className="flex gap-3 items-center text-[var(--text-color-body)]">
            <GrLocation className="h-[19px] w-[19px]" />
            <p>123 Tech Street, CA</p>
          </div>
        </div>
        <div className="border border-gray-100 hidden xl:block"></div>
        <div className="flex flex-col justify-center gap-2">
          <div className="flex gap-3 items-center text-[var(--text-color-body)]">
            <MdOutlineStorefront className="h-[19px] w-[19px]" />
            <p>John Tech Store LLC</p>
          </div>
          <div className="flex gap-3 items-center text-[var(--text-color-body)]">
            <LiaStoreAltSolid className="h-[19px] w-[19px]" />
            <p>Retail Business</p>
          </div>
          <div className="flex gap-3 items-center text-[var(--text-color-body)]">
            <HiOutlineCreditCard className="h-[19px] w-[19px]" />
            <p>6578 5435 9802 1248</p>
          </div>
        </div>
      </div>
      <div className="mt-[10px] mb-[25px]">
        <p className="text-[20px] font-[500]">Actions</p>
        <div className="flex gap-3 sm:gap-10 mt-[10px]">
          <button className="h-[35px] w-[100px] sm:h-[45px] sm:w-[130px] rounded-[8px] bg-[#06E775] flex justify-center items-center text-white font-[500] border border-[#06E775] hover:bg-transparent transition-all duration-100 hover:text-[#06E775]">
            Accept
          </button>
          <button className="h-[35px] w-[100px] sm:h-[45px] sm:w-[130px] rounded-[8px] bg-[#FE4242] flex justify-center items-center text-white font-[500] border border-[#FE4242] hover:bg-transparent transition-all duration-100 hover:text-[#FE4242]">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
