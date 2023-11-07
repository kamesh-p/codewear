import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectColor } from "../../slices/colourSlices";

const CupConfiguration = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const dispatch = useDispatch();
  const selectedColorSelect = useSelector((state) => state.color);
  const colors = [
    { name: "Red", value: "bg-red-500", hexCode: "#FF0000" },
    { name: "Blue", value: "bg-blue-500", hexCode: "#0000FF" },
    { name: "Green", value: "bg-green-500", hexCode: "#00FF00" },
    { name: "Yellow", value: "bg-yellow-500", hexCode: "#FFFF00" },
    { name: "Purple", value: "bg-purple-500", hexCode: "#800080" },
    { name: "Teal", value: "bg-teal-500", hexCode: "#008080" },
    { name: "Light Gray", value: "bg-gray-200", hexCode: "#D3D3D3" },
    { name: "Light Pink", value: "bg-pink-200", hexCode: "#FFC0CB" },
    { name: "Light Blue", value: "bg-blue-200", hexCode: "#ADD8E6" },
    { name: "Light Green", value: "bg-green-200", hexCode: "#90EE90" },
    { name: "Light Yellow", value: "bg-yellow-200", hexCode: "#FFFFE0" },
    { name: "Light Purple", value: "bg-purple-200", hexCode: "#BA55D3" },
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
    dispatch(selectColor(color.hexCode));
    console.log(`Selected color: ${color.name}`);
  };
  console.log("oooopoo", selectedColorSelect);

  const displayColors = () => {
    const rows = [];
    for (let i = 0; i < colors.length; i += 3) {
      const row = colors.slice(i, i + 3);
      rows.push(row);
    }
    return rows;
  };

  return (
    <div className="flex flex-col items-center justify-center h-40 mt-40 ">
      {displayColors().map((row, rowIndex) => (
        <div className="flex items-center" key={rowIndex}>
          {row.map((color, index) => (
            <div key={index} className="flex items-center m-2">
              <div
                className={`w-8 h-8 rounded-full ${
                  color.value
                } cursor-pointer hover:opacity-80 transition-opacity m-2 ${
                  selectedColor === color ? "glow" : ""
                }`}
                onClick={() => handleColorClick(color)}
              ></div>
              <p className="ml-2">{color.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CupConfiguration;
