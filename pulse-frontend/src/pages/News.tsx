import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { useAuth } from "../context/AuthContext";
import { news } from "../data/seed";

export default function News() {
  const { user, apiFetch } = useAuth();
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!user) return;
    apiFetch("/saved").then((r) => r.ok ? r.json() : []).then(setSavedIds).catch(() => {});
  }, [user, apiFetch]);

  function toggleSave(id: number) {
    const saved = savedIds.includes(id);
    apiFetch(saved ? `/saved/${id}` : "/saved", {
      method: saved ? "DELETE" : "POST",
      body: saved ? undefined : JSON.stringify({ id }),
    }).then((r) => r.ok ? r.json() : savedIds).then(setSavedIds).catch(() => {});
  }

  return (
    <>
      <div className="page-hero news-hero">
        <h1>📰 Local News</h1>
        <p>Housing, transport, immigration, and community updates that affect your daily life.</p>
      </div>
      <div className="feed">
        {news.map((a) => (
          <ArticleCard key={a.id} article={a} isSaved={savedIds.includes(a.id)} onToggle={toggleSave} />
        ))}
      </div>
    </>
  );
}
