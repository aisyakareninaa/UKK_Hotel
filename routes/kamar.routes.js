const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const kamarController = require(`../controller/kamar.controller`);
app.get("/getAllKamar", kamarController.getAllKamar);
app.post("/find", kamarController.findKamar);
app.post("/add", kamarController.addKamar);
app.put("/:id", kamarController.updateKamar);
//app.delete("/:id", kamarController.deleteKamar)

module.exports = app;
