import { useEffect, useContext } from "react"
import {useFormik} from "formik"
import {Step2Schema} from "./validation/step2"
import { FormContext } from "@/context/formContext"
function Step2({page, setPage}) {
    const {state, dispatch} = useContext(FormContext)
    const handleStateUpdate = (payload) => {
        console.log("saving state")
        dispatch({type: "UPDATE_STATE", payload: payload})
    }
    const formik = useFormik({
        initialValues:{
            firstname: state.firstname ? state.firstname : "" ,
            middlename: state.middlename ? state.middlename : "",
            lastname: state.lastname ? state.lastname : "",
            dob: state.dob ? state.dob : "",
            day: state.dob ? state.dob.slice(6,8) : "",
            month: state.dob ? state.dob.slice(4,6) : "",
            year: state.dob ? state.dob.slice(0,4) : "",
            sex: state.sex ? state.sex : "x",
        },
        validationSchema: Step2Schema,
        onSubmit: (values) => {
            handleStateUpdate(values),
            console.log(state)
        } 
    })

    useEffect(() => {
        console.log(formik.isValid)
        formik.values.dob = formik.values.year + formik.values.month + formik.values.day
        console.log(state)
        console.log(formik.values)
        console.log(formik.errors)
    },[formik.values.day, formik.values.month, formik.values.year , formik.errors]) 

  return (
    <div className="border rounded-xl shadow-xl p-10">
        <div id="firstname" className="flex flex-col">
            <label className="text-xl">Firstname*</label>
            <input placeholder="firstname" id="firstname" value={formik.values.firstname} onChange={formik.handleChange} className="pl-5 text-lg border rounded-xl mt-1 mb-3"/>
        </div>

        <div id="middlename" className="flex flex-col">
            <label className="text-xl">middlename</label>
            <input placeholder="middlename" id="middlename" value={formik.values.middlename} onChange={formik.handleChange} className="pl-5 text-lg border rounded-xl mt-1 mb-3"/>
        </div>

        <div id="lastname" className="flex flex-col">
            <label className="text-xl">Lastname*</label>
            <input placeholder="lastname" id="lastname" value={formik.values.lastname} onChange={formik.handleChange} className="pl-5 text-lg border rounded-xl mt-1 mb-3"/>
        </div>

        <div id="dob" className="flex flex-col">
            <label className="text-xl">Date of Birth*</label>
            <div className="flex">
                <input placeholder="DD" id="day" value={formik.values.day} maxLength={2} onChange={formik.handleChange} className="w-16 pl-2 text-lg border rounded-xl mt-1 mb-3 mr-2"/>
                <input placeholder="MM" id="month" value={formik.values.month} maxLength={2} onChange={formik.handleChange} className="w-16 pl-2 text-lg border rounded-xl mt-1 mb-3 mr-2"/>
                <input placeholder="YYYY" id="year" value={formik.values.year} maxLength={4} onChange={formik.handleChange} className="w-24 pl-2 text-lg border rounded-xl mt-1 mb-3"/>
            </div>
        </div>

        <div id="sex" className="flex flex-col">
            <label className="text-xl">Biological Gender*</label>
            <select id="sex" value={formik.values.sex} onChange={formik.handleChange} className="pl-2 text-lg border rounded-xl mt-1 mb-3">
                <option value="x" disabled>Select one</option>
                <option value="M">Bio. Male</option>
                <option value="F">Bio. Female</option>
                <option value="O">Other</option>
            </select>
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
)}

export default Step2