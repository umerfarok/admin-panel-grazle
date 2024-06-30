"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import SearchOnTop from "@/components/SearchOnTop";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { updatePageLoader, updatePageNavigation } from "@/features/features";

const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("categories"));
  }, [dispatch]);
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[10px] sm:px-[22px]">
            <SearchOnTop showButton={true} navigateTo={"/categories/add"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
