/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import clientPromise from "../lib/mongodb";
const hoddies = () => {
  const [Hoddies, setHoddies] = useState([]);
  console.log("Hoddies", Hoddies);

  useEffect(() => {
    const fetchAllowedUsers = async () => {
      try {
        const response = await fetch(
          "https://codewear-d4a3e-default-rtdb.firebaseio.com/.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch allowed user data.");
        }
        const data = await response.json();

        const usersArray = Object.keys(data).map((key) => {
          return {
            id: key,
            ...data[key],
          };
        });

        setHoddies(usersArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllowedUsers();
  }, []);
  return (
    <div>
      <section className="text-gray-600 body-font mx-16">
        <Link href="./hoodiesCustom">
          <button className="absolute top-32 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Customized
          </button>
        </Link>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Hoddies.map((product) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={product.id}>
                <Link
                  href={{
                    pathname: "/product/[slug]",
                    query: {
                      name: product.title, // Pass the t-shirt name as a query parameter
                      image: product.imageUrl, // Pass the image URL as a query parameter
                      price: product.price, // Pass the price as a query parameter
                      slug: product.slug, // Pass the price as a query parameter
                    },
                  }}
                  as={`/product/${product.slug}`}
                >
                  <p className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="w-[130px] h-full block"
                      src={product.imageUrl}
                    />
                  </p>
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default hoddies;
