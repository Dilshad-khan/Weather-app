const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forcast = require("./utils/forcast");

// path use to manipulate string path for us
console.log(path.join(__dirname, "../public"));

const port = process.env.PORT || 5000;

const app = express();

const publicDirecoty = path.join(__dirname, "../public");
const veiwsDirectory = path.join(__dirname, "../template/views");
const partialsDirectory = path.join(__dirname, "../template/partials");

// setup handlebar's engine and views location
app.set("view engine", "hbs");
// express by default look for the view directory for the static file but we can customize it's settting
app.set("views", veiwsDirectory);
hbs.registerPartials(partialsDirectory);

// setup static directory to serve
app.use(express.static(publicDirecoty));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Dilshad",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Dilshad",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Dilshad",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide address" });
  }

  // passing default value of object if no object is present to destruct, which can causes website crash if some irrelavant value is provided like !
  geoCode(req.query.address, (error, { latitude, longitude, label } = {}) => {
    if (error) return res.send({ error: error });

    forcast(latitude, longitude, (error, forcastData) => {
      if (error) return res.send({ error: error });

      console.log(label);
      console.log(forcastData);
      res.send({
        address: req.query.address,
        location: label,
        forcast: forcastData,
      });
    });
  });
});

// http://localhost:5000/products?search=address&name=Dilshad
app.get("/products", (req, res) => {
  // console.log(req.query);
  if (!req.query.search) {
    return res.send({ error: "Please provide search" });
  }

  res.send(req.query.search);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dilshad",
    errorMessage: "help article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dilshad",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up and running", port);
});
