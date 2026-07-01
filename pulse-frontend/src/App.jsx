// Notice what changed from the CDN version:
//  - we IMPORT the hooks instead of pulling them off a global React
//  - we EXPORT the component so other files can use it
//  - the JSX and logic are otherwise identical
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    fetch("/articles").then((r) => r.json()).then(setArticles);
    fetch("/saved").then((r) => r.json()).then(setSavedIds);
  }, []);

  function toggleSave(id) {
    const isSaved = savedIds.includes(id);

    if (isSaved) {
      fetch("/saved/" + id, { method: "DELETE" })
        .then((r) => r.json())
        .then(setSavedIds);
    } else {
      fetch("/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      })
        .then((r) => r.json())
        .then(setSavedIds);
    }
  }

  return (
    <div>
      <h1>Pulse</h1>
      <p>Today's articles</p>

      {articles.map((article) => {
        const isSaved = savedIds.includes(article.id);

        return (
          <div className="article" key={article.id}>
            <h2>{article.title}</h2>
            <div className="topic">{article.summary}</div>
            <button onClick={() => toggleSave(article.id)}>
              {isSaved ? "Saved ✓" : "Save"}
            </button>
          </div>
        );
      })}
    </div>
  );
}