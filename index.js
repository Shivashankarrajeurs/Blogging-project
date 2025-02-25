import express from "express";
import bodyParser from "body-parser";
import { VercelRequest, VercelResponse } from "@vercel/node"; // Required for Vercel API

const app = express();

let posts = [
  {
    id: 1,
    title: "Huawei's Advances in AI Chip Production Bolster China's Tech Ambitions",
    content: "Huawei has significantly improved its AI chip production...",
    author: "Liam Chen",
    date: "2025-02-25T14:30:00Z"
  }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET All posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// GET a specific post by ID
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/api/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PATCH (Update a post)
app.patch("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) return res.status(404).json({ message: "Post not found" });

  posts[postIndex] = { ...posts[postIndex], ...req.body };
  res.json(posts[postIndex]);
});

// DELETE a post
app.delete("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(postIndex, 1);
  res.status(204).end();
});

// ✅ Export the handler for Vercel
export default function handler(req, res) {
  return app(req, res);
}
