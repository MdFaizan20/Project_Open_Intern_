const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
const app = express()
const multer =require("multer")

app.use(express.json())
app.use(multer().any())

mongoose.connect("mongodb+srv://Divyajeetkumar:12345@project1.rxkr5ev.mongodb.net/test")
.then(()=>console.log("mongoDb running successfully"))
.catch(err=> console.log(err))

app.use("/", route)

app.listen((process.env.PORT || 3001), function () {
    console.log("express app running on port : " + (process.env.PORT || 3001))
})
