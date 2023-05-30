const Product = require("../models/Product");

//1. Add Product to a specific user.
const addProduct = async (req, res) => {
  const user = req.user; //signed in user.
  try {
    if (!user) throw "Please Sign in to add a Product";
    const product = new Product({
      user: user.id,
      name: req.body.name,
      price: req.body.price,
    });
    await product.save();
    res.json({ product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
//2. get Products of a specific user.
const userProducts = async (req, res) => {
  try {
    if (!req.user) throw "Please sign in first!";
    const user = req.user;
    const products = await Product.find({ user: user.id }).exec();
    res.json({ products: products });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
//3. get all the products in the database.
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json({ products: products });
};
//4. get Product By Id.
const getProductById = async (req, res) => {
  const product = await Product.findById({ _id: req.params.productId });
  try {
    if (!product) throw "Product with given Id not exists.";
    res.json({ product: product });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

//5. product form render.
const productForm = (req, res) => {
  res.render("productadd");
};
module.exports = {
  addProduct,
  userProducts,
  getProducts,
  getProductById,
  productForm,
};
