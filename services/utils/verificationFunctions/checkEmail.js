const emailReg = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
function checkEmail(inputString){
    try{
        console.log(emailReg.test(inputString))
        return emailReg.test(inputString)
    }catch(err){
        console.log(err)
    }
}

export default checkEmail