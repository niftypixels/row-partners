import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Model } from '.';

function Scene({ modelPath = '/ROW_Logo_R.glb' }) {
  const canvasRef = useRef();

  useEffect(() => {
    useGLTF.preload(modelPath);
  }, [modelPath]);

  return (
    <Canvas
      ref={canvasRef}
      camera={{
        position: [0, 0, 5],
        fov: 45
      }}
      style={{ background: '#f0f0f0', height: '100vh', width: '100%' }}
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
      />

      <Model
        modelPath={modelPath}
        canvasRef={canvasRef}
      />
    </Canvas>
  );
}

export default Scene;
