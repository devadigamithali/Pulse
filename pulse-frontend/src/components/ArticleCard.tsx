import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export interface Article {
  id: number;
  title: string;
  topic: string;
  summary: string;
  body: string;
}

interface Props {
  article: Article;
  isSaved?: boolean;
  onToggle?: (id: number) => void;
}

export default function ArticleCard({ article, isSaved, onToggle }: Props) {
  const { user } = useAuth();

  return (
    <div className="card">
      <span className="badge">{article.topic}</span>
      <Link to={`/article/${article.id}`} className="card-link">
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
      </Link>
      <div className="card-footer">
        {user && onToggle ? (
          <button
            className={`save-btn ${isSaved ? "saved" : ""}`}
            onClick={() => onToggle(article.id)}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        ) : !user ? (
          <Link to="/login" className="save-hint">Log in to save</Link>
        ) : null}
        <Link to={`/article/${article.id}`} className="read-more">Read more →</Link>
      </div>
    </div>
  );
}
