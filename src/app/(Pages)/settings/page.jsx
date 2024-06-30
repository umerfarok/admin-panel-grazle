"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { updatePageLoader, updatePageNavigation } from "@/features/features";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "@/components/loading";

const Settings = () => {
  const dispatch = useDispatch();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("settings"));
  }, [dispatch]);
  async function onPasswordChange(formdata) {
    try {
      const newPassword = formdata.get("new_password");
      const confirmPassword = formdata.get("confirm_password");
      setPending(true);
      if (newPassword !== confirmPassword) {
        return toast.error("New and confirm password did'nt match");
      }
      await axios.post("/profile/change-password", formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      toast.success("Password has been changed");
    } catch (error) {
      if (error?.request?.status === 400) {
        //error.data.message
        return toast.error("Invalid old password");
      }
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 1000);
    }
  }
  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[22px]">
            <div className="bg-white rounded-[8px] p-[10px] sm:p-[25px] shadow-sm flex flex-col lg:flex-row gap-[10px] sm:gap-[25px]">
              <div className="flex flex-col justify-between relative border border-gray-200 rounded-[8px] p-[20px] flex-1">
                <div>
                  <p className="text-[18px] sm:text-[20px] font-[500] text-[#777777]">
                    Edit Profile
                  </p>
                  <div className="flex flex-col gap-1 text-[#777777] mt-[15px]">
                    <label>Your Name</label>
                    <input
                      className="focus:outline-none h-[45px] border border-gray-200 px-3 rounded-[8px] text-[15px] w-[100%]"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-[#777777] mt-[15px]">
                    <label>Email Address</label>
                    <input
                      className="focus:outline-none h-[45px] border border-gray-200 px-3 rounded-[8px] text-[15px] w-[100%]"
                      placeholder="john_du@gmail.com"
                    />
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-10 mt-[10px]">
                  <button className="h-[35px] w-[100px] sm:h-[45px] sm:w-[130px] rounded-[8px] bg-[#06E775] flex justify-center items-center text-white font-[500] border border-[#06E775] hover:bg-transparent transition-all duration-100 hover:text-[#06E775]">
                    Save
                  </button>
                </div>
              </div>
              <form
                action={onPasswordChange}
                className="border border-gray-200 rounded-[8px] p-[20px] flex-1"
              >
                <p className="text-[18px] sm:text-[20px] font-[500] text-[#777777]">
                  Change Password
                </p>
                <div className="flex flex-col gap-1 text-[#777777] mt-[15px]">
                  <label>Old Password</label>
                  <input
                    className="focus:outline-none h-[45px] border border-gray-200 px-3 rounded-[8px] text-[15px] w-[100%]"
                    placeholder="*******"
                    type="password"
                    name="old_password"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 text-[#777777] mt-[15px]">
                  <label>New Password</label>
                  <input
                    className="focus:outline-none h-[45px] border border-gray-200 px-3 rounded-[8px] text-[15px] w-[100%]"
                    placeholder="*******"
                    type="password"
                    name="new_password"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 text-[#777777] mt-[15px]">
                  <label>Confirm Password</label>
                  <input
                    className="focus:outline-none h-[45px] border border-gray-200 px-3 rounded-[8px] text-[15px] w-[100%]"
                    placeholder="*******"
                    type="password"
                    name="confirm_password"
                    required
                  />
                </div>
                <div className="flex gap-3 sm:gap-10 mt-[10px]">
                  <button
                    disabled={isPending}
                    type="submit"
                    className="h-[35px] w-[100px] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none sm:h-[45px] sm:w-[130px] rounded-[8px] bg-[#06E775] flex justify-center items-center text-white font-[500] border border-[#06E775] hover:bg-transparent transition-all duration-100 hover:text-[#06E775]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
