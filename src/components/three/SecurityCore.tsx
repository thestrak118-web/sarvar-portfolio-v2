"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

const ACID = new THREE.Color("#c3ff3e");
const CYAN = new THREE.Color("#5ad1ff");
const DEEP = new THREE.Color("#1d2b33");

type Geometry = {
  nodes: Float32Array;
  nodeColors: Float32Array;
  nodeCount: number;
  edgePositions: Float32Array;
  edgeColors: Float32Array;
  /** [aIndex, bIndex] pairs used by the travelling pulses */
  pulseEdges: [THREE.Vector3, THREE.Vector3][];
};

/** Evenly distributed points on a sphere (Fibonacci lattice) + proximity graph. */
function buildGeometry(count: number, radius: number, maxEdgeLength: number, pulseCount: number): Geometry {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    // Heavy radial jitter: this must read as a node cloud, never as a globe.
    const depth = Math.random();
    const jitter = radius * (0.7 + depth * depth * 0.42);
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(jitter));
  }

  const nodes = new Float32Array(count * 3);
  const nodeColors = new Float32Array(count * 3);
  const colour = new THREE.Color();

  points.forEach((p, i) => {
    nodes.set([p.x, p.y, p.z], i * 3);
    const t = (p.y / radius + 1) / 2;
    colour.copy(CYAN).lerp(ACID, Math.pow(t, 1.6));
    // A few nodes stay near-dark so the cluster has contrast rather than uniform glow.
    const dim = Math.random() < 0.42;
    if (dim) colour.lerp(DEEP, 0.72);
    nodeColors.set([colour.r, colour.g, colour.b], i * 3);
  });

  // Sparse proximity graph: most nodes get a single link, a minority get two.
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < points.length; i++) {
    const budget = i % 3 === 0 ? 2 : 1;
    let linked = 0;
    for (let j = i + 1; j < points.length && linked < budget; j++) {
      if (points[i].distanceTo(points[j]) < maxEdgeLength && (i + j) % 2 === 0) {
        edges.push([points[i], points[j]]);
        linked++;
      }
    }
  }

  const edgePositions = new Float32Array(edges.length * 6);
  const edgeColors = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], i) => {
    edgePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    const t = (a.y / radius + 1) / 2;
    colour.copy(CYAN).lerp(ACID, Math.pow(t, 1.6)).multiplyScalar(0.55);
    edgeColors.set([colour.r, colour.g, colour.b, colour.r, colour.g, colour.b], i * 6);
  });

  const pulseEdges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < pulseCount && edges.length > 0; i++) {
    pulseEdges.push(edges[Math.floor(Math.random() * edges.length)]);
  }

  return { nodes, nodeColors, nodeCount: count, edgePositions, edgeColors, pulseEdges };
}

/** Soft round sprite so nodes read as light points rather than squares. */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function Core({ quality, animate }: { quality: "high" | "low"; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const dot = useDotTexture();

  const config =
    quality === "high"
      ? { count: 260, edgeLength: 0.52, pulses: 9 }
      : { count: 100, edgeLength: 0.7, pulses: 4 };

  const geo = useMemo(
    () => buildGeometry(config.count, 1.65, config.edgeLength, config.pulses),
    [config.count, config.edgeLength, config.pulses],
  );

  // Deterministic offsets: pulses must not all start at the same point, but
  // seeding from Math.random() during render is impure.
  const pulseState = useRef(
    geo.pulseEdges.map((_, i) => ({
      t: ((i * 0.37) % 1),
      speed: 0.16 + ((i * 0.11) % 0.28),
    })),
  );
  const pulsePositions = useMemo(() => new Float32Array(geo.pulseEdges.length * 3), [geo.pulseEdges.length]);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const dt = Math.min(delta, 0.05);

    if (animate) {
      // Inertial follow of the pointer — damped, never snapping.
      pointer.current.x += (state.pointer.x - pointer.current.x) * (1 - Math.pow(0.0016, dt));
      pointer.current.y += (state.pointer.y - pointer.current.y) * (1 - Math.pow(0.0016, dt));

      g.rotation.y += dt * 0.055 + pointer.current.x * dt * 0.35;
      g.rotation.x += (pointer.current.y * 0.26 - g.rotation.x) * (1 - Math.pow(0.002, dt));
      g.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.045;

      const pulses = pulseRef.current;
      if (pulses) {
        pulseState.current.forEach((p, i) => {
          p.t += dt * p.speed;
          if (p.t > 1) {
            p.t = 0;
            p.speed = 0.16 + Math.random() * 0.28;
          }
          const [a, b] = geo.pulseEdges[i];
          const eased = p.t * p.t * (3 - 2 * p.t);
          pulsePositions[i * 3] = a.x + (b.x - a.x) * eased;
          pulsePositions[i * 3 + 1] = a.y + (b.y - a.y) * eased;
          pulsePositions[i * 3 + 2] = a.z + (b.z - a.z) * eased;
        });
        pulses.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  const scale = Math.min(1, Math.max(0.62, viewport.width / 6.2));

  return (
    <group ref={group} scale={scale}>
      {/* Dark inner mass: occludes far-side nodes so the cluster has real depth. */}
      <mesh>
        <sphereGeometry args={[1.06, 32, 32]} />
        <meshBasicMaterial color="#060608" />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#16232a" wireframe transparent opacity={0.35} />
      </mesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo.edgePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[geo.edgeColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.24} depthWrite={false} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo.nodes, 3]} />
          <bufferAttribute attach="attributes-color" args={[geo.nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.062}
          sizeAttenuation
          map={dot}
          alphaMap={dot}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#d8ff8a"
          size={0.1}
          sizeAttenuation
          map={dot}
          alphaMap={dot}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Single scan ring — one geometric accent, not a light show. */}
      <mesh rotation={[Math.PI / 2.35, 0, 0.35]}>
        <ringGeometry args={[2.05, 2.07, 128]} />
        <meshBasicMaterial color="#3f5a24" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function SecurityCore({ quality = "high" }: { quality?: "high" | "low" }) {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <Canvas
      dpr={[1, quality === "high" ? 1.75 : 1.35]}
      camera={{ position: [0, 0, 4.7], fov: 42 }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
      style={{ pointerEvents: "none" }}
    >
      <Core quality={quality} animate={animate} />
    </Canvas>
  );
}
