export const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
  SCSS: "#CC6699",
  Python: "#3776AB",
  Go: "#00ADD8",
  Java: "#007396",
  Vue: "#42B883",
  PHP: "#777BB4",
  CSharp: "#239120",
  "C#": "#239120",
  C: "#A8B9CC",
  "C++": "#00599C",
  Dart: "#0175C2",
  Kotlin: "#7F52FF",
  Swift: "#F05138",
  Shell: "#89E051",
  Dockerfile: "#2496ED",
};

export const getRepoColor = (language: string | null) => {
  if (!language) return "#7c3aed";

  return languageColors[language] || "#7c3aed";
};