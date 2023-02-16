//import library
const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const model = require("../models/index");
const outlet = model.outlet;

//endpoint
app.get("/", (req, res) => {
  outlet
    .findAll()
    .then((result) => {
      res.json({
        outlet: result,
        count: result.length,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
        
      });
    });
});

app.get("/:id_outlet", (req, res) => {
  outlet
    .findOne({ where: { id_outlet: req.params.id_outlet } })
    .then((result) => {
      res.json({
        outlet: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.post("/", (req, res) => {
  let data = {
    nama: req.body.nama,
    alamat: req.body.alamat,
    tlp: req.body.tlp,
  };

  outlet
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.put("/:id", (req, res) => {
  let param = {
    id_outlet: req.params.id,
  };
  let data = {
    nama: req.body.nama,
    alamat: req.body.alamat,
    tlp: req.body.tlp,
  };
  outlet
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.delete("/:id", (req, res) => {
  let param = {
    id_outlet: req.params.id,
  };
  outlet
    .destroy({ where: param })
    .then((result) => {
      res.json({
        message: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

module.exports = app;
