const Order = require("../models/orderModel");
const Product = require("../models/productModel");


exports.populate = async (req, res) => {
  const products = await Product.find({ active: true }) 
  const orders = await Order.find()
  const ordersWithTotal = orders.map(order => ({
    ...order.toObject(),
    total: order.products.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }))
  return res.render("dashboard", { products, orders: ordersWithTotal })
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
  const { id } = req.body
  try {
    await Product.findByIdAndUpdate(id, { active: false })
    res.redirect("/dashboard")
  } catch (err) {
    res.status(500).send(err.message)
  }
}

exports.updateProduct = async (req, res) => {
  const { id, name, price, stock } = req.body
  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, stock, active: stock > 0 },
      { new: true }
    )
    if (!updated) return res.send("product not found")
    res.redirect("/dashboard")
  } catch (err) {
    res.status(500).send(err.message)
  }
}


exports.logout = async(req,res) => {
    res.clearCookie("session_id")
    res.redirect("/");
}
