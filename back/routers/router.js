const express = require("express")
const router = express.Router()

// importacion de controladores y middlewares
const auth = require("../middlewares/auth")
const logincontroller = require("../controllers/loginController")
const dashboardcontroller = require("../controllers/dashboardController")



// rutas para acciones basicas
router.post("/login",logincontroller.login)
router.delete("/logout",dashboardcontroller.logout)

// crud de los prodctos
router.get("/dashboard",auth.authenticate,dashboardcontroller.populate)
router.post("/dashboard/addProduct",auth.authenticate,dashboardcontroller.addProduct)//add auth here with middleware
router.delete("/dashboard/removeProduct",auth.authenticate,dashboardcontroller.removeProduct)//add auth here with middleware
router.put("/dashboard/updateProduct",auth.authenticate,dashboardcontroller.updateProduct)//add auth here with middleware

// crud de productos 


module.exports = router

