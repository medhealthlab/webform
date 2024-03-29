import { useContext } from "react"
import { NewDataContext } from "@/context/newDataContext"
import Axios from "axios"
import { Data } from "@/context/dataContext"
import {useRouter} from "next/router"

function Step5() {
  const router = useRouter()
  const {data, setData} = useContext(Data)
  const {state, dispatch} = useContext(NewDataContext)
  const handleSubmit = async () => {
    const resp = await Axios.post(process.env.NEXT_PUBLIC_REGISTER_NEW_PATIENT, {...state, source: "webform" });
      if(resp.data.status == "operation successful"){
        console.log("creating new visit", data.location)
        const resp2 = await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: state.healthcard, location: data.location.toString()})
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
    }
  
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

        <button className="px-3 py-1 border rounded-full shadow-sm hover:shadow-xl outline-none hover:border-blue-500" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Step5