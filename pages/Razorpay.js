import React, { useState } from "react";
// import Head from "next/head";
import Script from "next/script";
const Razorpay = () => {
  const [value, setvalue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      alert("enter a amount");
    } else {
      var options = {
        key: "rzp_test_LcgFMoYJLfDqyy",
        key_secret: "iA9jv5AGHo2ioThJrPRI10II",
        amount: parseInt(value * 100),
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
          contact: "9999999999",
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
  //   const Handlechange = ()=>{

  //   }
  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <h2>payment with razor pay</h2>
      <input
        placeholder="enter the ammount"
        value={value}
        type="number"
        onChange={(e) => {
          setvalue(e.target.value);
        }}
      />
      <br />
      <br />
      <button type="submit" onClick={handleSubmit}>
        Pay
      </button>
    </div>
  );
};

export default Razorpay;
