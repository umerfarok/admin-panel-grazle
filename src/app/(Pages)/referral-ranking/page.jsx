"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SearchOnTop from "@/components/SearchOnTop";
import { updatePageLoader, updatePageNavigation } from "@/features/features";

import data from "@/components/customers";
import electronicLED from "@/assets/Electronic-LED.png";
import Loading from "@/components/loading";

const ReferralRanking = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("referral-ranking"));
  }, [dispatch]);
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
                    <td>Referral Id</td>
                    <td>Ranking No</td>
                    <td>Referral Rate</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => (
                    <tr key={item.id} className="h-[50px] text-[14px]">
                      <td className="flex items-center gap-1.5 h-[50px]">
                        <Image
                          alt=""
                          src={electronicLED}
                          className="h-[26px] w-[26px]"
                        />
                        John Due
                      </td>
                      <td>#ey79ikmn</td>
                      <td className="ps-[25px]">
                        <div
                          className="w-[20px] h-[20px] rounded-[5px] shadow-sm text-[11px] flex justify-center items-center text-white font-[500]"
                          style={{
                            backgroundImage:
                              "linear-gradient(to left ,#F70000, #FFA1A1)",
                          }}
                        >
                          <p>{item.id}</p>
                        </div>
                      </td>
                      <td className="px-[17px] relative">
                        <p>180/200</p>
                      </td>
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

export default ReferralRanking;
