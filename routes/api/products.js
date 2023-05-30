const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../../controllers/productcontroller");
//1. get all products stored in the database.
router.get("/", getProducts);
//2. get product by Id.
router.get("/:productId", getProductById);
module.exports = router;
