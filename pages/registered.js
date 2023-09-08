import {useState, useEffect, useContext} from "react"
import { locations } from "../services/locations"
import { Data } from "@/context/dataContext"

function Registered() {
  const {data, setData} = useContext(Data)
  const [healthcard, setHealthcard] = useState("")
  const [location , setLocation] = useState("")
  const [token, setToken] = useState()
  useEffect(() => {
    setToken(window.localStorage.getItem("token"))
    setHealthcard(data.healthcard || window.localStorage.getItem("healthcard"))
    setLocation(window.localStorage.getItem("location") ? window.localStorage.getItem("location") : window.localStorage.setItem("location", data.location))
  },[])
  return (
    <div className="px-10 flex flex-col text-center">
      <h1 className="text-2xl font-semibold">Welcome to <br />Med Health labs Ltd.</h1>
      <div className="border rounded-xl px-5 py-5 flex flex-col mt-5">
        <h2 className="text-xl font-semibold">Token number: <span className="text-2xl animate-pulse">{token}</span></h2>
        {/* <div className="px-2 py-5"> */}
          {/* <p>SCC number: {location}</p> */}
          {/* <h2>Your are at</h2> */}
          {/* {locations.map((loc) => {return (loc.scc == parseInt(location) ? <p key={loc.id}>{loc.address}</p> : "")})} */}
          {/* <p>Your Health Card: {healthcard}</p> */}
          {/* <p>Please be patient and we will serve you in {"time"}.</p> */}
          {/* Current wait times are ...  */}
        {/* </div> */}
      </div>
          <p className="text-xs absolute bottom-0 mr-12 py-2">If you have any questions, please feel free to speak with any of the staff member.</p>
    </div>
  )
}

export default Registered