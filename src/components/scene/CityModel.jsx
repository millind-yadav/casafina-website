import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MODEL_PATH = '/scene/model_FINAL2.glb';
const TARGET_FOOTPRINT = 104;

function CityModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const { invalidate } = useThree();
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;

    // Reset scene transform completely
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.updateMatrixWorld(true);

    // Get true world bounds
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Scale to target footprint
    const footprint = Math.max(size.x, size.z);
    const scale = footprint > 0 ? TARGET_FOOTPRINT / footprint : 1;

    // Offset scene inside group so center = group origin
    scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    scene.scale.setScalar(scale);
    scene.updateMatrixWorld(true);

    // Materials - don't touch colors, they're baked in the GLB
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.castShadow = true;
        obj.receiveShadow = true;

        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((mat) => {
          if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.envMapIntensity = 0.0;
          mat.needsUpdate = true;
        });
      }
    });

    invalidate();
  }, [scene, invalidate]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default CityModel;