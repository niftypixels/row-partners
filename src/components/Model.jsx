import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Model({ modelPath }) {
  const modelRef = useRef();
  const { scene } = useGLTF(modelPath);

  // Setup initial rotation and scroll animation when component mounts
  useEffect(() => {
    if (modelRef.current) {
      console.log("Model mounted, setting up initial rotation and reversed spin");

      // Set initial rotation to face forward - rotate 180 degrees on Y axis
      modelRef.current.rotation.y = Math.PI;

      // Create a timeline that rotates the model on scroll in reverse direction
      gsap.to(modelRef.current.rotation, {
        y: -Math.PI, // Start at PI (180°) and go to -PI (-180°) for counterclockwise rotation
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            console.log("Scroll progress:", self.progress.toFixed(2));
          }
        }
      });
    }

    return () => {
      // Kill all ScrollTriggers on cleanup
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      dispose={null}
    />
  );
}

export default Model;