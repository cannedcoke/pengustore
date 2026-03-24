const express = require("express");

const app = express();

require("./middlewares/db");

const path = require("path");

// defino pug como motor de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// override para las requests
const methodOverride = require("method-override");

app.use(express.json());
// parsea los datos de la request para que sean usables
app.use(express.urlencoded({ extended: true }));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);
const session = require("express-session")
// sesion para el carrito
app.use(session({//shoud use env variable here but idc rn
  secret: "pengu-secret",
  resave: false,
  saveUninitialized: true
}))

// defino de donde se sirven los archivos estaticos
app.use("/static", express.static(path.join(__dirname, "static")));

const Route = require("./routers/router");

app.use("/", Route);
app.get("/", (req, res) => {
  res.render("store");
});

// inicio la app
app.listen(5001, () => {
  console.log("Server running http://localhost:5001");
});
