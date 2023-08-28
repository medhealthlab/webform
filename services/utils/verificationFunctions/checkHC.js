const healthcardReg = RegExp(/^\d{10}$/)

const versioncodeReg = RegExp(/^[a-zA-Z]{2}/)

function checkHealthcard(inputString){
    return healthcardReg.test(inputString)
}

function checkVersionCode(inputString){
    return versioncodeReg.test(inputString)
}

export {checkHealthcard, checkVersionCode}