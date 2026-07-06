import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const sections = [
  { to: "/festivals",    badge: "Festivals",    title: "Cultural Festivals",      desc: "Events, celebrations, and community gatherings in Gothenburg." },
  { to: "/marketplace",  badge: "Marketplace",  title: "Buy & Sell Essentials",   desc: "Moving gear, furniture, bikes, and household items." },
  { to: "/activities",   badge: "Community",    title: "Group Activities",        desc: "Language cafés, running clubs, padel, and volunteer events." },
  { to: "/moving-guide", badge: "Guide",        title: "Moving Checklist",        desc: "Personnummer, bank account, Boplats, Västtrafik — step by step." },
  { to: "/visa-info",    badge: "Visa",         title: "Visa & Permits",          desc: "Work permits, family reunification, permanent residence, citizenship." },
  { to: "/food-guide",   badge: "Food",         title: "Best Places to Eat",      desc: "Markets, cafés, food trucks, and global grocery stores." },
  { to: "/weather",      badge: "Weather",      title: "Gothenburg Weather",      desc: "Season-by-season guide with packing tips for every month." },
  { to: "/news",         badge: "News",         title: "Local News",              desc: "Housing, transport, immigration, and community updates." },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <div className="home-hero">
        <div className="home-hero-content">
          <h1>Welcome to Gothenburg 🇸🇪</h1>
          <p>Everything you need to settle in, connect, and feel at home in Sweden's most welcoming city.</p>
          {!user && (
            <div className="hero-cta">
              <Link to="/register" className="btn-primary">Get started — it's free</Link>
              <Link to="/login" className="btn-ghost">Already a member? Log in</Link>
            </div>
          )}
          {user && (
            <p className="hero-welcome">Good to have you here, {user.name.split(" ")[0]}! Pick a section below.</p>
          )}
        </div>
      </div>

      <section className="dashboard">
        <h2>Newcomer Hub</h2>
        <div className="dashboard-grid">
          {sections.map(({ to, badge, title, desc }) => (
            <Link key={to} to={to} className="feature-card">
              <span className="badge">{badge}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
