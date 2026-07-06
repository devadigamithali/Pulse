import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { useAuth } from "../context/AuthContext";
import { foodGuide } from "../data/seed";

export default function FoodGuide() {
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
      <div className="page-hero food-hero">
        <h1>🍜 Where to Eat</h1>
        <p>Markets, classics, street food, and the essentials for your first grocery shop.</p>
      </div>
      <div className="feed">
        {foodGuide.map((a) => (
          <ArticleCard key={a.id} article={a} isSaved={savedIds.includes(a.id)} onToggle={toggleSave} />
        ))}
      </div>
    </>
  );
}
