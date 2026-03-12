const express = require("express")

const pug = require("pug")

const app = express()

const path = require("path")

app.set("views", path.join(__dirname, "views"))
app.set("view engine","pug")


app.use(express.json())

const Route = require("./routers/router")
app.use("/",Route)

// app.get("/", (req,res) => {
//     res.render('index',{title:"hey",user:"miki"})
// })

app.listen(5000, ()=>{

    console.log("Server running http://localhost:5000");
});