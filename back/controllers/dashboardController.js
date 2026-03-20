const Order = require("../models/orderModel");
const Product = require("../models/productModel");


exports.populate = async (req, res) => {
  const products = await Product.find()
  const orders = await Order.find()
    .populate("userId", "email")
    .populate("products.productId", "name price")
  
  console.log(JSON.stringify(orders, null, 2)) 
  
  return res.render("dashboard", { products, orders });
}

exports.addProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const newProduct = new Product({ name, price, stock });
    await newProduct.save();

    const products = await Product.find();
    res.redirect("/dashboard");

  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.removeProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const removed = await Product.findByIdAndDelete(id);

    if (!removed) {
      return res.send("product not found");
    }

    const products = await Product.find();
    res.redirect("/dashboard");

  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  const { id, name, price, stock } = req.body;
  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, stock },
      { new: true },
    );

    if (!updated) {
      return res.send("product not found");
    }

    const products = await Product.find();
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.logout = async(req,res) => {
    res.clearCookie("session_id")
    res.redirect("/");
}
