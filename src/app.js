const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const chalk = require("chalk");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define general paths
const viewsPath = path.join(__dirname, "../templates/views");
const staticPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views directory
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Sary Elmelegy",
    title: "Weather"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Sary Elmelegy",
    title: "About Me"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Sary Elmelegy",
    topic: "Help ME",
    title: "Help"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to provide an Address!!"
    });
  }
  geocode(req.query.address, (err, { lat, long, city } = {}) => {
    if (err) return res.send({ err });

    forecast(lat, long, (error, fdata) => {
      if (error) return res.send({ error });

      res.send({
        forecast: fdata,
        city,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Sary Elmelegy",
    title: "404",
    error: "Can't find help request"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Sary Elmelegy",
    title: "404",
    error: "404 page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
