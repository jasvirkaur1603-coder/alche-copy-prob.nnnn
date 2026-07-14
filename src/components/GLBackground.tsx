import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GLBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 28;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0052ff, 2.5, 60);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7e22ce, 2.5, 60);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    // Particles Geometry
    const count = 100;
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 45;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Texture (glow circle)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(0, 82, 255, 0.8)');
      grad.addColorStop(0.6, 'rgba(126, 34, 206, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.0,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0052ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Interactive Mouse
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Scroll Trigger for Camera & Space Morphing
    const scrollAnimation = gsap.to(camera.position, {
      z: 14,
      y: -10,
      x: -6,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    const rotationAnimation = gsap.to(scene.rotation, {
      y: Math.PI * 0.65,
      x: Math.PI * 0.15,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    });

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Mouse smoothing
      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      // Particle Position updates
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      let lineIndex = 0;
      const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;

      if (positionAttr) {
        // Drift Particles
        for (let i = 0; i < count; i++) {
          let px = positionAttr.getX(i);
          let py = positionAttr.getY(i);
          let pz = positionAttr.getZ(i);

          px += velocities[i].x;
          py += velocities[i].y;
          pz += velocities[i].z;

          // Rebound Boundaries
          if (Math.abs(px) > 22) velocities[i].x *= -1;
          if (Math.abs(py) > 22) velocities[i].y *= -1;
          if (Math.abs(pz) > 22) velocities[i].z *= -1;

          // Cursor Drift Interaction
          const dx = mouse.x * 20 - px;
          const dy = mouse.y * 20 - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 12) {
            px -= dx * 0.005; // Gentle pushing away force
            py -= dy * 0.005;
          }

          positionAttr.setXYZ(i, px, py, pz);
        }
        positionAttr.needsUpdate = true;

        // Build Connection Lines
        if (linePosAttr) {
          for (let i = 0; i < count; i++) {
            const ix = positionAttr.getX(i);
            const iy = positionAttr.getY(i);
            const iz = positionAttr.getZ(i);

            for (let j = i + 1; j < count; j++) {
              if (lineIndex >= maxConnections) break;

              const jx = positionAttr.getX(j);
              const jy = positionAttr.getY(j);
              const jz = positionAttr.getZ(j);

              const dx = ix - jx;
              const dy = iy - jy;
              const dz = iz - jz;
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

              // Connect nodes if within threshold
              if (dist < 9.0) {
                linePosAttr.setXYZ(lineIndex * 2, ix, iy, iz);
                linePosAttr.setXYZ(lineIndex * 2 + 1, jx, jy, jz);
                lineIndex++;
              }
            }
          }
          linePosAttr.needsUpdate = true;
          
          // Clear unused positions
          for (let k = lineIndex; k < maxConnections; k++) {
            linePosAttr.setXYZ(k * 2, 0, 0, 0);
            linePosAttr.setXYZ(k * 2 + 1, 0, 0, 0);
          }
        }
      }

      // Rotation drift
      points.rotation.y += 0.0006;
      points.rotation.z += 0.0002;
      lines.rotation.y += 0.0006;
      lines.rotation.z += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      scrollAnimation.kill();
      rotationAnimation.kill();
    };
  }, []);

  return <div ref={mountRef} style={backgroundStyle} />;
};

const backgroundStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1,
  backgroundColor: '#000000',
  pointerEvents: 'none',
};

export default GLBackground;
