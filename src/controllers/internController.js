const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const valid = require("../validations/validator")

const createIntern = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*") 
    try {
       
        const requestBody = req.body
        const { name, email, mobile, collegeName } = requestBody

        if (!valid.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Pls Provide RequestBody " })
        }
        if (!valid.invalidInput(name)) {
            return res.status(400).send({ status: false, message: "Please provide correct name" })
        }

        if (!valid.isValidName(name)) {
            return res.status(400).send({ status: false, message: "Name is invalid" })
        }

        if (!valid.invalidInput(email)) {
            return res.status(400).send({ status: false, message: "Please provide correct email" })
        }

        if (!valid.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Email is invalid" })
        }

        let uniqueEmail = await internModel.findOne({ email })
        if (uniqueEmail) {
            return res.status(400).send({ status: false, message: "Email should be unique" })
        }

        if (!valid.invalidInput(mobile)) {
            return res.status(400).send({ status: false, message: "Mobile is required" })
        }

        if (!valid.isValidMobile(mobile)) {
            return res.status(400).send({ status: false, message: "Mobile is invalid" })
        }

        let uniqueMobile = await internModel.findOne({ mobile })

        if (uniqueMobile) {
            return res.status(400).send({ status: false, message: "Mobile should be unique" })
        }
        
        if (!valid.invalidInput(collegeName)) {
            return res.status(400).send({ status: false, message: "CollegeName is required or invalid" })
        }
        if (!valid.isValidFullName(collegeName)) {
            return res.status(400).send({ status: false, message: "CollegeName is invalid" })
        }
        let isCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!isCollege) {
            return res.status(404).send({ status: false, message: "No college found" })
        }
       

        let interCreation = await internModel.create(requestBody)
   
    let obj = {
        isDeleted:interCreation.isDeleted,
        name: interCreation.name,
        mobile: interCreation.mobile,
        email: interCreation.email,
        collegeId: isCollege._id,
    }
    return res.status(201).send({status:true,msg:"Intern creation Successfful",data:obj} )
    }

    catch (errors) {
        return res.status(500).send({ status: false, message: errors.message })
    }
}



const getCollegeDetails = async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*") 
    try {
        let collegeName =req.query.collegeName
       
        if (!valid.isValidRequestBody(collegeName)) {
            return res.status(400).send({ status: false, message: "Input is required" })
        }
        if (!valid.isValidName(collegeName)) {
            return res.status(400).send({ status: false, message: "College Name is invalid" })
        }
        let  existCollege= req.query.collegeName
        let savedData = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!savedData) {
            return res.status(404).send({ status: false, message: "No college found" })
        }
       
        let savedData1 = await internModel.find({ collegeId: existCollege._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });
       
        let obj1 = { 
            name: savedData.name,
            fullName: savedData.fullName,
            logoLink: savedData.logoLink,
            interns: savedData1
        }

        return res.status(200).send({ status: true, data: obj1 })
    }
    catch (errors) {
        return res.status(500).send({ status: false, message: errors.message })
    }
}



module.exports = { createIntern, getCollegeDetails }