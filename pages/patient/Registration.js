import React, {useState, useEffect} from 'react'
import {useFormik} from "formik"
import { ValidationSchema } from '../../services/Validation'
import app from "../../services/firebase/Firebase"
import CryptoJS from "crypto-js"
import {db} from "../../services/firebase/Firebase"
import {getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore"
import Head from "next/head"
import axios from 'axios'
export default function Registration() {
  const [success, setSuccess] = useState(false)
  const writeToFirebase = async (values) => {
    const resp = await axios.post("https://us-central1-patient-registration-portal.cloudfunctions.net/web/registerPatient", {
      healthcard: patientObject.healthcard,
      province: patientObject.province,
      firstname: patientObject.firstname,
      middlename: patientObject.middlename,
      lastname: patientObject.lastname,
      dob: moment(patientObject.dob).clone().format("YYYYMMDD"),
      sex: patientObject.sex,
      issueDate: moment(values.issue).clone().format("YYYYMMDD"),
      expDate: moment(values.expiry).clone().format("YYYYMMDD"),
      vc: values.healthcard.slice(10,12),
      address: `${values.address.line1}, ${values.address.city}, ${values.address.province}, ${values.address.postalcode}`,
      phone: "",
      mobile: values.mobile,
      email: values.email,
      comment: ""
    })
  }

  const [hideFinalPage, setHideFinalPage] = useState(false)
  const datePlaceholder = "YYYY-DD-MM"
  const phonePlaceholder = "(XXX)XXXX-XXXX"
  const formik = useFormik({
    initialValues:{
      location: "",
      firstname: "",
      lastname: "",
      middlename: "",
      sex: "",
      phone:"",
      address:{
        line1: "",
        line2:"",
        city:"",
        province:"",
        postalcode:"",
      },
      email:"",
      healthcard:"",
      dob:"",
      issue:"",
      expiry:"",

    },
    validationSchema: () => ValidationSchema, 
    onSubmit: async values => {
      console.log(values); 
      const resp = await axios.post(process.env.NEXT_PUBLIC_REGISTER_NEW_PATIENT, {...values, location: "", address: `${values.address.line1}, ${values.address.city}, ${values.address.province}, ${values.address.postalcode}.`});
      const resp2 = await axios.post(process.env.NEXT_PUBLIC_REGISTER_NEW_VISIT, {healthcard: values.healthcard, location: values.location}).then(val => console.log(val))
    }
  })
  useEffect(()=> {setHideFinalPage(false); formik.values.location = localStorage.getItem("location"); console.log(formik.values.location)},[])
  return (
    <>
    <Head>
      <title>Patient Registration</title>
      <meta name="description" content="walkin test mhl patient registration med health labs ontario" />
      <meta name="robots" content="all" />
      <meta name="googlebot" content="all" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <div className='flex justify-center'>
        <div className='mb-5 mx-2 py-5 border rounded-xl shadow-md flex flex-col justify-center transition duration-700 ease-in-out absolute z-20 bg-white bg-opacity-25'>
          <form onSubmit={(e) => (e.preventDefault(), console.log("submit"), formik.handleSubmit())} className="px-5">
            <h1 className='text-2xl font-semibold pb-3'>
              Patient Registration Form
            </h1>
            <div hidden={hideFinalPage}>
              <div className='input-field'>
                <label className='label' >Health card number*</label>
                {formik.touched.healthcard  ? <label className='text-sm italic text-red-900'>{formik.errors.healthcard}</label> : ""}
                <input name="healthcard" value={formik.values.healthcard} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
              </div>
              <div className='input-field'>
                <label className='label' >First Name*</label>
                {formik.touched.firstname  ? <label className='text-sm italic text-red-900'>{formik.errors.firstname}</label> : ""}
                <input name="firstname" type="text" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
              </div>
              <div className='input-field'>
                <label className='label' >Middle Name</label>
                {formik.touched.middlename  ? <label className='text-sm italic text-red-900'>{formik.errors.middlename}</label> : ""}
                <input name="middlename" value={formik.values.middlename} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
              </div>
              <div className='input-field'>
                <label className='label' >Last Name*</label>
                {formik.touched.lastname  ? <label className='text-sm italic text-red-900'>{formik.errors.lastname}</label> : ""}
                <input name="lastname" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="classic-input"/>
              </div>
              <div className='input-field'>
                <label className='label' >Biological Gender*</label>
                <select name="sex" value={formik.values.sex} onChange={formik.handleChange}>
                  <option disabled>Choose an option</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className='input-field'>
                <label className='label' >Date of birth*</label>
                {formik.touched.dob  ? <label className='text-sm italic text-red-900'>{formik.errors.dob}</label> : ""}
                <input type="date" name="dob" value={formik.values.dob} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder={datePlaceholder} className="classic-input"/>
              </div>
              
              <div className='input-field'>
                <label className='label' >Issue Date*</label>
                {formik.touched.issue  ? <label className='text-sm italic text-red-900'>{formik.errors.issue}</label> : ""}
                <input name="issue" type="date" value={formik.values.issue} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder={datePlaceholder} className="classic-input"/>
              </div>
              <div className='input-field'>
                <label className='label' >Expiry Date*</label>
                {formik.touched.expiry  ? <label className='text-sm italic text-red-900'>{formik.errors.expiry}</label> : ""}
                <input name="expiry" type="date" value={formik.values.expiry} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder={datePlaceholder} className="classic-input"/>
              </div>
            </div>
            <div hidden={!hideFinalPage}>
            <div className='input-field'>
              <label className='label'>Phone </label>
                {formik.touched.phone  ? <label className='text-sm italic text-red-900'>{formik.errors.phone}</label> : ""}
                {/* {console.log(formik.errors)}   */}
                <input name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder={phonePlaceholder} className="classic-input"/>
              </div>
              <div className='input-field'>
                <label className='label' >Email  </label>
                {formik.touched.email  ? <label className='text-sm italic text-red-900'>{formik.errors.email}</label> : ""}
                <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
              </div>
              <div className='input-field'>
                <label className='label pb-2' >Address  </label>
                <div className='flex flex-col pb-2'>
                  <label>Line 1</label>
                  {formik.touched.line1  ? <label className='text-sm italic text-red-900'>{formik.errors.line1}</label> : ""}
                  <input name="address.line1" value={formik.values.address.line1} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
                </div>
                <div className="flex flex-col pb-2">
                  <label>Line 2</label>
                {formik.touched.line2  ? <label className='text-sm italic text-red-900'>{formik.errors.line2}</label> : ""}
                  <input name="address.line2" value={formik.values.address.line2} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
                </div>

                <div className="lg:flex lg:flex-col lg:gap-5 lg:pb-2 ">
                  <div className='pb-2 flex flex-col'>
                    <label>City</label>
                    {formik.touched.city  ? <label className='text-sm italic text-red-900'>{formik.errors.city}</label> : ""}
                    <input name="address.city" value={formik.values.address.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
                  </div>
                  <div className='pb-2 flex flex-col'>
                    <label>Province</label>
                    {formik.touched.province  ? <label className='text-sm italic text-red-900'>{formik.errors.province}</label> : ""}
                    <input name="address.province" value={formik.values.address.province} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
                  </div>
                </div>

                <label>Postal Code</label>
                {formik.touched.postalcode ? <label className='text-sm italic text-red-900'>{formik.errors.postalcode}</label> : ""}
                <input name="address.postalcode" value={formik.values.address.postalcode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="classic-input"/>
              </div>
            </div>
            <button type="button" onClick={() => {setHideFinalPage(val => !val)}} className="button">{hideFinalPage ? "previous": "next"} Page</button>
            <button hidden={!hideFinalPage} type="submit" className={Object.keys(formik.errors).length === 0 ? "button": "button hover:cursor-not-allowed bg-red-200"} disabled={Object.keys(formik.errors).length === 0 ? false: true}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}