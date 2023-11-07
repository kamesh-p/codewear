/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import Service from "./service";
import Hero from "./home";
import Features from "../components/Features";
import Testimonal from "./testimonal";
import Statictics from "./statictics";
import About from "./about";

export default function Home() {
  const theme = useSelector((state) => state.theme.mode);
  const backgroundColors = {
    light: "bg-gradient-to-b from-#d9afd9 to-#97d9e1",
    dark: "bg-gray-900",
  };

  return (
    <div className={`${backgroundColors[theme]} text-black dark:text-white`}>
      <main>
        <Head>
          <title>kamesh coding hub</title>
        </Head>
        <Hero />
        <Service />
        <Features />
        <div className="mt-28">
          <About />
        </div>
        <Statictics />
        <Testimonal />

        <Footer />
      </main>
    </div>
  );
}
