"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "@/components/navbar";
import { updatePageLoader, updatePageNavigation } from "@/features/features";

import SearchOnTop from "@/components/SearchOnTop";
import Sidebar from "@/components/sidebar";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { axiosPrivate } from "@/axios";
import Loading from "@/components/loading";

const Products = () => {
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const productRef = useRef([]);
  const sortedProduct = productRef.current?.sort((a, b) => a.price - b.price);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await axiosPrivate.get("/global/products", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      !allProducts.length && setAllProducts(data?.products); // to show data on web
      productRef.current = data?.products;
    };
    getAllProducts();
  }, []);
  useEffect(() => {
    const getAllCategories = async () => {
      const { data } = await axiosPrivate.get("/categories", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      !allCategories.length && setAllCategories(data?.categories); // to show data on web
      // sellerRef.current=[data?.user] //to made a whole copy of data and can filter it
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
      // sellerRef.current=[data?.user] //to made a whole copy of data and can filter it
    };
    getAllBrands();
  }, []);
  useEffect(() => {
    dispatch(updatePageLoader(false));
    dispatch(updatePageNavigation("products"));
  }, [dispatch]);

  function filterProductByDate(category, categoryId, brand, created_at) {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    const IsoDate = today.toISOString();
    if (category && brand) {
      return brand === "new"
        ? categoryId === category &&
            created_at <= IsoDate &&
            created_at >= new Date().toISOString()
        : categoryId === category && created_at < new Date().toISOString();
    } else if (brand) {
      return brand === "new"
        ? created_at <= IsoDate && created_at >= new Date().toISOString()
        : created_at < new Date().toISOString();
    }
  }
  function onFilterProduct({ category, brand }) {
    let allProducts = productRef.current || [];
    let filteredProduct = [];
    filteredProduct = allProducts.filter((item) => {
      // const categoryId = item?.category?.id;
      const categoryId = item?.category_id;
      // const brandId = item?.brand?.id;
      const brandId = item?.brand_id;
      const created_at = item?.created_at;

      if (!category && !brand) {
        return allProducts;
      } else if (category && brand) {
        return typeof brand === "string"
          ? filterProductByDate(category, categoryId, brand, created_at)
          : categoryId === category && brandId === brand;
      } else if (category || brand) {
        return category
          ? categoryId === category
          : typeof brand === "string"
          ? filterProductByDate(null, null, brand, created_at)
          : brandId === brand;
      }
    });

    setAllProducts(filteredProduct);
  }
  function onChangePrice(priceArray, { category, brand }) {
    let allProducts = productRef.current || [];
    const [lowPrice, highPrice] = priceArray;

    const filteredProduct = allProducts.filter((item) => {
      const price = item.price;
      // const categoryId = item?.category?.id;
      const categoryId = item?.category_id;
      const brandId = item?.brand_id;
      const created_at = item?.created_at;
      const priceLogic = price >= lowPrice && price <= highPrice;
      if (category && brand) {
        return typeof brand === "string"
          ? priceLogic &&
              filterProductByDate(category, categoryId, brand, created_at)
          : priceLogic && categoryId === category && brandId === brand;
      } else if (category || brand) {
        return category
          ? priceLogic && categoryId === category
          : typeof brand === "string"
          ? priceLogic && filterProductByDate(null, null, brand, created_at)
          : priceLogic && brandId === brand;
      } else {
        return priceLogic;
      }
    });
    setAllProducts(filteredProduct);
  }
  // function onChangePrice(priceArray, { category, brand }) {
  //   let allProducts = productRef.current || [];

  //   const [lowPrice, highPrice] = priceArray;

  //   // const filteredProduct = !priceArray.length
  //   //   ? allProducts
  //   //   : allProducts.filter(
  //   //       (item) => item.price >= lowPrice && item.price <= highPrice
  //   //     );
  //   const filteredProduct = allProducts.filter((item) => {
  //     const price = item.price;
  //     const categoryId = item?.category?.id;
  //     const brandId = item?.brand?.id;
  //     if (category && brand) {
  //       // return typeof brand==="string" ? filterProductByDate():
  //       return (
  //         price >= lowPrice &&
  //         price <= highPrice &&
  //         categoryId === category &&
  //         brandId === brand
  //       );
  //     } else if (category) {
  //       return (
  //         price >= lowPrice &&
  //         price <= highPrice &&
  //         categoryId === category &&
  //         brandId === brand
  //       );
  //     } else if (brand) {
  //     } else {
  //       return item.price >= lowPrice && item.price <= highPrice;
  //     }
  //   });
  //   setAllProducts(filteredProduct);
  // }
  // function onFilterProduct({ category, brand }) {
  //   let allProducts = productRef.current || [];
  //   let filteredProduct = [];
  //   const today = new Date();
  //   today.setMonth(today.getMonth() + 1);
  //   const IsoDate = today.toISOString();

  //   filteredProduct = allProducts.filter((item) => {
  //     const categoryId = item?.category?.id;
  //     const brandId = item?.brand?.id;
  //     const created_at = item?.created_at;
  //     if (!category && !brand) {
  //       return allProducts;
  //     } else if (category && brand) {
  //       if (brand === "new") {
  //         return (
  //           categoryId === category &&
  //           created_at <= IsoDate &&
  //           created_at >= new Date().toISOString()
  //         );
  //       } else if (brand === "old") {
  //         return (
  //           categoryId === category && created_at < new Date().toISOString()
  //         );
  //       } else {
  //         return categoryId === category && brandId === brand;
  //       }
  //     } else if (category) {
  //       return categoryId === category;
  //     } else if (brand) {
  //       if (brand === "new") {
  //         return (
  //           created_at <= IsoDate && created_at >= new Date().toISOString()
  //         );
  //       } else if (brand === "old") {
  //         return created_at < new Date().toISOString();
  //       } else {
  //         return brandId === brand;
  //       }
  //     }
  //   });
  //   setAllProducts(filteredProduct);
  // }
  return (
    <>
    <Loading />
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 mt-[30px] px-[22px]">
          <SearchOnTop title="New Product" url="/products/add" />
          <div className="flex flex-col lg:flex-row gap-[20px] mt-[20px]">
            <LeftSection
              allCategories={allCategories}
              allBrands={allBrands}
              onFilterProduct={(categoryId) => onFilterProduct(categoryId)}
              onChangePrice={onChangePrice}
              lowerPrice={Math.floor(sortedProduct[0]?.price)}
              higherPrice={Math.floor(
                sortedProduct[sortedProduct.length - 1]?.price
              )}
            />
            <RightSection
              allProducts={allProducts}
              allCategories={allCategories}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Products;
