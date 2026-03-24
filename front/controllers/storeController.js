const Order = require("../models/orderModel")
const Product = require("../models/productModel")

// funcion para pupular lso compos
exports.populate = async (req, res) => {
  const products = await Product.find({ active: true }) 
  const cart = req.session.cart || []
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return res.render("store", { products, cart, total })
}

// funcion para agregar articulos al carrito
exports.addToCart = async (req, res) => {
  const { id } = req.body
  const cart = req.session.cart || []
  const product = await Product.findById(id)

  const existing = cart.find(item => item.id.toString() === id.toString())
  const currentQty = existing ? existing.quantity : 0

  if (currentQty >= product.stock) {
    return res.redirect("/") 
  }

  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ id, name: product.name, price: product.price, quantity: 1 })
  }

  req.session.cart = cart
  res.redirect("/")
}

//funcion para fincalizar el pedido
exports.checkout = async (req, res) => {
  const { email, address } = req.body
  const cart = req.session.cart || []
  if (!cart.length) return res.redirect("/")

  // verifico el stock antes de crear el pedido
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
// crea la orden
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
// obtiene los datos del carrito guardados en la sesion
  req.session.cart = []
  res.redirect("/")
}