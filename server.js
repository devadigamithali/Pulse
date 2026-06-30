// =============================================================
//  server.js  —  saved articles now live in a real database,
//                so they survive restarts.
//  First run:   npm install better-sqlite3
//  Then run:    node server.js
// =============================================================


const express = require("express");

// NEW: bring in the database tool you just installed.
const Database = require("better-sqlite3");

const app = express();
app.use(express.static("public"));
app.use(express.json());


// NEW: open a database file called "pulse.db".
// If the file doesn't exist yet, it gets created automatically.
const db = new Database("pulse.db");

// NEW: make sure our table exists.
// A table is like a spreadsheet: this one has a single column,
// "article_id", and UNIQUE means the same id can't be saved twice.
db.exec(`
  CREATE TABLE IF NOT EXISTS saved (
    article_id INTEGER UNIQUE
  )
`);


// Articles stay as a simple list in code (they don't change,
// so they don't need the database yet).
const articles = [
  {
    id: 1,
    title: "The quiet rise of local-first software",
    topic: "Technology",
    summary: "Apps that work offline first are changing how we think about data.",
    body:
      "For years, most apps assumed a constant connection. Local-first software flips that: your data lives on your device first, and syncs when it can.\n\nThe result feels faster and keeps working on a train or a plane. It also hands people more control over their own information.",
  },
  {
    id: 2,
    title: "Walking, the most underrated medicine",
    topic: "Health",
    summary: "Simple, consistent movement does more than most interventions.",
    body:
      "No equipment, no membership, no app required. A daily walk improves mood, sleep, and heart health in ways researchers keep confirming.\n\nThe trick is consistency over intensity. Short walks most days beat the occasional heroic effort.",
  },
  {
    id: 3,
    title: "The four-day week, two years on",
    topic: "Business",
    summary: "Companies that shortened the week share what actually changed.",
    body:
      "Early fears about lost output mostly didn't materialise. Many teams kept results steady while reclaiming a day.\n\nWhat helped most was cutting low-value meetings and protecting focus time, not simply working faster.",
  },
  {
    id: 4,
    title: "What deep-sea sensors tell us",
    topic: "Science",
    summary: "A network of ocean instruments is filling gaps in our climate picture.",
    body:
      "The deep ocean is hard to observe, yet it stores enormous amounts of heat and carbon. New sensors send back data from places we rarely reach.\n\nThat steady stream is helping scientists sharpen their models of how the climate is changing.",
  },
  {
    id: 5,
    title: "The slow return of the long read",
    topic: "Culture",
    summary: "Readers are rediscovering depth in a world tuned for speed.",
    body:
      "After years of skimming, many readers are seeking out longer, slower pieces again. Depth turns out to be its own kind of relief.\n\nPublishers are noticing, and making room for writing that asks for more than a glance.",
  },
];


// A small helper so we don't repeat ourselves: read every saved id
// from the database and return them as a plain list like [2, 4].
function getSavedIds() {
  // SELECT pulls rows from the table. Each row is like { article_id: 2 }.
  const rows = db.prepare("SELECT article_id FROM saved").all();
  // Turn the rows into just the numbers.
  return rows.map((row) => row.article_id);
}


app.get("/articles", (request, response) => {
  response.json(articles);
});

app.get("/articles/:id", (request, response) => {
  const id = Number(request.params.id);
  const article = articles.find((a) => a.id === id);
  if (!article) {
    response.status(404).json({ error: "Article not found" });
  } else {
    response.json(article);
  }
});


// Read the saved list from the database.
app.get("/saved", (request, response) => {
  response.json(getSavedIds());
});

// Save an id by adding a row to the database.
// "INSERT OR IGNORE" quietly skips it if it's already saved.
// The "?" is a safe placeholder that gets filled with the id below.
app.post("/saved", (request, response) => {
  const id = Number(request.body.id);
  db.prepare("INSERT OR IGNORE INTO saved (article_id) VALUES (?)").run(id);
  response.json(getSavedIds());
});

// Unsave an id by deleting its row.
app.delete("/saved/:id", (request, response) => {
  const id = Number(request.params.id);
  db.prepare("DELETE FROM saved WHERE article_id = ?").run(id);
  response.json(getSavedIds());
});


app.listen(4000, () => {
  console.log("Server is running!");
  console.log("Open http://localhost:4000/ in your browser.");
});