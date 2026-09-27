import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TechCube3DProps {
  variant?: 'neural-core' | 'code-polyhedron';
}

export const TechCube3D: React.FC<TechCube3DProps> = ({ variant = 'neural-core' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Viewport observation: Only create WebGL context when near or in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x06b6d4, 2, 20);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xa855f7, 2, 20);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    let outerMesh: THREE.Mesh;
    let innerMesh: THREE.Mesh;

    if (variant === 'neural-core') {
      const outerGeo = new THREE.IcosahedronGeometry(1.8, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4
      });
      outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.DodecahedronGeometry(1.0, 0);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        wireframe: true,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.5
      });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);
    } else {
      const outerGeo = new THREE.OctahedronGeometry(1.8, 0);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x059669,
        emissiveIntensity: 0.4
      });
      outerMesh = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerMesh);

      const innerGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        emissive: 0x0284c7,
        emissiveIntensity: 0.3
      });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);
    }

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener('mousemove', onMouseMove);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      outerMesh.rotation.x = t * 0.4 + mouseY * 0.5;
      outerMesh.rotation.y = t * 0.5 + mouseX * 0.5;

      innerMesh.rotation.x = -t * 0.6;
      innerMesh.rotation.y = -t * 0.7;

      group.position.y = Math.sin(t * 1.5) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerMesh.geometry.dispose();
      (outerMesh.material as THREE.Material).dispose();
      innerMesh.geometry.dispose();
      (innerMesh.material as THREE.Material).dispose();
      try {
        renderer.forceContextLoss();
      } catch {}
      renderer.dispose();
    };
  }, [isInView, variant]);

  return (
    <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-pointer relative">
        {!isInView && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full border border-cyan-500/20 bg-cyan-500/5 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-cyan-400/40" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
