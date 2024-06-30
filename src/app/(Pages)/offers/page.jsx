"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { updatePageLoader, updatePageNavigation } from "@/features/features";
import SearchOnTop from "@/components/SearchOnTop";

import editButton from "@/assets/svgs/edit-button.svg";
import deleteButton from "@/assets/svgs/delete-button.svg";
import Loading from "@/components/loading";

const Offers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("offers"));
  }, [dispatch]);
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[22px]">
            <SearchOnTop />
            <div className="mt-[20px] bg-white rounded-[8px] shadow-sm p-[30px] grid lg:grid-cols-2 gap-9">
              <OfferBox />
              <OfferBox />
              <OfferBox />
              <OfferBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;

const OfferBox = () => {
  return (
    <div className="border border-gray-200 rounded-[8px] px-[30px] py-[20px]">
      <p className="text-[19px] sm:text-[23px] font-[500]">Summer Sale Offer</p>
      <p className="text-[15px] sm:text-[19px] mt-1">Up to 50% off!</p>
      <p className="text-[15px] sm:text-[19px] mt-1">
        Valid up to 10 June 2024
      </p>
      <div className="mt-8 flex justify-end gap-3">
        <Image
          alt=""
          src={editButton}
          className="w-[75px] sm:h-[36px] sm:w-[100px] cursor-pointer"
        />
        <Image
          alt=""
          src={deleteButton}
          className="w-[75px] sm:h-[36px] sm:w-[100px] cursor-pointer"
        />
      </div>
    </div>
  );
};
