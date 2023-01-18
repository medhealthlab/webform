import * as Yup from "yup"

export const ValidationSchema = Yup.object().shape({
    firstname : Yup.string().min(2,"To short!").max(50,"To long!").required("Required"),
    lastname : Yup.string().min(2,"To short!").max(50,"To long!").required("Required"),
    middlename : Yup.string().min(2,"To short!").max(50,"To long!"),
    dob : Yup.string().min(2,"To short!").max(50,"To long!").required("Required"),
    healthcard: Yup.string().min(10,"Enter valid healthcard number").max(10,"enter correct health card number").required("Required"),
    issue : Yup.date().required("Required"),
    expiry : Yup.date().min(new Date(),"Card expired. Need valid health card.").required("Required"),
    phone: Yup.number("enter a valid number")
    // .test('check for decimal', "cannot contain decimal", val => (console.log(val), !Array.from(val.toString).includes("."))).test('len', "must be 10 digits", val => val.toString().length === 10)
})


