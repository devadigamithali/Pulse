require("dotenv").config();
const express  = require("express");
const Database = require("better-sqlite3");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const cors     = require("cors");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const db = new Database("pulse.db");
const JWT_SECRET = process.env.JWT_SECRET || "pulse_dev_secret";
const PORT = process.env.PORT || 4000;

// ── Tables ──────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT    UNIQUE NOT NULL,
    name       TEXT    NOT NULL,
    password   TEXT    NOT NULL,
    created_at TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS saved_v2 (
    user_id    INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    UNIQUE(user_id, article_id)
  );

  CREATE TABLE IF NOT EXISTS posts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    user_name  TEXT    NOT NULL,
    title      TEXT    NOT NULL,
    body       TEXT    NOT NULL,
    topic      TEXT    NOT NULL DEFAULT 'General',
    created_at TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS comments (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id    INTEGER NOT NULL,
    user_id    INTEGER NOT NULL,
    user_name  TEXT    NOT NULL,
    body       TEXT    NOT NULL,
    created_at TEXT    DEFAULT (datetime('now'))
  );
`);

// One-time migration from old single-column saved table
const hasSavedV2 = db.prepare(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='saved_v2'"
).get();
const hasOldSaved = db.prepare(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='saved'"
).get();
if (!hasSavedV2 && hasOldSaved) {
  db.exec(`
    CREATE TABLE saved_v2 (
      user_id INTEGER NOT NULL,
      article_id INTEGER NOT NULL,
      UNIQUE(user_id, article_id)
    );
    INSERT INTO saved_v2 (user_id, article_id) SELECT 0, article_id FROM saved;
    DROP TABLE saved;
  `);
}

// ── Articles (in-memory, read-only) ─────────────────────────────────────────

const articles = [
  {
    id: 1,
    title: "Gothenburg Film Festival — January",
    topic: "Festivals",
    summary: "One of the world's largest winter film festivals with free open-air screenings at Bergsjön lake.",
    body: "Every January, Gothenburg hosts its legendary Film Festival. The outdoor screening on frozen Bergsjön is unmissable — wrap up warm and bring a thermos of glögg. Tickets to indoor screenings often sell out fast, so register at goteborgfilmfestival.se early. Most venues are around Götaplatsen and easily reached by tram.",
  },
  {
    id: 2,
    title: "Liseberg Amusement Park Opens — April",
    topic: "Festivals",
    summary: "Scandinavia's largest amusement park kicks off its season — a 3-minute tram ride from Korsvägen.",
    body: "Liseberg is practically a Gothenburg institution. The spring opening in April draws huge crowds for the first rides and outdoor concerts. Take tram 5 or 6 to Korsvägen. The park is free to enter — you pay per ride or buy a wristband. In summer, the garden concerts run until late.",
  },
  {
    id: 3,
    title: "Göteborg Culture Festival — August",
    topic: "Festivals",
    summary: "Ten days of free street performances, world music, and food on Avenyn and Götaplatsen.",
    body: "The Culture Festival takes over the city centre every August. All performances are free and the main stage on Avenyn hosts acts from dozens of countries. It's a wonderful way to meet neighbours and try international street food. Check kulturkalaset.se for the programme closer to the date.",
  },
  {
    id: 4,
    title: "Lucia Parade — 13 December",
    topic: "Festivals",
    summary: "Candlelit procession through Domkyrkan cathedral — a deeply moving Swedish tradition.",
    body: "Lucia is one of Sweden's most beautiful traditions. A procession of singers in white gowns carrying candles winds through Domkyrkan on the morning of 13 December. It's very family-friendly and deeply moving even if you don't speak Swedish. Arrive early — the church fills up quickly.",
  },
  {
    id: 5,
    title: "Hammarkullen Carnival — July",
    topic: "Festivals",
    summary: "Scandinavia's largest multicultural street carnival, born in Gothenburg's most diverse neighbourhood.",
    body: "Hammarkullen Carnival is one of the most joyful events in the city and a true celebration of Gothenburg's diversity. Samba schools, steel drum bands, and dancers from dozens of cultures fill the streets. It starts at Hammarkulletorget — take tram 6 to Hammarkullen. Volunteer spots are available at hammarkullenkarnevalen.se.",
  },
  {
    id: 6,
    title: "Surströmming Day at Haga — September",
    topic: "Festivals",
    summary: "Traditional Swedish fermented herring tasting in the charming cobblestone district of Haga.",
    body: "Surströmming (fermented herring) is famously pungent but trying it is a genuine rite of passage. The September tasting event in Haga Nygata is good-humoured and welcoming to curious newcomers. Pair it with flatbread, red onion, and sour cream — and maybe hold your nose for the first sniff. It tastes much better than it smells.",
  },
  {
    id: 7,
    title: "IKEA Hemnes bed frame — 500 SEK, Majorna",
    topic: "Marketplace",
    summary: "140 cm bed frame in good condition, disassembled and ready for collection in Majorna.",
    body: "Moving out after two years in Gothenburg. IKEA Hemnes bed frame, 140 cm, white stain. Solid wood, a few small scuffs but structurally perfect. All screws and fixings included. Collection only from Majorna — I can help carry it down to a car. Message to arrange a viewing. 500 SEK firm.",
  },
  {
    id: 8,
    title: "Community Bike Swap — Frölunda Torg, Saturdays",
    topic: "Marketplace",
    summary: "Free weekly bike exchange event at Frölunda Torg shopping centre car park.",
    body: "Every Saturday morning from 10:00–13:00, a volunteer-run bike swap happens in the Frölunda Torg car park. Bring a bike you no longer use and swap it for one that suits you better, or pick one up for free if you're just arriving. Bring ID. Helmets also available. No registration needed — just show up.",
  },
  {
    id: 9,
    title: "Swedish language books — SFI levels A1–B1",
    topic: "Marketplace",
    summary: "Free to take — a box of Swedish textbooks left at the Lindholmen library community shelf.",
    body: "Finished my SFI course and leaving a box of A1–B1 Swedish workbooks at the community shelf in Lindholmen library. Includes Rivstart A1+A2, Mål 1, and a Swedish–English dictionary. First come, first served — please take only what you'll use so others can benefit.",
  },
  {
    id: 10,
    title: "Kitchen starter pack — pots, plates, cutlery",
    topic: "Marketplace",
    summary: "8-piece kitchen set for 300 SEK — perfect for newly arrived students and renters in Hisingen.",
    body: "Selling a kitchen starter pack: 2 pots, 1 frying pan, 4 plates, 4 bowls, cutlery for 4. All clean and functional. Great for anyone arriving without household goods. Collection from Hisingen (near Backaplan). 300 SEK for the full set — no splitting.",
  },
  {
    id: 11,
    title: "Donated winter coats — Räddningsmissionen",
    topic: "Marketplace",
    summary: "Free donated winter coats sizes S–L available weekdays at Räddningsmissionen charity shop.",
    body: "Räddningsmissionen charity runs a free coat donation scheme each autumn. Sizes S to L available most weekdays — call ahead to confirm stock on 031-700 99 00. Located centrally near Järntorget. They also occasionally have boots and warm accessories. No appointment needed, just bring ID.",
  },
  {
    id: 12,
    title: "Winter tires 195/65 R15 — 800 SEK, Angered",
    topic: "Marketplace",
    summary: "Set of 4 Nokian winter tires in good condition. Bring a car with matching rims.",
    body: "Selling four Nokian Hakkapeliitta winter tires, 195/65 R15, about 60% tread left. Perfectly legal for Swedish winters. 800 SEK for all four. Collection from Angered. You'll need to bring a car with 15-inch rims or your own tire bags. Available weekends only.",
  },
  {
    id: 13,
    title: "Swedish for Immigrants (SFI) — Free Classes",
    topic: "Community",
    summary: "Enrol in free Swedish language classes via Göteborgs Stad — starts any Monday.",
    body: "SFI (Svenska för invandrare) is a free government-funded Swedish language course available to all registered residents. Courses run at multiple sites across Gothenburg and you can start on any Monday after registration. Enrol online at goteborg.se/sfi or visit the Vuxenutbildning office in central Gothenburg. You'll be assessed and placed in the right level.",
  },
  {
    id: 14,
    title: "Newcomers Running Club — Sundays, Slottsskogen",
    topic: "Community",
    summary: "Friendly group run every Sunday at 10:00 from the main entrance to Slottsskogen park.",
    body: "All paces welcome — this is a social run, not a race. Meet at the main Slottsskogen entrance (tram 1 or 6 to Linnéplatsen) at 10:00 on Sundays. Routes are 5 or 8 km. Afterwards, the group usually heads to a nearby café. No registration needed, just show up in running shoes.",
  },
  {
    id: 15,
    title: "Language Café at Stadsmissionen — Wednesdays",
    topic: "Community",
    summary: "Practice Swedish or English in a relaxed setting with free fika every Wednesday at 18:00.",
    body: "Stadsmissionen runs a weekly Language Café where newcomers and locals chat over coffee and cake. It's completely informal — no classes, no pressure. Tables are arranged by language level (beginner Swedish, conversational Swedish, English). Free to attend. Located at Stadsmissionen Göteborg, Södra Allégatan 4.",
  },
  {
    id: 16,
    title: "Padel for Beginners — Frölundaborg Saturdays",
    topic: "Community",
    summary: "Group padel sessions for beginners, 150 SEK per person, all equipment provided.",
    body: "Frölundaborg sports centre runs newcomer-friendly padel sessions every Saturday afternoon. 150 SEK covers 90 minutes of court time and racket hire. No experience needed. Sessions are bilingual (Swedish/English). Book a spot via Frölundaborg's website or call the reception. Tram 2 to Frölunda Torg, then a 5-minute walk.",
  },
  {
    id: 17,
    title: "Knitting & Crafts Circle — Gamlestaden",
    topic: "Community",
    summary: "Monthly crafts meetup in Gamlestaden — free to join, all skill levels warmly welcomed.",
    body: "The Gamlestaden crafts circle meets on the first Thursday of each month at the local library. Bring whatever you're working on — knitting, embroidery, crochet — or come with nothing and just meet people. Swedes are notoriously friendly in these settings. Tea and biscuits provided. Free entry.",
  },
  {
    id: 18,
    title: "Volunteer at Hammarkullen Carnival",
    topic: "Community",
    summary: "Help organise Scandinavia's largest multicultural carnival — sign up at hammarkullenkarnevalen.se.",
    body: "The Hammarkullen Carnival relies on hundreds of volunteers each year. Roles range from costume making and route stewarding to technical support and children's activities. It's one of the best ways to make friends quickly and feel genuinely rooted in Gothenburg. Sign up early at hammarkullenkarnevalen.se — spaces fill fast.",
  },
  {
    id: 19,
    title: "Gothenburg City Council Approves 2,000 New Homes",
    topic: "News",
    summary: "The city council has approved funding for 2,000 new social and affordable housing units across Hisingen and Angered.",
    body: "Göteborgs Stad announced this week that 2,000 new homes will be built over the next three years, prioritising areas of Hisingen and Angered. Around 40% will be classified as affordable rental housing accessible through the Boplats queue. The development is part of the city's 2026–2030 housing strategy.",
  },
  {
    id: 20,
    title: "Gothenburg–Malmö Express Train Launches",
    topic: "News",
    summary: "A new high-speed rail connection cuts journey time between Gothenburg and Malmö to 2 hours 20 minutes.",
    body: "SJ launched the new express service on the West Main Line this month. The Gothenburg–Malmö journey is now 2 hours 20 minutes, making same-day travel to both cities practical. Prices start at 149 SEK booked in advance. The train stops at Varberg and Halmstad.",
  },
  {
    id: 21,
    title: "SFI Enrolment Reaches Record 12,000 Students",
    topic: "News",
    summary: "Free Swedish language courses in Västra Götaland are at record enrolment — expect some waiting lists.",
    body: "Vuxenutbildning Gothenburg reports record demand for SFI courses in 2026. While courses remain free, some popular time slots have waiting lists of 2–4 weeks. Online evening courses have opened additional capacity. The fastest way to secure a place is to register early on the goteborg.se portal.",
  },
  {
    id: 22,
    title: "Migrationsverket Cuts Work Permit Wait to 3 Months",
    topic: "News",
    summary: "Processing time for new work permits has been reduced to roughly 3 months after a major backlog was cleared.",
    body: "The Swedish Migration Agency (Migrationsverket) announced average processing times for work permit applications have dropped from 8 months to approximately 3 months following recruitment of 200 new case officers. Straightforward applications submitted online are being processed fastest. Check your case status at migrationsverket.se.",
  },
  {
    id: 23,
    title: "Gothenburg Named European Green Capital 2027",
    topic: "News",
    summary: "The European Commission selected Gothenburg as its Green Capital for 2027, recognising its cycling infrastructure and clean energy transition.",
    body: "Gothenburg beat 14 other finalists to win the European Green Capital Award for 2027. The city was recognised for its 800 km of bike lanes, 100% renewable electricity supply, and zero-emission tram network. The award comes with €600,000 in EU funding for green projects and a year of showcasing events.",
  },
  {
    id: 24,
    title: "New Community Health Centre Opens in Biskopsgården",
    topic: "News",
    summary: "A new NHS-style primary care clinic has opened in Biskopsgården, reducing pressure on Sahlgrenska Hospital A&E.",
    body: "Västra Götalandsregionen opened a new vårdcentral (GP clinic) in Biskopsgården this month, offering drop-in appointments in Swedish, Arabic, and Somali. The clinic also provides mental health support and translation services. Register at 1177.se to make it your listed clinic.",
  },
];


// ── Auth middleware ──────────────────────────────────────────────────────────

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token  = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}


// ── Auth routes ──────────────────────────────────────────────────────────────

app.post("/auth/register", async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ error: "Email, name, and password are required" });
  }
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return res.status(409).json({ error: "An account with that email already exists" });
  }
  const hash = await bcrypt.hash(password, 12);
  const result = db.prepare("INSERT INTO users (email, name, password) VALUES (?, ?, ?)").run(email, name, hash);
  const user = { id: result.lastInsertRowid, name, email };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!row) return res.status(401).json({ error: "Invalid email or password" });
  const match = await bcrypt.compare(password, row.password);
  if (!match) return res.status(401).json({ error: "Invalid email or password" });
  const user = { id: row.id, name: row.name, email: row.email };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user });
});

app.get("/auth/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});


// ── Articles ─────────────────────────────────────────────────────────────────

app.get("/articles", (_req, res) => res.json(articles));

app.get("/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === Number(req.params.id));
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});


// ── Saved (per-user) ─────────────────────────────────────────────────────────

function getSavedIds(userId) {
  return db.prepare("SELECT article_id FROM saved_v2 WHERE user_id = ?")
    .all(userId)
    .map((r) => r.article_id);
}

app.get("/saved", requireAuth, (req, res) => {
  res.json(getSavedIds(req.user.id));
});

app.post("/saved", requireAuth, (req, res) => {
  const id = Number(req.body.id);
  db.prepare("INSERT OR IGNORE INTO saved_v2 (user_id, article_id) VALUES (?, ?)").run(req.user.id, id);
  res.json(getSavedIds(req.user.id));
});

app.delete("/saved/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  db.prepare("DELETE FROM saved_v2 WHERE user_id = ? AND article_id = ?").run(req.user.id, id);
  res.json(getSavedIds(req.user.id));
});


// ── Posts (community threads) ────────────────────────────────────────────────

app.get("/posts", (_req, res) => {
  const posts = db.prepare(`
    SELECT p.*, COUNT(c.id) AS comment_count
    FROM posts p
    LEFT JOIN comments c ON c.post_id = p.id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `).all();
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const comments = db.prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC").all(post.id);
  res.json({ ...post, comments });
});

app.post("/posts", requireAuth, (req, res) => {
  const { title, body, topic } = req.body;
  if (!title?.trim() || !body?.trim()) return res.status(400).json({ error: "Title and body are required" });
  const result = db.prepare(
    "INSERT INTO posts (user_id, user_name, title, body, topic) VALUES (?, ?, ?, ?, ?)"
  ).run(req.user.id, req.user.name, title.trim(), body.trim(), topic?.trim() || "General");
  const post = db.prepare("SELECT *, 0 AS comment_count FROM posts WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(post);
});

app.delete("/posts/:id", requireAuth, (req, res) => {
  const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.user_id !== req.user.id) return res.status(403).json({ error: "Not your post" });
  db.prepare("DELETE FROM comments WHERE post_id = ?").run(post.id);
  db.prepare("DELETE FROM posts WHERE id = ?").run(post.id);
  res.json({ ok: true });
});

// ── Comments ─────────────────────────────────────────────────────────────────

app.post("/posts/:id/comments", requireAuth, (req, res) => {
  const { body } = req.body;
  if (!body?.trim()) return res.status(400).json({ error: "Comment body is required" });
  const post = db.prepare("SELECT id FROM posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  db.prepare(
    "INSERT INTO comments (post_id, user_id, user_name, body) VALUES (?, ?, ?, ?)"
  ).run(post.id, req.user.id, req.user.name, body.trim());
  const comments = db.prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC").all(post.id);
  res.status(201).json(comments);
});

app.delete("/comments/:id", requireAuth, (req, res) => {
  const comment = db.prepare("SELECT * FROM comments WHERE id = ?").get(req.params.id);
  if (!comment) return res.status(404).json({ error: "Comment not found" });
  if (comment.user_id !== req.user.id) return res.status(403).json({ error: "Not your comment" });
  db.prepare("DELETE FROM comments WHERE id = ?").run(comment.id);
  const comments = db.prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC").all(comment.post_id);
  res.json(comments);
});


app.listen(PORT, () => {
  console.log(`Pulse server running on http://localhost:${PORT}`);
});
