import * as Yup from "yup"

export const ValidationSchema = Yup.object().shape({
    firstname : Yup.string().min(2,"To short!").max(50,"To long!").required("Required"),
    lastname : Yup.string().min(2,"To short!").max(50,"To long!").required("Required"),
    middlename : Yup.string().min(2,"To short!").max(50,"To long!"),
    dob : Yup.date().required("Required"),
    healthcard: Yup.string().min(10,"Enter 10 digit healthcard number").max(10,"enter valid health card number without versioncode and -").required("Required"),
    issueDate : Yup.date().required("Required"),
    expDate : Yup.date().min(new Date(),"Card expired. Need valid health card.").required("Required"),
    phone: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits, do not enter contry code").min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
    // .test('check for decimal', "cannot contain decimal", val => (console.log(val), !Array.from(val.toString).includes("."))).test('len', "must be 10 digits", val => val.toString().length === 10)
})


