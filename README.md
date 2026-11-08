# 🍳 What's Cooking? — Full Stack

A recipe suggestion app built with **Node.js, Express and MongoDB**.  
Users enter ingredients → backend matches and returns relevant dishes from the database.

---

## 🗂 Project Structure

```
whats-cooking-backend/
├── server.js              ← Express app entry point
├── config/
│   └── db.js              ← MongoDB connection
├── models/
│   └── Dish.js            ← Mongoose schema
├── routes/
│   └── dishes.js          ← API routes
├── data/
│   └── seed.js            ← Seed 37 dishes into MongoDB
├── public/
│   └── index.html         ← Frontend (served by Express)
├── .env.example
├── .gitignore
└── package.json


##Live Demo:

https://dish-matcher.onrender.com
