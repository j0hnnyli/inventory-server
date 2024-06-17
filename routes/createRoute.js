const express = require("express");
const router = express.Router();
const connectDB = require("../connectdb");

router.post('/', async (req, res) => {
  const newItem = req.body;
  
  try{
    const db = await connectDB();
    const collection = db.collection('products');
    
    await collection.insertOne(newItem)
  
    res.status(200).json({message: 'Items Successfully Added'})
  }catch(err){
    res.status(500).json({message : 'Item Failed To Add!'})
  }
})

module.exports = router;