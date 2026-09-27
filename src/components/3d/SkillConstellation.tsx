import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../../data/portfolio';

interface SkillNode {
  name: string;
  category: string;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
}

interface SkillConstellationProps {
  activeCategory: string | null;
  onSelectSkill?: (skillName: string) => void;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({ activeCategory, onSelectSkill }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; category: string; x: number; y: number } | null>(null);

  const activeCategoryRef = useRef(activeCategory);
  activeCategoryRef.current = activeCategory;

  const onSelectSkillRef = useRef(onSelectSkill);
  onSelectSkillRef.current = onSelectSkill;

  // Flatten skills with their category
  const allSkills = React.useMemo(() => {
    const list: { name: string; category: string }[] = [];
    PORTFOLIO_DATA.skillCategories.forEach(cat => {
      cat.skills.forEach(skill => {
        list.push({ name: skill, category: cat.category });
      });
    });
    return list;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // Color mapper for categories
    const categoryColors: Record<string, number> = {
      "Programming": 0x38bdf8,
      "Web & Frontend": 0x34d399,
      "AI & Machine Learning": 0xa855f7,
      "Core Concepts": 0xf59e0b,
      "Tools & Platforms": 0xec4899
    };

    // Distribute nodes evenly on spherical coordinates using Fibonacci sphere algorithm
    const nodes: SkillNode[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const sphereRadius = 7.2;

    allSkills.forEach((item, index) => {
      const y = 1 - (index / (allSkills.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * index;

      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;
      const yCoord = y * sphereRadius;

      const position = new THREE.Vector3(x, yCoord, z);

      const colorHex = categoryColors[item.category] || 0x06b6d4;
      const geometry = new THREE.SphereGeometry(0.38, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.2,
        metalness: 0.8,
        emissive: colorHex,
        emissiveIntensity: 0.3
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.userData = { skill: item.name, category: item.category };

      constellationGroup.add(mesh);
      nodeMeshes.push(mesh);
      nodes.push({ name: item.name, category: item.category, position, mesh });
    });

    // Outer faint constellation boundary rings
    const ringGeo = new THREE.RingGeometry(8.2, 8.23, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.15 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    constellationGroup.add(ring1);

    // Build lines between related skills in same category or nearby nodes
    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const sameCategory = nodes[i].category === nodes[j].category;
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if ((sameCategory && dist < 7) || dist < 4.2) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(constellationLines);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // Raycaster for hover/click interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.004 };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        rotationVelocity.y = deltaX * 0.005;
        rotationVelocity.x = deltaY * 0.005;
        constellationGroup.rotation.y += deltaX * 0.008;
        constellationGroup.rotation.x += deltaY * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const skillName = clickedMesh.userData.skill;
        if (onSelectSkillRef.current) onSelectSkillRef.current(skillName);
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

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
    let hoveredMesh: THREE.Mesh | null = null;
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
      animationId = requestAnimationFrame(animate);

      // Auto rotation + inertial drag
      if (!isDragging) {
        constellationGroup.rotation.y += rotationVelocity.y;
        constellationGroup.rotation.x += rotationVelocity.x;
        // Dampen manual drag velocity back to default slow spin
        rotationVelocity.x *= 0.95;
        rotationVelocity.y = rotationVelocity.y * 0.95 + 0.003 * 0.05;
      }

      // Check raycast hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const firstHit = intersects[0].object as THREE.Mesh;
        if (hoveredMesh !== firstHit) {
          // Reset previous
          if (hoveredMesh) {
            hoveredMesh.scale.set(1, 1, 1);
            const mat = hoveredMesh.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = 0.3;
          }
          hoveredMesh = firstHit;
          hoveredMesh.scale.set(1.5, 1.5, 1.5);
          const mat = hoveredMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 1.0;

          // Convert 3D position to 2D container coordinate for HUD tag
          const vector = new THREE.Vector3();
          hoveredMesh.getWorldPosition(vector);
          vector.project(camera);

          const halfWidth = width / 2;
          const halfHeight = height / 2;
          const screenX = vector.x * halfWidth + halfWidth;
          const screenY = -(vector.y * halfHeight) + halfHeight;

          setHoveredSkill({
            name: hoveredMesh.userData.skill,
            category: hoveredMesh.userData.category,
            x: screenX,
            y: screenY
          });
        }
      } else {
        if (hoveredMesh) {
          hoveredMesh.scale.set(1, 1, 1);
          const mat = hoveredMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.3;
          hoveredMesh = null;
          setHoveredSkill(null);
        }
      }

      // Highlight active category filter nodes if selected
      const currentCategory = activeCategoryRef.current;
      nodeMeshes.forEach(mesh => {
        if (currentCategory) {
          const isCategoryMatch = mesh.userData.category === currentCategory;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.opacity = isCategoryMatch ? 1 : 0.25;
          mat.transparent = !isCategoryMatch;
        } else {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.opacity = 1;
          mat.transparent = false;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nodeMeshes.forEach(m => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      try {
        renderer.forceContextLoss();
      } catch {}
      renderer.dispose();
    };
  }, [allSkills]);

  return (
    <div className="relative w-full h-[420px] md:h-[520px] select-none">
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Drag to rotate constellation. Hover to inspect skills."
      />

      {/* Floating 3D Hover Tag HUD */}
      {hoveredSkill && (
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-cyan-500/40 shadow-xl backdrop-blur-md transition-all duration-75 flex flex-col items-center"
          style={{ left: `${hoveredSkill.x}px`, top: `${hoveredSkill.y}px` }}
        >
          <span className="text-xs font-semibold text-white font-display tracking-wide">{hoveredSkill.name}</span>
          <span className="text-[10px] text-cyan-400 font-mono">{hoveredSkill.category}</span>
          <div className="w-1.5 h-1.5 bg-cyan-400 rotate-45 transform translate-y-1" />
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 pointer-events-none text-center">
        <span className="text-[11px] font-mono text-slate-400 bg-slate-950/70 border border-slate-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
          Interactive Constellation · Drag to Rotate · Click Node to Focus
        </span>
      </div>
    </div>
  );
};
