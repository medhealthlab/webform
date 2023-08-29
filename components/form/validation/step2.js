import * as Yup from "yup"

const Step1Schema = Yup.object().shape({
    firstname : Yup.string().min(2,"Valid name must havbe at least 3 char").max(50 , "Name too long").required("firstname required"),
    middlename: Yup.string().min(2,"Valid name must havbe at least 3 char").max(50 , "Name too long").required("firstname required"),
    lastname: Yup.string().min(2,"Valid name must havbe at least 3 char").max(50 , "Name too long").required("firstname required"),
    dob: Yup.string().required("dob required"),
    sex : Yup.string().required("dob required")
})







export {Step1Schema}