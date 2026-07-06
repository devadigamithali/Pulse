import { useState, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Post {
  id: number;
  user_name: string;
  title: string;
  body: string;
  topic: string;
  created_at: string;
  comment_count: number;
}

const TOPICS = ["General", "Housing", "Jobs", "Language", "Visa", "Food", "Activities", "Moving Tips", "Other"];

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso + "Z").getTime()) / 1000);
  if (diff < 60)   return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Discussions() {
  const { user, apiFetch } = useAuth();
  const [posts, setPosts]           = useState<Post[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [title, setTitle]           = useState("");
  const [body, setBody]             = useState("");
  const [topic, setTopic]           = useState("General");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState("");

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.ok ? r.json() : [])
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await apiFetch("/posts", {
        method: "POST",
        body: JSON.stringify({ title, body, topic }),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || "Failed to post"); return; }
      setPosts([data, ...posts]);
      setTitle(""); setBody(""); setTopic("General");
      setShowForm(false);
    } catch {
      setFormError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="page-hero discussions-hero">
        <h1>💬 Community Discussions</h1>
        <p>Ask questions, share tips, and connect with other people settling in Gothenburg.</p>
      </div>

      <div className="discussions-toolbar">
        {user ? (
          <button className="btn-new-post" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "✕ Cancel" : "+ New Post"}
          </button>
        ) : (
          <Link to="/login" className="btn-new-post ghost">Log in to post</Link>
        )}
      </div>

      {showForm && (
        <form className="new-post-form" onSubmit={handleSubmit}>
          <h3>Start a discussion</h3>
          <div className="form-field">
            <label htmlFor="post-title">Title</label>
            <input
              id="post-title"
              type="text"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={140}
            />
          </div>
          <div className="form-field">
            <label htmlFor="post-topic">Topic</label>
            <select id="post-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="post-body">Details</label>
            <textarea
              id="post-body"
              placeholder="Share more context, ask your question, or describe your situation…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={5}
            />
          </div>
          {formError && <p className="form-error">{formError}</p>}
          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Posting…" : "Post discussion"}
          </button>
        </form>
      )}

      {loading && <p className="status">Loading discussions…</p>}

      {!loading && posts.length === 0 && (
        <p className="status">No discussions yet — be the first to post!</p>
      )}

      <div className="thread-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/thread/${post.id}`} className="thread-card">
            <div className="thread-main">
              <span className="badge">{post.topic}</span>
              <h3 className="thread-title">{post.title}</h3>
              <p className="thread-preview">{post.body.length > 120 ? post.body.slice(0, 120) + "…" : post.body}</p>
            </div>
            <div className="thread-meta">
              <span className="thread-author">by {post.user_name}</span>
              <span className="thread-time">{timeAgo(post.created_at)}</span>
              <span className="thread-comments">
                <span className="comment-icon">💬</span> {post.comment_count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
