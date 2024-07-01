"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchOnTop from "@/components/SearchOnTop";
import Navbar from "@/components/navbar";
import Loading from "@/components/loading";
import Sidebar from "@/components/sidebar";
import { updatePageLoader, updatePageNavigation } from "@/features/features";


const SellerDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("sellers"));
  }, [dispatch]);

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDetails;
