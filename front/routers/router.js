const express = require("express")
const router = express.Router()

const storeController = require("../controllers/storeController")
// rutas de acciones del usuarios
router.get("/", storeController.populate)
router.post("/addToCart", storeController.addToCart)
router.post("/checkout", storeController.checkout)

module.exports = router

