import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { education } from "../../data/portfolio";
import EducationScene from "./EducationScene";

const educationColors = ["#7c3aed", "#06b6d4", "#22c55e", "#f97316"];

export default function Education() {
  const [selectedEducationId, setSelectedEducationId] = useState(
    education[0]?.id ?? 1
  );

  const selectedIndex = useMemo(() => {
    const index = education.findIndex((item) => item.id === selectedEducationId);

    return index >= 0 ? index : 0;
  }, [selectedEducationId]);

  const selectedEducation = useMemo(() => {
    return education[selectedIndex] || education[0];
  }, [selectedIndex]);

  const selectedColor = educationColors[selectedIndex % educationColors.length];

  const handlePrevious = () => {
    const previousIndex = Math.max(selectedIndex - 1, 0);
    const previousItem = education[previousIndex];

    if (previousItem) {
      setSelectedEducationId(previousItem.id);
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(selectedIndex + 1, education.length - 1);
    const nextItem = education[nextIndex];

    if (nextItem) {
      setSelectedEducationId(nextItem.id);
    }
  };

  return (
    <section className="section education-section" id="education">
      <div className="education-section__header">
        <div>
          <span className="section-label">Education</span>
          <h2>Academic Atlas</h2>
        </div>
      </div>

      <div
        className="education-atlas-layout"
        style={
          {
            "--education-color": selectedColor,
          } as CSSProperties
        }
      >
        <motion.div
          className="education-scene-wrapper"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="education-scene-wrapper__top">
            <span>Academic Atlas</span>
            <strong>{selectedEducation?.school}</strong>
          </div>

          <EducationScene
            selectedEducationId={selectedEducationId}
            onSelectEducation={setSelectedEducationId}
          />

          <div className="education-scene-wrapper__bottom">
            <span>{String(selectedIndex + 1).padStart(2, "0")}</span>
            <strong>{selectedEducation?.degree}</strong>
          </div>
        </motion.div>

        <motion.aside
          className="glass-card education-passport"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
        >
          <span className="education-passport__eyebrow">Academic record</span>

          <AnimatePresence mode="wait">
            {selectedEducation && (
              <motion.div
                key={selectedEducation.id}
                className="education-selected-degree"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <span>{selectedEducation.period}</span>
                <h3>{selectedEducation.school}</h3>
                <strong>{selectedEducation.degree}</strong>
                <p>{selectedEducation.description}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="education-controls">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={selectedIndex === 0}
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedIndex === education.length - 1}
            >
              Next →
            </button>
          </div>

          <div className="education-degree-list">
            {education.map((item, index) => {
              const isActive = item.id === selectedEducationId;
              const color = educationColors[index % educationColors.length];

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`education-degree-card ${
                    isActive ? "education-degree-card--active" : ""
                  }`}
                  onClick={() => setSelectedEducationId(item.id)}
                  style={
                    {
                      "--degree-color": color,
                    } as CSSProperties
                  }
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <div>
                    <strong>{item.school}</strong>
                    <small>{item.period}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}