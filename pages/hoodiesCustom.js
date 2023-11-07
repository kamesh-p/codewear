/* eslint-disable no-unused-vars */
// import "./App.css";
import { Canvas } from "@react-three/fiber";
import Stages from "../components/Tshirt/Stage";

import ColorConfiguration from "../components/Tshirt/Configurator";
import { useState } from "react";
import CupStages from "../components/Cups/CupStage";
import HoodiesStages from "../components/Hoodies/HoddiesStage";
function CupCustom() {
  //   const [selectedsize, setSelectedsize] = useState("S");
  //   const handlesize = (selectedsize) => {
  //     setSelectedsize(selectedsize);
  //   };
  return (
    <div className="flex">
      <div className="mt-11">
        <Canvas style={{ width: "770px", height: "400px" }}>
          <HoodiesStages />
        </Canvas>
      </div>

      <div className=" bg-pink-50">
        <ColorConfiguration />

        {/* <select
          onChange={(e) => handlesize(e.target.value)}
          className="rounded border absolute bottom-20 appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10"
        >
          <option value="SM">SM</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select> */}
      </div>
    </div>
  );
}

export default CupCustom;
