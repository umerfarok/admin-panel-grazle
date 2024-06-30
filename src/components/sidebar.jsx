import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updatePageLoader, updateSidebar } from "@/features/features";

import { RxDashboard } from "react-icons/rx";
import { LuShoppingBag } from "react-icons/lu";
import {
  RiUserStarLine,
  RiDiscountPercentLine,
} from "react-icons/ri";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FiSettings, FiShoppingBag } from "react-icons/fi";
import {
  HiOutlineExclamationCircle, HiOutlineCreditCard
} from "react-icons/hi2";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaUserTie } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";
import { PiRankingLight } from "react-icons/pi";
import { IoMdPhotos } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.showSidebar);
  const fn_sidebarControl = () => {
    dispatch(updateSidebar(!showSidebar));
  };
  return (
    <>
      <div
        className={`${
          showSidebar
            ? "absolute md:relative flex h-[85%] min-h-[550px] md:h-auto"
            : "absolute md:relative hidden md:flex md:h-auto"
        } w-[240px] bg-white rounded-tr-[8px] mt-[30px] shadow-2xl md:shadow-md px-[10px] py-[25px] flex-col gap-1.5 z-[999]`}
      >
        <button
          className="absolute md:hidden text-[var(--text-color)] right-5 scale-[1.5] top-2"
          onClick={fn_sidebarControl}
        >
          <FaArrowAltCircleLeft />
        </button>
        <SidebarPageTemplate
          icon={<RxDashboard className="w-[20px] h-[20px]" />}
          label={"Dashboard"}
          navigateTo={"dashboard"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<LuShoppingBag className="w-[20px] h-[20px]" />}
          label={"Sales Overview"}
          navigateTo={"sales-overview"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<IoBagRemoveOutline className="w-[21px] h-[21px]" />}
          label={"Orders"}
          navigateTo={"orders"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<FiShoppingBag className="w-[21px] h-[21px]" />}
          label={"Products"}
          navigateTo={"products"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<BiCategory className="w-[21px] h-[21px]" />}
          label={"Categories"}
          navigateTo={"categories"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<RiDiscountPercentLine className="w-[20px] h-[20px]" />}
          label={"Offers"}
          navigateTo={"offers"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<FaUserTie className="w-[20px] h-[18px]" />}
          label={"Sellers"}
          navigateTo={"sellers"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<BsPatchCheck className="w-[20px] h-[20px]" />}
          label={"Seller Verification"}
          navigateTo={"seller-verification"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<HiOutlineCreditCard className="w-[21px] h-[21px]" />}
          label={"Credit Limit"}
          navigateTo={"credit-limit"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<RiUserStarLine className="w-[20px] h-[20px]" />}
          label={"Customers"}
          navigateTo={"customers"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<PiRankingLight className="w-[20px] h-[20px]" />}
          label={"Referral Ranking"}
          navigateTo={"referral-ranking"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<IoMdPhotos className="w-[20px] h-[20px]" />}
          label={"Grazle Media"}
          navigateTo={"grazle-media"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={<FiSettings className="w-[20px] h-[19px]" />}
          label={` Settings`}
          navigateTo={"settings"}
          navigate={navigate}
        />
        <SidebarPageTemplate
          icon={
            <HiOutlineExclamationCircle className="w-[20px] h-[20px] scale-[1.15]" />
          }
          label={`Feedback`}
          navigateTo={"feedback"}
          navigate={navigate}
        />
      </div>
      <button
        className={`${
          showSidebar ? "hidden" : "absolute"
        } md:hidden text-[var(--text-color)] left-5 scale-[1.5] top-[77px]`}
        onClick={fn_sidebarControl}
      >
        <FaArrowAltCircleRight />
      </button>
    </>
  );
};

export default Sidebar;

const SidebarPageTemplate = ({ icon, label, navigateTo, navigate }) => {
  const dispatch = useDispatch();
  const pageNavigation = useSelector((state) => state.pageNavigation);
  return (
    <div
      className={`flex h-[48px] items-center rounded-tr-full rounded-br-full gap-5 px-[17px] hover:text-[var(--text-color)] cursor-pointer hover:bg-[var(--bg-color)]  border-l-[2px] hover:border-[var(--text-color)] ${
        pageNavigation === navigateTo
          ? "text-[var(--text-color)] bg-[var(--bg-color)] border-[var(--text-color)]"
          : "text-gray-500 bg-transparent border-white"
      }`}
      onClick={() => {
        dispatch(updatePageLoader(true));
        navigate.push(`/${navigateTo}`);
      }}
    >
      {icon}
      <p className="text-[16px] font-[500]">{label}</p>
    </div>
  );
};
