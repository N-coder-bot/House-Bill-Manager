const Product = require("../models/Product");
const User = require("../models/User");
//1. Add Product to a specific user.
const addProduct = async (req, res) => {
  const user = req.user; //signed in user.
  try {
    if (!user) throw "Please Sign in to add a Product";
    const product = new Product({
      user: user._id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      isCalculated: false,
    });
    await product.save();
    user.products.push(product); //adding product to user's products array.
    await user.save();
    res.json({ product });
    // next();
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
    await user.populate("products");
    // console.log(user.products);
    res.json({ products: user.products });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
// 3. get all the products in the database.
const getProducts = async (req, res) => {
  const user = req.user;
  const products = await user.populate("products").products;
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
//6. calculate Monthly Bill.
const calculateBill = async (req, res) => {
  const user = req.user;
  // console.log(user);
  await user.populate("products");
  const products = user.products;
  try {
    if (!user) throw "Please sign in to continue...";
    let totalBillAmount = user.billAmount;
    for (const product of products) {
      if (product.isCalculated !== true) {
        totalBillAmount += product.price;
        product.isCalculated = true;
        await product.save();
      }
    }
    user.billAmount = totalBillAmount;
    await user.save();
    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
//7. delete a product by Id.
const deleteProductById = async (req, res) => {
  const user = req.user;
  const price = req.body.price;
  await Product.deleteOne({ _id: req.body._id });
  if (user.billAmount != 0) user.billAmount -= price;
  user.products = user.products.filter((product) => {
    return product != req.body._id;
  });
  await user.save();
  res.status(200).json("successfully deleted");
};

module.exports = {
  addProduct,
  userProducts,
  getProducts,
  getProductById,
  productForm,
  calculateBill,
  deleteProductById,
};
