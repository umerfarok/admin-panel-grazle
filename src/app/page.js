"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import { login } from "@/lib";
import { updatePageLoader, updateUser } from "../features/features";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import loginImg from "../assets/login-img.png";
import grazleLogo from "../assets/grazle-logo.png";
import emailSvg from "../assets/svgs/email-svg.svg";
import passwordSvg from "../assets/svgs/password-svg.svg";

export default function Home() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  async function handleLogin(formdata) {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, formdata);
      dispatch(updateUser(data?.user));
      localStorage.setItem("token", data?.token);
      localStorage.setItem("name", data?.user?.username);
      localStorage.setItem("image", data?.user?.profile?.image);
      await login(formdata);
      toast.success("Login Successfully");
    } catch (err) {
      console.log(err);
      setLoader(false)
      toast.error("Invalid Email or Password");
    }
  }

  useEffect(() => {
    dispatch(updatePageLoader(false))
  }, [dispatch])
  return (
    <form
      action={(e) => {handleLogin(e); setLoader(true)}}
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
          Welcome Back
        </p>
        <p className="text-[var(--text-color-body)] font-[600] text-center mb-[25px]">
          Please log into your account
        </p>
        <div className="flex flex-col gap-5 w-[400px]">
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
            <Image alt="" src={passwordSvg} />
            <input
              required
              minLength={8}
              type={showPassword ? "text" : "password"}
              name="password"
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
          <div className="flex justify-between items-center">
            <div className="text-[var(--text-color-body)] flex gap-3 items-center">
              <input type="checkbox" />
              <label>Remeber me!</label>
            </div>
            <p className="text-[var(--text-color)] font-[500]">
              Forgot Password ?
            </p>
          </div>
          {!loader ? (
            <input
              type="submit"
              value={"Sign In"}
              className="bg-[var(--text-color)] text-white rounded-[11px] h-[60px] font-[500] cursor-pointer"
            />
          ) : (
            <button className="bg-red-300 text-white rounded-[11px] h-[60px] font-[500] cursor-not-allowed" disabled>Loading...</button>
          )}
        </div>
        <div className="flex items-center justify-center w-[400px] gap-5 mt-[25px]">
          <div className="border flex-1"></div>
          <p className="text-[var(--text-color-body)]">or log in with</p>
          <div className="border flex-1"></div>
        </div>
        <div className="flex w-[400px] mt-[25px] gap-5">
          <button className="flex-1 bg-gray-100 h-[60px] rounded-[11px] font-[500]">
            Log in with Apple
          </button>
          <button className="flex-1 bg-gray-100 h-[60px] rounded-[11px] font-[500]">
            Log in with Google
          </button>
        </div>
        <p className="text-center font-[500] text-[var(--text-color-body)] mt-[35px]">
          Do not Have an Account?
          <Link href="/register">
            <span className="text-[var(--text-color)]">Sign Up</span>
          </Link>
        </p>
      </div>
    </form>
  );
}
