import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Section = (props) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 ${
        props.right ? "items-end" : "items-start"
      }`}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-lg px-8 py-12  border-black border-2 ">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Overlay = () => {
  const scroll = useScroll();
  const [opacityHoodiesSection, setOpacityHoodiesSection] = useState(1);
  const [opacityCupsSection, setOpacityCupsSection] = useState(1);
  const [opacityTShirtsSection, setOpacityTShirtsSection] = useState(1);

  useFrame(() => {
    setOpacityHoodiesSection(1 - scroll.range(0, 1 / 3));
    setOpacityCupsSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityTShirtsSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <div class="w-screen">
        <Section opacity={opacityHoodiesSection}>
          <h1 className="font-semibold font-serif text-2xl">
            Hoodies Collection
          </h1>
          <p>
            Discover our cozy and stylish hoodies designed for coders and tech
            enthusiasts.
          </p>
          <p className="mt-3">Why Choose Our Hoodies:</p>
          <ul className="leading-9">
            <li>👕 High-quality materials for maximum comfort</li>
            <li>🚀 Unique coding-themed designs</li>
            <li>📞 Excellent customer support</li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
        </Section>
        <Section right opacity={opacityCupsSection}>
          <h1 className="font-semibold font-serif text-2xl">Coding Mugs</h1>
          <p>
            Sip your favorite beverage from our coding-themed cups. Perfect for
            your daily coding sessions.
          </p>
          <p className="mt-3">Why Choose Our Cups:</p>
          <ul className="leading-9">
            <li>☕ High-quality ceramic mugs</li>
            <li>🚀 Unique coding-related designs</li>
            <li>📞 Excellent customer support</li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
        </Section>
        <Section opacity={opacityTShirtsSection}>
          <h1 className="font-semibold font-serif text-2xl">
            T-Shirts Collection
          </h1>
          <p>
            Express your love for coding with our comfortable and stylish
            t-shirts.
          </p>
          <p className="mt-3">Why Choose Our T-Shirts:</p>
          <ul className="leading-9">
            <li>👕 Premium quality cotton t-shirts</li>
            <li>🚀 Trendy coding-themed prints</li>
            <li>📞 Excellent customer support</li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
        </Section>
      </div>
    </Scroll>
  );
};
