import * as Yup from "yup"

const Step1Schema = Yup.object().shape({
    healthcard : Yup.string().min(10,"healthcard number must be 10 digits (xxxx-xxx-xxx)").max(10,"healthcard number must be 10 digits (xxxx-xxx-xxx)").required("Healthcard required").matches("^[0-9]+$", "must be numbers"),
    vc: Yup.string().min(2,"2 Characters at the end of the OHIP number").max(2,"Enter valid Healthcard Version code").required("Version code required")
})







export {Step1Schema}