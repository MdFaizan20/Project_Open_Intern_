const collegeModel = require("../models/collegeModel")
const valid = require("../validations/validator")
const axios = require("axios")

const createCollege = async (req, res) => {

   try {
      const requestBody = req.body
      const { name, fullName, logoLink } = requestBody

      if (!valid.isValidRequestBody(requestBody)) {
         return res.status(400).send({ status: false, message: "Pls Provide RequestBody" })
      }
     
      if(!valid.invalidInput(name)){
        return res.status(400).send({ status: false, message: "Name is missing" }) 
      }
      if (!valid.isValidName(name)) {
         return res.status(400).send({ status: false, message: "Name is invalid" })
      }
      if(!valid.invalidInput(fullName)){
        return res.status(400).send({ status: false, message: "FullName is missing" }) 
      }

      if (!valid.isValidFullName(fullName)) {
         return res.status(400).send({ status: false, message: "FullName is invalid" })
      }
      if (!logoLink) {
         return res.status(400).send({ status: false, message: "Pls Provide Link for Logo" })
      }
      //validation for url   
      let correctLink = false
      await axios.get(logoLink)
         .then((res) => { correctLink = true })
         .catch((error) => { correctLink = false })
      if (correctLink === false) {
         return res.status(400).send({ status: false, message: "URL is wrong" })
      }

      const nameAlreadyUsed = await collegeModel.findOne({ name: name })
      if (!nameAlreadyUsed) {
         const collegeDetails = await collegeModel.create(requestBody)
         let obj = {
            name: collegeDetails.name, 
            fullName: collegeDetails.fullName, 
            logoLink: collegeDetails.logoLink,
             isDeleted: collegeDetails.isDeleted
         }
         return res.status(201).send({ status: true, data: obj })
      }
      return res.status(400).send({ status: false, message: "Name Already Registered" })

   } catch (error) {
return res.status(500).send({ status: false, message: error.message })
   }
}


module.exports = { createCollege }