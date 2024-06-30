"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "antd";

import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";

const LeftSection = ({
  allCategories,
  allBrands,
  onFilterProduct,
  onChangePrice,
  lowerPrice,
  higherPrice,
}) => {
  // const [stepsGap, setStepsGap] = useState(7);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);

  // const [productTypeFilter, setProductTypeFilter] = useState([
  //   { id: 0, label: "Simple", status: false },
  //   { id: 1, label: "Variable", status: false },
  //   { id: 2, label: "Digital", status: false },
  // ]);

  useEffect(() => {
    onFilterProduct({ category: categoryId[0], brand: brandId[0] });
  }, [brandId, categoryId]);
  const fn_checkedFilter = (id, type) => {
    if (type === "category") {
      //   if(categoryId.includes(id)){
      //  const filterCategoryId = categoryId.filter(catId=>catId !==id)
      //  setCategoryId(filterCategoryId)
      //   }else{
      //     setCategoryId([...categoryId,id])
      //   }
      categoryId.includes(id) ? setCategoryId([]) : setCategoryId([id]);
    } else {
      brandId.includes(id) ? setBrandId([]) : setBrandId([id]);
    }
  };

  return (
    <div className="bg-white rounded-[8px] shadow-sm p-[15px] lg:w-[30%]">
      <p className="font-[500]">Filter</p>
      <p className="font-[500] text-[18px] mt-1">Price Range</p>
      <div className="mt-1">
        {lowerPrice && higherPrice && (
          <Slider
            min={lowerPrice}
            max={higherPrice}
            range
            defaultValue={[lowerPrice, higherPrice]}
            onChangeComplete={(priceArray) =>
              onChangePrice(priceArray, {
                category: categoryId[0],
                brand: brandId[0],
              })
            }
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1">
        <div>
          <p className="font-[500] text-[18px] mt-3">Categories</p>
          <div className="mt-1.5 flex flex-col gap-1">
            {allCategories?.map((item, index) => (
              <RadioText
                key={index}
                text={item.name}
                id={item.id}
                status={categoryId.includes(item.id)}
                type={"category"}
                functionOnClick={fn_checkedFilter}
              />
            ))}
          </div>
        </div>
        {/* <div>
          <p className="font-[500] text-[18px] mt-3">Product Type</p>
          <div className="mt-1.5 flex flex-col gap-1">
            {productTypeFilter?.map((item, index) => (
              <RadioText
                key={index}
                text={item.label}
                id={item.id}
                status={item.status}
                type={"productType"}
                functionOnClick={fn_checkedFilter}
              />
            ))}
          </div>
        </div> */}
        <div>
          <p className="font-[500] text-[18px] mt-3">Sort By</p>
          <div className="mt-1.5 flex flex-col gap-1">
            <RadioText
              text="Newest"
              id="new"
              status={brandId.includes("new")}
              type={"sortBy"}
              functionOnClick={fn_checkedFilter}
            />
            <RadioText
              text="Oldest"
              id="old"
              status={brandId.includes("old")}
              type={"sortBy"}
              functionOnClick={fn_checkedFilter}
            />
            {allBrands?.map((item, index) => (
              <RadioText
                key={index}
                text={item.name}
                id={item.id}
                status={brandId.includes(item.id)}
                type={"sortBy"}
                functionOnClick={fn_checkedFilter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;

const RadioText = ({ text, id, status, type, functionOnClick }) => {
  return (
    <label
      key={id}
      className={`flex items-center cursor-pointer ${
        !status ? "text-[var(--text-color-body)]" : "text-[var(--text-color)]"
      }`}
      onClick={() => functionOnClick(id, type)}
    >
      {!status ? <IoMdRadioButtonOff /> : <IoMdRadioButtonOn />}
      &nbsp;
      <span className="text-[15px]">{text}</span>
    </label>
  );
};
