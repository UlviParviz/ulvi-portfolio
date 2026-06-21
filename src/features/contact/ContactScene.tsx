import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function MailCore() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.004;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2.25, 1.35, 0.16]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#7c3aed"
          emissiveIntensity={0.45}
          metalness={0.35}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.13, 0.09]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.95, 0.05, 0.04]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.85} />
      </mesh>

      <mesh position={[0, 0.13, 0.09]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.95, 0.05, 0.04]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.85} />
      </mesh>

      <Html center transform sprite distanceFactor={6} position={[0, -1.1, 0]}>
        <div className="contact-core-label">SEND MESSAGE</div>
      </Html>
    </group>
  );
}

function OrbitingMail({
  index,
  color,
}: {
  index: number;
  color: string;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const angle = state.clock.elapsedTime * 0.45 + index * 2.1;
    const radius = 2.55;

    ref.current.position.x = Math.cos(angle) * radius;
    ref.current.position.z = Math.sin(angle) * radius;
    ref.current.position.y = Math.sin(angle * 1.2) * 0.55;
    ref.current.rotation.y = -angle;
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.55, 0.34, 0.045]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.65}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

function ContactParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 38 }, (_, index) => ({
      id: index,
      position: [
        Math.sin(index * 0.9) * 3.4,
        Math.cos(index * 1.1) * 1.8,
        Math.sin(index * 0.6) * 2.4,
      ] as [number, number, number],
      size: 0.015 + (index % 4) * 0.006,
    }));
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 10, 10]} />
          <meshBasicMaterial color="#93c5fd" transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

function ContactWorld() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.007, 20, 180]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.24} />
      </mesh>

      <MailCore />
      <OrbitingMail index={0} color="#7c3aed" />
      <OrbitingMail index={1} color="#06b6d4" />
      <OrbitingMail index={2} color="#f97316" />
      <ContactParticles />
    </group>
  );
}

export default function ContactScene() {
  return (
    <Canvas camera={{ position: [0, 0.3, 5.8], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 4]} intensity={2} />
      <pointLight position={[-3, 2, 3]} intensity={2.7} color="#7c3aed" />
      <pointLight position={[3, -2, 3]} intensity={2.1} color="#06b6d4" />

      <ContactWorld />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.62}
      />
    </Canvas>
  );
}