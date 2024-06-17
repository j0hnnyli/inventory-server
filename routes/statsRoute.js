const express = require("express");
const router = express.Router();
const { getProducts, getDeletedProducts } = require("../getData");

router.get("/", async (req, res) => {
  const data = await getProducts();
  const deletedItems = await getDeletedProducts();

  const totalProduct = data.length;
  const lowStockItems = data.reduce((total, curr) => {
    if (curr.stock <= 10) {
      return total + 1;
    }
    return total;
  }, 0);

  const itemsSold = data.reduce((total, curr) => total + (curr.sold || 0), 0);
  const totalStock = data.reduce(
    (total, curr) => total + parseInt(curr.stock),
    0
  );
  const totalSales = data.reduce(
    (total, curr) => total + curr.price * curr.sold,
    0
  );
  const roundedTotalSales = parseFloat(totalSales.toFixed(2));

  res.status(200).json({
    productCount: totalProduct,
    lowItems: lowStockItems,
    totalSold: itemsSold,
    stockInHand: totalStock,
    totalSale: roundedTotalSales,
    deleted : deletedItems.length,
  });
});

module.exports = router;
