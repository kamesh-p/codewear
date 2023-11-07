import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../src/app/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { Provider } from "react-redux";
import { store, persistor } from "../store"; // Make sure you import your Redux store
import Header from "../components/Header";

import { PersistGate } from "redux-persist/integration/react";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  // Update local storage whenever the cart changes.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Check if the current route is a product page (dynamic route) and exclude it from protected routes.
  const isProductPage = router.pathname.startsWith("/product/");

  // Define the list of routes that don't require authentication.
  const noauthreq = [
    "/",
    "/login",
    "/signup",
    "/cups",
    "/hoodies",
    "t-shirts",
    "/phone",
    "/forget",
  ];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <AuthContextProvider>
          {noauthreq.includes(router.pathname) || isProductPage ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoutes>
              <Component {...pageProps} />
            </ProtectedRoutes>
          )}
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
