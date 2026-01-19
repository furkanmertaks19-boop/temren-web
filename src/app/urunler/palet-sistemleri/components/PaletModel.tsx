"use client";
import React from 'react';

export default function PaletModel({ slug }: { slug: string }) {
    return (
        <mesh scale={2}>
            <boxGeometry args={[2, 1, 3]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
        </mesh>
    );
}