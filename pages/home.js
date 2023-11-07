/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FiLogIn } from "react-icons/fi";
import { FaCups } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { PiBaseballCapBold } from "react-icons/io5";

import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const { user, logout } = useAuth();
  console.log("user", user);
  if (user) {
    console.log("kamesh");
  }
  if (!user) {
    console.log("harini");
  }
  const images = [
    "https://c4.wallpaperflare.com/wallpaper/945/873/190/dark-black-shadows-mysterious-wallpaper-preview.jpg",
    "https://c4.wallpaperflare.com/wallpaper/826/178/391/coffee-beans-hot-cup-coffee-bag-wallpaper-preview.jpg",
    "https://c1.wallpaperflare.com/preview/632/667/832/apparel-clothing-fashion-hangers.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ci = currentImageIndex + 1;
  const handleLogout = async () => {
    try {
      await logout();
      console.log("success:");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleImageChange = (index) => {
    // When the image changes, update the currentImageIndex state
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    console.log("c1dq", ci); // Log the current image number (add 1 since index is 0-based)
  }, [ci]);

  return (
    <div>
      <div className="flex mx-16">
        <div className="w-1/4 p-4 bg-gray-100 mr-3 mt-3 px-16">
          <ul className="space-y-2 font-normal">
            <li>
              <Link href="/">
                <p className="flex items-center p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group w-full my-7 mr-1">
                  <FaHome className="mr-3" /> Home
                </p>
              </Link>
            </li>
            <li>
              <Link href="/hoodies">
                <p className="flex items-center p-2 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 group w-full my-7  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="20"
                    viewBox="0 0 100 100"
                    className="mr-3"
                  >
                    <rect x="20" y="20" width="60" height="80" />

                    <path d="M40 20 Q50 0 60 20" />

                    <line
                      x1="45"
                      y1="20"
                      x2="45"
                      y2="30"
                      stroke="#000"
                      stroke-width="2"
                    />
                    <line
                      x1="55"
                      y1="20"
                      x2="55"
                      y2="30"
                      stroke="#000"
                      stroke-width="2"
                    />

                    <rect x="30" y="70" width="40" height="10" />
                  </svg>
                  Hoodies
                </p>
              </Link>
            </li>
            <li>
              <Link href="t-shirts">
                <p className="flex items-center p-2 text-gray-900 hover:bg-gray-100 dark:hover-bg-gray-700 group w-full my-7 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 100 100"
                    className="mr-3"
                  >
                    <rect x="20" y="20" width="60" height="80" />

                    <rect x="40" y="20" width="20" height="10" fill="white" />

                    <path d="M20 20 L20 100 L40 80" fill="black" />
                    <path d="M80 20 L80 100 L60 80" fill="black" />
                  </svg>
                  Tshirts
                </p>
              </Link>
            </li>
            <li>
              <Link href="cups">
                <p className="flex items-center p-2 text-gray-900 hover-bg-gray-100 dark:hover-bg-gray-700 group w-full my-7 ml-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cup"
                    viewBox="0 0 16 16"
                    className="mr-3"
                  >
                    {" "}
                    <path d="M1 2a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v1h.5A1.5 1.5 0 0 1 16 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-.55a2.5 2.5 0 0 1-2.45 2h-8A2.5 2.5 0 0 1 1 12.5V2zm13 10h.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H14v8zM13 2H2v10.5A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V2z" />{" "}
                  </svg>{" "}
                  Cups
                </p>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <p className="flex items-center p-1 text-gray-900 hover-bg-gray-100 dark:hover-bg-gray-700 group w-full my-7">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.1875 10H26.8125L33 21.1806V44H15V21.1806L21.1875 10Z"
                      stroke="#333"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="20"
                      y="4"
                      width="8"
                      height="6"
                      fill="none"
                      stroke="#333"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="21"
                      y="23"
                      width="6"
                      height="12"
                      rx="3"
                      fill="none"
                      stroke="#333"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  Bottles
                </p>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <p className="flex items-center p-2 text-gray-900 hover-bg-gray-100 dark:hover-bg-gray-700 group w-full my-7 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-watch"
                    viewBox="0 0 16 16"
                    className="mr-3"
                  >
                    {" "}
                    <path d="M8.5 5a.5.5 0 0 0-1 0v2.5H6a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V5z" />{" "}
                    <path d="M5.667 16C4.747 16 4 15.254 4 14.333v-1.86A5.985 5.985 0 0 1 2 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86a5.99 5.99 0 0 1 1.918 3.48.502.502 0 0 1 .582.493v1a.5.5 0 0 1-.582.493A5.99 5.99 0 0 1 12 12.473v1.86c0 .92-.746 1.667-1.667 1.667H5.667zM13 8A5 5 0 1 0 3 8a5 5 0 0 0 10 0z" />{" "}
                  </svg>{" "}
                  Watch
                </p>
              </Link>
            </li>
            {user && (
              <li>
                <button
                  className="flex items-center p-2 text-gray-900 hover-bg-gray-100 dark:hover-bg-gray-700 group w-full my-7"
                  onClick={handleLogout}
                >
                  <RiLogoutBoxLine /> Log out
                </button>
              </li>
            )}
            {!user && (
              <li>
                <Link href="/login">
                  <p className="flex items-center p-2 text-gray-900 hover-bg-gray-100 dark:hover-bg-gray-700 group w-full my-7">
                    <FiLogIn className="mr-3" /> Login
                  </p>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            className="w-4/4 h-auto mt-3"
            onChange={handleImageChange} // Add the onChange event handler
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: "460px" }}
                />
              </div>
            ))}
          </Carousel>
          <div className="w-4/4 bg-gray-200 p-4 flex justify-between ">
            <div className="w-1/4 text-center mx-10 ">
              <Link href="/hoodies">
                <p
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    ci === 1 ? "font-semibold underline" : ""
                  }`}
                >
                  Hoodies
                </p>
              </Link>
            </div>
            <div className="w-1/4 text-center">
              <Link href="/cups">
                <p
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover-bg-gray-100 dark:hover-bg-gray-700 group ${
                    ci === 2 ? "font-semibold underline" : ""
                  }`}
                >
                  Cups
                </p>
              </Link>
            </div>
            <div className="w-1/4 text-center">
              <Link href="/t-shirts">
                <p
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover-bg-gray-100 dark:hover-bg-gray-700 group ${
                    ci === 3 ? "font-semibold underline" : ""
                  }`}
                >
                  T-shirt
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
