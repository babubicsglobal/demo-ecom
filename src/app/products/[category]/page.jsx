"use client"; // This is a client component
import React from "react";
import PageListCards from "@/components/listingPage/PageListCards";
import { client } from "@/lib/contentful/client";
import { useEffect, useState } from "react";
import { getApiRoot, projectKey } from "@/lib/commerceTools";
import axios from "axios";

const ProductsCategoryPage = ({ params }) => {
  console.log("params", params);

  const [categoryList, setHeroCategoryList] = useState([]);

  const [categoryDetails, setCategoryDetails] = useState({});

  const [productDetails, setProductDetails] = useState({});
  const [ourProductValue, setourProductValue] = useState({});

  const [commerceData, setCommerceData] = useState([]);

  const [cfulData, setCfulData] = useState([]);
  const [cfulFilterData, setCfulFilterData] = useState([]);

  const getBigcomProducts = async () => {
    const result = await axios.get("api/bigcomProducts");
    // console.log("bigcommerce products", result);
    setCommerceData(result.data.data);
  };
  const getCommerceProduct = async () => {
    const response = await client.getEntries({ content_type: "product" });
    // console.log("contentful products", response.items);
    setCfulData(response.items);
  };

  const getUpdatedCategory = () => {
    const newProducts = cfulData?.map((product) => {
      const filteredProduct = commerceData?.find(
        (item) => product?.fields?.bigcommerceProduct === item?.sku
      );
      console.log("map product", filteredProduct);
      product.commerceItem = filteredProduct;
      return product;
    });
    const updatedBigcomProducts = newProducts.filter(
      (item) => item.commerceItem
    );
    setCfulFilterData(updatedBigcomProducts);
  };

  const getCategoryId = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        //.products()
        .categories()
        //.customers()
        .get()
        .execute();
      // .get()
      // .execute();

      setCategoryDetails(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  const getProductId = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        .products()
        //.categories()
        //.customers()
        .get()
        .execute();
      // .get()
      // .execute();

      setProductDetails(project.body);
    } catch (e) {
      console.log(e);
    }
  };
  const getCategory = async () => {
    // const response = await client.getEntries({ content_type: "product" });
    const responseProduct = await client.getEntries({
      content_type: "ourProducts",
    });

    //   const categoryData = response.items;
    const categorySlug = params?.category;
    const filteredProduct = responseProduct?.items[0]?.fields?.product?.filter(
      (item) =>
        categorySlug ? item.fields.commercetoolsProduct === categorySlug : true
    );
    setHeroCategoryList(filteredProduct);

    // console.log("categoryData", categoryData);
    console.log("ourproducts", responseProduct.items);
    setourProductValue(responseProduct.items);
  };

  useEffect(() => {
    getUpdatedCategory();
  }, [cfulData, commerceData]);

  useEffect(() => {
    getCategory();
    getCategoryId();
    getProductId();

    getBigcomProducts();
    getCommerceProduct();
  }, []);

  console.log("ourProductValue", ourProductValue);

  console.log("cfulData", cfulData);
  console.log("commerceData", commerceData);
  console.log("cfulFilterData", cfulFilterData);
  // console.log("productDetails", productDetails.results);
  // console.log("projectDetails", JSON.stringify(projectDetails, undefined, 2));
  return (
    <div>
      <PageListCards
        ourProductList={ourProductValue}
        catData={categoryList}
        categoryLists={categoryDetails}
        allProducts={productDetails}
        bigCommerceData={cfulFilterData}
      ></PageListCards>
    </div>
  );
};

export default ProductsCategoryPage;
