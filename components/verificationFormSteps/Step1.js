import { useFormik } from "formik";
import {useState, useEffect, useContext } from "react";
import { NewDataContext } from "@/context/newDataContext";
import { Step1Schema } from "@/validation/Schema";


function Step1() {
    const [tempString, setTempString] = useState("")
    const {state, dispatch} = useContext(NewDataContext)
    const updateString = (inputString) => {
        let outputString = ""
        if(inputString.length > 7){
            outputString = `${inputString.slice(0,4)}-${inputString.slice(4,7)}-${inputString.slice(7,10)}`
            console.log("len:>7 ", outputString)
        }else if(inputString.length <= 7 && inputString.length > 4){
            outputString = `${inputString.slice(0,4)}-${inputString.slice(4,7)}`
            console.log("len:>4 ", outputString)
        }else if(inputString.length <= 4){
            outputString = `${inputString.slice(0,4)}`
            console.log("len:<4 ", outputString)
        }
        setTempString(outputString)
    }

    const formik = useFormik({
        initialValues:{
            healthcard: "",
            vc: ""
        },
        validationSchema: Step1Schema,
        onSubmit: (values) =>{
            dispatch({type:"UPDATE_DATA", payload: {healthcard: values.healthcard, vc: values.vc}})
        },
    })
    useEffect(() =>{
        updateString(formik.values.healthcard)
    },[formik.values.healthcard])

    return(
        <div className='flex flex-col justify-center items-center h-96 w-[50%] shadow-xl px-5 py-2 '>
            <form className="flex flex-col justify-center border rounded-xl items-center gap-5 w-[50%]" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit()}}>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="text-xl font-semibold">Healthcard #: {tempString}</p>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <label>Healthcard</label>
                    </div>
                    <input id="healthcard" type="string" onChange={formik.handleChange} maxLength={10} placeholder="Healthcard" value={formik.values.healthcard} className="px-2"/>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                            <label>Version Code</label>
                    </div>
                    <input id="vc" type="string" onChange={formik.handleChange} maxLength={2} placeholder="VC" value={formik.values.vc} className="px-2"/>
                </div>
                <div id="errors" className="">
                    {formik.errors.healthcard ? <p className="text-sm font-semibold text-red-900">{formik.errors.healthcard}</p>: ""}
                    {formik.errors.vc != "" ? <p className="text-sm font-semibold text-red-900">{formik.errors.vc}</p>: ""}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Step1