import { useEffect, useContext } from "react"
import {useFormik} from "formik"
import {Step1Schema} from "./validation/step1"
import { FormContext } from "@/context/formContext"
function Step1() {
  const {state, dispatch} = useContext(FormContext)
    const formik = useFormik({
        initialValues:{
            healthcard: "",
            vc: "",
        },
        validationSchema: Step1Schema,
        onSubmit: (values) => {
            console.log(values)
        } 
    })

    useEffect(() => {
        console.log(formik.errors)
    },[formik.errors]) 

  return (
    <div className="border rounded-xl shadow-xl p-10">
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

        {/* <button className="px-3 py-1 border rounded-full shadow-sm hover:shadow-xl outline-none hover:border-blue-500" onClick={handleSubmit}>Submit</button> */}
    </div>
  )
}

export default Step1