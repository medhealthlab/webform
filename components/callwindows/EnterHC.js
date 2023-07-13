import { useEffect, useContext } from "react"
import { Data } from "@/context/dataContext"
import { useFormik } from "formik"
import { BaseFormValidationSchema } from "@/services/BaseFormValidation"
import {useRouter} from "next/router"
import Axios from "axios"
import Spinner from "../spinner/Spinner"
function EnterHC({selectedWindow, setSelectedWindow, loading, setLoading}) {
    const router = useRouter()
    const {data, setData} = useContext(Data)
    const formik = useFormik({
        initialValues: {
            healthcard: data.healthcard || ""
        },
        validationSchema: BaseFormValidationSchema,
        onSubmit: async () => {
            setData(data => ({...data, healthcard: formik.values.healthcard}))
            formik.values.healthcard && data.location ? (
                window.localStorage.setItem("healthcard",data.healthcard),
                console.log("health card number: " + formik.values.healthcard , "from location: " + data.location),
                await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: formik.values.healthcard, location: data.location.toString()}).then(async (resp) => {
                  if(resp.data.msg == "visit created"){
                    window.localStorage.setItem("token", resp.data.token)
                    setData(data => ({...data, token: resp.data.token}))
                    setLoading(false),
                    console.log("visit created"),
                    router.push("/registered")
                  }else{
                    setLoading(false),
                    console.log("error occured."),
                    router.push("/patient/Registration")
                  }
                }, err => {setLoading(false), console.log(err.message)})
              ): (
                setLoading(false),
                console.log("something went wrong"),
                console.log("health card number: " + formik.values.healthcard , "from location: " + data.location)
              )
        }
    })
  return (
    <form onSubmit={(e) => {e.preventDefault(), formik.handleSubmit(), e.stopPropagation()} }>
        <div className={selectedWindow == 1 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
            <label className="text-xl font-semibold px-5">Enter your Health card number</label>
            {formik.errors.healthcard ? <label>{formik.errors.healthcard}</label>: ""}
            <input type="string" id="healthcard" onChange={formik.handleChange} value={formik.values.healthcard} className="border-b w-[90%] py-2 mx-4 focus:outline-none" placeholder={"Click here to enter your 10 digit healthcard number"} onClick={() => {setSelectedWindow(1)}} autoComplete="off"></input>
            {
              loading ? <Spinner /> : <button type="submit" className="px-5 py-2 rounded-full border shadow-sm mt-2">Submit</button>
            }
        </div>
    </form>
  )
}

export default EnterHC