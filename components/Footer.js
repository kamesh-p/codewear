/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

const Footer = () => {
  return (
    <footer className="text-blue-100 bg-blue-50 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg> */}
            <span className="ml-3 text-xl">CodeWear</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Your source for coding-inspired fashion.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              SHOP
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a
                  className="text-gray-600 hover:text-gray-800"
                  href="/hoodies"
                >
                  Hoodies
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800" href="/mugs">
                  Mugs
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 hover:text-gray-800"
                  href="/t-shirts"
                >
                  T-Shirts
                </a>
              </li>
            </nav>
          </div>
          {/* Add similar sections for other categories */}
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              ABOUT US
            </h2>
            <p className="text-gray-600 w-40">
              CodeWear is your one-stop shop for high-quality coding-inspired
              clothing and accessories.
            </p>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CONTACT US
            </h2>
            <p className="text-gray-600">
              If you have any questions or need assistance, feel free to reach
              out to our customer support team. We're here to help!
            </p>
            <div className="mt-3">
              <a
                href="mailto:info@codewear.com"
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-2">info@codewear.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        {/* Add a newsletter subscription form here */}
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} CodeWear —
            <a
              href="https://twitter.com/codewear"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @codewear
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {/* Add links to your privacy policy and terms of service pages */}
            <a className="text-gray-500" href="/privacy-policy">
              Privacy Policy
            </a>
            <a className="ml-3 text-gray-500" href="/terms-of-service">
              Terms of Service
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
