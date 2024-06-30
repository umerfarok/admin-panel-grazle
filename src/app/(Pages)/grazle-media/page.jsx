"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SearchOnTop from "@/components/SearchOnTop";
import { updatePageLoader, updatePageNavigation } from "@/features/features";

import img1 from "@/assets/grazleMedia1.png";
import editButton from "@/assets/svgs/edit-button.svg";
import deleteButton from "@/assets/svgs/delete-button.svg";
import Loading from "@/components/loading";

const GrazleMedia = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("grazle-media"));
  }, [dispatch]);
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[10px] sm:px-[22px]">
            <SearchOnTop showButton={true} navigateTo={"/grazle-media/add"} />
            <div className="bg-white rounded-[8px] shadow-sm p-[10px] sm:p-[25px] mt-[25px]">
              <p className="text-[19px] sm:text-[24px] font-[600]">
                Banners Management
              </p>
              <div className="mt-[25px] flex flex-col gap-7">
                <MediaData />
                <MediaData />
                <MediaData />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrazleMedia;

const MediaData = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-3 xl:gap-5">
      <div>
        <Image
          alt=""
          src={img1}
          className="rounded-[5px] min-h-[150px] sm:h-[230px] w-[600px] object-cover object-right"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-3">
        <div>
          <p className="sm:text-[22px] font-[500]">Summer Sale</p>
          <p className="text-[14px] sm:text-[18px] mt-2 text-[var(--text-color-body)]">
            Up to 50% off!
          </p>
          <p className="text-[14px] sm:text-[18px] mt-1 text-[var(--text-color-body)]">
            Explore our seasonal discounts.
          </p>
        </div>
        <div className="flex xl:justify-end gap-3 xl:max-w-[320px]">
          <Image alt="" src={editButton} />
          <Image alt="" src={deleteButton} />
        </div>
      </div>
    </div>
  );
};
