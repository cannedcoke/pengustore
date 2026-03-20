

const express = require("express");

const app = express();

require("./middlewares/db");



const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const methodOverride = require("method-override");

app.use(express.json());
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

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/static", express.static(path.join(__dirname, "static")));

const Route = require("./routers/router");

app.use("/", Route);

app.get("/", (req, res) => {
  res.render("index");
});


app.listen(5000, () => {
  console.log("Server running http://localhost:5000");
});
