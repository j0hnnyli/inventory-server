const express = require("express");
const router = express.Router();
const { getProducts } = require("../getData");
const connectDB = require("../connectdb");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    const items = await getProducts();
    const totalItems = items.length;

    res.status(200).json({
      products: items,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ message: "Error something went wrong controls" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { id, newPrice, newRating, newStock, newSold, newTitle } = req.body;
    const db = await connectDB();
    const collection = db.collection("products");

    const newData = {};

    if(newTitle !== ""){
      newData.title = newTitle
    }
    if (newPrice !== "") {
      newData.price = parseFloat(newPrice);
    }
    if (newRating !== "") {
      newData.rating = parseFloat(newRating);
    }
    if (newSold !== "") {
      newData.sold = parseInt(newSold);
    }
    if (newStock !== "") {
      newData.stock = parseInt(newStock);
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: newData });

    res.status(200).json({ message: "update Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Updating Went Wrong" });
  }
});

router.delete("/deleted", async (req, res) => {
  try {
    const { id } = req.body;
    const items = await getProducts();
    const findItem = items.find((item) => String(item._id) === id);

    const db = await connectDB();
    const collection = db.collection("products");
    const deletedCollection = db.collection("deleted");

    await collection.deleteOne({ _id: new ObjectId(id) });

    delete findItem._id;
    await deletedCollection.insertOne(findItem);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
