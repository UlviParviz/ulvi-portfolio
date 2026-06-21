import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { timeline } from "../../data/portfolio";
import TimelineScene from "./TimelineScene";

const timelineColors = ["#7c3aed", "#06b6d4", "#f97316", "#22c55e", "#ec4899"];

export default function Timeline() {
  const [selectedTimelineId, setSelectedTimelineId] = useState(
    timeline[0]?.id ?? 1
  );

  const selectedIndex = useMemo(() => {
    const index = timeline.findIndex((item) => item.id === selectedTimelineId);
    return index >= 0 ? index : 0;
  }, [selectedTimelineId]);

  const selectedTimeline = useMemo(() => {
    return timeline[selectedIndex] || timeline[0];
  }, [selectedIndex]);

  const selectedColor = timelineColors[selectedIndex % timelineColors.length];

  const progressPercent =
    timeline.length > 1 ? ((selectedIndex + 1) / timeline.length) * 100 : 100;

  const handlePrevious = () => {
    const previousIndex = Math.max(selectedIndex - 1, 0);
    const previousItem = timeline[previousIndex];

    if (previousItem) {
      setSelectedTimelineId(previousItem.id);
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(selectedIndex + 1, timeline.length - 1);
    const nextItem = timeline[nextIndex];

    if (nextItem) {
      setSelectedTimelineId(nextItem.id);
    }
  };

  const chapterLabel = `Chapter ${String(selectedIndex + 1).padStart(2, "0")}`;

  return (
    <section className="section timeline-section" id="timeline">
      <div className="timeline-section__header">
        <div>
          <span className="section-label">Timeline</span>
          <h2>Career Journey</h2>
        </div>
      </div>

      <div
        className="timeline-section__layout"
        style={
          {
            "--timeline-color": selectedColor,
          } as CSSProperties
        }
      >
        <motion.div
          className="timeline-scene-wrapper"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="timeline-scene-wrapper__top">
            <span>{chapterLabel}</span>
            <strong>{selectedTimeline?.title}</strong>
          </div>

          <TimelineScene
            selectedTimelineId={selectedTimelineId}
            onSelectTimeline={setSelectedTimelineId}
          />

          <div className="timeline-scene-wrapper__bottom">
            <span>{selectedIndex + 1}</span>
            <div>
              <i style={{ width: `${progressPercent}%` }} />
            </div>
            <span>{timeline.length}</span>
          </div>
        </motion.div>

        <motion.aside
          className="glass-card timeline-console"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="timeline-console__eyebrow">Selected chapter</span>

          <AnimatePresence mode="wait">
            {selectedTimeline && (
              <motion.div
                key={selectedTimeline.id}
                className="timeline-selected"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <span>{chapterLabel}</span>
                <strong>{selectedTimeline.year}</strong>
                <h3>{selectedTimeline.title}</h3>
                <p>{selectedTimeline.description}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="timeline-controls">
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
              disabled={selectedIndex === timeline.length - 1}
            >
              Next →
            </button>
          </div>

          <div className="timeline-progress">
            <div className="timeline-progress__header">
              <span>Journey progress</span>
              <strong>{Math.round(progressPercent)}%</strong>
            </div>

            <div className="timeline-progress__bar">
              <i style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="timeline-track">
            {timeline.map((item, index) => {
              const isActive = selectedTimelineId === item.id;
              const color = timelineColors[index % timelineColors.length];

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`timeline-track__item ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedTimelineId(item.id)}
                  style={
                    {
                      "--item-color": color,
                    } as CSSProperties
                  }
                >
                  <span>{`Chapter ${String(index + 1).padStart(2, "0")}`}</span>

                  <div>
                    <strong>{item.year}</strong>
                    <small>{item.title}</small>
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