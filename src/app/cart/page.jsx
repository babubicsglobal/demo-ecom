"use client"; // This is a client component
import React, { useMemo } from "react";
import Link from "next/link";
import { getApiRoot, projectKey } from "@/lib/commerceTools";
import { useEffect, useState } from "react";

function CartPage() {
  const [cartDeleteItem, setCartDeleteItem] = useState([]);
  const [cartDeleteKey, setCartDeleteKey] = useState([]);
  const [cartVersionKey, setCartVersionKey] = useState([]);

  const [cartProductValue, setcartProductValue] = useState([]);

  const [cartsingleValue, setcartSingleValue] = useState([]);

  const getCartItemKey = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        .carts()
        //.productTypes()
        //.categories()
        //.customers()
        .get()
        .execute();
      // .get()
      // .execute();

      setCartDeleteItem(project.body);
      setcartProductValue(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  const getCartDeleteKey = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        .carts()
        .withId({ ID: cartDeleteKey })
        //.productTypes()
        //.categories()
        //.customers()
        .delete({
          queryArgs: {
            version: cartVersionKey,
          },
        })
        .execute();
      // .get()
      // .execute();

      setCartDeleteItem(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  const cartDeleteById = useMemo(
    () => cartDeleteItem.results,
    [cartDeleteItem]
  );

  const cartproductById = useMemo(
    () => cartProductValue.results,
    [cartProductValue]
  );

  const getProductDetails = async () => {
    for (let i = 0; i < cartDeleteById?.length; i++) {
      let allProductValue = cartDeleteById[i].id;
      let allVersionValue = cartDeleteById[i].version;
      setCartDeleteKey(allProductValue);
      setCartVersionKey(allVersionValue);
      console.log("allProductValue", allProductValue, allVersionValue);
    }
  };

  const getCartProductDetails = async () => {
    for (let i = 0; i < cartproductById?.length; i++) {
      let singleProductValue = cartproductById[i].lineItems;
      setcartSingleValue(singleProductValue);
      console.log("allProductValue", singleProductValue);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    getCartDeleteKey();
  };
  useEffect(() => {
    getCartItemKey();
  }, []);

  useEffect(() => {
    getProductDetails();
    getCartProductDetails();
  }, [cartDeleteItem, cartProductValue]);

  console.log("cartDeleteItem", cartDeleteItem, cartDeleteById, cartDeleteKey);
  console.log("cartProductValue", cartProductValue);
  console.log("cartsingleValue", cartsingleValue);
  return (
    <div>
      {/* cart page */}

      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartsingleValue.map((item, index) => (
              <div
                key={index}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={item?.variant?.images[0]?.url}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item?.name?.en}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        {" "}
                        -{" "}
                      </span>
                      <span>{item?.quantity}</span>
                      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">
                        ₹&nbsp;
                        {item?.price?.value?.centAmount / 100}
                      </p>
                      {/* <p className="text-sm">
                        ₹&nbsp;
                        {(item?.price?.value?.centAmount / 100) *
                          item?.quantity}
                      </p> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- Sub total --> */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                ₹&nbsp;
                {(cartsingleValue[0]?.price?.value?.centAmount / 100) *
                  cartsingleValue[0]?.quantity}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">
                ₹&nbsp;
                {cartsingleValue[0]?.price?.value?.centAmount /
                  1000 /
                  cartsingleValue[0]?.quantity}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  ₹&nbsp;
                  {(cartsingleValue[0]?.price?.value?.centAmount / 100) *
                    cartsingleValue[0]?.quantity +
                    cartsingleValue[0]?.price?.value?.centAmount /
                      1000 /
                      cartsingleValue[0]?.quantity}
                </p>
                <p className="text-sm text-gray-700">including GST</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
            <button className="mt-6 w-full rounded-md bg-secondrary py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              <Link href="/" onClick={handleClick}>
                Clear Cart
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* cart page end */}
    </div>
  );
}

export default CartPage;
