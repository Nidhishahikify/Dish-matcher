require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ── Connect to MongoDB ───────────────────────────────────────
connectDB();

// ── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve frontend

// ── Routes ───────────────────────────────────────────────────
app.use("/api/dishes", require("./routes/dishes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "What's Cooking API is running 🍳" });
});

// ── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
