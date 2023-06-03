const express = require("express");
const router = express.Router();
const { isAuth } = require("../../auth/authMiddleware");
const {
  getProducts,
  getProductById,
} = require("../../controllers/productcontroller");
//1. get all products stored in the database.
router.get("/", isAuth, getProducts);
//2. get product by Id.
router.get("/:productId", isAuth, getProductById);
module.exports = router;
