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
```

---

## 🚀 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check if API is running |
| GET | `/api/dishes` | Get all dishes |
| GET | `/api/dishes?diet=vegetarian` | Filter by diet |
| GET | `/api/dishes/:id` | Get single dish |
| POST | `/api/dishes/match` | Match dishes to ingredients |

### POST /api/dishes/match — Example

**Request:**
```json
{
  "ingredients": ["egg", "onion", "tomato"],
  "diet": "any"
}
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "name": "Egg Curry",
      "matchScore": 3,
      "matchPercent": 75,
      "matchedIngredients": ["egg", "onion", "tomato"],
      "extraNeeded": ["garam masala"],
      ...
    }
  ]
}
```

---

## 💻 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourname/whats-cooking-backend
cd whats-cooking-backend

# 2. Install dependencies
npm install

# 3. Add your MongoDB URI
cp .env.example .env
# Edit .env and paste your MongoDB Atlas URI

# 4. Seed the database
npm run seed

# 5. Start the server
npm run dev

# App runs at http://localhost:5000
```

---

## ☁️ Deploy on Render (Free)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set these:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add Environment Variable:
   - `MONGO_URI` = your MongoDB Atlas URI
6. Click **Deploy** ✅

---

## 🔧 MongoDB Atlas (Free Database)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free account
2. Create a free cluster
3. Click **Connect** → **Drivers** → copy the URI
4. Replace `<password>` with your password
5. Paste into your `.env` as `MONGO_URI`

---

## 📄 Resume Description

> **What's Cooking? — Full Stack Recipe Finder**  
> *Node.js · Express · MongoDB · REST API*
>
> Built a full-stack recipe suggestion app with a REST API backend. Users submit available ingredients and receive matched dish recommendations scored by ingredient overlap. Features include diet filtering, 37 curated recipes in MongoDB, and a clean vanilla JS frontend served by Express. Deployed on Render with MongoDB Atlas.
