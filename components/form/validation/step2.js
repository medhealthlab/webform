import * as Yup from "yup"

const Step2Schema = Yup.object().shape({
    firstname : Yup.string().min(2,"Valid name must havbe at least 2 char").max(50 , "Name too long").required("firstname required"),
    lastname: Yup.string().min(2,"Valid name must havbe at least 2 char").max(50 , "Name too long").required("lastname required"),
    dob: Yup.string().required("dob required").min(8, "complete date of birth").max(8, "complete"),
    sex : Yup.string().required("biological gender required required")
})

export {Step2Schema}