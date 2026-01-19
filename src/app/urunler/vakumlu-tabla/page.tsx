"use client";
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, PresentationControls, Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

import ProductModel from './components/ProductModel';
import ProductOverlay from './components/ProductOverlay';

export default function VakumluTablaPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 14], fov: 30 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          {/* Koyu Arka Plan */}
          <color attach="background" args={['#050505']} /> 
          
          <Environment preset="city" blur={1} /> 
          <ambientLight intensity={0.5} /> 
          
          {/* Altın model üzerine vuran keskin ışıklar */}
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={5} castShadow color="#fbbf24" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#fbbf24" />
          
          <Suspense fallback={null}>
            <ScrollControls pages={3} damping={0.2}>
              <PresentationControls
                global
                snap={true} 
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 6, Math.PI / 6]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                  <ProductModel />
                </Float>
              </PresentationControls>

              {/* Koyu zeminde hafif parlayan gölge */}
              <ContactShadows 
                position={[0, -3, 0]} 
                opacity={0.4} 
                scale={25} 
                blur={2} 
                far={10} 
                color="#000000"
              />

              <Scroll html>
                <ProductOverlay />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      
      {/* Gren efekti (Karanlıkta derinlik katar) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </main>
  );
}