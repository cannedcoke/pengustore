
const express = require("express");
// inicia app express
const app = express();

require("./middlewares/db");

const path = require("path");

// se define pug como motor de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// override para las request que 
const methodOverride = require("method-override");

// middleware paara json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// reemplaza los metodos con los del hidden input
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// defino de donde se van a servisr los archivo sestaticps
app.use("/static", express.static(path.join(__dirname, "static")));

// defino el rutador
const Route = require("./routers/router");

app.use("/", Route);

app.get("/", (req, res) => {
  res.render("index");
});

//inicio la app

app.listen(5000, () => {
  console.log("Server running http://localhost:5000");
});
