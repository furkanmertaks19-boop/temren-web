"use client";
import React, { useRef, useMemo } from "react";
import { useFrame, RootState } from "@react-three/fiber";
import { useScroll, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ProductModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { scene } = useGLTF("/3dvakum.glb");

  useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#d4af37",
      metalness: 1.0,
      roughness: 0.12,
      envMapIntensity: 2.5,
    });

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh?.isMesh) {
        mesh.material = mat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state: RootState) => {
    if (!groupRef.current) return;

    const offset = scroll.offset;

    // Sahne eşikleri
    const S1_END = 0.28;
    const S2_END = 0.72;

    // 2. sahnede: ön yüz + çapraz
    // (sende ön yüz ters çıkmıştı, bu yüzden PI civarı çalışıyor)
    const FRONT_Y_DIAGONAL = Math.PI - Math.PI / 6; // 150°

    // 3. sahnede: "tam düz ön yüz"
    // Eğer bu yine ters gelirse aşağıda 0'a çekersin (notu ekledim)
    const FRONT_Y_FLAT = Math.PI;

    // Varsayılan (1. sahne)
    let targetX = 0;
    let targetY = -1.2;
    let targetScale = 2.0;

    let rotY = Math.PI / 4;
    let rotX = 0.2;
    let rotZ = 0; // ✅ Z kontrol

    // Nefes (3. sahnede kapatacağız)
    let breathe = Math.sin(state.clock.elapsedTime * 1.0) * 0.06;

    if (offset < S1_END) {
      // 1. sahne aynı
      targetX = 1.8;
      targetY = -1.5;
      targetScale = 2.0;

      rotY = Math.PI / 4;
      rotX = 0.2;
      rotZ = 0; // düz kalsın
    } else if (offset < S2_END) {
      // 2. sahne: ortada + çapraz + ön yüz
      targetX = 0;
      targetY = -2.0;
      targetScale = 2.55;

      rotY = FRONT_Y_DIAGONAL;
      rotX = 0.08;
      rotZ = 0; // ✅ 2. sahnede de Z düz
    } else {
      // ✅ 3. sahne: TAM DÜZ + TAM ÖN YÜZ
      targetX = 0;
      targetY = -2.05;     // biraz daha aşağı (merkezde dursun)
      targetScale = 3.15;  // görüntüye göre 3.0-3.4 arası oynarsın

      rotY = FRONT_Y_FLAT; // ✅ ön yüz
      rotX = 0;            // ✅ eğim yok
      rotZ = 0;            // ✅ yatıklık yok

      breathe = 0;         // ✅ nefes kapalı
    }

    // Smooth transitions
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY + breathe,
      0.05
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, rotZ, 0.06);

    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.06);
    groupRef.current.scale.setScalar(s);
  });

  return <primitive object={scene} ref={groupRef} />;
};

useGLTF.preload("/3dvakum.glb");
export default ProductModel;
