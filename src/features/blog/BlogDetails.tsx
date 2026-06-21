import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../../data/portfolio";
import SEO from "../../shared/seo/SEO";

export default function BlogDetails() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="blog-detail-page">
        <div className="blog-detail-shell">
          <span className="section-label">Article not found</span>
          <h1>Blog post was not found.</h1>
          <p>
            The article you are looking for does not exist or may have been
            removed.
          </p>
          <Link to="/">← Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO title={post.title} description={post.description} />

      <main className="blog-detail-page">
        <article className="blog-detail-shell">
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Link to="/" className="blog-detail-shell__back">
            ← Back to home
          </Link>

          <span className="blog-detail-shell__date">{post.date}</span>
          </div>

          <h1>{post.title}</h1>

          <p className="blog-detail-shell__description">{post.description}</p>

          <div className="blog-detail-shell__content">
            <p>{post.content}</p>
          </div>
        </article>
      </main>
    </>
  );
}