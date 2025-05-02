import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { initScrollAnimation } from '../utils';

function Model({ modelPath, canvasRef }) {
  const modelRef = useRef();
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(0, 0, 0);
      modelRef.current.scale.set(1, 1, 1);

      const cleanup = initScrollAnimation({ modelRef, canvasRef });

      return cleanup;
    }
  }, [canvasRef]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      dispose={null}
    />
  );
}

export default Model;