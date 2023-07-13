"use client"; // This is a client component
import React from "react";
import Link from "next/link";
import { getApiRoot, projectKey } from "@/lib/commerceTools";
import { useEffect, useState } from "react";

function CartPage() {
  const [cartDeleteItem, setCartDeleteItem] = useState([]);
  const [cartDeleteKey, setCartDeleteKey] = useState([]);

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
        .delete()
        .execute();
      // .get()
      // .execute();

      setCartDeleteItem(project.body);
    } catch (e) {
      console.log(e);
    }
  };
  const cartDeleteById = cartDeleteItem.results;

  const getProductDetails = async () => {
    for (let i = 0; i < cartDeleteById?.length; i++) {
      let allProductValue = cartDeleteById[i]?.id;
      setCartDeleteKey(allProductValue);
      console.log("allProductValue", allProductValue);
    }
  };

  useEffect(() => {
    getCartItemKey();
    getProductDetails();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    getCartDeleteKey();
  };

  console.log("cartDeleteItem", cartDeleteItem, cartDeleteById, cartDeleteKey);
  return (
    <div>
      <button className="flex ml-auto text-white bg-secondrary border-0 py-2 px-6 rounded">
        <Link href="/" onClick={handleClick}>
          Add to Cart
        </Link>
      </button>
    </div>
  );
}

export default CartPage;
