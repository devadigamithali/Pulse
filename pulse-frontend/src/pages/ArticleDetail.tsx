import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { allArticles, topicRoute } from "../data/seed";

export default function ArticleDetail() {
  const { id }           = useParams<{ id: string }>();
  const { user, apiFetch } = useAuth();
  const navigate         = useNavigate();
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const article = allArticles.find((a) => a.id === Number(id));

  useEffect(() => {
    if (!user) return;
    apiFetch("/saved").then((r) => r.ok ? r.json() : []).then(setSavedIds).catch(() => {});
  }, [user, apiFetch]);

  function toggleSave() {
    if (!article) return;
    const saved = savedIds.includes(article.id);
    apiFetch(saved ? `/saved/${article.id}` : "/saved", {
      method: saved ? "DELETE" : "POST",
      body: saved ? undefined : JSON.stringify({ id: article.id }),
    }).then((r) => r.ok ? r.json() : savedIds).then(setSavedIds).catch(() => {});
  }

  if (!article) {
    return (
      <div className="detail-not-found">
        <p>Article not found.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>← Go back</button>
      </div>
    );
  }

  const isSaved = savedIds.includes(article.id);
  const backTo  = topicRoute(article.topic);

  return (
    <div className="detail-page">
      <Link to={backTo} className="back-btn">← Back to {article.topic}</Link>

      <article className="detail-card">
        <span className="badge">{article.topic}</span>
        <h1 className="detail-title">{article.title}</h1>
        <p className="detail-summary">{article.summary}</p>
        <hr className="detail-divider" />
        <p className="detail-body">{article.body}</p>

        <div className="detail-actions">
          {user ? (
            <button
              className={`save-btn ${isSaved ? "saved" : ""}`}
              onClick={toggleSave}
            >
              {isSaved ? "✓ Saved" : "Save this article"}
            </button>
          ) : (
            <Link to="/login" className="btn-primary detail-login-cta">
              Log in to save
            </Link>
          )}
        </div>
      </article>

      {/* Related articles from the same topic */}
      <RelatedArticles current={article.id} topic={article.topic} />
    </div>
  );
}

function RelatedArticles({ current, topic }: { current: number; topic: string }) {
  const related = allArticles.filter((a) => a.topic === topic && a.id !== current).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="related-section">
      <h2 className="related-heading">More in {topic}</h2>
      <div className="related-grid">
        {related.map((a) => (
          <Link key={a.id} to={`/article/${a.id}`} className="related-card">
            <span className="badge">{a.topic}</span>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
