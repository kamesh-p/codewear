import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { useSelector } from "react-redux";
export function Hoodiesmodel(props) {
  const { nodes, materials } = useGLTF(
    "./models/uploads_files_3038777_cloth.glb"
  );
  const selectedColor = useSelector((state) => state.colour);
  // Create a new material with your desired color
  const hoodiesMaterial = new MeshStandardMaterial({ color: selectedColor }); // Replace with your desired color

  // Assign the new material to the hoodies' mesh
  materials["Material.003"] = hoodiesMaterial; // Use the correct material name

  return (
    <group {...props} dispose={null}>
      <group position={[43.426, -2.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Body_lp004_Body_lp001_1.geometry}
          material={hoodiesMaterial} // Use the hoodies material here
        />
      </group>
    </group>
  );
}

useGLTF.preload("./models/uploads_files_3038777_cloth.glb");
