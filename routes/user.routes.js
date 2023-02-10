/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json()) //convert JSON 

/** load member's controller */
const UserController = require("../controller/user.controller")
const auth = require("../auth/auth")

/** create route (End-point) to get data with method "GET" */
app.get("/getAllUser", UserController.getAllUser)
app.get("/findUser", UserController.findUser)
app.post("/AddUser", UserController.addUser)
app.put("/:id", UserController.updateUser)
app.delete("/:id", UserController.deleteUser)


/** export app in order to load in another file */
module.exports = app 
