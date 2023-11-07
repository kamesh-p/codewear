/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Features = () => {
  const [mugs, setMugs] = useState([]);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await axios.get(
          "https://codewear-d4a3e-default-rtdb.firebaseio.com/order.json"
        );

        if (!response.data) {
          throw new Error("No order summary data found.");
        }

        const orderData = Object.values(response.data);

        // Create an object to count how many times each product is ordered
        const orderCount = {};

        orderData.forEach((order) => {
          const productName = order.orderSummary[0].name;

          if (orderCount[productName]) {
            orderCount[productName] += 1;
          } else {
            orderCount[productName] = 1;
          }
        });

        // Sort the products by order count in descending order
        const sortedProducts = Object.keys(orderCount).sort(
          (a, b) => orderCount[b] - orderCount[a]
        );

        // Get the top 5 most ordered products
        const top5Products = sortedProducts.slice(0, 5);

        // Create an array to store the top 5 products and their order counts
        const top5ProductsData = top5Products.map((productName) => {
          const productOrderData = orderData.find(
            (order) => order.orderSummary[0].name === productName
          );
          return {
            productData: productOrderData,
            orderCount: orderCount[productName],
          };
        });

        setMugs(top5ProductsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderSummary();
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font mt-10 mx-10">
        <div className="flex flex-col w-full mb-5 mt-20">
          <h1 className="text-3xl font-thin title-font ml-8 mb-5 text-gray-900">
            Trending Products
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 ml-8  md:grid-cols-5 gap-6 mt-8">
          {mugs.map((productData, index) => (
            <div
              key={index}
              className="relative flex flex-col text-gray-700 bg-white shadow-md w-48 rounded-xl bg-clip-border"
            >
              <Link
                href={{
                  pathname: "/product/[slug]",
                  query: {
                    name: productData.productData.orderSummary[0].name, // Pass the t-shirt name as a query parameter
                    image: productData.productData.orderSummary[0].img, // Pass the image URL as a query parameter
                    price: productData.productData.orderSummary[0].price, // Pass the price as a query parameter
                    slug: productData.productData.orderSummary[0].slug, // Pass the price as a query parameter
                  },
                }}
                as={`/product/${productData.productData.orderSummary[0].slug}`}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white h-48 rounded-xl bg-clip-border">
                  <img
                    src={productData.productData.orderSummary[0].img}
                    alt={productData.productData.orderSummary[0].name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis w-28">
                      {productData.productData.orderSummary[0].name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${productData.productData.orderSummary[0].price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {productData.productData.orderSummary[0].description}
                  </p>
                </div>

                <div className="p-4 pt-0">
                  {/* <button
                  className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={() => addToCart(productData)}
                >
                  Add to Cart
                </button> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
