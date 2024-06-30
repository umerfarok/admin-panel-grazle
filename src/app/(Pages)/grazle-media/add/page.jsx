"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { updatePageNavigation } from "@/features/features";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import { FaCamera } from "react-icons/fa6";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";

const AddGrazleMedia = () => {
  const dispatch = useDispatch();
  const [Visibility, setVisibility] = useState("");
  useEffect(() => {
    dispatch(updatePageNavigation("grazle-media"));
  }, [dispatch]);
  const fn_visibilityControl = (value) => {
    setVisibility(value);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 mt-[30px] px-[10px] sm:px-[22px]">
          <div className="bg-white shadow-sm rounded-[8px] p-[10px] sm:p-[25px]">
            <p className="text-[24px] font-[600]">Add New Banner</p>
            <form className="mt-[20px] flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-[var(--text-color-body)]">
                  Banner Name
                </label>
                <input
                  placeholder="Banner Name"
                  className="border border-gray-200 rounded-[8px] h-[45px] text-[15px] px-3 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[var(--text-color-body)]">
                  Image Upload
                </label>
                <div className="h-[180px] rounded-[10px] border-[2px] border-dashed border-blue-100 bg-[#F8F8FF] flex items-center justify-center flex-col">
                  <FaCamera className="h-[40px] w-[45px] text-[var(--text-color-body)] mb-4" />
                  <p className="font-[500] text-[13px] text-center">
                    Drag & drop files or{" "}
                    <span className="underline text-[var(--text-color)] cursor-pointer">
                      Browse
                    </span>
                  </p>
                  <p className="text-[11px] text-[var(--text-color-body)] text-center mt-1">
                    Supported formats: JPEG, PNG
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[var(--text-color-body)]">
                  Hyperlink
                </label>
                <input
                  placeholder="https://example.com/summer-sale"
                  className="border border-gray-200 rounded-[8px] h-[45px] text-[15px] px-3 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[var(--text-color-body)]">
                  Display Order
                </label>
                <input
                  placeholder="Enter display order"
                  className="border border-gray-200 rounded-[8px] h-[45px] text-[15px] px-3 focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[var(--text-color-body)]">
                  Visibility
                </label>
                <div className="flex gap-10 sm:gap-32 mt-1">
                  <div
                    className={`flex items-center gap-2 cursor-pointer ${
                      Visibility === "show"
                        ? "text-[var(--text-color)]"
                        : "text-[var(--text-color-body)]"
                    }`}
                    onClick={() => fn_visibilityControl("show")}
                  >
                    {Visibility === "show" ? (
                      <IoMdRadioButtonOn className="w-[20px] h-[20px]" />
                    ) : (
                      <IoMdRadioButtonOff className="w-[20px] h-[20px]" />
                    )}
                    Show
                  </div>
                  <div
                    className={`flex items-center gap-2 cursor-pointer ${
                      Visibility === "hide"
                        ? "text-[var(--text-color)]"
                        : "text-[var(--text-color-body)]"
                    }`}
                    onClick={() => fn_visibilityControl("hide")}
                  >
                    {Visibility === "hide" ? (
                      <IoMdRadioButtonOn className="w-[20px] h-[20px]" />
                    ) : (
                      <IoMdRadioButtonOff className="w-[20px] h-[20px]" />
                    )}
                    Hide
                  </div>
                </div>
              </div>
              <input
                type="submit"
                className="h-[50px] px-[20px] sm:px-[80px] w-[max-content] bg-[#FE4242] rounded-[8px] font-[500] text-white my-3 cursor-pointer border border-[#FE4242] hover:bg-transparent transition-all duration-100 hover:text-[#FE4242]"
                value={"Save Changes"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGrazleMedia;
