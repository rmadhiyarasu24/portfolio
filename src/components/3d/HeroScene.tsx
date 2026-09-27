import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Helper to calculate camera distance that keeps the entire orbit perfectly in view
    const computeCameraZ = (w: number, h: number) => {
      const aspect = w / Math.max(h, 1);
      // Bounding radius is ~3.5; with margin ~4.4
      const minHalfExtent = 4.4;
      const vFactor = Math.tan((45 * Math.PI) / 360); // ~0.4142
      const zHeight = minHalfExtent / vFactor;
      const zWidth = minHalfExtent / (vFactor * Math.max(aspect, 0.45));
      return Math.max(zHeight, zWidth) + 1.2;
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, computeCameraZ(width, height));

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // Neural Network Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Central Core AI Orb (Icosahedron wireframe + inner glowing sphere)
    const coreGeometry = new THREE.IcosahedronGeometry(1.95, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    networkGroup.add(coreMesh);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(1.3, 24, 24);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.22
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    networkGroup.add(innerSphere);

    // Outer Torus Rings
    const torusGeo = new THREE.TorusGeometry(2.85, 0.035, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.55
    });
    const torusRing1 = new THREE.Mesh(torusGeo, torusMat);
    torusRing1.rotation.x = Math.PI / 3;
    networkGroup.add(torusRing1);

    const torusRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.45, 0.025, 16, 100), new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45
    }));
    torusRing2.rotation.y = Math.PI / 4;
    networkGroup.add(torusRing2);

    // Neural Network Nodes & Connecting Lines
    const nodeCount = 42;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const nodeColors = [0x06b6d4, 0x38bdf8, 0x818cf8, 0xa855f7];

    for (let i = 0; i < nodeCount; i++) {
      // Distribute on sphere shell with controlled radius variation
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.1 + Math.random() * 1.4;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      const nodeMat = new THREE.MeshBasicMaterial({ color });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      networkGroup.add(node);
      nodeMeshes.push(node);
    }

    // Build interconnected lines between nearby nodes
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxDistance = 2.4;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDistance) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
          // Subtle gradient color between nodes
          lineColors.push(0.02, 0.71, 0.83, 0.45, 0.55, 0.95);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    });
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(networkLines);

    // Subtle background ambient floating particles
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 20;
      particlePos[i + 1] = (Math.random() - 0.5) * 18;
      particlePos[i + 2] = (Math.random() - 0.5) * 18;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x06b6d4, 3.5);
    keyLight.position.set(10, 10, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    rimLight.position.set(-10, -5, -5);
    scene.add(rimLight);

    // Mouse Interaction / Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.8;
      mouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.position.z = computeCameraZ(newWidth, newHeight);
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // WebGL Context Lost recovery
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost in HeroScene');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Animation Loop & Visibility Control
    let animationFrameId: number;
    const startTime = performance.now();
    let isVisible = true;

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        animate();
      }
    });
    intersectionObserver.observe(container);

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      networkGroup.rotation.y = elapsedTime * 0.15 + targetX * 0.5;
      networkGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 - targetY * 0.4;
      networkGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.2;

      torusRing1.rotation.z = elapsedTime * 0.2;
      torusRing2.rotation.z = -elapsedTime * 0.25;

      coreMesh.rotation.y = -elapsedTime * 0.2;
      coreMesh.rotation.z = elapsedTime * 0.1;

      // Pulse nodes slightly
      const pulse = 1 + Math.sin(elapsedTime * 2) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Rotate subtle particles
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      nodeGeo.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      try {
        renderer.forceContextLoss();
      } catch {}
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] xl:h-[500px] flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Graceful CSS Fallback if WebGL is unsupported */}
      {!webglSupported && (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/60 rounded-2xl border border-cyan-500/20">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-400 animate-spin flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/30 blur-sm" />
          </div>
          <p className="text-sm font-medium text-cyan-300">Neural Network Active</p>
          <p className="text-xs text-slate-400 mt-1">Accelerated 2D mode engaged</p>
        </div>
      )}

      {/* Interactive Floating Status Pill */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 text-[11px] text-slate-300">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-mono text-cyan-300">Neural Orbit</span>
        <span className="text-slate-500">·</span>
        <span>Interactive 3D Engine</span>
      </div>
    </div>
  );
};
