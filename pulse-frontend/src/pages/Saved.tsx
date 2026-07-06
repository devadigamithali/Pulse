import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useAuth } from "../context/AuthContext";
import { festivals, marketplace, activities, foodGuide, news } from "../data/seed";
import type { Article } from "../data/seed";

const ALL_ARTICLES: Article[] = [...festivals, ...marketplace, ...activities, ...foodGuide, ...news];

export default function Saved() {
  const { apiFetch } = useAuth();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    apiFetch("/saved")
      .then((r) => r.ok ? r.json() : [])
      .then(setSavedIds)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [apiFetch]);

  function toggleSave(id: number) {
    const saved = savedIds.includes(id);
    apiFetch(saved ? `/saved/${id}` : "/saved", {
      method: saved ? "DELETE" : "POST",
      body: saved ? undefined : JSON.stringify({ id }),
    }).then((r) => r.ok ? r.json() : savedIds).then(setSavedIds).catch(() => {});
  }

  const savedArticles = ALL_ARTICLES.filter((a) => savedIds.includes(a.id));

  return (
    <>
      <div className="page-hero saved-hero">
        <h1>🔖 Your Saved Articles</h1>
        <p>Everything you've bookmarked, in one place.</p>
      </div>

      {loading && <p className="status">Loading…</p>}

      {!loading && savedArticles.length === 0 && (
        <div className="empty-saved">
          <p>You haven't saved anything yet.</p>
          <p>Browse <Link to="/festivals">Festivals</Link>, <Link to="/food-guide">Food</Link>, <Link to="/moving-guide">Moving Guide</Link>, and more — then hit Save on anything useful.</p>
        </div>
      )}

      <div className="feed">
        {savedArticles.map((a) => (
          <ArticleCard key={a.id} article={a} isSaved onToggle={toggleSave} />
        ))}
      </div>
    </>
  );
}
