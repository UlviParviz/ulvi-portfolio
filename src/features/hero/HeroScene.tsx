import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import {
  CanvasTexture,
  SRGBColorSpace,
  type Group,
} from "three";
import { heroContent, type HeroChip } from "../../data/portfolio";

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function createTextTexture({
  label,
  color,
}: HeroChip) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 180;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new CanvasTexture(canvas);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRoundedRect(ctx, 18, 22, 476, 136, 34);

  ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
  ctx.fill();

  ctx.strokeStyle = `${color}aa`;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(70, 90, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 42px Poppins, Arial";
  ctx.fillText(label, 104, 104);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function createScreenTexture() {
  const scene = heroContent.scene;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new CanvasTexture(canvas);
  }

  const background = ctx.createLinearGradient(0, 0, 1024, 640);
  background.addColorStop(0, "#020617");
  background.addColorStop(0.45, "#111827");
  background.addColorStop(1, "#0f172a");

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 1024, 640);

  ctx.fillStyle = "rgba(124, 58, 237, 0.22)";
  ctx.beginPath();
  ctx.arc(140, 120, 190, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
  ctx.beginPath();
  ctx.arc(850, 480, 210, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= 1024; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 640);
    ctx.stroke();
  }

  for (let y = 0; y <= 640; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  drawRoundedRect(ctx, 54, 44, 916, 552, 34);
  ctx.fillStyle = "rgba(255, 255, 255, 0.075)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.stroke();

  drawRoundedRect(ctx, 82, 72, 860, 54, 18);
  ctx.fillStyle = "rgba(15, 23, 42, 0.82)";
  ctx.fill();

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(112, 99, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(140, 99, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(168, 99, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e2e8f0";
  ctx.font = "700 24px Poppins, Arial";
  ctx.fillText(scene.browserTitle, 210, 108);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 68px Poppins, Arial";
  ctx.fillText(scene.titleTop, 100, 225);

  const titleGradient = ctx.createLinearGradient(100, 245, 680, 245);
  titleGradient.addColorStop(0, "#7c3aed");
  titleGradient.addColorStop(1, "#06b6d4");

  ctx.fillStyle = titleGradient;
  ctx.font = "900 76px Poppins, Arial";
  ctx.fillText(scene.titleBottom, 100, 305);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "500 25px Poppins, Arial";
  ctx.fillText(scene.subtitle, 104, 354);

  const cardPositions = [
    { x: 104, y: 410 },
    { x: 362, y: 410 },
    { x: 620, y: 410 },
  ];

  scene.cards.forEach((card, index) => {
    const position = cardPositions[index];

    if (!position) return;

    drawRoundedRect(ctx, position.x, position.y, 218, 116, 24);
    ctx.fillStyle = "rgba(15, 23, 42, 0.82)";
    ctx.fill();
    ctx.strokeStyle = `${card.color}99`;
    ctx.stroke();

    ctx.fillStyle = card.color;
    ctx.beginPath();
    ctx.arc(position.x + 28, position.y + 32, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "600 20px Poppins, Arial";
    ctx.fillText(card.label, position.x + 52, position.y + 40);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 25px Poppins, Arial";
    ctx.fillText(card.value, position.x + 24, position.y + 86);
  });

  drawRoundedRect(ctx, 690, 170, 196, 154, 28);
  ctx.fillStyle = "rgba(6, 182, 212, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(6, 182, 212, 0.45)";
  ctx.stroke();

  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(788, 247, 46, -Math.PI / 2, Math.PI * 1.45);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 34px Poppins, Arial";
  ctx.fillText(scene.performanceScore, 764, 258);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 18px Poppins, Arial";
  ctx.fillText(scene.performanceLabel, 742, 296);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function LaptopMockup() {
  const groupRef = useRef<Group>(null);
  const screenTexture = useMemo(() => createScreenTexture(), []);

  useEffect(() => {
    return () => {
      screenTexture.dispose();
    };
  }, [screenTexture]);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.38) * 0.18;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.28) * 0.035;
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.045;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.42, 0]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[3.65, 0.16, 2.25]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.45}
          roughness={0.24}
        />
      </mesh>

      <mesh position={[0, -0.3, 0.55]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[1.05, 0.018, 0.62]} />
        <meshBasicMaterial color="#334155" transparent opacity={0.75} />
      </mesh>

      <mesh position={[0, -0.19, -0.25]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[2.7, 0.018, 0.08]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.5} />
      </mesh>

      <mesh position={[0, -0.1, -0.52]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[2.45, 0.018, 0.07]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.38} />
      </mesh>

      <mesh position={[0, -0.01, -0.78]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[2.1, 0.018, 0.07]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.3} />
      </mesh>

      <group position={[0, 0.96, -1.02]} rotation={[-0.33, 0, 0]}>
        <mesh>
          <boxGeometry args={[3.35, 2.05, 0.13]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.42}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0, -0.074]}>
          <planeGeometry args={[2.95, 1.66]} />
          <meshBasicMaterial map={screenTexture} />
        </mesh>
      </group>

      <mesh position={[0, -0.52, 1.17]} rotation={[0.18, 0, 0]}>
        <boxGeometry args={[3.2, 0.04, 0.09]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function FloatingChip({
  position,
  chip,
}: {
  position: [number, number, number];
  chip: HeroChip;
}) {
  const ref = useRef<Group>(null);
  const textTexture = useMemo(() => createTextTexture(chip), [chip]);

  useEffect(() => {
    return () => {
      textTexture.dispose();
    };
  }, [textTexture]);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.004;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.06;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[0.92, 0.36, 0.08]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive={chip.color}
          emissiveIntensity={0.42}
          metalness={0.28}
          roughness={0.22}
        />
      </mesh>

      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[0.94, 0.34]} />
        <meshBasicMaterial map={textTexture} transparent />
      </mesh>
    </group>
  );
}

function LiteParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 34 }, (_, index) => {
      const angle = index * 0.68;
      const radius = 3.3 + (index % 4) * 0.42;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          Math.sin(index * 1.2) * 2.15,
          Math.sin(angle) * radius - 0.8,
        ] as [number, number, number],
        size: 0.012 + (index % 3) * 0.006,
      };
    });
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.44} />
        </mesh>
      ))}
    </>
  );
}

export default function HeroScene() {
  const chipPositions = useMemo(() => {
    return heroContent.scene.chips.map((_, index) => {
      const angle = index * 0.82;
      const radius = 2.35 + (index % 3) * 0.34;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(index * 1.15) * 1.85;
      const z = Math.sin(angle) * 0.75 - 0.45;

      return [x, y, z] as [number, number, number];
    });
  }, []);

  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 1.15, 6.2], fov: 43 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.86} />
      <directionalLight position={[4, 5, 4]} intensity={1.9} />
      <pointLight position={[-3, 2, 3]} intensity={2.4} color="#7c3aed" />
      <pointLight position={[3, -2, 3]} intensity={1.8} color="#06b6d4" />

      <LaptopMockup />

      {heroContent.scene.chips.map((chip, index) => {
        const position = chipPositions[index];

        if (!position) return null;

        return (
          <FloatingChip
            key={chip.label}
            position={position}
            chip={chip}
          />
        );
      })}

      <LiteParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.45}
      />
    </Canvas>
  );
}