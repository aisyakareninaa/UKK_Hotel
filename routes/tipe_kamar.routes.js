/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json()) //convert JSON 

/** load member's controller */
const TipeKamarController = require("../controller/tipe-kamar.controller")

/** create route (End-point) to get data with method "GET" */
app.get("/getAllTipeKamar", TipeKamarController.getAllTipekamar)
app.get("/findTipeKamar", TipeKamarController.findTipeKamar)
app.post("/addTipeKamar", TipeKamarController.addTipeKamar)
app.put("/:id", TipeKamarController.updateTipeKamar)
app.delete("/:id", TipeKamarController.deleteTipeKamar)


/** export app in order to load in another file */
module.exports = app 
