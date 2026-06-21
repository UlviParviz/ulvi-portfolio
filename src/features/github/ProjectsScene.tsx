import { Canvas, useFrame } from "@react-three/fiber";
import { Line, PresentationControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { type Group } from "three";
import type { Repo } from "./types";
import { getRepoColor } from "./constants";

type Props = {
  repos: Repo[];
  selectedRepoId?: number;
  onSelectRepo: (id: number) => void;
};



function RepoBlock({
  repo,
  index,
  position,
  selectedRepoId,
  onSelectRepo,
}: {
  repo: Repo;
  index: number;
  position: [number, number, number];
  selectedRepoId?: number;
  onSelectRepo: (id: number) => void;
}) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const color = getRepoColor(repo.language);
  const isSelected = selectedRepoId === repo.id;
  const isActive = hovered || isSelected;

  useFrame((state) => {
    if (!ref.current) return;

    const float = Math.sin(state.clock.elapsedTime * 0.85 + index) * 0.045;

    ref.current.position.y = position[1] + float;

    const targetZ = isSelected ? 0.45 : hovered ? 0.22 : position[2];
    ref.current.position.z += (targetZ - ref.current.position.z) * 0.08;

    const targetScale = isSelected ? 1.18 : hovered ? 1.08 : 1;
    const currentScale = ref.current.scale.x;
    const nextScale = currentScale + (targetScale - currentScale) * 0.1;

    ref.current.scale.setScalar(nextScale);
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelectRepo(repo.id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <mesh>
        <boxGeometry args={[1.25, 0.72, 0.18]} />
        <meshStandardMaterial
          color={isActive ? color : "#101827"}
          emissive={color}
          emissiveIntensity={isSelected ? 0.95 : hovered ? 0.65 : 0.25}
          metalness={0.35}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.23, 0.105]}>
        <boxGeometry args={[0.86, 0.055, 0.025]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      <mesh position={[-0.18, 0.05, 0.105]}>
        <boxGeometry args={[0.52, 0.04, 0.025]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.42} />
      </mesh>

      <mesh position={[0.1, -0.1, 0.105]}>
        <boxGeometry args={[0.72, 0.04, 0.025]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>

      <mesh position={[-0.42, -0.25, 0.105]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <mesh position={[-0.24, -0.25, 0.105]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>

      <mesh position={[-0.06, -0.25, 0.105]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>

      {isSelected && (
        <>
          <mesh position={[0, 0, -0.08]}>
            <boxGeometry args={[1.48, 0.95, 0.035]} />
            <meshBasicMaterial color={color} transparent opacity={0.18} />
          </mesh>

          <Line
            points={[
              [0, 0, 0.2],
              [0, 0, 1.4],
              [0, -1.35, 1.4],
            ]}
            color={color}
            transparent
            opacity={0.8}
            lineWidth={1.4}
          />
        </>
      )}
    </group>
  );
}

function RepoVaultCore({
  selectedColor,
}: {
  selectedColor: string;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    ref.current.position.y = -1.45 + Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
  });

  return (
    <group ref={ref} position={[0, -1.45, 1.15]}>
      <mesh>
        <cylinderGeometry args={[0.72, 0.72, 0.18, 48]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive={selectedColor}
          emissiveIntensity={0.8}
          metalness={0.45}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.05, 48]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.008, 16, 96]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function VaultGrid() {
  const verticalLines = useMemo(() => {
    return [-2.8, -1.4, 0, 1.4, 2.8];
  }, []);

  const horizontalLines = useMemo(() => {
    return [-1.4, -0.7, 0, 0.7, 1.4];
  }, []);

  return (
    <group position={[0, 0, -0.45]}>
      <mesh>
        <boxGeometry args={[6.4, 3.8, 0.04]} />
        <meshBasicMaterial color="#07111f" transparent opacity={0.55} />
      </mesh>

      {verticalLines.map((x) => (
        <Line
          key={`v-${x}`}
          points={[
            [x, -1.9, 0.04],
            [x, 1.9, 0.04],
          ]}
          color="#1e293b"
          transparent
          opacity={0.65}
          lineWidth={0.7}
        />
      ))}

      {horizontalLines.map((y) => (
        <Line
          key={`h-${y}`}
          points={[
            [-3.2, y, 0.04],
            [3.2, y, 0.04],
          ]}
          color="#1e293b"
          transparent
          opacity={0.65}
          lineWidth={0.7}
        />
      ))}
    </group>
  );
}

function VaultParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 26 }, (_, index) => {
      const x = -3 + (index % 7) * 1;
      const y = -1.6 + Math.floor(index / 7) * 0.85;
      const z = -0.1 + (index % 3) * 0.35;

      return {
        id: index,
        position: [x, y, z] as [number, number, number],
        size: 0.018 + (index % 3) * 0.005,
      };
    });
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.36} />
        </mesh>
      ))}
    </>
  );
}

function RepositoryVault({
  repos,
  selectedRepoId,
  onSelectRepo,
}: Props) {
  const ref = useRef<Group>(null);

  const positions = useMemo(() => {
    const basePositions: [number, number, number][] = [
      [-2.05, 0.95, 0],
      [0, 1.15, 0.05],
      [2.05, 0.95, 0],
      [-2.05, -0.15, 0.12],
      [0, 0.05, 0.22],
      [2.05, -0.15, 0.12],
      [-1.05, -1.15, 0.05],
      [1.05, -1.15, 0.05],
    ];

    return repos.map((_, index) => {
      return basePositions[index] || [
        -2 + (index % 3) * 2,
        -1.4 - Math.floor(index / 3) * 0.8,
        0,
      ] as [number, number, number];
    });
  }, [repos]);

  const selectedRepo = repos.find((repo) => repo.id === selectedRepoId) || repos[0];
  const selectedColor = getRepoColor(selectedRepo?.language || null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.035;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.055;
  });

  return (
    <group ref={ref}>
      <VaultGrid />
      <VaultParticles />
      <RepoVaultCore selectedColor={selectedColor} />

      <Line
        points={[
          [-3.05, -1.85, 0.08],
          [3.05, -1.85, 0.08],
        ]}
        color={selectedColor}
        transparent
        opacity={0.35}
        lineWidth={1.2}
      />

      {repos.map((repo, index) => (
        <RepoBlock
          key={repo.id}
          repo={repo}
          index={index}
          position={positions[index]}
          selectedRepoId={selectedRepoId}
          onSelectRepo={onSelectRepo}
        />
      ))}
    </group>
  );
}

export default function ProjectsScene(props: Props) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0.05, 6.2], fov: 45 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.82} />
      <directionalLight position={[4, 5, 4]} intensity={1.75} />
      <pointLight position={[-3, 2, 3]} intensity={2.25} color="#7c3aed" />
      <pointLight position={[3, -2, 3]} intensity={1.8} color="#06b6d4" />

      <PresentationControls
        global={false}
        cursor
        speed={1}
        zoom={1}
        rotation={[0.02, -0.12, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-0.35, 0.35]}
      >
        <RepositoryVault {...props} />
      </PresentationControls>
    </Canvas>
  );
}