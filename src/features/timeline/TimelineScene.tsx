import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { timeline } from "../../data/portfolio";

type TimelineSceneProps = {
  selectedTimelineId: number;
  onSelectTimeline: (id: number) => void;
};

const timelineColors = ["#7c3aed", "#06b6d4", "#f97316", "#22c55e", "#ec4899"];

const getSelectedIndex = (selectedTimelineId: number) => {
  const index = timeline.findIndex((item) => item.id === selectedTimelineId);
  return index >= 0 ? index : 0;
};

const createMilestonePositions = (
  count: number
): [number, number, number][] => {
  if (count <= 0) return [];

  const gapY =
    count <= 3 ? 1.95 : count <= 5 ? 1.58 : count <= 7 ? 1.34 : 1.12;

  const startY = ((count - 1) * gapY) / 2;

  return Array.from({ length: count }, (_, index) => {
    const side = index % 2 === 0 ? -1 : 1;
    const band = index % 3;
    const spread = band === 0 ? 0.55 : band === 1 ? 1.15 : 1.7;

    const x =
      side * spread + Math.sin(index * 1.17) * 0.22 + Math.cos(index * 0.7) * 0.14;

    const y = startY - index * gapY + Math.sin(index * 0.8) * 0.12;

    const z =
      Math.cos(index * 0.92) * 0.32 + (index % 2 === 0 ? -0.08 : 0.14);

    return [x, y, z];
  });
};

function JourneyAxis({
  positions,
  selectedIndex,
  selectedColor,
}: {
  positions: [number, number, number][];
  selectedIndex: number;
  selectedColor: string;
}) {
  const topY = positions[0]?.[1] ?? 0;
  const bottomY = positions[positions.length - 1]?.[1] ?? 0;
  const selectedY = positions[selectedIndex]?.[1] ?? 0;

  const mainAxisPoints: [number, number, number][] = [
    [0, topY + 0.95, -0.28],
    [0, bottomY - 0.95, -0.28],
  ];

  const activeAxisPoints: [number, number, number][] = [
    [0, topY + 0.95, -0.28],
    [0, selectedY, -0.12],
  ];

  return (
    <>
      <Line
        points={mainAxisPoints}
        color="#64748b"
        transparent
        opacity={0.22}
        lineWidth={1}
      />

      <Line
        points={activeAxisPoints}
        color={selectedColor}
        transparent
        opacity={0.55}
        lineWidth={2.2}
      />
    </>
  );
}

function ConstellationLinks({
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
    if (sliced.length === 1) return [sliced[0], sliced[0]];
    return sliced;
  }, [positions, selectedIndex]);

  return (
    <>
      <Line
        points={positions}
        color="#94a3b8"
        transparent
        opacity={0.2}
        lineWidth={1}
      />

      <Line
        points={activePoints}
        color={selectedColor}
        transparent
        opacity={0.78}
        lineWidth={2.4}
      />

      {positions.map((position, index) => {
        const linkStart: [number, number, number] = [0, position[1], -0.18];
        const color = timelineColors[index % timelineColors.length];
        const isPassed = index <= selectedIndex;

        return (
          <Line
            key={`axis-link-${index}`}
            points={[linkStart, position]}
            color={color}
            transparent
            opacity={isPassed ? 0.34 : 0.12}
            lineWidth={isPassed ? 1.3 : 0.8}
          />
        );
      })}
    </>
  );
}

function ChapterPortal({
  selectedPosition,
  selectedColor,
}: {
  selectedPosition: [number, number, number];
  selectedColor: string;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05;

    ref.current.position.x += (selectedPosition[0] - ref.current.position.x) * 0.08;
    ref.current.position.y += (selectedPosition[1] - ref.current.position.y) * 0.08;
    ref.current.position.z +=
      (selectedPosition[2] + 0.16 - ref.current.position.z) * 0.08;

    ref.current.scale.setScalar(pulse);
    ref.current.rotation.z += 0.006;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
  });

  return (
    <group ref={ref} position={selectedPosition}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.018, 18, 88]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.72} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.008, 18, 88]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.34} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.68, 0.006, 18, 88]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.13} />
      </mesh>

      <mesh position={[0, 0, -0.03]}>
        <sphereGeometry args={[0.42, 20, 20]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.09} />
      </mesh>
    </group>
  );
}

function BackgroundStars({ selectedColor }: { selectedColor: string }) {
  const particles = useMemo(() => {
    return Array.from({ length: 26 }, (_, index) => {
      const angle = index * 0.73;
      const radius = 2.5 + (index % 5) * 0.25;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          Math.sin(index * 0.95) * 3.2,
          Math.sin(angle) * 0.52 - 0.45,
        ] as [number, number, number],
        size: 0.012 + (index % 3) * 0.004,
        active: index % 4 === 0,
      };
    });
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color={particle.active ? selectedColor : "#94a3b8"}
            transparent
            opacity={particle.active ? 0.5 : 0.22}
          />
        </mesh>
      ))}
    </>
  );
}

function FloatingPages({ selectedColor }: { selectedColor: string }) {
  const pages = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const side = index % 2 === 0 ? -1 : 1;

      return {
        id: index,
        position: [
          side * (2.45 + (index % 3) * 0.25),
          2.6 - index * 0.72,
          -0.95 + (index % 3) * 0.12,
        ] as [number, number, number],
        rotation: [0.12, index * 0.14, -0.1 + index * 0.02] as [
          number,
          number,
          number,
        ],
      };
    });
  }, []);

  return (
    <>
      {pages.map((page) => (
        <FloatingPage
          key={page.id}
          id={page.id}
          position={page.position}
          rotation={page.rotation}
          selectedColor={selectedColor}
        />
      ))}
    </>
  );
}

function FloatingPage({
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
      position[1] + Math.sin(state.clock.elapsedTime * 0.7 + id) * 0.04;
    ref.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.45 + id) * 0.05;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.28, 0.38, 0.015]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.09} />
      </mesh>

      <mesh position={[0, 0.08, 0.01]}>
        <boxGeometry args={[0.18, 0.018, 0.008]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.34} />
      </mesh>

      <mesh position={[0, -0.02, 0.01]}>
        <boxGeometry args={[0.2, 0.013, 0.008]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>

      <mesh position={[0, -0.1, 0.01]}>
        <boxGeometry args={[0.14, 0.013, 0.008]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function MilestoneNode({
  id,
  index,
  position,
  selectedTimelineId,
  onSelectTimeline,
}: {
  id: number;
  index: number;
  position: [number, number, number];
  selectedTimelineId: number;
  onSelectTimeline: (id: number) => void;
}) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const selectedIndex = getSelectedIndex(selectedTimelineId);
  const color = timelineColors[index % timelineColors.length];
  const isSelected = selectedTimelineId === id;
  const isPassed = selectedIndex >= index;

  useFrame((state) => {
    if (!ref.current) return;

    const float = Math.sin(state.clock.elapsedTime * 1.05 + index) * 0.04;

    ref.current.position.x += (position[0] - ref.current.position.x) * 0.09;
    ref.current.position.y += (position[1] + float - ref.current.position.y) * 0.09;
    ref.current.position.z +=
      (position[2] + (isSelected ? 0.58 : hovered ? 0.24 : 0) - ref.current.position.z) *
      0.09;

    const targetScale = isSelected ? 1.34 : hovered ? 1.14 : isPassed ? 1.03 : 0.86;
    const nextScale = ref.current.scale.x + (targetScale - ref.current.scale.x) * 0.11;

    ref.current.scale.setScalar(nextScale);
    ref.current.rotation.y += isSelected ? 0.012 : 0.004;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.05;
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelectTimeline(id);
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
        <sphereGeometry args={[0.26, 22, 22]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.28 : hovered ? 0.7 : isPassed ? 0.44 : 0.12}
          roughness={0.22}
          metalness={0.32}
          transparent
          opacity={isPassed ? 1 : 0.5}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, isSelected ? 0.018 : 0.008, 16, 70]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.85 : hovered ? 0.55 : 0.22}
        />
      </mesh>

      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.045, 0.42, 0.045]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isPassed ? 0.42 : 0.14}
        />
      </mesh>

      {isSelected && (
        <>
          <mesh position={[0, 0, -0.08]}>
            <sphereGeometry args={[0.52, 20, 20]} />
            <meshBasicMaterial color={color} transparent opacity={0.12} />
          </mesh>

          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.58, 0.006, 16, 72]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
        </>
      )}
    </group>
  );
}

function JourneyFloor({ selectedColor }: { selectedColor: string }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.018;
  });

  return (
    <group ref={ref} position={[0, -3.35, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[3.2, 0.006, 12, 112]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.2} />
      </mesh>

      <mesh>
        <torusGeometry args={[2.32, 0.004, 12, 112]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function TimelineWorld(props: TimelineSceneProps) {
  const groupRef = useRef<Group>(null);

  const selectedIndex = useMemo(() => {
    return getSelectedIndex(props.selectedTimelineId);
  }, [props.selectedTimelineId]);

  const positions = useMemo(() => {
    return createMilestonePositions(timeline.length);
  }, []);

  const selectedColor = timelineColors[selectedIndex % timelineColors.length];
  const selectedPosition = positions[selectedIndex] ?? [0, 0, 0];

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.04;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <JourneyFloor selectedColor={selectedColor} />
      <JourneyAxis
        positions={positions}
        selectedIndex={selectedIndex}
        selectedColor={selectedColor}
      />
      <ConstellationLinks
        positions={positions}
        selectedIndex={selectedIndex}
        selectedColor={selectedColor}
      />
      <ChapterPortal
        selectedPosition={selectedPosition}
        selectedColor={selectedColor}
      />
      <FloatingPages selectedColor={selectedColor} />
      <BackgroundStars selectedColor={selectedColor} />

      {timeline.map((item, index) => (
        <MilestoneNode
          key={item.id}
          id={item.id}
          index={index}
          position={positions[index]}
          selectedTimelineId={props.selectedTimelineId}
          onSelectTimeline={props.onSelectTimeline}
        />
      ))}
    </group>
  );
}

export default function TimelineScene(props: TimelineSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.2]}
      camera={{ position: [0, 0, 8.4], fov: 50 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.84} />
      <directionalLight position={[4, 5, 4]} intensity={1.8} />
      <pointLight position={[-3, 2, 3]} intensity={1.8} color="#7c3aed" />
      <pointLight position={[3, -2, 3]} intensity={1.45} color="#06b6d4" />

      <TimelineWorld {...props} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.34}
        minAzimuthAngle={-0.18}
        maxAzimuthAngle={0.18}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 1.82}
      />
    </Canvas>
  );
}