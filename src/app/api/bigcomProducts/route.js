import { NextResponse } from "next/server";
import BigCommerce from "node-bigcommerce";

export async function GET(request) {
  const bigCommerce = new BigCommerce({
    clientId: "acwwl52milvxpv1uihtbqq9tgdcsm60",
    storeHash: "vsswcwmpjr",
    accessToken: "dgtsnbwbi2gvbewborkhqv8hi7ybxv2",
    responseType: "json",
    headers: { "Accept-Encoding": "*" }, // Override headers (Overriding the default encoding of GZipped is useful in development)
    apiVersion: "v3",
  });

  const products = await bigCommerce.get("/catalog/products?include=images");
  return NextResponse.json(products);
}
