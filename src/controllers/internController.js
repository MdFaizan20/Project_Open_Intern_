const collegeModel = require("../models/collegeModel")
const internModel =  require("../models/internModel")
const valid = require("../validations/validator")




const createIntern = async function(req, res){

try{

    const requestBody = req.body
     const { name, email, mobile, collegeName } = requestBody

     if(!valid.isValidRequestBody(requestBody)){
        return res.status(400).send({status: false, message: "Pls Provide RequestBody "})
     }
     if(!valid.invalidInput(name)){
        return res.status(400).send({ status: false, message: "Invalid Input" }) 
      }
      
if(!valid.isValidName(name)){
    return res.status(400).send({status: false, message: "Name is invalid"})
}
if(!valid.invalidInput(email)){
    return res.status(400).send({ status: false, message: "Invalid Input" }) 
  }
  
if(!valid.isValidEmail(email)){
return res.status(400).send({status: false, message: "Email is invalid"})
}

let uniqueEmail = await internModel.findOne({email})
     if(uniqueEmail){
        return res.status(400).send({status: false, message: "Email should be unique"})
     }

if(!mobile){
    return res.status(400).send({status: false, message: "Mobile is required"})
}

let uniqueMobile = await internModel.findOne({mobile})
     if(uniqueMobile){
        return res.status(400).send({status: false, message: "Mobile should be unique"})
     }
if(!valid.isValidMobile(mobile)){
    return res.status(400).send({status: false, message: "Mobile is invalid"})
}
if(!collegeName){
    return res.status(400).send({status: false, message: "CollegeName is required"})
}
if(!valid.isValidFullName(collegeName)){
    return res.status(400).send({status: false, message: "CollegeName is invalid"})
}
let isCollege = await collegeModel.findOne({name: collegeName})

if(!isCollege){
    return res.status(400).send({status: false, message: "No college found"})
}
let obj = {collegeId: isCollege._id,
     name: requestBody.name,
      mobile: requestBody.mobile, 
     email: requestBody.email,
      collegeName: requestBody.collegeName
    }

       let createIntern =  await internModel.create(obj)
       let getIntern = await internModel.findOne(createIntern).select({_id: 0, createdAt: 0, updatedAt: 0, __v: 0, collegeName: 0})
        return res.status(201).send({status: true, data: getIntern})
     }
     catch(errors){
    return res.status(500).send({status: false, message: errors.message})
}
}



const getCollegeDetails = async function(req, res){
try{
if(!valid.isValidRequestBody(req.query)){
    return res.status(400).send({status: false, message: "Input is required"})
}
if(!req.query.collegeName){
    return res.status(400).send({status: false, message: "collegeName is required"})
}
let name = req.query.collegeName
let savedData = await collegeModel.findOne({name})
if(!savedData){
    return res.status(404).send({status: false, message: "No college found"})
}
let collegeId = savedData._id
    let savedData1 = await internModel.find({collegeId}).select({createdAt: 0, isDeleted: 0, updatedAt: 0, collegeId: 0, __v: 0})
let obj1 = {name: savedData.name,
     fullName: savedData.fullName,
      logoLink: savedData.logoLink,
       interns: savedData1
    }

return res.status(200).send({status: true, data: obj1})
}
catch(errors){
    return res.status(500).send({status: false, message: errors.message})
}
}



module.exports = {createIntern, getCollegeDetails}