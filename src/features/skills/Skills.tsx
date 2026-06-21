import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills, type SkillItem } from "../../data/portfolio";
import { useTheme } from "../../shared/hooks/useTheme";
import SkillsScene from "./SkillsScene";

function getSkillVisual(skill: SkillItem, isLight: boolean) {
  return {
    color: isLight ? skill.lightColor : skill.color,
    glow: isLight ? skill.lightGlow : skill.glow,
  };
}

export default function Skills() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkillId, setSelectedSkillId] = useState(skills[0]?.id ?? 1);
  const [hoveredSkillId, setHoveredSkillId] = useState<number | undefined>();

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))];
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;

    return skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const exists = filteredSkills.some((skill) => skill.id === selectedSkillId);

    if (!exists && filteredSkills[0]) {
      setSelectedSkillId(filteredSkills[0].id);
    }
  }, [filteredSkills, selectedSkillId]);

  const selectedSkill = useMemo(() => {
    const previewId = hoveredSkillId || selectedSkillId;

    return skills.find((skill) => skill.id === previewId) || skills[0];
  }, [hoveredSkillId, selectedSkillId]);

  const selectedSkillVisual = getSkillVisual(selectedSkill, isLight);

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category] =
        category === "All"
          ? skills.length
          : skills.filter((skill) => skill.category === category).length;

      return acc;
    }, {});
  }, [categories]);

  const SelectedIcon = selectedSkill.Icon;

  return (
    <section className="section skills-section" id="skills">
      <div className="skills-section__header">
        <div>
          <span className="section-label">Optimized stack</span>
          <h2>Tech Orbit System</h2>
        </div>
      </div>

      <div className="skills-orbit-layout">
        <motion.aside
          className="glass-card skills-dashboard"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="skills-dashboard__header">
            <span>Stack control</span>
            <strong>{skills.length} technologies</strong>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedSkill.id}-${theme}`}
              className="skill-preview-card"
              style={
                {
                  "--skill-color": selectedSkillVisual.color,
                  "--skill-glow": selectedSkillVisual.glow,
                } as CSSProperties
              }
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <motion.div
                className="skill-preview-card__icon"
                initial={{ rotate: -12, scale: 0.86 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <SelectedIcon />
              </motion.div>

              <div>
                <span>{selectedSkill.category}</span>
                <h3>{selectedSkill.name}</h3>
                <p>{selectedSkill.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="skills-category-cloud">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                <span>{category}</span>
                <small>{categoryCounts[category]}</small>
              </button>
            ))}
          </div>

          <div className="skills-compact-list">
            {filteredSkills.map((skill) => {
              const Icon = skill.Icon;
              const isActive = selectedSkillId === skill.id;
              const skillVisual = getSkillVisual(skill, isLight);

              return (
                <button
                  key={`${skill.id}-${theme}`}
                  type="button"
                  className={isActive ? "active" : ""}
                  onClick={() => setSelectedSkillId(skill.id)}
                  onMouseEnter={() => setHoveredSkillId(skill.id)}
                  onMouseLeave={() => setHoveredSkillId(undefined)}
                  style={
                    {
                      "--skill-color": skillVisual.color,
                      "--skill-glow": skillVisual.glow,
                    } as CSSProperties
                  }
                >
                  <Icon />
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>
        </motion.aside>

        <motion.div
          className="skills-orbit-stage"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="skills-orbit-stage__top">
            <span>Live 3D orbit</span>
            <strong>{selectedSkill.name}</strong>
          </div>

          <SkillsScene
            key={theme}
            activeCategory={activeCategory}
            selectedSkillId={selectedSkillId}
            onSelectSkill={setSelectedSkillId}
            onHoverSkill={setHoveredSkillId}
            isLight={isLight}
          />
        </motion.div>
      </div>
    </section>
  );
}