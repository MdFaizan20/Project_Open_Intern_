const express = require("express")
const router = express.Router()


const collegeController = require("../controllers/collegeController")

const interController = require("../controllers/internController")




router.post("/functionup/colleges", collegeController.createCollege)

router.post("/functionup/interns", interController.createIntern)

router.get("/functionup/collegeDetails", interController.getCollegeDetails)


router.all("/*", function(req, res){
    res.status(400).send({status: false, msg: "Path not found"})
})

module.exports = router