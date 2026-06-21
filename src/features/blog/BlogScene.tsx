import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CanvasTexture,
  SRGBColorSpace,
  type Group,
} from "three";
import { blogPosts } from "../../data/portfolio";

type BlogSceneProps = {
  selectedPostId: number;
  onSelectPost: (id: number) => void;
};

type BlogPost = (typeof blogPosts)[number];

const blogColors = [
  "#7c3aed",
  "#06b6d4",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#facc15",
];

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

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) {
    lines.push(line);
  }

  lines.slice(0, maxLines).forEach((currentLine, index) => {
    const suffix = index === maxLines - 1 && lines.length > maxLines ? "..." : "";
    ctx.fillText(`${currentLine}${suffix}`, x, y + index * lineHeight);
  });
}

function createArticleTexture({
  post,
  index,
  color,
  isSelected,
}: {
  post: BlogPost;
  index: number;
  color: string;
  isSelected: boolean;
}) {
  const canvas = document.createElement("canvas");
  canvas.width = 820;
  canvas.height = 520;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new CanvasTexture(canvas);
  }

  const background = ctx.createLinearGradient(0, 0, 820, 520);
  background.addColorStop(0, isSelected ? color : "#111827");
  background.addColorStop(0.42, "#0f172a");
  background.addColorStop(1, "#020617");

  ctx.fillStyle = background;
  drawRoundedRect(ctx, 22, 22, 776, 476, 42);
  ctx.fill();

  ctx.strokeStyle = `${color}${isSelected ? "cc" : "77"}`;
  ctx.lineWidth = isSelected ? 5 : 3;
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  drawRoundedRect(ctx, 54, 54, 712, 66, 24);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(86, 87, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e2e8f0";
  ctx.font = "800 26px Poppins, Arial";
  ctx.fillText(`ARTICLE ${String(index + 1).padStart(2, "0")}`, 112, 96);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 22px Poppins, Arial";
  ctx.fillText(post.date, 560, 96);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 42px Poppins, Arial";
  wrapText(ctx, post.title, 58, 190, 700, 48, 3);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "500 24px Poppins, Arial";
  wrapText(ctx, post.description, 60, 356, 690, 34, 3);

  ctx.fillStyle = color;
  drawRoundedRect(ctx, 60, 438, 190, 42, 20);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 20px Poppins, Arial";
  ctx.fillText("READ NOTE", 98, 466);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function getArticlePosition(index: number): [number, number, number] {
  const total = blogPosts.length;
  const middle = (total - 1) / 2;

  const y = (middle - index) * 0.42;
  const x = Math.sin(index * 0.9) * 1.28;
  const z = Math.cos(index * 0.68) * 0.42 - 0.2;

  return [x, y, z];
}

function EditorialPanel({
  post,
  index,
  selectedPostId,
  onSelectPost,
}: {
  post: BlogPost;
  index: number;
  selectedPostId: number;
  onSelectPost: (id: number) => void;
}) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  const isSelected = selectedPostId === post.id;
  const color = blogColors[index % blogColors.length];
  const basePosition = useMemo(() => getArticlePosition(index), [index]);

  const texture = useMemo(() => {
    return createArticleTexture({
      post,
      index,
      color,
      isSelected,
    });
  }, [post, index, color, isSelected]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useFrame((state) => {
    if (!ref.current) return;

    const float = Math.sin(state.clock.elapsedTime * 0.9 + index) * 0.035;

    const targetX = basePosition[0] + (isSelected ? 0.22 : 0);
    const targetY = basePosition[1] + float;
    const targetZ = basePosition[2] + (isSelected ? 0.9 : hovered ? 0.42 : 0);

    ref.current.position.x += (targetX - ref.current.position.x) * 0.08;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.08;
    ref.current.position.z += (targetZ - ref.current.position.z) * 0.08;

    const targetScale = isSelected ? 1.18 : hovered ? 1.06 : 0.9;
    const nextScale = ref.current.scale.x + (targetScale - ref.current.scale.x) * 0.1;

    ref.current.scale.setScalar(nextScale);
    ref.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.22 + index) * 0.08;
    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.18 + index) * 0.035;
  });

  return (
    <group
      ref={ref}
      position={basePosition}
      onClick={(event) => {
        event.stopPropagation();
        onSelectPost(post.id);
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
        <boxGeometry args={[1.64, 1.04, 0.065]} />
        <meshStandardMaterial
          color={isSelected ? color : "#111827"}
          emissive={color}
          emissiveIntensity={isSelected ? 0.54 : hovered ? 0.32 : 0.12}
          roughness={0.26}
          metalness={0.32}
        />
      </mesh>

      <mesh position={[0, 0, 0.038]}>
        <planeGeometry args={[1.58, 0.98]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      <mesh position={[-0.88, 0, 0]}>
        <boxGeometry args={[0.035, 1.02, 0.07]} />
        <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.9 : 0.42} />
      </mesh>
    </group>
  );
}

function EditorialSpine({
  selectedPostId,
  selectedColor,
}: {
  selectedPostId: number;
  selectedColor: string;
}) {
  const selectedIndex = blogPosts.findIndex((post) => post.id === selectedPostId);
  const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;

  const points = useMemo(() => {
    return blogPosts.map((_, index) => getArticlePosition(index));
  }, []);

  const activePoints = useMemo(() => {
    const sliced = points.slice(0, safeIndex + 1);

    if (sliced.length === 1) {
      return [sliced[0], sliced[0]];
    }

    return sliced;
  }, [points, safeIndex]);

  return (
    <>
      <Line
        points={points}
        color="#94a3b8"
        transparent
        opacity={0.18}
        lineWidth={1}
      />

      <Line
        points={activePoints}
        color={selectedColor}
        transparent
        opacity={0.72}
        lineWidth={2.4}
      />
    </>
  );
}

function FloatingInkParticles({ selectedColor }: { selectedColor: string }) {
  const particles = useMemo(() => {
    return Array.from({ length: 34 }, (_, index) => {
      const angle = index * 0.72;
      const radius = 2.4 + (index % 5) * 0.22;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          Math.sin(index * 0.85) * 2.15,
          Math.sin(angle) * 0.75 - 0.6,
        ] as [number, number, number],
        size: 0.012 + (index % 3) * 0.005,
        active: index % 5 === 0,
      };
    });
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial
            color={particle.active ? selectedColor : "#cbd5e1"}
            transparent
            opacity={particle.active ? 0.5 : 0.2}
          />
        </mesh>
      ))}
    </>
  );
}

function ResearchRings({ selectedColor }: { selectedColor: string }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.24) * 0.04;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <group ref={ref} position={[0, 0, -0.55]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.006, 12, 120]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.22} />
      </mesh>

      <mesh rotation={[1.1, 0.35, 0.6]}>
        <torusGeometry args={[3.05, 0.005, 12, 120]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.12} />
      </mesh>

      <mesh rotation={[0.75, -0.55, 0.2]}>
        <torusGeometry args={[1.8, 0.004, 12, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function BlogWorld(props: BlogSceneProps) {
  const ref = useRef<Group>(null);

  const selectedIndex = useMemo(() => {
    const index = blogPosts.findIndex((post) => post.id === props.selectedPostId);

    return index >= 0 ? index : 0;
  }, [props.selectedPostId]);

  const selectedColor = blogColors[selectedIndex % blogColors.length];

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.025;
  });

  return (
    <group ref={ref}>
      <ResearchRings selectedColor={selectedColor} />
      <FloatingInkParticles selectedColor={selectedColor} />

      <EditorialSpine
        selectedPostId={props.selectedPostId}
        selectedColor={selectedColor}
      />

      {blogPosts.map((post, index) => (
        <EditorialPanel
          key={post.id}
          post={post}
          index={index}
          selectedPostId={props.selectedPostId}
          onSelectPost={props.onSelectPost}
        />
      ))}
    </group>
  );
}

export default function BlogScene(props: BlogSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.2]}
      camera={{ position: [0, 0.1, 7.4], fov: 47 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.86} />
      <directionalLight position={[4, 5, 4]} intensity={1.85} />
      <pointLight position={[-3, 2, 3]} intensity={1.8} color="#7c3aed" />
      <pointLight position={[3, -2, 3]} intensity={1.45} color="#06b6d4" />

      <BlogWorld {...props} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.36}
        minAzimuthAngle={-0.32}
        maxAzimuthAngle={0.32}
        minPolarAngle={Math.PI / 2.35}
        maxPolarAngle={Math.PI / 1.72}
      />
    </Canvas>
  );
}