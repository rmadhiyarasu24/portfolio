import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProjectVisualizer3DProps {
  theme: 'cyber' | 'travel' | 'tailoring' | 'document' | 'medilu';
  interactive?: boolean;
}

export const ProjectVisualizer3D: React.FC<ProjectVisualizer3DProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '120px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

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

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Common ambient + directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 8, 8);
    scene.add(dirLight);

    // Array of cleanup items
    const disposables: { geometry?: THREE.BufferGeometry; material?: THREE.Material }[] = [];

    // Custom geometry & setup per theme
    let updateFn: (time: number) => void = () => {};

    if (theme === 'cyber') {
      // 1. Cybersecurity Anomaly Detection: Cyber grid, network nodes, radar rings, warning pulses
      const gridHelper = new THREE.GridHelper(10, 16, 0x06b6d4, 0x1e293b);
      gridHelper.position.y = -2.2;
      gridHelper.rotation.x = 0.2;
      mainGroup.add(gridHelper);

      // Central Shield/Defense Node
      const coreGeo = new THREE.OctahedronGeometry(1.6, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        wireframe: true,
        emissive: 0x0284c7,
        emissiveIntensity: 0.5
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      mainGroup.add(coreMesh);
      disposables.push({ geometry: coreGeo, material: coreMat });

      // Anomaly Warning Node (Red/Amber warning pulse)
      const warningGeo = new THREE.IcosahedronGeometry(0.5, 0);
      const warningMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const warningNode = new THREE.Mesh(warningGeo, warningMat);
      warningNode.position.set(2.8, 1.2, 0.5);
      mainGroup.add(warningNode);
      disposables.push({ geometry: warningGeo, material: warningMat });

      // Radar scanning ring
      const ringGeo = new THREE.RingGeometry(2.4, 2.45, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      mainGroup.add(ring);
      disposables.push({ geometry: ringGeo, material: ringMat });

      // Telemetry nodes around core
      const nodesGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const nodesMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      disposables.push({ geometry: nodesGeo, material: nodesMat });

      const telemetryNodes: THREE.Mesh[] = [];
      for (let i = 0; i < 14; i++) {
        const node = new THREE.Mesh(nodesGeo, nodesMat);
        const angle = (i / 14) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 3, Math.sin(angle * 2) * 0.8, Math.sin(angle) * 3);
        mainGroup.add(node);
        telemetryNodes.push(node);
      }

      updateFn = (t) => {
        coreMesh.rotation.y = t * 0.4;
        coreMesh.rotation.x = t * 0.2;
        ring.rotation.z = t * 0.8;
        const pulse = 1 + Math.sin(t * 6) * 0.25;
        warningNode.scale.set(pulse, pulse, pulse);
        mainGroup.rotation.y = Math.sin(t * 0.2) * 0.15;
      };

    } else if (theme === 'travel') {
      // 2. Budget Buddy: 3D Holographic Globe / Terrain, Location Pins, Flight/Route Arcs
      const globeGeo = new THREE.IcosahedronGeometry(2.2, 3);
      const globeMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        wireframe: true,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0x059669,
        emissiveIntensity: 0.3
      });
      const globe = new THREE.Mesh(globeGeo, globeMat);
      mainGroup.add(globe);
      disposables.push({ geometry: globeGeo, material: globeMat });

      // Location Pins (Cones)
      const pinGeo = new THREE.ConeGeometry(0.2, 0.6, 8);
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.6 });
      disposables.push({ geometry: pinGeo, material: pinMat });

      const pin1 = new THREE.Mesh(pinGeo, pinMat);
      pin1.position.set(1.4, 1.8, 1.0);
      pin1.rotation.z = -0.4;
      mainGroup.add(pin1);

      const pin2 = new THREE.Mesh(pinGeo, pinMat);
      pin2.position.set(-1.6, 1.2, 1.2);
      pin2.rotation.z = 0.5;
      mainGroup.add(pin2);

      // Connecting Flight/Expense Arc Curve
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(1.4, 1.8, 1.0),
        new THREE.Vector3(0, 3.2, 2.2),
        new THREE.Vector3(-1.6, 1.2, 1.2)
      );
      const points = curve.getPoints(30);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 2 });
      const arc = new THREE.Line(arcGeo, arcMat);
      mainGroup.add(arc);
      disposables.push({ geometry: arcGeo, material: arcMat });

      // Floating currency/budget badges (Torus + diamonds)
      const coinGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 16);
      const coinMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.2 });
      const coin = new THREE.Mesh(coinGeo, coinMat);
      coin.position.set(2.8, -1.2, 0);
      mainGroup.add(coin);
      disposables.push({ geometry: coinGeo, material: coinMat });

      updateFn = (t) => {
        globe.rotation.y = t * 0.3;
        globe.rotation.x = Math.sin(t * 0.2) * 0.1;
        coin.rotation.y = t * 1.5;
        coin.position.y = -1.2 + Math.sin(t * 2) * 0.2;
      };

    } else if (theme === 'tailoring') {
      // 3. Tailoring Service Web Application: Fabric wave mesh, measurement lines, needle/shears geometric curves
      const fabricGeo = new THREE.PlaneGeometry(5, 3.5, 24, 24);
      const fabricMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        wireframe: true,
        side: THREE.DoubleSide,
        roughness: 0.5
      });
      const fabric = new THREE.Mesh(fabricGeo, fabricMat);
      fabric.rotation.x = -0.6;
      mainGroup.add(fabric);
      disposables.push({ geometry: fabricGeo, material: fabricMat });

      // Measurement dashed calibration lines
      const measureGeo = new THREE.BoxGeometry(4.8, 0.05, 0.05);
      const measureMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const measureLine = new THREE.Mesh(measureGeo, measureMat);
      measureLine.position.set(0, 1.8, 0);
      mainGroup.add(measureLine);
      disposables.push({ geometry: measureGeo, material: measureMat });

      // Floating tailor marker pins
      const markerGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const markerMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xe11d48, emissiveIntensity: 0.4 });
      disposables.push({ geometry: markerGeo, material: markerMat });

      for (let i = -2; i <= 2; i += 1) {
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.set(i * 1.1, 1.8, 0.1);
        mainGroup.add(marker);
      }

      const posAttribute = fabricGeo.attributes.position;
      const initialZ = new Float32Array(posAttribute.count);
      for (let i = 0; i < posAttribute.count; i++) {
        initialZ[i] = posAttribute.getZ(i);
      }

      updateFn = (t) => {
        // Wavy fabric oscillation
        for (let i = 0; i < posAttribute.count; i++) {
          const u = posAttribute.getX(i);
          const v = posAttribute.getY(i);
          const z = Math.sin(u * 1.5 + t * 2) * 0.4 + Math.cos(v * 1.8 + t * 2) * 0.3;
          posAttribute.setZ(i, z);
        }
        posAttribute.needsUpdate = true;
        fabric.rotation.y = Math.sin(t * 0.3) * 0.2;
      };

    } else if (theme === 'document') {
      // 4. AI Document Classification: Floating documents, laser OCR scan beam, AI classification output nodes
      const docGeo = new THREE.BoxGeometry(2.4, 3.2, 0.04);
      const docMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.85,
        wireframe: true,
        emissive: 0x0284c7,
        emissiveIntensity: 0.2
      });
      const doc = new THREE.Mesh(docGeo, docMat);
      mainGroup.add(doc);
      disposables.push({ geometry: docGeo, material: docMat });

      // Stack of secondary documents behind
      const docBackGeo = new THREE.BoxGeometry(2.4, 3.2, 0.04);
      const docBackMat = new THREE.MeshBasicMaterial({ color: 0x334155, wireframe: true, transparent: true, opacity: 0.4 });
      const docBack = new THREE.Mesh(docBackGeo, docBackMat);
      docBack.position.set(0.3, -0.3, -0.6);
      mainGroup.add(docBack);
      disposables.push({ geometry: docBackGeo, material: docBackMat });

      // Glowing OCR Scanner Laser Beam
      const laserGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.0, 16);
      const laserMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const laser = new THREE.Mesh(laserGeo, laserMat);
      laser.rotation.z = Math.PI / 2;
      laser.position.z = 0.2;
      mainGroup.add(laser);
      disposables.push({ geometry: laserGeo, material: laserMat });

      // AI Output Classification Nodes (e.g. PDF, DOCX, JPG tags)
      const tagGeo = new THREE.SphereGeometry(0.24, 12, 12);
      const tagMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x9333ea, emissiveIntensity: 0.6 });
      disposables.push({ geometry: tagGeo, material: tagMat });

      const tags: THREE.Mesh[] = [];
      for (let i = 0; i < 4; i++) {
        const tag = new THREE.Mesh(tagGeo, tagMat);
        tag.position.set(2.4, (i - 1.5) * 0.9, 0);
        mainGroup.add(tag);
        tags.push(tag);
      }

      updateFn = (t) => {
        doc.rotation.y = Math.sin(t * 0.5) * 0.25;
        doc.rotation.x = Math.cos(t * 0.4) * 0.15;

        // Laser beam sweeping up and down
        laser.position.y = Math.sin(t * 2.2) * 1.4;
        laser.position.x = doc.position.x;

        tags.forEach((tag, idx) => {
          tag.position.z = Math.sin(t * 2 + idx) * 0.2;
        });
      };

    } else if (theme === 'medilu') {
      // 5. MediLu AI Healthcare: Glowing bio-digital DNA helix / assistant orb, health telemetry wave
      const orbGeo = new THREE.SphereGeometry(1.6, 24, 24);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        wireframe: true,
        emissive: 0x0891b2,
        emissiveIntensity: 0.5
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      mainGroup.add(orb);
      disposables.push({ geometry: orbGeo, material: orbMat });

      // Inner pulsating vital nucleus
      const coreGeo = new THREE.IcosahedronGeometry(0.8, 1);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true });
      const core = new THREE.Mesh(coreGeo, coreMat);
      mainGroup.add(core);
      disposables.push({ geometry: coreGeo, material: coreMat });

      // Orbiting Healthcare Telemetry Ring
      const ringGeo = new THREE.TorusGeometry(2.4, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      mainGroup.add(ring);
      disposables.push({ geometry: ringGeo, material: ringMat });

      // Double Helix / Floating Cross Nodes
      const crossGeo = new THREE.BoxGeometry(0.4, 0.1, 0.1);
      const crossMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      disposables.push({ geometry: crossGeo, material: crossMat });

      const floatingCrosses: THREE.Mesh[] = [];
      for (let i = 0; i < 8; i++) {
        const c = new THREE.Mesh(crossGeo, crossMat);
        const ang = (i / 8) * Math.PI * 2;
        c.position.set(Math.cos(ang) * 2.8, Math.sin(ang) * 2.8, Math.sin(ang * 2) * 0.5);
        mainGroup.add(c);
        floatingCrosses.push(c);
      }

      updateFn = (t) => {
        orb.rotation.y = t * 0.3;
        core.rotation.y = -t * 0.6;
        ring.rotation.z = t * 0.5;

        const heartbeat = 1 + Math.pow(Math.sin(t * 3.5), 6) * 0.25;
        core.scale.set(heartbeat, heartbeat, heartbeat);

        floatingCrosses.forEach((cross, i) => {
          cross.rotation.z = t + i;
        });
      };
    }

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

    let animationId: number;
    const startTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;
      updateFn(elapsedTime);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      disposables.forEach(d => {
        if (d.geometry) d.geometry.dispose();
        if (d.material) d.material.dispose();
      });
      try {
        renderer.forceContextLoss();
      } catch {}
      renderer.dispose();
    };
  }, [isInView, theme]);

  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden rounded-xl bg-slate-950/60 border border-slate-800/80">
      <div ref={containerRef} className="w-full h-full relative">
        {!isInView && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="w-12 h-12 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center animate-pulse">
              <div className="w-6 h-6 rounded-full border border-cyan-400/40" />
            </div>
            <span className="text-[11px] font-mono text-cyan-400/70 mt-3">Interactive 3D Simulation</span>
          </div>
        )}
      </div>
      <div className="absolute top-2.5 right-2.5 pointer-events-none px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 bg-slate-900/80 border border-cyan-500/20 backdrop-blur-sm">
        {isInView ? '3D Simulation Active' : 'Standby'}
      </div>
    </div>
  );
};
