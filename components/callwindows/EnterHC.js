import { useEffect, useContext, useState } from "react"
import { Data } from "@/context/dataContext"
import { useFormik } from "formik"
import { BaseFormValidationSchema } from "@/services/BaseFormValidation"
import {useRouter} from "next/router"
import Axios from "axios"
import Spinner from "../spinner/Spinner"
import { NewDataContext } from "@/context/newDataContext"
import { FormContext } from "@/context/formContext"
function EnterHC({selectedWindow, setSelectedWindow, loading, setLoading}) {
    const router = useRouter()
    const [firstTouch, setFirstTouch] = useState(0)
    const {data, setData} = useContext(Data)
    const [error, setError] = useState("")
    const {state, dispatch} = useContext(FormContext)
    const [healthcard, setHealthcard] = useState(state.healthcard ? state.healthcard : "")

    const handleChange = (e) => {
      setHealthcard(e.target.value)
      setFirstTouch(1)
    }

    const handleSubmit = async () => {
      setLoading(true)
      // console.log("State: ")
      // console.log(state)
      // console.log("Location: ")
      // console.log(data.location)
      state.healthcard && data.location ? (
        window.localStorage.setItem("healthcard", state.healthcard),
        await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: healthcard, location: data.location.toString()}).then(async (resp) => {
          if(resp.data.msg == "visit created"){
            window.localStorage.setItem("token", resp.data.token)
            setData(data => ({...data, token: resp.data.token}))
            setLoading(false),
            // console.log("visit created"),
            router.push("/registered")
          }else{
            setLoading(false),
            // console.log("error occured."),
            router.push("/patient/LineUp")
          }
        }, err => {setLoading(false), console.log(err.message)})
      ): (
        setLoading(false)
        // console.log("something went wrong"),
        // console.log("health card number: " + state.healthcard , "from location: " + data.location)
      )
    }
    useEffect(() => {
      if(firstTouch){
        healthcard.length == 10 ? setError("") : setError("Enter only 10 digit healthcard")
        dispatch({type: "UPDATE_STATE", payload:{ healthcard: healthcard}})
      }
    },[healthcard])
// 
  return (
    <form onSubmit={(e) => {e.preventDefault(), handleSubmit(), e.stopPropagation()} }>
        <div className={selectedWindow == 1 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
            <label className="text-xl font-semibold px-5">Enter your Health card number</label>
            <input type="string" id="healthcard" onChange={handleChange} value={healthcard} className="border-b w-[90%] py-2 mx-4 focus:outline-none" placeholder={"Click here to enter your 10 digit healthcard number"} onClick={() => {setSelectedWindow(1)}} autoComplete="off"></input>
            {
              error ? <p className="text-red-900">{error}</p> : ""
            }
            {
              loading ? 
                        <div className="pt-4">
                          <Spinner />
                        </div> 
                        : 
                        <button type="submit" className="px-5 py-2 rounded-full border shadow-sm mt-2">Submit</button>
            }
        </div>
    </form>
  )
}

export default EnterHC