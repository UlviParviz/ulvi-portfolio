import { motion } from "framer-motion";
import { heroContent } from "../../data/portfolio";
import HeroScene from "./HeroScene";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <span className="eyebrow">{heroContent.eyebrow}</span>

        <h1>{heroContent.title}</h1>

        <p>{heroContent.description}</p>

        <div className="hero__actions">
          <a href={heroContent.primaryAction.href} className="btn">
            {heroContent.primaryAction.label}
          </a>

          <a
            href={heroContent.secondaryAction.href}
            download
            className="btn btn--ghost"
          >
            {heroContent.secondaryAction.label}
          </a>
        </div>

        <div className="hero__stats">
          {heroContent.stats.map((stat) => (
            <article key={stat.title}>
              <strong>{stat.title}</strong>
              <span>{stat.description}</span>
            </article>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="hero__canvas"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <div className="hero__canvas-glow" />
        <HeroScene />
      </motion.div>
    </section>
  );
}