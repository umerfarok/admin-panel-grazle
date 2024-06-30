"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import loginImg from "../../../assets/login-img.png";
import grazleLogo from "../../../assets/grazle-logo.png";

import emailSvg from "../../../assets/svgs/email-svg.svg";
import passwordSvg from "../../../assets/svgs/password-svg.svg";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import { axiosPrivate } from "@/axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function onRegisterAccount(formdata) {
    try {
      formdata.append("role", "admin");
      await axiosPrivate.post("/auth/register", formdata);
      toast.success("Account created successfully");
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }
  return (
    <form
      action={onRegisterAccount}
      className="flex min-h-screen flex-col xl:flex-row items-center"
    >
      <div
        className="xl:w-[45%] my-[25px] w-[95%] xl:ms-[25px] relative flex flex-col justify-between items-center p-[25px] rounded-[20px]"
        style={{ backgroundImage: "linear-gradient(#FF781E, #FDC197)" }}
      >
        <div className="mt-10">
          <p className="text-[30px] font-[600] text-white">
            Discover endless possibilities
          </p>
          <p className="text-[60px] font-[600] text-white mt-7">
            Explore, buy, and sell with our vibrant marketplace!
          </p>
        </div>
        <Image alt="" src={loginImg} className="w-[400px] mb-[-50px]" />
      </div>
      <div className="w-full xl:w-[55%] flex flex-col items-center py-[50px] justify-center">
        <Image alt="" src={grazleLogo} className="w-[200px]" />
        <p className="text-[40px] font-[700] text-center mt-[25px]">
          Welcome Here
        </p>
        <p className="text-[var(--text-color-body)] font-[600] text-center mb-[25px]">
          Create your account
        </p>
        <div className="flex flex-col gap-5 w-[400px]">
          <div className="bg-[#F5F7F9] flex items-center h-[60px] w-[100%] rounded-[11px] px-5 gap-5">
            {/* <Image alt="" src={emailSvg} /> */}
            <FaUser className="text-gray-500" />
            <input
              className="flex-1 focus:outline-none bg-transparent font-[500] text-[15px]"
              placeholder="Username"
              name="username"
              type="text"
              required
            />
          </div>
          <div className="bg-[#F5F7F9] flex items-center h-[60px] w-[100%] rounded-[11px] px-5 gap-5">
            <Image alt="" src={emailSvg} />

            <input
              className="flex-1 focus:outline-none bg-transparent font-[500] text-[15px]"
              placeholder="Email Address"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="bg-[#F5F7F9] flex items-center h-[60px] w-[100%] rounded-[11px] px-5 gap-5">
            {/* <Image alt="" src={emailSvg} /> */}
            <FaPhone className="text-gray-500" />

            <input
              className="flex-1 focus:outline-none bg-transparent font-[500] text-[15px]"
              placeholder="Phone #"
              name="phone"
              type="tel"
              required
            />
          </div>
          <div className="bg-[#F5F7F9] flex items-center h-[60px] w-[100%] rounded-[11px] px-5 gap-5">
            <Image alt="" src={passwordSvg} />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              minLength={8}
              className="flex-1 focus:outline-none bg-transparent font-[500] text-[15px]"
              placeholder="Password"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <FaRegEye
                className="cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>

          <input
            type="submit"
            value={"Create an account"}
            className="bg-[var(--text-color)] text-white rounded-[11px] h-[60px] font-[500] cursor-pointer"
          />
        </div>

        <p className="text-center font-[500] text-[var(--text-color-body)] mt-[35px]">
          Already Have an Account?
          <Link href="/">
            <span className="text-[var(--text-color)]">Sign In</span>
          </Link>
        </p>
      </div>
    </form>
  );
}
