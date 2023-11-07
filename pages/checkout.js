/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import GooglePayButton from "@google-pay/button-react";
import Script from "next/script";
import toast from "react-hot-toast";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  cardHolder: Yup.string().required("Card holder name is required."),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Please enter a valid card number.")
    .required("Card number is required."),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Please enter a valid expiry date (MM/YY)."
    )
    .required("Expiry date is required."),
  cvc: Yup.string()
    .matches(/^\d{3}$/, "Please enter a valid CVC code.")
    .required("CVC code is required."),
  billingAddress: Yup.string().required("Billing address is required."),
  billingState: Yup.string().notOneOf(["State"], "Please select a state."),
  billingZip: Yup.string()
    .matches(/^\d{5}$/, "Please enter a valid ZIP code.")
    .required("ZIP code is required."),
});
const checkout = () => {
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

        const orderData = response.data;
        setMugs(orderData);
        // Assuming your order data structure in Firebase has an 'orderSummary' key
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderSummary();
  }, []);
  const cart = useSelector((state) => state.carts);
  const filteredCart = Object.entries(cart).reduce((acc, [key, value]) => {
    if (key !== "_persist") {
      acc[key] = value;
    }
    return acc;
  }, {});
  const cartlist = Object.entries(filteredCart);

  console.log("c", cart);
  console.log("ewew", mugs);

  const [orderHistory, setOrderHistory] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handlePayment = (e) => {
    e.preventDefault();
    if (totalWithShipping === "") {
      toast.error("cart is empty");
    } else {
      var options = {
        key: "rzp_test_LcgFMoYJLfDqyy",
        key_secret: "iA9jv5AGHo2ioThJrPRI10II",
        amount: parseInt(totalWithShipping * 100),
        currency: "INR",
        // order_receipt: "order_rcptid_" + name,
        name: "E-code",
        description: "for testing purpose",
        handler: function (response) {
          console.log(response);
          toast.success("Payment Successful");
        },
        prefill: {
          name: "kamesh",
          email: "kkamesh4790@gmail.com",
          contact: "7824040860",
        },
        notes: {
          address: "codewear",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
      console.log(pay);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (
      !formik.values.email ||
      !validationSchema.fields.email.isValid(formik.values.email)
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formik.values.cardHolder) {
      errors.cardHolder = "Card holder name is required.";
    }

    if (
      !formik.values.cardNumber ||
      !validationSchema.fields.cardNumber.isValid(formik.values.cardNumber)
    ) {
      errors.cardNumber = "Please enter a valid card number.";
    }

    if (
      !formik.values.expiryDate ||
      !validationSchema.fields.expiryDate.isValid(formik.values.expiryDate)
    ) {
      errors.expiryDate = "Please enter a valid expiry date (MM/YY).";
    }

    if (
      !formik.values.cvc ||
      !validationSchema.fields.cvc.isValid(formik.values.cvc)
    ) {
      errors.cvc = "Please enter a valid CVC code.";
    }

    if (!formik.values.billingAddress) {
      errors.billingAddress = "Billing address is required.";
    }

    if (!formik.values.billingState || formik.values.billingState === "State") {
      errors.billingState = "Please select a state.";
    }

    if (
      !formik.values.billingZip ||
      !validationSchema.fields.billingZip.isValid(formik.values.billingZip)
    ) {
      errors.billingZip = "Please enter a valid ZIP code.";
    }

    setFormErrors(errors);
    setFormSubmitted(true);

    const order = {
      email: formik.values.email,
      cardHolder: formik.values.cardHolder,
      cardNumber: formik.values.cardNumber,
      expiryDate: formik.values.expiryDate,
      cvc: formik.values.cvc,
      orderSummary: cartlist.map((item) => {
        const productSlug = item[0];
        const productDetails = item[1];
        return {
          name: productDetails.name,
          size: productDetails.size,
          variant: productDetails.variant,
          price: productDetails.price,
          img: productDetails.img,
        };
      }),
      billingAdress: formik.values.billingAddress,
      Zip: formik.values.billingZip,

      shippingMethod: "Fedex Delivery",
    };
    try {
      const response = await fetch(
        "https://codewear-d4a3e-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user.");
      }

      setOrderHistory(order);
      console.log("orders", order);
      console.log("orders", orderHistory);
      formik.resetForm();
    } catch (error) {
      console.log(error);
      setError("Failed to register user.");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      billingAddress: "",
      billingState: "",
      billingZip: "",
    },
    validationSchema,
  });
  const calculateTotalPrice = () => {
    let total = 0;
    for (const item in cart) {
      if (item !== "_persist") {
        const product = cart[item];
        total += parseFloat(product.price) * product.qty; // Assuming price is formatted like "$20.00"
      }
    }
    return total.toFixed(2); // Format total to 2 decimal places
  };

  const total = calculateTotalPrice();
  const shippingRate = 0.1; // 10% shipping rate
  const shipping = (total * shippingRate).toFixed(2);
  const totalWithShipping = (parseFloat(total) + parseFloat(shipping)).toFixed(
    2
  );

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <form onSubmit={handlesubmit}>
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-2xl font-bold text-gray-800">
            Coders
          </a>
          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </a>
                  <Link href="/">
                    <span className="font-semibold text-gray-900">Shop</span>
                  </Link>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#"
                  >
                    2
                  </a>
                  <span className="font-semibold text-gray-900">Shipping</span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    3
                  </a>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cartlist.map((item, index) => {
                const productSlug = item[0];
                const productDetails = item[1];

                return (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-top"
                      src={productDetails.img}
                      alt={productDetails.name}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {productDetails.name}
                      </span>
                      <span className="float-right text-gray-400">
                        {productDetails.size}-{productDetails.variant}
                      </span>
                      <p className="text-lg font-bold">
                        {productDetails.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-lg font-medium">Shipping Methods</p>

            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            {/* <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p> */}
            {/* <div className="">
              <label
                for="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className={`w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                    formSubmitted && formErrors.email ? "border-red-500" : ""
                  }`}
                  placeholder="your.email@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formSubmitted && formErrors.email && (
                  <p className="text-red-500">{formErrors.email}</p>
                )}

                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              <label
                for="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  className={`w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                    formSubmitted && formErrors.cardHolder
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Your full name here"
                  value={formik.values.cardHolder}
                  onChange={formik.handleChange}
                />
                {formSubmitted && formErrors.cardHolder && (
                  <p className="text-red-500">{formErrors.cardHolder}</p>
                )}

                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <label
                for="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Details
              </label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className={`w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                      formSubmitted && formErrors.cardNumber
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    value={formik.values.cardNumber}
                    onChange={formik.handleChange}
                  />
                  {formSubmitted && formErrors.cardNumber && (
                    <p className="text-red-500">{formErrors.cardNumber}</p>
                  )}
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className={`w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                    formSubmitted && formErrors.expiryDate
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="MM/YY"
                  value={formik.values.expiryDate}
                  onChange={formik.handleChange}
                />
                {formSubmitted && formErrors.expiryDate && (
                  <p className="text-red-500">{formErrors.expiryDate}</p>
                )}
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  className={`w-full max-w-[100px] rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                    formSubmitted && formErrors.cvc ? "border-red-500" : ""
                  }`}
                  placeholder="CVC"
                  value={formik.values.cvc}
                  onChange={formik.handleChange}
                />
                {formSubmitted && formErrors.cvc && (
                  <p className="text-red-500">{formErrors.cvc}</p>
                )}
              </div>
              <label
                for="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>

              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                className={`w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                  formSubmitted && formErrors.billingAddress
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Street Address"
                value={formik.values.billingAddress}
                onChange={formik.handleChange}
              />
              {formSubmitted && formErrors.billingAddress && (
                <p className="text-red-500">{formErrors.billingAddress}</p>
              )}
            </div> */}
            {/* <label
              for="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              State
            </label>
            <select
              name="billingState"
              className={`w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ${
                formSubmitted && formErrors.billingState ? "border-red-500" : ""
              }`}
              value={formik.values.billingState}
              onChange={formik.handleChange}
            >
              <option value="State">State</option>
            </select>
            {formSubmitted && formErrors.billingState && (
              <p className="text-red-500">{formErrors.billingState}</p> */}
            {/* )} */}
            {/* <label
              for="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Zip
            </label>
            <input
              type="text"
              id="billingZip"
              name="billingZip"
              className={`flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 ${
                formSubmitted && formErrors.billingZip ? "border-red-500" : ""
              }`}
              placeholder="ZIP"
              value={formik.values.billingZip}
              onChange={formik.handleChange}
            />
            {formSubmitted && formErrors.billingZip && (
              <p className="text-red-500">{formErrors.billingZip}</p>
            )} */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{total}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">{shipping}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalWithShipping}
              </p>
            </div>
            <div className="flex space-x-4">
              <div>
                <button
                  className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                  onClick={handlePayment}
                >
                  Razorpay
                </button>
              </div>
              <p className="mt-6">or</p>
              <div>
                <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                  Pay on Delivery
                </button>
              </div>
            </div>

            <div>
              <GooglePayButton
                environment="TEST"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "100.00",
                    currencyCode: "USD",
                    countryCode: "US",
                  },
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log("load payment data", paymentRequest);
                }}
                onPayment
                Authorized={(paymentData) => {
                  console.log(paymentData);
                  return { transactionState: "SUCCESS" };
                }}
                existing
                Payment
                Method
                Required="false"
                buttonColor="Black"
                buttonType="buy"
              />
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default checkout;
