const express = require('express');
const router = express.Router();
const { getProducts } = require('../getData');

router.get('/', async (req, res) => {
  try{
    const items = await getProducts();
    const lowStockItem = items.filter((item) => item.stock <= 10);
    res.status(200).json({ lowStockItem })
  }catch(err){
    console.log(`server side error lowStockItem : ${err.message}`)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;