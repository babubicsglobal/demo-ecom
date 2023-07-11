"use client"; // This is a client component
import React, { useMemo } from "react";
import { getApiRoot, projectKey } from "@/lib/commerceTools";
import { useEffect, useState } from "react";

function ProductDetailpage({ params }) {
  console.log("params", params);

  const [productItem, setProductItem] = useState([]);
  const [productList, setproductList] = useState([]);

  const getProductKey = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        .products()
        //.productTypes()
        //.categories()
        //.customers()
        .get()
        .execute();
      // .get()
      // .execute();

      setProductItem(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  const getMasterId = useMemo(() => productItem.results, [productItem]);

  console.log("getMasterId", getMasterId);

  const getProductBySku = async () => {
    const productSlug = params?.item;
    console.log("productSlug", productSlug);

    const filteredProduct = getMasterId?.filter((item) =>
      productSlug ? item?.masterData?.current?.name?.en === productSlug : true
    );
    setproductList(filteredProduct);

    return filteredProduct;
  };
  useEffect(() => {
    getProductBySku();
  }, [getMasterId]);

  useEffect(() => {
    getProductKey();
  }, []);

  console.log("product item", productItem);
  console.log("productList", productList?.length && productList[0]);
  //   console.log("productList", productList[0]);
  //   const findProductID = productList[0];
  //   console.log("findProductID", findProductID);

  const GetProductDetail = productList?.length && productList[0];
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={
              GetProductDetail?.masterData?.current?.masterVariant.images[0].url
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {GetProductDetail?.masterData?.current?.masterVariant?.sku}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {GetProductDetail?.masterData?.current?.name?.en}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              {GetProductDetail?.masterData?.current?.name?.en}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                <div className="price-counter">
                  <span>
                    <span className="a-price-symbol">₹&nbsp;</span>
                    <span className="text-5xl">
                      {GetProductDetail?.masterData?.staged?.variants[0]
                        ?.prices[0]?.discounted?.value?.centAmount / 100}
                    </span>
                    <span>
                      <span className="a-price-symbol">
                        &nbsp;&nbsp;M.R.P&nbsp;
                      </span>

                      <span className="line-through">
                        {GetProductDetail?.masterData?.staged?.variants[0]
                          ?.prices[0]?.value?.centAmount / 100}
                      </span>
                    </span>
                  </span>
                </div>
              </span>
              <button className="flex ml-auto text-white bg-secondrary border-0 py-2 px-6 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailpage;
