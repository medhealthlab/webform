import { useEffect, useContext } from "react"
import {useFormik} from "formik"
import {Step1Schema} from "./validation/step1"
import { FormContext } from "@/context/formContext"
import Axios from "axios"
import {useRouter} from "next/router"

function Step5({page, setPage}) {
  const {state, dispatch} = useContext(FormContext)
  const router = useRouter()
    const formik = useFormik({
        initialValues:{
            healthcard: state.healthcard ? state.healthcard : "",
            vc: state.vc ? state.vc : "",
            sex : state.sex ? state.sex :"",
            dob: state.dob ? state.dob : "",
            firstname: state.firstname ? state.firstname : "" ,
            lastname: state.lastname ? state.lastname : "",
            middlename: state.middlename ? state.middlename : "",
            location: state.location,
            mobile: state.mobile ? state.mobile : "",
            email: state.email ? state.email : "",
            address: state.address ? state.address : "",
            province: state.sub ? state.sub.province ? state.sub.province : "" : "",
            postalCode: state.sub ? state.sub.postalCode ? state.sub.postalCode : "" : "",

        },
        validationSchema: Step1Schema,
        onSubmit: async (values) => {
          console.log(values)
          const resp = await Axios.post(process.env.NEXT_PUBLIC_REGISTER_NEW_PATIENT, {...values, source: "webform" });
      if(resp.data.status == "operation successful"){
        console.log("creating new visit", values.location)
        const resp2 = await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: values.healthcard, location: values.location.toString()})
        if(resp2.data.msg == "visit created"){
          window.localStorage.setItem("token", resp2.data.token)
          console.log("visit created"),
          router.push("/registered")
        }else{
          console.log(resp2)
          console.log("error occured.")
        }
      }else{
        console.log("something went wrong...")
      }
            console.log(values)
        } 
    })

    useEffect(() => {
        console.log(formik.errors)
    },[formik.errors]) 

  return (
    <div className="border rounded-xl shadow-xl p-10 ">
      <h2 className="text-center text-xl font-semibold">Confirm your details</h2>
      <ul>
          <li className="py-2">
            <h2 className="text-lg font-semibold">Firstname</h2>
            <h3 className="px-2">{state.firstname}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Middlename</h2>
            <h3 className="px-2">{state.middlename}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Lastname</h2>
            <h3 className="px-2">{state.lastname}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Sex</h2>
            <h3 className="px-2">{state.sex}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Date of birth</h2>
            <h3 className="px-2">{`${state.dob.slice(0,4)}-${state.dob.slice(4,6)}-${state.dob.slice(6,8)}`}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Healthcard Number</h2>
            <h3 className="px-2">{`${state.healthcard.slice(0,4)}-${state.healthcard.slice(4,7)}-${state.healthcard.slice(7,10)}`}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Version Code</h2>
            <h3 className="px-2">{state.vc}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Email</h2>
            <h3 className="px-2">{state.email}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Phone</h2>
            <h3 className="px-2">{state.mobile}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Address</h2>
            <h3 className="px-2">{state.address}</h3>
          </li>
        </ul>
        <button
            type="button"
            // disabled={formik.errors}
            className={`px-3 py-2 rounded-full border border-blue-500 ${formik.isValid ? "" : "opacity-50 border-red-500 cursor-not-allowed"}`}
            onClick={(e) => {
                e.preventDefault();
                if (formik.isValid) {
                    setPage(val => val - 1);
                }
            }}
        >
            Previous Page
        </button>

        <button className={`px-3 py-2 rounded-full border border-blue-500 ${formik.isValid ? "" : "opacity-50 border-red-500 cursor-not-allowed"}`} type="submit" onClick={(e) => {e.preventDefault(), formik.handleSubmit()}}>Submit</button>
    </div>
  )
}

export default Step5