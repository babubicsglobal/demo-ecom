import React from "react";
import Link from "next/link";

const PageListCards = ({ catData }) => {
  const products = catData[0]?.fields?.product || [];
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {products.map((item, index) => (
          <div
            className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4"
            key={index}
          >
            <article className="overflow-hidden rounded-lg shadow-lg">
              <Link href="#">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src={item.fields.productImage[0].fields.file.url}
                />
              </Link>

              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <a
                    className="no-underline hover:underline text-black"
                    href="#"
                  >
                    {item.fields.productCategory}
                  </a>
                </h1>
              </header>

              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a className="no-underline hover:underline text-black" href="#">
                  See all {item.fields.productCategory} products
                </a>
              </footer>
              <div>{item.fields.commercetoolsProduct}</div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageListCards;
