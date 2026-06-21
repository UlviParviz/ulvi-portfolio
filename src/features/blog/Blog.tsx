import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { blogPosts } from "../../data/portfolio";
import BlogScene from "./BlogScene";

const blogColors = [
  "#7c3aed",
  "#06b6d4",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#facc15",
];

export default function Blog() {
  const [selectedPostId, setSelectedPostId] = useState(blogPosts[0]?.id ?? 1);

  const selectedIndex = useMemo(() => {
    const index = blogPosts.findIndex((post) => post.id === selectedPostId);

    return index >= 0 ? index : 0;
  }, [selectedPostId]);

  const selectedPost = useMemo(() => {
    return blogPosts[selectedIndex] || blogPosts[0];
  }, [selectedIndex]);

  const selectedColor = blogColors[selectedIndex % blogColors.length];

  const progressPercent =
    blogPosts.length > 1 ? ((selectedIndex + 1) / blogPosts.length) * 100 : 100;

  const handlePrevious = () => {
    const previousIndex = Math.max(selectedIndex - 1, 0);
    const previousPost = blogPosts[previousIndex];

    if (previousPost) {
      setSelectedPostId(previousPost.id);
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(selectedIndex + 1, blogPosts.length - 1);
    const nextPost = blogPosts[nextIndex];

    if (nextPost) {
      setSelectedPostId(nextPost.id);
    }
  };

  return (
    <section className="section blog-section" id="blog">
      <div className="blog-section__header">
        <div>
          <span className="section-label">Technical writing</span>
          <h2>Editorial Knowledge Deck</h2>
        </div>
      </div>

      <div
        className="blog-editorial-layout"
        style={
          {
            "--blog-color": selectedColor,
          } as CSSProperties
        }
      >
        <motion.div
          className="blog-visual-stage"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="blog-visual-stage__top">
            <span>Editorial Deck</span>
            <strong>{selectedPost?.title}</strong>
          </div>

          <BlogScene
            selectedPostId={selectedPostId}
            onSelectPost={setSelectedPostId}
          />

          <div className="blog-visual-stage__bottom">
            <span>{String(selectedIndex + 1).padStart(2, "0")}</span>

            <div>
              <i style={{ width: `${progressPercent}%` }} />
            </div>

            <span>{String(blogPosts.length).padStart(2, "0")}</span>
          </div>
        </motion.div>

        <motion.aside
          className="glass-card blog-command-panel"
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
        >
          <span className="blog-command-panel__eyebrow">Featured article</span>

          <AnimatePresence mode="wait">
            {selectedPost && (
              <motion.article
                key={selectedPost.id}
                className="blog-featured-article"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <span>{selectedPost.date}</span>

                <h3>{selectedPost.title}</h3>

                <p>{selectedPost.description}</p>

                <Link to={`/blog/${selectedPost.slug}`}>
                  Read full article →
                </Link>
              </motion.article>
            )}
          </AnimatePresence>

          <div className="blog-article-controls">
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
              disabled={selectedIndex === blogPosts.length - 1}
            >
              Next →
            </button>
          </div>

          <div className="blog-reading-progress">
            <div className="blog-reading-progress__header">
              <span>Reading library progress</span>
              <strong>{Math.round(progressPercent)}%</strong>
            </div>

            <div className="blog-reading-progress__bar">
              <i style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="blog-index-list">
            {blogPosts.map((post, index) => {
              const isActive = selectedPostId === post.id;
              const color = blogColors[index % blogColors.length];

              return (
                <button
                  key={post.id}
                  type="button"
                  className={`blog-index-card ${
                    isActive ? "blog-index-card--active" : ""
                  }`}
                  onClick={() => setSelectedPostId(post.id)}
                  style={
                    {
                      "--post-color": color,
                    } as CSSProperties
                  }
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <div>
                    <strong>{post.title}</strong>
                    <small>{post.date}</small>
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