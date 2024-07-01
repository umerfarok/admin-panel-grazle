"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { updatePageLoader, updatePageNavigation } from "@/features/features";
import SearchOnTop from "@/components/SearchOnTop";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosPrivate } from "@/axios";
import { toast } from "react-toastify";

const AddCategories = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [categoryImage, setCategoryImage] = useState([]);
  const [categoryDetail, setCategory] = useState({});
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("categories"));
  }, [dispatch]);
  function onRemoveCategoryImg() {
    setCategoryImage([]);
  }
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axiosPrivate.get(
        `/categories/details/${category}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setCategory(data?.category);
    };
    category && getCategory();
  }, []);

  async function onCreate(formdata) {
    if (!category && !categoryImage?.length) {
      setLoader(false);
      return toast.error("Please select image");
    }
    try {
      const url = category ? `/categories/${category}` : "/categories";
      const method = category ? "PUT" : "POST";
      await axiosPrivate({
        url,
        method,
        data: formdata,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      let message = category
        ? "Category has been updated"
        : "Category has been created";
      toast.success(message);
      router.push("/categories");
      dispatch(updatePageLoader(true));
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.success("Something went wrong");
    }
  }

  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1 mt-[30px] px-[10px] sm:px-[22px]">
            <SearchOnTop showButton={true} navigateTo={"/categories/add"} />
            <form
              action={(e) => {
                onCreate(e);
                setLoader(true);
              }}
              className="mt-[20px] bg-white rounded-[8px] shadow-sm p-[30px]"
            >
              <p className="text-[20px] font-[600]">
                {category ? "Edit Category" : "Create New Category"}
              </p>
              <div className="flex flex-col gap-1 my-[15px]">
                <label className="text-[#777777]">Category Name</label>
                <input
                  placeholder="Category Name"
                  name="name"
                  required
                  defaultValue={categoryDetail?.name}
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px]"
                />
              </div>
              <div className="my-[15px] ">
                <label className="text-[#777777]">Image Upload</label>
                <div className="flex gap-5 xl:flex-row">
                  <input
                    type="file"
                    id="uploadPic"
                    className="hidden"
                    name="image"
                    value={categoryDetail?.image}
                    onChange={(e) => {
                      setCategoryImage([e.target.files[0]]);
                    }}
                  />
                  <div className="flex flex-col gap-2 mt-3">
                    <label
                      htmlFor="uploadPic"
                      className="min-w-[250px] cursor-pointer h-[180px] rounded-[10px] border-[2px] border-dashed border-blue-100 bg-[#F8F8FF] flex items-center justify-center flex-col"
                    >
                      <FaCamera className="h-[40px] w-[45px] text-[var(--text-color-body)] mb-4" />
                      <p className="font-[500] text-[13px] text-center">
                        Drag & drop files or{" "}
                        <span className="text-[var(--text-color)] hover:underline">
                          Browse
                        </span>
                      </p>
                      <p className="text-[11px] text-[var(--text-color-body)] text-center mt-1">
                        Supported formats: JPEG, PNG
                      </p>
                    </label>
                    <div className="flex flex-row gap-3">
                      {categoryImage?.map((item, index) => (
                        <div key={index} className="relative">
                          <Image
                            width={120}
                            height={120}
                            src={URL.createObjectURL(item)}
                            alt=""
                          />
                          <span
                            onClick={() => onRemoveCategoryImg(index)}
                            className="absolute top-0 right-0 cursor-pointer"
                          >
                            <MdCancel
                              className="text-white bg-[var(--text-color)] rounded-full"
                              size={20}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {!loader ? (
                <button
                  type="submit"
                  className="bg-[#FE4242] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-[8px] h-[40px] px-[40px] py-[10px] text-white text-[15px] font-[500] w-[max-content]"
                >
                  {category ? "Save Changes" : "Submit"}
                </button>
              ) : (
                <button
                  disabled
                  className="bg-red-300 rounded-[8px] h-[40px] px-[40px] py-[10px] text-white text-[15px] font-[500] w-[max-content] cursor-not-allowed"
                >
                  Loading...
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategories;
