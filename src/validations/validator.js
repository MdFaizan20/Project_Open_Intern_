const isRequiredInput = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    
    return true;
}
// const isValidUrl = (value)=> {
//     var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
//   '((([a-z\\d]([a-z\\d-][a-z\\d]))\\.)+[a-z]{2,}|'+ // validate domain name
//   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
//   '(\\:\\d+)?(\\/[-a-z\\d%_.~+])'+ // validate port and path
//   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
//   '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
// return urlPattern.test(value);
// }


// const isValidUrl = (value)=> {
//         var urlPattern = new RegExp("/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]))?(?:\?([^#]))?(?:#(.*))?$/")
//     return !!urlPattern.test(value);
//     }

const isValidInput = function(value){
    if (typeof value !== 'string' || value.trim().length === 0) return false
return true
}

 const isValidEmail= function(email) { 
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    return re.test(String(email).toLowerCase());
}



module.exports = { isValidRequestBody, isValidInput, isRequiredInput, isValidEmail }