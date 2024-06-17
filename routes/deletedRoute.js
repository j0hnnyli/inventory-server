const express = require('express');
const router = express.Router();
const connectDB = require('../connectdb');
const {getDeletedProducts} = require('../getData')
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try{
    const data = await getDeletedProducts();

    res.status(200).json({ data : data })
  }catch(err){
    res.status(500).json({message : 'Error getting deleted Items'})
  }
})

router.delete('/restore', async (req, res) => {
  try{
    const { id } = req.body;
    const db = await connectDB();
    const deletedCollection = db.collection('deleted');
    const productsCollection = db.collection('products');

    const deletedItems = await deletedCollection.find().toArray();

    const findDeletedItems = deletedItems.find((item) => String(item._id) === id)

    await deletedCollection.deleteOne({_id : new ObjectId(id)})

    delete findDeletedItems._id; 
    await productsCollection.insertOne(findDeletedItems);
    

    res.sendStatus(200)
  }catch(err){
    res.status(500).json({message: 'Failed Restoring'})
  }
})

module.exports = router;
