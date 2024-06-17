const express = require("express");
const { getProducts } = require("../getData");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await getProducts();

    const sorted = items.sort((a, b) => b.rating - a.rating);
    const topRated = sorted.slice(0, 4);

    res.status(200).json(topRated);
  } catch (err) {
    console.log("error toprated api");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
