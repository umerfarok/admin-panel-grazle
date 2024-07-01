"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { updatePageLoader, updatePageNavigation } from "@/features/features";
import productOne from "@/assets/product-1.png";
import img from "@/assets/product-1.png";
import { useParams } from "next/navigation";
import { axiosPrivate } from "@/axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { Modal, Select } from "antd";
const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const [isPending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("orders"));
  }, [dispatch]);
  const getSingleOrder = async () => {
    const { data } = await axiosPrivate.get(`/admin/orders/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setOrder(data?.order);
  };
  useEffect(() => {
    getSingleOrder();
  }, []);
  async function onUpdateStatus() {
    if (!status) return;
    let formdata = new FormData();
    formdata.append("status", status);
    try {
      setPending(true);
      await axiosPrivate.put(`/admin/orders/${id}/status`, formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      toast.success("Status has been updated");
    } catch (error) {
    } finally {
      hideModal();
      setTimeout(() => {
        setPending(false);
      }, 700);
    }
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setStatus(value);
  };
  console.log("target ==> ", order);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex-1 bg-white rounded-[8px] shadow-sm p-[25px] m-[30px]">
            <div className="flex gap-3 lg:gap-16 md:items-center flex-col md:flex-row">
              <p className="text-[25px] font-[500]">Seller</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 items-center border border-gray-200 rounded-[8px] px-7 lg:px-10 py-7">
                <Image
                  alt=""
                  src={img}
                  className="w-[80px] h-[80px] rounded-full col-span-2 md:col-span-1"
                />
                <div>
                  {order?.product?.user?.profile?.first_name && (
                    <p className="text-[17px]">
                      {order?.product?.user?.profile?.first_name +
                        order?.product?.user?.profile?.last_name}
                    </p>
                  )}
                  <p className="text-[17px]">ID: {order?.product?.user?.id}</p>
                </div>
                <p className="absolute right-20 sm:right-auto sm:relative h-[30px] w-[70px] rounded-[5px] bg-[var(--bg-color-delivered)] text-[14px] text-[var(--text-color-delivered)] font-[500] flex items-center justify-center">
                  {order?.product?.user?.active ? "Active" : "In Active"}
                </p>
              </div>
            </div>
            <div className="pb-[15px] pt-[30px] flex justify-between flex-col sm:flex-row gap-3 border-b border-gray-200 sm:items-center">
              <p className="text-[20px] font-[500]">Order ID #{order?.id}</p>
              <div className="flex justify-end">
                <p className="h-[30px] w-[80px] rounded-[5px] bg-[var(--bg-color-delivered)] text-[14px] text-[var(--text-color-delivered)] font-[500] flex items-center justify-center">
                  {order?.status == "new" && "Pending"}
                  {order?.status == "cancelled" && "Cancelled"}
                  {order?.status == "completed" && "Delivered"}
                </p>
              </div>
            </div>

            <div
              key={order.id}
              className="mt-[20px] sm:mt-[20px] border border-gray-200 rounded-[8px] p-[20px] xl:p-[30px] flex flex-col lg:flex-row gap-5 md:gap-7 xl:gap-10 items-center"
            >
              <div>
                <Image
                  alt=""
                  src={productOne}
                  className="w-[150px] xl:w-[180px]"
                />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row justify-between gap-5">
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-[18px] sm:text-[22px] font-[600]">
                    {order?.product?.title}
                    {(order?.product?.color, order?.product?.size)}
                  </p>
                  {/* <div className="flex flex-col lg:flex-row gap-1 lg:gap-3 lg:items-center">
                    <div className="flex gap-0.5">
                    <Image alt="" src={Star} />
                    <Image alt="" src={Star} />
                    <Image alt="" src={Star} />
                    <Image alt="" src={Star} />
                    <Image alt="" src={Star} />
                  </div>
                  <p className="text-[14px] font-[400] text-[var(--text-color-body)] mt-0.5">
                    5 Review
                  </p> */}
                  {/* <p className="text-[14px] text-[var(--text-color-body)] mt-0.5">
                    <span className="text-black font-[500]">SKU:</span> 2,51,594
                  </p> */}
                  <div className="mt-5">
                    <p className="text-[var(--text-color-body)]">
                      <span className="text-black font-[500]">
                        Shipping Address:
                      </span>
                      {order?.address?.address}
                    </p>
                  </div>
                </div>
                {/* <div className="mt-5">
                  <p className="text-[var(--text-color-body)]">
                    <span className="text-black font-[500]">
                      Shipping Address:
                    </span>
                    {order?.address?.address}
                  </p>
                </div> */}
              </div>
              <div className="flex flex-col gap-1 min-w-[150px]">
                <p className="text-[14px] font-[500] text-[var(--text-color-body)] text-right">
                  {order?.date}
                </p>
                <p className="text-[14px] font-[500] text-[var(--text-color-body)] text-right">
                  <span className="text-black">Track ID:</span>987654
                </p>
                <p className="text-[var(--text-color)] text-[20px] font-[600] text-right mt-5">
                  ₹{order?.product?.price}({order?.quantity} Qty)
                </p>
                {order?.discount ? (
                  <p className="text-right text-[15px]">
                    <span className="line-through text-[var(--text-color-body)] text-[15px]">
                      ₹{order?.product?.discounted_price}
                    </span>
                    &nbsp;&nbsp;
                    <span className="font-[600] text-[#4FAD2E]">
                      {order.discount}% Off
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="pb-[15px] pt-[30px] m-[30px]">
            {/* <p className="text-[23px] font-[500]">Description</p>
            <p className="text-[#777777] text-[17px] mt-3">
              Lorem ipsum dolor sit amet consectetur. Iaculis pretium
              suspendisse id dictum ultricies pretium posuere magna aliquam.
              Massa amet congue duis laoreet id sed hendrerit. Elementum nec
              ligula ac orci tristique morbi velit tempus arcu. Sed tortor vel
              in faucibus augue ipsum quam. Sit sit enim dui ut cras tristique
              vitae eros. Elementum non in aliquam arcu. Tellus quam quam
              laoreet arcu a. Varius a elit eget quam libero felis a scelerisque
              ipsum. Auctor pharetra egestas vel erat in ligula eget. Lorem
              ipsum dolor sit amet consectetur. Iaculis pretium suspendisse id
              dictum ultricies pretium posuere magna aliquam. Massa amet congue
              duis laoreet id sed hendrerit. Elementum nec ligula ac orci
              tristique morbi velit tempus arcu. Sed tortor vel in faucibus
              augue ipsum quam. Sit sit enim dui ut cras tristique vitae eros.
              Elementum non in aliquam arcu. Tellus quam quam laoreet arcu a.
              Varius a elit eget quam libero felis a scelerisque ipsum. Auctor
              pharetra egestas vel erat in ligula eget.
            </p> */}
            <div className="pt-[20px] flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-7">
              <button
                onClick={showModal}
                className="h-[50px] w-[130px] rounded-[8px] bg-[#00A1FF] text-white"
              >
                Edit
              </button>

              <Link href="/orders">
                <button className="h-[50px] w-[130px] rounded-[8px] bg-[#F70000] text-white">
                  Return
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <Modal
        title="Change Order Status"
        open={open}
        onOk={isPending && onUpdateStatus}
        onCancel={hideModal}
        okText="Change Status"
        cancelText="Cancel"
      >
        <div>
          <Select
            defaultValue="Status"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              {
                label: <span>Status</span>,
                title: "Status",
                options: [
                  { label: <span>Active</span>, value: "new" },
                  { label: <span>Shipped</span>, value: "shipped" },
                  { label: <span>Completed</span>, value: "completed" },
                ],
              },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetails;
