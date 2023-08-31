import { useEffect, useContext } from "react"
import {useFormik} from "formik"
import {Step1Schema} from "./validation/step1"
import { FormContext } from "@/context/formContext"
function Step1({page, setPage}) {
    const {state, dispatch} = useContext(FormContext)
    const handleStateUpdate = (payload) => {
        dispatch({type: "UPDATE_STATE", payload: payload})
    }
    const formik = useFormik({
        initialValues:{
            healthcard: state.healthcard ? state.healthcard: "",
            vc: state.vc ? state.vc : "",
        },
        validationSchema: Step1Schema,
        onSubmit: (values) => {
            handleStateUpdate(values),
            console.log(values)
        } 
    })

    useEffect(() => {
        console.log(formik.errors)
    }) 

  return (
    <div className="">
        <div id="healthcard-number" className="flex flex-col">
            <label className="text-xl">Healthcard</label>
            <input placeholder="XXXX-XXX-XXX" id="healthcard" value={formik.values.healthcard} onChange={formik.handleChange} className="pl-5 text-lg border rounded-xl mt-1 mb-3"/>
            
        </div>

        <div id="version-code" className="flex flex-col">
            <label className="text-xl">Version Code</label>
            <input placeholder="VC" id="vc" value={formik.values.vc} onChange={formik.handleChange} className="pl-5 text-lg border rounded-xl mt-1 mb-3"/>
        </div>
            {formik.errors.healthcard ? <p>{formik.errors.healthcard}</p> :""}
            {formik.errors.vc ? <p>{formik.errors.vc}</p>:""}
        <button 
        type="button"
        // disabled={formik.errors} 
        className={`px-3 py-2 rounded-full border border-blue-500 ${formik.errors.healthcard || formik.errors.vc ? "border-red-500 cursor-not-allowed" : ""}`} disabled={formik.errors.healthcard || formik.errors.vc} onClick={(e) => (e.preventDefault(), setPage(val => val = val + 1), formik.handleSubmit())}>Next Page</button>
    </div>
  )
}

export default Step1