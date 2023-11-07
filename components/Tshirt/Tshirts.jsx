/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three"; // Import MeshStandardMaterial from three.js
import { useSelector } from "react-redux";

export function Shirts(props) {
  const selectedColor = useSelector((state) => state.colour);
  const { nodes, materials } = useGLTF("./models/shirt_baked.glb");

  // Create a new material with your desired color
  const shirtColor = new MeshStandardMaterial({ color: selectedColor }); // Replace "red" with your desired color

  // Assign the new material to the shirt's mesh
  materials.lambert1 = shirtColor;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      />
    </group>
  );
}

useGLTF.preload("./models/shirt_baked.glb");
