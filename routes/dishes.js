const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");

// ── GET /api/dishes ─────────────────────────────────────────
// Get all dishes (optional ?diet=vegetarian filter)
router.get("/", async (req, res) => {
  try {
    const { diet } = req.query;
    const filter = diet && diet !== "any" ? { diet: diet } : {};
    const dishes = await Dish.find(filter).sort({ name: 1 });
    res.json({ success: true, count: dishes.length, data: dishes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── POST /api/dishes/match ───────────────────────────────────
// Send ingredients → get matching dishes back with score
router.post("/match", async (req, res) => {
  try {
    const { ingredients, diet } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ success: false, error: "Please provide ingredients array" });
    }

    const userIngredients = ingredients.map((i) => i.toLowerCase().trim());

    // fetch dishes from DB (filter by diet if provided)
    const filter = diet && diet !== "any" ? { diet: diet } : {};
    const allDishes = await Dish.find(filter);

    // score each dish
    const scored = allDishes
      .map((dish) => {
        const dishIngredients = dish.ingredients.map((i) => i.toLowerCase());
        const coreIngredients = dishIngredients.slice(0, 4);

        let matched = 0;
        let coreMatched = 0;
        const matchedList = [];

        userIngredients.forEach((userIng) => {
          const matchesDish = dishIngredients.some(
            (di) => di === userIng || di.includes(userIng) || userIng.includes(di)
          );
          const matchesCore = coreIngredients.some(
            (di) => di === userIng || di.includes(userIng) || userIng.includes(di)
          );
          if (matchesDish) {
            matched++;
            matchedList.push(userIng);
          }
          if (matchesCore) coreMatched++;
        });

        const matchPercent = Math.round((matched / Math.max(dishIngredients.length, 1)) * 100);
        // Require at least 40% of dish ingredients matched AND at least 1 core ingredient matched
        const isValid = matchPercent >= 40 && coreMatched >= 1;

        return {
          ...dish.toObject(),
          matchScore: matched,
          matchPercent,
          matchedIngredients: matchedList,
          isValid,
        };
      })
      .filter((d) => d.isValid)
      .sort((a, b) => b.matchScore - a.matchScore || b.matchPercent - a.matchPercent);

    res.json({
      success: true,
      count: scored.length,
      data: scored,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/dishes/:id ──────────────────────────────────────
// Get single dish by ID (must be after /match)
router.get("/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ success: false, error: "Dish not found" });
    res.json({ success: true, data: dish });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
