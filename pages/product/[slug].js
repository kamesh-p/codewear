/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { useAuth } from "../../context/AuthContext";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { name, image, price, slug } = router.query;

  // Create an object to store your data
  const dataToStore = {
    name,
    image,
    price,
    slug,
  };

  // Stringify the data
  const stringifiedData = JSON.stringify(dataToStore);

  // Store the stringified data in sessionStorage
  sessionStorage.setItem("myData", stringifiedData);

  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedsize, setSelectedsize] = useState("S");
  const [recommendedSize, setRecommendedSize] = useState("");
  const [userMeasurements, setUserMeasurements] = useState({
    chest: 32, // Initialize with a minimum value
    waist: 25,
    hips: 34,
  });

  const calculateSize = () => {
    const chestMeasurement = userMeasurements.chest;
    const waistMeasurement = userMeasurements.waist;
    const hipMeasurement = userMeasurements.hips;

    const sizeRanges = [
      {
        size: "S",
        chestMin: 32,
        waistMin: 25,
        hipMin: 34,
      },
      {
        size: "M",
        chestMin: 37,
        waistMin: 31,
        hipMin: 39,
      },
      {
        size: "L",
        chestMin: 41,
        waistMin: 35,
        hipMin: 43,
      },
      {
        size: "XL",
        chestMin: 45,
        waistMin: 39,
        hipMin: 47,
      },
    ];

    let closestSize = "Custom";
    let minDifference = Number.MAX_VALUE;
    let alterationSuggestions = "";

    for (const sizeRange of sizeRanges) {
      const chestDiff = Math.max(0, chestMeasurement - sizeRange.chestMin);
      const waistDiff = Math.max(0, waistMeasurement - sizeRange.waistMin);
      const hipDiff = Math.max(0, hipMeasurement - sizeRange.hipMin);

      const totalDifference = chestDiff + waistDiff + hipDiff;

      if (totalDifference < minDifference) {
        closestSize = sizeRange.size;
        minDifference = totalDifference;
        alterationSuggestions = `Alterations required: Reduce chest by ${chestDiff} inches, waist by ${waistDiff} inches, and hips by ${hipDiff} inches for a perfect fit.`;
      }
    }

    return `${closestSize} `;
  };

  const handleMeasurementChange = (e, measurement) => {
    const value = parseInt(e.target.value, 10);
    let updatedMeasurements = { ...userMeasurements };

    if (measurement === "chest" && value < 32) {
      // Prevent chest measurement from going below 32
      updatedMeasurements = {
        ...updatedMeasurements,
        [measurement]: 32,
      };
    } else if (measurement === "waist" && value < 25) {
      // Prevent waist measurement from going below 25
      updatedMeasurements = {
        ...updatedMeasurements,
        [measurement]: 25,
      };
    } else if (measurement === "hips" && value < 34) {
      // Prevent hip measurement from going below 34
      updatedMeasurements = {
        ...updatedMeasurements,
        [measurement]: 34,
      };
    } else {
      updatedMeasurements = {
        ...updatedMeasurements,
        [measurement]: value,
      };
    }

    setUserMeasurements(updatedMeasurements);
  };

  const color = (selectedColor) => {
    setSelectedColor(selectedColor);
  };

  const handlesize = (selectedsize) => {
    setSelectedsize(selectedsize);
  };

  const availability = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinscode = await pins.json();

    if (pinscode.includes(Number(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };

  const checkSize = () => {
    const size = calculateSize();
    setRecommendedSize(size);
  };

  const onChange = (e) => {
    setPin(e.target.value);
  };
  const handleAddToCart = () => {
    // Replace these with the actual item details
    const itemcode = slug;
    const qty = 1;
    const itemPrice = price;

    const itemName = name;
    const selectedSize = selectedsize;
    const selectedcolor = selectedColor;
    const img = image;

    // Dispatch the addToCart action
    dispatch(
      addToCart({
        itemcode,
        qty,
        price: itemPrice,
        name: itemName,
        size: selectedSize,
        variant: selectedcolor,
        img,
        user,
      })
    );
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-10 object-cover object-top rounded"
            src={image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BRAND NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-purple-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-purple-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-purple-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 text-purple-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button
                  onClick={() => color("white")}
                  className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                ></button>
                <button
                  onClick={() => color("gray")}
                  className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"
                ></button>
                <button
                  onClick={() => color("blue")}
                  className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"
                ></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    onChange={(e) => handlesize(e.target.value)}
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10"
                  >
                    <option value="SM">SM</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
                <span className="title-font font-medium text-2xl text-gray-900">
                  {price}
                </span>
              </div>
            </div>
            <div className="flex my-10">
              <div className="mr-6">
                <div className="flex flex-col">
                  <label htmlFor="chest" className="text-gray-600 text-sm mb-1">
                    Chest Measurement (in inches)
                  </label>
                  <input
                    type="number"
                    id="chest"
                    className="w-32 p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    placeholder="e.g., 36"
                    value={userMeasurements.chest}
                    onChange={(e) => handleMeasurementChange(e, "chest")}
                  />
                </div>
              </div>
              <div className="mr-6">
                <div className="flex flex-col">
                  <label htmlFor="waist" className="text-gray-600 text-sm mb-1">
                    Waist Measurement (in inches)
                  </label>
                  <input
                    type="number"
                    id="waist"
                    className="w-32 p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    placeholder="e.g., 30"
                    value={userMeasurements.waist}
                    onChange={(e) => handleMeasurementChange(e, "waist")}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label htmlFor="hips" className="text-gray-600 text-sm mb-1">
                    Hip Measurement (in inches)
                  </label>
                  <input
                    type="number"
                    id="hips"
                    className="w-32 p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    placeholder="e.g., 40"
                    value={userMeasurements.hips}
                    onChange={(e) => handleMeasurementChange(e, "hips")}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <button
                onClick={checkSize}
                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
              >
                Check Size
              </button>

              <button className="flex ml-10 text-white bg-purple-500 border-0 py-2 px-3 focus:outline-none hover:bg-purple-600 rounded">
                <Link href="/checkout">Buy now</Link>
              </button>
              <button
                onClick={handleAddToCart}
                className="flex ml-10 text-white bg-purple-500 border-0 py-2 px-3 focus:outline-none hover:bg-purple-600 rounded"
              >
                Add to cart
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="flex mt-10">
              <input
                onChange={onChange}
                type="text"
                placeholder="Enter Pin Code"
                id="small-input"
                className="block w-100 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <button
                onClick={availability}
                className="flex ml-5 text-white bg-purple-500 border-0 py-2 px-3 focus:outline-none hover:bg-purple-600 rounded"
              >
                Check
              </button>
            </div>
            {recommendedSize && (
              <div className="mt-4">
                <p className="text-gray-900 text-xl">
                  Recommended Size: {recommendedSize}
                </p>
              </div>
            )}
            {service && service !== null && (
              <h2 className="mx-5 mt-2 font-semibold text-green-500">
                This pin code is available
              </h2>
            )}
            {!service && service !== null && (
              <h2 className="mx-5 mt-2 font-semibold text-red-500">
                Sorry, you are out of our services
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
