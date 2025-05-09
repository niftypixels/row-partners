// src/components/Scene.jsx
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { Model } from '.';

function Scene({ modelPath = 'ROW_Logo_R.glb' }) {
  useEffect(() => {
    // Preload the model
    useGLTF.preload(modelPath);

    // Make sure we have enough height to scroll
    document.body.style.height = "200vh";

    console.log("Scene mounted, body height set to 200vh for scrolling");
  }, [modelPath]);

  return (
    <div style={{ height: "100vh", position: "sticky", top: 0 }}>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%'
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
        />
        <pointLight position={[-10, -10, -10]} />

        <Environment preset='city' />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enabled={false}
        />

        <Model modelPath={modelPath} />
      </Canvas>
    </div>
  );
}

export default Scene;