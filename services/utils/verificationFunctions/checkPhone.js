const phoneReg = RegExp(/^(\(\+[0-9]{2}\))?([0-9]{3}-?)?([0-9]{3})\-?([0-9]{4})(\/[0-9]{4})?$/)
function checkPhone(inputString){
    return phoneReg.test(inputString)
}

export default checkPhone