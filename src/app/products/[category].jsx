"use client"; // This is a client component
import React from "react";
import PageListCards from "@/components/listingPage/PageListCards";
import { client } from "@/lib/contentful/client";
import { useEffect, useState } from "react";

const ProductsCategoryPage = () => {
  const [categoryList, setHeroCategoryList] = useState([]);

  const getCategory = async () => {
    const response = await client.getEntries({ content_type: "product" });
    const responseProduct = await client.getEntries({
      content_type: "ourProducts",
    });

    const categoryData = response.items;
    setHeroCategoryList(responseProduct.items);

    console.log("categoryData", categoryData);
    console.log("ourproducts", responseProduct.items);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <PageListCards
        catData={categoryList}
        category={categoryList}
      ></PageListCards>
    </div>
  );
};

export default ProductsCategoryPage;
