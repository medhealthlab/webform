import * as Yup from "yup"

const Step3Schema = Yup.object().shape({
    email : Yup.string().required("firstname required"),
    mobile: Yup.number().required().test('len', "digits missing", val => val ? val.length === 10: "")
})

export {Step3Schema}