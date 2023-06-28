import { BaseFormValidationSchema } from "@/services/BaseFormValidation"
import {useFormik} from "formik"
import { useEffect, useState, useContext } from "react"
import { Data } from "@/context/dataContext"
import Axios from "axios"
function CheckReg() {
    const [selectedWindow, setSelectedWindow] = useState()
    const {data, setData} = useContext(Data)
    const formik = useFormik({
        initialValues:{
            healthcard: "",
            file: ""
        },
        validationSchema: BaseFormValidationSchema,
        onSubmit: async () => {
            let resp
            formik.values.healthcard ? (
                setData({healthcard: formik.values.healthcard}),
                resp = await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: formik.values.healthcard, location: 100}),
                console.log(resp)
            ) 
            :
            (
                console.log("call photo api")
                // on response update the data in the context.
                // then call the check if register api again
                // if the response is not found redirect to the form alogn with the access to the data.
                //  if success redirect to the welcome page.
            )
            
        }
    })
    useEffect(() => {
        console.log(data)
    },[data])

    return(
        <form onSubmit={(e) => {e.preventDefault(), formik.handleSubmit()} } className="flex justify-center items-center h-screen -mt-32" onMouseDown={() => setSelectedWindow("")}>
            <div className="flex flex-col border items-center justify-center p-5 rounded-xl shadow-lg transition-all ease-in-out duration-300" onMouseDown={() => setSelectedWindow("")}>
                <div className={selectedWindow == 1 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
                    <label className="text-xl font-semibold px-5">Enter your Health card number</label>
                    {formik.errors.healthcard ? <label>{formik.errors.healthcard}</label>: ""}
                    <input type="string" id="healthcard" onChange={formik.handleChange} value={formik.values.healthcard} className="border-b w-[90%] py-2 mx-4 focus:outline-none" placeholder={"Click here to enter your 10 digit healthcard number"} onClick={() => {setSelectedWindow(1)}} autoComplete="off"></input>
                </div>
                <label>OR</label>
                <div className={selectedWindow == 2 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
                    <label className="text-xl font-semibold px-5">Scan your healthcard</label>
                    <input type="file" id="file" onChange={() => {formik.handleChange, setSelectedWindow()}} className="border-b w-54 py-2 mx-4  focus:outline-none" onClick={() => setSelectedWindow(2)} ></input>
                </div>
                <button type="button">Parse</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    )


}


export default CheckReg

