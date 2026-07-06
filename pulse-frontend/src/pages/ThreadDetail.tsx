import { useState, useEffect, type FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  user_name: string;
  body: string;
  created_at: string;
}

interface Post {
  id: number;
  user_id: number;
  user_name: string;
  title: string;
  body: string;
  topic: string;
  created_at: string;
  comments: Comment[];
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso + "Z").getTime()) / 1000);
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="avatar" aria-hidden>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function ThreadDetail() {
  const { id }             = useParams<{ id: string }>();
  const { user, apiFetch } = useAuth();
  const navigate           = useNavigate();

  const [post, setPost]           = useState<Post | null>(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);
  const [reply, setReply]         = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleReply(e: FormEvent) {
    e.preventDefault();
    setReplyError("");
    setSubmitting(true);
    try {
      const res = await apiFetch(`/posts/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({ body: reply }),
      });
      const data = await res.json();
      if (!res.ok) { setReplyError(data.error || "Failed to post reply"); return; }
      setPost((p) => p ? { ...p, comments: data } : p);
      setReply("");
    } catch {
      setReplyError("Could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteComment(commentId: number) {
    const res = await apiFetch(`/comments/${commentId}`, { method: "DELETE" });
    if (res.ok) {
      const updated = await res.json();
      setPost((p) => p ? { ...p, comments: updated } : p);
    }
  }

  async function deletePost() {
    if (!post) return;
    setDeleting(true);
    const res = await apiFetch(`/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) navigate("/discussions");
    else setDeleting(false);
  }

  if (loading) return <p className="status">Loading…</p>;
  if (notFound || !post) return (
    <div className="detail-not-found">
      <p>Discussion not found.</p>
      <Link to="/discussions" className="back-btn">← Back to Discussions</Link>
    </div>
  );

  return (
    <div className="thread-detail">
      <Link to="/discussions" className="back-btn">← Back to Discussions</Link>

      {/* Post */}
      <div className="thread-post-card">
        <div className="thread-post-header">
          <Avatar name={post.user_name} />
          <div>
            <span className="thread-post-author">{post.user_name}</span>
            <span className="thread-post-time">{timeAgo(post.created_at)}</span>
          </div>
          <span className="badge" style={{ marginLeft: "auto" }}>{post.topic}</span>
        </div>
        <h1 className="thread-post-title">{post.title}</h1>
        <p className="thread-post-body">{post.body}</p>
        {user?.id === post.user_id && (
          <button className="btn-delete" onClick={deletePost} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete post"}
          </button>
        )}
      </div>

      {/* Comments */}
      <div className="comments-section">
        <h2 className="comments-heading">
          {post.comments.length === 0 ? "No replies yet" : `${post.comments.length} ${post.comments.length === 1 ? "reply" : "replies"}`}
        </h2>

        {post.comments.map((c) => (
          <div key={c.id} className="comment-card">
            <div className="comment-header">
              <Avatar name={c.user_name} />
              <span className="comment-author">{c.user_name}</span>
              <span className="comment-time">{timeAgo(c.created_at)}</span>
              {user?.id === c.user_id && (
                <button className="btn-delete-comment" onClick={() => deleteComment(c.id)}>
                  Delete
                </button>
              )}
            </div>
            <p className="comment-body">{c.body}</p>
          </div>
        ))}
      </div>

      {/* Reply box */}
      {user ? (
        <form className="reply-form" onSubmit={handleReply}>
          <h3 className="reply-heading">Add a reply</h3>
          <div className="reply-input-row">
            <Avatar name={user.name} />
            <textarea
              placeholder="Share your thoughts or answer the question…"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              required
              rows={3}
            />
          </div>
          {replyError && <p className="form-error">{replyError}</p>}
          <div className="reply-actions">
            <button className="btn-reply" type="submit" disabled={submitting}>
              {submitting ? "Posting…" : "Post reply"}
            </button>
          </div>
        </form>
      ) : (
        <div className="reply-login-prompt">
          <Link to="/login" className="btn-primary">Log in to reply</Link>
          <span>or <Link to="/register">create a free account</Link></span>
        </div>
      )}
    </div>
  );
}
