import { BaseFormValidationSchema } from "@/services/BaseFormValidation"
import {useFormik} from "formik"
import { useEffect, useState } from "react"

function CheckReg() {
    const [selectedWindow, setSelectedWindow] = useState()
    const formik = useFormik({
        initialValues:{
            healthcard: "",
            file: ""
        },
        validationSchema: BaseFormValidationSchema,
        onSubmit: () => {
            console.log(formik.values)
        }
    })

    return(
        <form onSubmit={(e) => {e.preventDefault(), formik.handleSubmit()} } className="flex justify-center items-center h-screen" onMouseDown={() => setSelectedWindow("")}>
            <div className="flex flex-col border items-center justify-center p-5 rounded-xl shadow-lg transition-all ease-in-out duration-300" onMouseDown={() => setSelectedWindow("")}>
                <div className={selectedWindow == 1 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
                    <label className="text-xl font-semibold">Health card number</label>
                    <input type="string" id="healthcard" onChange={formik.handleChange} value={formik.values.healthcard} className="border-b w-96 py-2 mx-4 focus:outline-none" placeholder={"Click here to enter your 10 digit healthcard number"} onClick={() => {setSelectedWindow(1)}} autoComplete="off"></input>
                </div>
                <div className={selectedWindow == 2 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
                    <label>Upload your healthcard</label>
                    <input type="file" id="file" onChange={() => {formik.handleChange, setSelectedWindow()}} className="border-b w-96 py-2 mx-4  focus:outline-none" onClick={() => setSelectedWindow(2)} ></input>
                </div>
            <button type="button">Parse</button>
            <button type="submit">Submit</button>
            </div>
        </form>
    )


}


export default CheckReg

