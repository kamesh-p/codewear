import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three"; // Import MeshStandardMaterial from three.js
import { useSelector } from "react-redux";
export function CupsModel(props) {
  const { nodes, materials } = useGLTF(
    "./models/uploads_files_2727432_mug.glb"
  );
  const selectedColor = useSelector((state) => state.colour);
  // Create a new material with your desired color
  const mugColor = new MeshStandardMaterial({ color: selectedColor }); // Replace "0xff0000" with the hex color of your choice

  // Assign the new material to the mug's mesh
  materials["Material.001"] = mugColor; // Make sure to use the correct material name

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle.geometry}
        material={mugColor} // Use the new material here
        position={[-0.07, 0, 2.232]}
        scale={0.621}
      />
    </group>
  );
}

useGLTF.preload("./models/uploads_files_2727432_mug.glb");
