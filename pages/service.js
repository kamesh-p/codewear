import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Service = () => {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="text-gray-600 body-font flex mt-14 mb-10 ">
      <div className="p-2 md:w-1/5 mr-10">
        <div className="flex rounded-lg h-40 w-60 ml-12 flex-col">
          <Slider {...carouselSettings}>
            <div>
              <img
                src="https://imgv3.fotor.com/images/side/Advertising-poster.png"
                alt="Ad 1"
                className="h-40 w-56 ml-4 px-1"
              />
            </div>
            <div>
              <img
                src="https://imgv3.fotor.com/images/side/Advertising-poster.png"
                alt="Ad 2"
                className="h-40 w-56 ml-4"
              />
            </div>
            <div>
              <img
                src="https://imgv3.fotor.com/images/side/Advertising-poster.png"
                alt="Ad 2"
                className="h-40 w-56 ml-4"
              />
            </div>
            {/* Add more ad images here */}
          </Slider>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex flex-col w-full mx-4 mb-5 ">
          <h1 className="text-2xl font-light title-font   text-gray-900 ">
            Explore Our Features
          </h1>
        </div>
        <div className="flex flex-wrap ml-2 ">
          <div className="p-2 md:w-1/3">
            <div className="flex rounded-lg h-full p-4  w-72 flex-col bg-orange-50">
              <h2 className="text-gray-900 text-base title-font font-medium">
                Fast Delivery
              </h2>
              <p className="leading-relaxed text-sm">
                Get your products delivered quickly.
              </p>
            </div>
          </div>

          {/* Feature Container 2 */}
          <div className="p-2 md:w-1/3">
            <div className="flex rounded-lg h-full p-4 w-72 flex-col bg-orange-50">
              {/* Feature 2 content */}
              <h2 className="text-gray-900 text-base  title-font font-medium">
                Quality Merchandise
              </h2>
              <p className="leading-relaxed text-sm">
                Find high-quality products in our store.
              </p>
            </div>
          </div>

          <div className="py-1 pl-2  md:w-1/3 ">
            <div className="flex rounded-lg h-full p-4 w-72 flex-col bg-gray-100 ">
              <h2 className="text-gray-900 text-base title-font font-medium">
                Secure Shopping
              </h2>
              <p className="leading-relaxed text-sm">
                Shop securely with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
