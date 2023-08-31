import { useEffect, useContext } from "react"
import {useFormik} from "formik"
import {Step3Schema} from "./validation/step3"
import { FormContext } from "@/context/formContext"
function Step3({page, setPage}) {
    const {state, dispatch} = useContext(FormContext)

    const handleStateUpdate = (payload) => {
        console.log("saving state")
        dispatch({type: "UPDATE_STATE", payload: payload})
    }
    const formik = useFormik({
        initialValues:{
            email: state.email ? state.email : "" ,
            mobile: state.mobile ? state.mobile : "" ,
        },
        validationSchema: Step3Schema,
        onSubmit: (values) => {
            handleStateUpdate(values)
            console.log(values)
        } 
    })
    
    useEffect(() => {
        console.log(formik.errors)
        formik.values.mobile = parseInt(formik.values.mobile) ? parseInt(formik.values.mobile) : ""  
    },[formik.errors, formik.values.mobile]) 

  return (
    <div className="border rounded-xl shadow-xl p-10">
            <div id="email" className="flex flex-col">
                <label className="text-xl">Email*</label>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
            </div>

            <div id="mobile" className="flex flex-col">
                <label className="text-xl">Mobile*</label>
                <input
                    type="tel"
                    maxLength={10}
                    placeholder="Mobile"
                    id="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
            </div>
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

            <button
            type="button"
            // disabled={formik.errors}
            className={`px-3 py-2 rounded-full border border-blue-500 ${formik.isValid ? "" : "opacity-50 border-red-500 cursor-not-allowed"}`}
            onClick={(e) => {
                e.preventDefault();
                if (formik.isValid) {
                    setPage(val => val + 1);
                };
                formik.handleSubmit()
            }}
        >
            Next Page
        </button>
        </div>
  )
}

export default Step3