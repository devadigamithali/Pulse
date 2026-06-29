// =============================================================
//  server.js  —  now you can SAVE articles, not just read them
//  Run it with:   node server.js
// =============================================================


const express = require("express");
const app = express();


// Serve the web page from the "public" folder.
app.use(express.static("public"));


// NEW LINE 👇
// This lets the server understand JSON data that the page SENDS to it.
// (We need this for the POST route below.)
app.use(express.json());


// Our articles — same list as before.
const articles = [
  { id: 1, title: "The quiet rise of local-first software", topic: "Technology" },
  { id: 2, title: "Walking, the most underrated medicine",   topic: "Health" },
  { id: 3, title: "The four-day week, two years on",          topic: "Business" },
  { id: 4, title: "What deep-sea sensors tell us",            topic: "Science" },
  { id: 5, title: "The slow return of the long read",         topic: "Culture" },
];


// NEW 👇
// A list to remember which article ids the user has saved.
// It starts empty and lives in memory, so it resets when you
// restart the server. (A real app would use a database here.)
let savedIds = [];


// --- Reading routes (unchanged) ---

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


// --- NEW: saving routes ---

// The page asks "which articles are saved?" -> we send the list of ids.
app.get("/saved", (request, response) => {
  response.json(savedIds);
});

// The page SENDS an id to save. POST = "here is some data for you".
app.post("/saved", (request, response) => {
  // request.body is the data the page sent. We read the id from it.
  const id = Number(request.body.id);

  // Add it only if it isn't already in the list.
  if (!savedIds.includes(id)) {
    savedIds.push(id);
  }

  // Send the updated list back so the page stays in sync.
  response.json(savedIds);
});

// The page asks to remove an id. DELETE = "take this out".
app.delete("/saved/:id", (request, response) => {
  const id = Number(request.params.id);

  // Keep every saved id EXCEPT the one we're removing.
  savedIds = savedIds.filter((savedId) => savedId !== id);

  response.json(savedIds);
});


app.listen(4000, () => {
  console.log("Server is running!");
  console.log("Open http://localhost:4000/ in your browser.");
});