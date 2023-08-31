import * as Yup from "yup"

const Step3Schema = Yup.object().shape({
    email : Yup.string().required("firstname required"),
    mobile: Yup.string().required().min(10, "provide full number").max(10, "max exceed")
})

export {Step3Schema}