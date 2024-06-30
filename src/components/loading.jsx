import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Loading = () => {
  const pageLoader = useSelector((state) => state.pageLoader);
  return pageLoader === true ? (
    <div className="z-[99999999] fixed w-full top-0 left-0 h-screen flex justify-center items-center bg-[#9999999f] text-[20px] text-[var(--text-color)] font-[600] overflow-hidden">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="red"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        strokeColor={"red"}
      />
    </div>
  ) : (
    <></>
  );
};

export default Loading;
