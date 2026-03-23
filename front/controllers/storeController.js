const User = require("../models/userModel")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")

exports.populate = async (req, res) => {
  const products = await Product.find({ active: true }) 
  const cart = req.session.cart || []
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return res.render("store", { products, cart, total })
}


exports.addToCart = async (req, res) => {
  const { id } = req.body
  const cart = req.session.cart || []
  const product = await Product.findById(id)

  const existing = cart.find(item => item.id.toString() === id.toString())
  const currentQty = existing ? existing.quantity : 0

  if (currentQty >= product.stock) {
    return res.redirect("/") // or send an error message
  }

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ id, name: product.name, price: product.price, quantity: 1 })
  }

  req.session.cart = cart
  res.redirect("/")
}

exports.checkout = async (req, res) => {
  const { email, address } = req.body
  const cart = req.session.cart || []
  if (!cart.length) return res.redirect("/")

  // verify stock before creating order
  for (const item of cart) {
    const product = await Product.findById(item.id)
    if (product.stock < item.quantity) {
      return res.send(`Not enough stock for ${item.name}. Only ${product.stock} left.`)
    }
  }

  for (const item of cart) {
    const product = await Product.findById(item.id)
    const newStock = product.stock - item.quantity
    await Product.findByIdAndUpdate(item.id, {
      stock: newStock,
      active: newStock > 0
    })
  }

  await Order.create({
    email,
    address,
    products: cart.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  })

  req.session.cart = []
  res.redirect("/")
}