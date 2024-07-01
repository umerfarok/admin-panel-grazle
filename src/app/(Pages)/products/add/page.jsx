"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePageNavigation } from "@/features/features";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

import { FaCamera } from "react-icons/fa6";
import { toast } from "react-toastify";

import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { axiosPrivate } from "@/axios";

const Products = () => {
  const [isPending, setPending] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [galleryImage, setGalleryImage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePageNavigation("products"));
  }, [dispatch]);
  useEffect(() => {
    const getAllCategories = async () => {
      const { data } = await axiosPrivate.get("/categories", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      !allCategories.length && setAllCategories(data?.categories); // to show data on web
    };
    getAllCategories();
  }, []);
  useEffect(() => {
    const getAllBrands = async () => {
      const { data } = await axiosPrivate.get("/brands", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      !allBrands.length && setAllBrands(data?.brands); // to show data on web
    };
    getAllBrands();
  }, []);
  async function onAddProduct(formdata) {
    try {
      setPending(true);

      for (let key in galleryImage) {
        formdata.append("gallery_images", galleryImage[key]);
      }
      await axiosPrivate.post("/admin/products", formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      toast.success("Product has been created");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 1000);
    }
  }
  function onRemoveImg(index) {
    const tempArr = [...galleryImage];
    tempArr.splice(index, 1);
    setGalleryImage(tempArr);
  }
  function onRemoveFeatureImg() {
    setProductImage([]);
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 mt-[30px] px-[22px]">
          <form
            action={onAddProduct}
            className="bg-white rounded-[8px] shadow-sm px-[20px] py-[25px]"
          >
            <p className="text-[20px] font-[600]">Create New Product</p>
            <p className="text-[18px] font-[600] pt-[20px]">
              General Information
            </p>
            <div>
              <div className="flex flex-col gap-1 my-[15px]">
                <label className="text-[#777777]">Name</label>
                <input
                  placeholder="Product Name"
                  name="title"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px]"
                />
              </div>
              <div className="flex flex-col gap-1 my-[15px]">
                <label className="text-[#777777]">Tags</label>
                <input
                  placeholder="Tags"
                  name="tags"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px]"
                />
              </div>
              <div className="flex flex-col gap-1 my-[15px]">
                <label className="text-[#777777]">Description</label>
                <textarea
                  placeholder="Write about product"
                  name="description"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 py-2 rounded-[8px] px-[15px] h-[110px] text-[15px]"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 my-[15px]">
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <label className="text-[#777777]">Color</label>
                <input
                  placeholder="Color"
                  name="color"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <label className="text-[#777777]">Size</label>

                <select
                  name="size"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px] text-[var(--text-color-body)]"
                >
                  <option selected disabled>
                    Select an option
                  </option>
                  <option value="XXL">XXL</option>
                  <option value="XL">XL</option>
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="S">S</option>
                  <option value="X">X</option>
                  <option value="XS">XS</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 my-[15px]">
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <label className="text-[#777777]">Category</label>
                <select
                  name="category_id"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px] text-[var(--text-color-body)]"
                >
                  <option selected disabled>
                    Select an option
                  </option>
                  {allCategories?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <label className="text-[#777777]">Brand</label>
                <select
                  name="brand_id"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px] text-[var(--text-color-body)]"
                >
                  <option selected disabled>
                    Select an option
                  </option>
                  {allBrands?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-[18px] font-[600] pt-[20px]">Pricing</p>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 my-[15px]">
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <label className="text-[#777777]">Price</label>
                <input
                  placeholder="₹"
                  name="price"
                  required
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <label className="text-[#777777]">Discount</label>
                <input
                  placeholder="%"
                  name="discount"
                  className="focus:outline-none border-[2px] border-gray-200 rounded-[8px] px-[15px] h-[50px] text-[15px]"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 my-[15px]">
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <p className="text-[18px] font-[600] pt-[20px]">
                  Feature Image
                </p>
                <div className="my-[15px] ">
                  <label className="text-[#777777]">Feature Image</label>
                  <div className="flex gap-5  my-[15px]  xl:flex-row">
                    <input
                      type="file"
                      id="uploadPic"
                      className="hidden"
                      name="featured_image"
                      required
                      // multiple
                      onChange={(e) => {
                        setProductImage([e.target.files[0]]);
                      }}
                    />
                    <div className="flex flex-col gap-2 mt-3">
                      <label
                        htmlFor="uploadPic"
                        className="min-w-[230px] cursor-pointer h-[180px] rounded-[10px] border-[2px] border-dashed border-blue-100 bg-[#F8F8FF] flex items-center justify-center flex-col"
                      >
                        <FaCamera className="h-[40px] w-[45px] text-[var(--text-color-body)] mb-4" />
                        <p className="font-[500] text-[13px] text-center">
                          Drag & drop files or Browse
                        </p>
                        <p className="text-[11px] text-[var(--text-color-body)] text-center mt-1">
                          Supported formats: JPEG, PNG
                        </p>
                      </label>
                      <div className="flex flex-row gap-3">
                        {productImage?.map((item, index) => (
                          <div key={index} className="relative">
                            <Image
                              width={120}
                              height={120}
                              src={URL.createObjectURL(item)}
                              alt=""
                            />
                            <span
                              onClick={() => onRemoveFeatureImg(index)}
                              className="absolute top-0 right-0 cursor-pointer"
                            >
                              <MdCancel className="text-white" size={20} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1 lg:my-[15px]">
                <p className="text-[18px] font-[600] pt-[20px]">
                  Gallery Images
                </p>
                <div className="my-[15px]">
                  <label className="text-[#777777]">Gallery Image</label>
                  <div className="flex gap-5 justify-between my-[15px] flex-col xl:flex-row">
                    <input
                      type="file"
                      id="uploadGalleryPic"
                      className="hidden"
                      // name="featured_image"
                      required
                      multiple
                      onChange={(e) => {
                        const filesArray = Array.from(e.target.files); // Convert FileList to Array
                        setGalleryImage([...galleryImage, ...filesArray]);
                      }}
                    />
                    <div className="flex flex-col gap-2 mt-3">
                      <label
                        htmlFor="uploadGalleryPic"
                        className="min-w-[230px] cursor-pointer h-[180px] rounded-[10px] border-[2px] border-dashed border-blue-100 bg-[#F8F8FF] flex items-center justify-center flex-col"
                      >
                        <FaCamera className="h-[40px] w-[45px] text-[var(--text-color-body)] mb-4" />
                        <p className="font-[500] text-[13px] text-center">
                          Drag & drop files or Browse
                        </p>
                        <p className="text-[11px] text-[var(--text-color-body)] text-center mt-1">
                          Supported formats: JPEG, PNG
                        </p>
                      </label>

                      <div className="flex flex-row gap-3">
                        {galleryImage?.map((item, index) => (
                          <div key={index} className="relative">
                            <Image
                              width={120}
                              height={120}
                              src={URL.createObjectURL(item)}
                              alt=""
                            />
                            <span
                              onClick={() => onRemoveImg(index)}
                              className="absolute top-0 right-0 cursor-pointer"
                            >
                              <MdCancel className="text-white" size={20} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 pb-8">
              <button
                disabled={isPending}
                className="bg-[#FE4242] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-[8px] h-[40px] px-[40px] py-[10px] text-white text-[15px] font-[500] w-[max-content]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
