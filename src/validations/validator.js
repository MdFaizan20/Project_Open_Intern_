const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const invalidInput = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if(typeof value === "string" && value.trim().length === 0) return false
    if(typeof value !== "string") return false
return true;
}
const isValidName = (value) => {
    const regex =/^[a-zA-Z ]+(([',. -][a-zA-Z ])?[a-zA-Z ])$/.test(value)
    return regex
}

const isValidFullName = (str) =>{
    return  /^(([a-zA-Z  ](,)?)*)+$/.test(str);
  }
  const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/.test(email)
    return regex
}

const isValidMobile = (phone) => {
 let regex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone)
  
    return regex
}


module.exports = { isValidRequestBody, invalidInput, isValidName, isValidMobile,isValidFullName, isValidEmail }