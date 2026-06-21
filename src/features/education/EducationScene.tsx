import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { education } from "../../data/portfolio";

type EducationSceneProps = {
  selectedEducationId: number;
  onSelectEducation: (id: number) => void;
};

const educationColors = ["#7c3aed", "#06b6d4", "#22c55e", "#f97316"];

const getSelectedIndex = (selectedEducationId: number) => {
  const index = education.findIndex((item) => item.id === selectedEducationId);

  return index >= 0 ? index : 0;
};

const createEducationPositions = (
  count: number
): [number, number, number][] => {
  if (count <= 0) return [];

  if (count === 1) {
    return [[0, 0.72, 0.15]];
  }

  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / count;
    const radiusX = 1.95;
    const radiusY = 1.15;

    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY + 0.35;
    const z = Math.sin(index * 0.8) * 0.36;

    return [x, y, z];
  });
};

function AcademicBook({ selectedColor }: { selectedColor: string }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.1;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.035;
  });

  return (
    <group ref={ref} position={[0, -0.45, 0]}>
      <mesh position={[-0.42, 0, 0]} rotation={[0.16, 0.08, -0.08]}>
        <boxGeometry args={[0.82, 0.08, 1.22]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.34}
          metalness={0.08}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh position={[0.42, 0, 0]} rotation={[0.16, -0.08, 0.08]}>
        <boxGeometry args={[0.82, 0.08, 1.22]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.34}
          metalness={0.08}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[0.08, 0.14, 1.28]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.64} />
      </mesh>

      <mesh position={[-0.42, 0.07, 0.18]} rotation={[0.16, 0.08, -0.08]}>
        <boxGeometry args={[0.56, 0.014, 0.035]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.5} />
      </mesh>

      <mesh position={[0.42, 0.07, 0.06]} rotation={[0.16, -0.08, 0.08]}>
        <boxGeometry args={[0.56, 0.014, 0.035]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.38} />
      </mesh>

      <mesh position={[-0.34, 0.09, -0.15]} rotation={[0.16, 0.08, -0.08]}>
        <boxGeometry args={[0.38, 0.012, 0.03]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>

      <mesh position={[0.34, 0.09, -0.22]} rotation={[0.16, -0.08, 0.08]}>
        <boxGeometry args={[0.42, 0.012, 0.03]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function KnowledgeCore({ selectedColor }: { selectedColor: string }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.006;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.42) * 0.18;
    ref.current.scale.setScalar(
      1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.025
    );
  });

  return (
    <group ref={ref} position={[0, 0.48, 0]}>
      <mesh>
        <sphereGeometry args={[0.36, 24, 24]} />
        <meshStandardMaterial
          color={selectedColor}
          emissive={selectedColor}
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.35}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.008, 16, 96]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.62} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.92, 0.006, 16, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>

      <mesh rotation={[0.75, 0.4, 0.2]}>
        <torusGeometry args={[1.08, 0.005, 16, 96]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function EducationNode({
  id,
  index,
  position,
  selectedEducationId,
  onSelectEducation,
}: {
  id: number;
  index: number;
  position: [number, number, number];
  selectedEducationId: number;
  onSelectEducation: (id: number) => void;
}) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const selectedIndex = getSelectedIndex(selectedEducationId);
  const color = educationColors[index % educationColors.length];

  const isSelected = selectedEducationId === id;
  const isPassed = selectedIndex >= index;

  useFrame((state) => {
    if (!ref.current) return;

    const float = Math.sin(state.clock.elapsedTime * 0.95 + index) * 0.045;

    ref.current.position.x += (position[0] - ref.current.position.x) * 0.09;
    ref.current.position.y += (position[1] + float - ref.current.position.y) * 0.09;
    ref.current.position.z +=
      (position[2] + (isSelected ? 0.45 : hovered ? 0.22 : 0) - ref.current.position.z) *
      0.09;

    const targetScale = isSelected ? 1.28 : hovered ? 1.12 : isPassed ? 1 : 0.88;
    const nextScale = ref.current.scale.x + (targetScale - ref.current.scale.x) * 0.1;

    ref.current.scale.setScalar(nextScale);
    ref.current.rotation.y += isSelected ? 0.012 : 0.004;
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelectEducation(id);
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
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.15 : hovered ? 0.72 : 0.34}
          roughness={0.22}
          metalness={0.42}
          transparent
          opacity={isPassed ? 1 : 0.58}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, isSelected ? 0.018 : 0.008, 16, 72]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.86 : hovered ? 0.52 : 0.24}
        />
      </mesh>

      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.055, 0.42, 0.055]} />
        <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.5 : 0.22} />
      </mesh>

      {isSelected && (
        <mesh>
          <sphereGeometry args={[0.62, 20, 20]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>
      )}
    </group>
  );
}

function EducationLinks({
  positions,
  selectedIndex,
  selectedColor,
}: {
  positions: [number, number, number][];
  selectedIndex: number;
  selectedColor: string;
}) {
  const activePoints = useMemo(() => {
    const sliced = positions.slice(0, selectedIndex + 1);

    if (sliced.length === 1) {
      return [sliced[0], sliced[0]];
    }

    return sliced;
  }, [positions, selectedIndex]);

  return (
    <>
      <Line
        points={positions}
        color="#94a3b8"
        transparent
        opacity={0.18}
        lineWidth={1}
      />

      <Line
        points={activePoints}
        color={selectedColor}
        transparent
        opacity={0.78}
        lineWidth={2.2}
      />

      {positions.map((position, index) => (
        <Line
          key={`education-link-${index}`}
          points={[[0, 0.48, 0], position]}
          color={educationColors[index % educationColors.length]}
          transparent
          opacity={index <= selectedIndex ? 0.34 : 0.12}
          lineWidth={1}
        />
      ))}
    </>
  );
}

function FloatingCertificates({ selectedColor }: { selectedColor: string }) {
  const certificates = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const side = index % 2 === 0 ? -1 : 1;

      return {
        id: index,
        position: [
          side * (2.25 + (index % 3) * 0.22),
          1.7 - index * 0.48,
          -0.9 + (index % 3) * 0.12,
        ] as [number, number, number],
        rotation: [0.12, index * 0.16, -0.1 + index * 0.02] as [
          number,
          number,
          number,
        ],
      };
    });
  }, []);

  return (
    <>
      {certificates.map((certificate) => (
        <FloatingCertificate
          key={certificate.id}
          id={certificate.id}
          position={certificate.position}
          rotation={certificate.rotation}
          selectedColor={selectedColor}
        />
      ))}
    </>
  );
}

function FloatingCertificate({
  id,
  position,
  rotation,
  selectedColor,
}: {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  selectedColor: string;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.65 + id) * 0.04;
    ref.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.42 + id) * 0.055;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.34, 0.46, 0.015]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.1} />
      </mesh>

      <mesh position={[0, 0.1, 0.01]}>
        <boxGeometry args={[0.22, 0.018, 0.008]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.34} />
      </mesh>

      <mesh position={[0, -0.02, 0.01]}>
        <boxGeometry args={[0.22, 0.013, 0.008]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.13} />
      </mesh>

      <mesh position={[0, -0.11, 0.01]}>
        <boxGeometry args={[0.14, 0.013, 0.008]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function AcademicStars({ selectedColor }: { selectedColor: string }) {
  const stars = useMemo(() => {
    return Array.from({ length: 28 }, (_, index) => {
      const angle = index * 0.73;
      const radius = 2.4 + (index % 5) * 0.26;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          Math.sin(index * 0.95) * 1.85,
          Math.sin(angle) * 0.6 - 0.55,
        ] as [number, number, number],
        size: 0.011 + (index % 3) * 0.004,
        active: index % 5 === 0,
      };
    });
  }, []);

  return (
    <>
      {stars.map((star) => (
        <mesh key={star.id} position={star.position}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial
            color={star.active ? selectedColor : "#94a3b8"}
            transparent
            opacity={star.active ? 0.5 : 0.23}
          />
        </mesh>
      ))}
    </>
  );
}

function EducationWorld(props: EducationSceneProps) {
  const groupRef = useRef<Group>(null);

  const positions = useMemo(() => {
    return createEducationPositions(education.length);
  }, []);

  const selectedIndex = useMemo(() => {
    return getSelectedIndex(props.selectedEducationId);
  }, [props.selectedEducationId]);

  const selectedColor = educationColors[selectedIndex % educationColors.length];

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.06;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
  });

  return (
    <group ref={groupRef}>
      <AcademicBook selectedColor={selectedColor} />
      <KnowledgeCore selectedColor={selectedColor} />

      <EducationLinks
        positions={positions}
        selectedIndex={selectedIndex}
        selectedColor={selectedColor}
      />

      <FloatingCertificates selectedColor={selectedColor} />
      <AcademicStars selectedColor={selectedColor} />

      {education.map((item, index) => (
        <EducationNode
          key={item.id}
          id={item.id}
          index={index}
          position={positions[index]}
          selectedEducationId={props.selectedEducationId}
          onSelectEducation={props.onSelectEducation}
        />
      ))}
    </group>
  );
}

export default function EducationScene(props: EducationSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.2]}
      camera={{ position: [0, 0.15, 6.8], fov: 46 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.84} />
      <directionalLight position={[4, 5, 4]} intensity={1.75} />
      <pointLight position={[-3, 2, 3]} intensity={1.8} color="#7c3aed" />
      <pointLight position={[3, -2, 3]} intensity={1.45} color="#06b6d4" />

      <EducationWorld {...props} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.36}
        minAzimuthAngle={-0.28}
        maxAzimuthAngle={0.28}
        minPolarAngle={Math.PI / 2.35}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  );
}