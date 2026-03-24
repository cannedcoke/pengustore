const mongoose = require("mongoose")
// conexion a la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/pengustore")
.then(() =>{
    console.log("database connected")

}).catch(err =>{
    console.log(err)
})