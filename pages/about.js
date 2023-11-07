/* eslint-disable no-unused-vars */
import "../components/About.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";

function About() {
  return (
    <div className="about">
      <Canvas
        camera={{
          fov: 64,
          position: [2.3, 1.5, 2.3],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
}

export default About;
