import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { skills, type SkillItem } from "../../data/portfolio";

type SkillsSceneProps = {
  activeCategory: string;
  selectedSkillId: number;
  onSelectSkill: (id: number) => void;
  onHoverSkill: (id?: number) => void;
  isLight: boolean;
};

const skillPositions: [number, number, number][] = [
  [0, 2.45, 0],
  [1.25, 2.12, 0.45],
  [2.18, 1.42, -0.35],
  [2.72, 0.42, 0.6],
  [2.6, -0.65, -0.45],
  [1.9, -1.55, 0.65],
  [0.82, -2.22, -0.35],
  [-0.42, -2.35, 0.55],
  [-1.58, -1.88, -0.45],
  [-2.38, -1.05, 0.65],
  [-2.72, 0.05, -0.35],
  [-2.32, 1.15, 0.55],
  [-1.38, 1.95, -0.45],

  [0.65, 1.15, 2.08],
  [1.72, 0.42, 1.85],
  [1.62, -0.82, 1.78],
  [0.42, -1.35, 2.12],
  [-0.88, -1.12, 1.95],
  [-1.72, -0.22, 1.72],
  [-1.28, 0.92, 2.02],

  [0.9, 1.2, -2.08],
  [1.92, 0.2, -1.82],
  [1.42, -1.05, -1.92],
  [0.1, -1.52, -2.12],
  [-1.28, -0.82, -1.85],
  [-1.82, 0.62, -1.78],
];

function getSceneSkillColor(skill: SkillItem, isLight: boolean) {
  return isLight ? skill.lightColor : skill.color;
}

function Core({
  selectedColor,
  isLight,
}: {
  selectedColor: string;
  isLight: boolean;
}) {
  const ref = useRef<Group>(null);
  const pulseRef = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.004;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    }

    if (pulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.08;
      pulseRef.current.scale.setScalar(pulse);
      pulseRef.current.rotation.z += 0.006;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial
          color={isLight ? "#ffffff" : "#0f172a"}
          emissive={selectedColor}
          emissiveIntensity={isLight ? 0.5 : 1.15}
          metalness={0.32}
          roughness={0.22}
        />
      </mesh>

      <group ref={pulseRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.95, 0.01, 16, 96]} />
          <meshBasicMaterial
            color={selectedColor}
            transparent
            opacity={isLight ? 0.52 : 0.62}
          />
        </mesh>

        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.18, 0.008, 16, 96]} />
          <meshBasicMaterial
            color={selectedColor}
            transparent
            opacity={isLight ? 0.42 : 0.48}
          />
        </mesh>
      </group>

      <mesh rotation={[0.7, 0.2, 0.4]}>
        <torusGeometry args={[1.42, 0.005, 16, 96]} />
        <meshBasicMaterial
          color={isLight ? "#111827" : "#ffffff"}
          transparent
          opacity={isLight ? 0.18 : 0.13}
        />
      </mesh>
    </group>
  );
}

function SkillNode({
  skill,
  position,
  activeCategory,
  selectedSkillId,
  onSelectSkill,
  onHoverSkill,
  isLight,
}: {
  skill: SkillItem;
  position: [number, number, number];
  activeCategory: string;
  selectedSkillId: number;
  onSelectSkill: (id: number) => void;
  onHoverSkill: (id?: number) => void;
  isLight: boolean;
}) {
  const ref = useRef<Group>(null);
  const pulseRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const color = getSceneSkillColor(skill, isLight);
  const isSelected = selectedSkillId === skill.id;
  const isInCategory = activeCategory === "All" || activeCategory === skill.category;
  const isActive = hovered || isSelected;

  useFrame((state) => {
    if (!ref.current) return;

    const float = Math.sin(state.clock.elapsedTime * 1.1 + skill.id) * 0.035;

    ref.current.position.y = position[1] + float;

    const targetZ = isSelected
      ? position[2] + 0.42
      : hovered
        ? position[2] + 0.2
        : position[2];

    ref.current.position.z += (targetZ - ref.current.position.z) * 0.09;

    const targetScale = isSelected ? 1.34 : hovered ? 1.16 : isInCategory ? 1 : 0.62;
    const currentScale = ref.current.scale.x;
    const nextScale = currentScale + (targetScale - currentScale) * 0.1;

    ref.current.scale.setScalar(nextScale);

    if (pulseRef.current) {
      const pulse = 1 + Math.abs(Math.sin(state.clock.elapsedTime * 2.7)) * 0.42;
      pulseRef.current.scale.setScalar(pulse);
      pulseRef.current.rotation.z += 0.012;
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelectSkill(skill.id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        onHoverSkill(skill.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        onHoverSkill(undefined);
        document.body.style.cursor = "default";
      }}
    >
      <mesh>
        <sphereGeometry args={[0.29, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isLight ? (isActive ? 0.55 : 0.18) : isActive ? 1.35 : 0.42}
          metalness={0.22}
          roughness={0.22}
          transparent
          opacity={isInCategory ? 1 : 0.2}
        />
      </mesh>

      {isSelected && (
        <group ref={pulseRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.46, 0.012, 16, 72]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={isLight ? 0.68 : 0.78}
            />
          </mesh>

          <mesh rotation={[0.4, 0.8, 0]}>
            <torusGeometry args={[0.58, 0.006, 16, 72]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={isLight ? 0.36 : 0.42}
            />
          </mesh>
        </group>
      )}

      {hovered && !isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.41, 0.01, 16, 72]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isLight ? 0.42 : 0.48}
          />
        </mesh>
      )}
    </group>
  );
}

function Connections({
  activeCategory,
  selectedSkillId,
  isLight,
}: {
  activeCategory: string;
  selectedSkillId: number;
  isLight: boolean;
}) {
  return (
    <>
      {skills.map((skill, index) => {
        const position = skillPositions[index];

        if (!position) return null;

        const color = getSceneSkillColor(skill, isLight);
        const isSelected = selectedSkillId === skill.id;
        const isInCategory =
          activeCategory === "All" || activeCategory === skill.category;

        return (
          <Line
            key={skill.id}
            points={[[0, 0, 0], position]}
            color={color}
            transparent
            opacity={isSelected ? 0.78 : isInCategory ? 0.24 : 0.04}
            lineWidth={isSelected ? 2 : 0.75}
          />
        );
      })}
    </>
  );
}

function SelectedEnergyBeam({
  selectedSkillId,
  isLight,
}: {
  selectedSkillId: number;
  isLight: boolean;
}) {
  const selectedIndex = skills.findIndex((skill) => skill.id === selectedSkillId);
  const selectedSkill = skills[selectedIndex];
  const selectedPosition = skillPositions[selectedIndex];

  if (!selectedSkill || !selectedPosition) return null;

  const color = getSceneSkillColor(selectedSkill, isLight);

  return (
    <>
      <Line
        points={[selectedPosition, [0, 0, 0]]}
        color={color}
        transparent
        opacity={isLight ? 0.82 : 0.92}
        lineWidth={2.4}
      />

      <Line
        points={[
          [selectedPosition[0], selectedPosition[1], selectedPosition[2] + 0.15],
          [0, 0, 0.15],
        ]}
        color={isLight ? "#111827" : "#ffffff"}
        transparent
        opacity={isLight ? 0.18 : 0.22}
        lineWidth={1}
      />
    </>
  );
}

function StarsLite({ isLight }: { isLight: boolean }) {
  const stars = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => {
      const angle = index * 0.72;
      const radius = 3.2 + (index % 4) * 0.35;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          Math.sin(index * 1.4) * 2.1,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        size: 0.014 + (index % 3) * 0.004,
      };
    });
  }, []);

  return (
    <>
      {stars.map((star) => (
        <mesh key={star.id} position={star.position}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial
            color={isLight ? "#334155" : "#94a3b8"}
            transparent
            opacity={isLight ? 0.34 : 0.42}
          />
        </mesh>
      ))}
    </>
  );
}

function GalaxyWorld(props: SkillsSceneProps) {
  const ref = useRef<Group>(null);

  const selectedSkill = useMemo(() => {
    return skills.find((skill) => skill.id === props.selectedSkillId) || skills[0];
  }, [props.selectedSkillId]);

  const selectedColor = getSceneSkillColor(selectedSkill, props.isLight);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.0012;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.055;
  });

  return (
    <group ref={ref}>
      <Core selectedColor={selectedColor} isLight={props.isLight} />

      <Connections
        activeCategory={props.activeCategory}
        selectedSkillId={props.selectedSkillId}
        isLight={props.isLight}
      />

      <SelectedEnergyBeam
        selectedSkillId={props.selectedSkillId}
        isLight={props.isLight}
      />

      <StarsLite isLight={props.isLight} />

      {skills.map((skill, index) => {
        const position = skillPositions[index];

        if (!position) return null;

        return (
          <SkillNode
            key={skill.id}
            skill={skill}
            position={position}
            activeCategory={props.activeCategory}
            selectedSkillId={props.selectedSkillId}
            onSelectSkill={props.onSelectSkill}
            onHoverSkill={props.onHoverSkill}
            isLight={props.isLight}
          />
        );
      })}
    </group>
  );
}

export default function SkillsScene(props: SkillsSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0.25, 6.6], fov: 45 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={props.isLight ? 1.15 : 0.75} />

      <directionalLight
        position={[4, 5, 4]}
        intensity={props.isLight ? 2.25 : 1.7}
      />

      <pointLight
        position={[-3, 2, 3]}
        intensity={props.isLight ? 1.25 : 2.3}
        color="#7c3aed"
      />

      <pointLight
        position={[3, -2, 3]}
        intensity={props.isLight ? 1.1 : 1.8}
        color="#06b6d4"
      />

      <GalaxyWorld {...props} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}