import {useState, useEffect} from "react"

function registered() {
  const [healthcard, setHealthcard] = useState("")
  const [location , setLocation] = useState("")
  useEffect(() => {
    setHealthcard(window.localStorage.getItem("healthcard"))
    setLocation(window.localStorage.getItem("location"))
    
  },[])
  return (
    <div className="px-10 flex flex-col">
      <h1 className="text-2xl font-semibold">Welcome to Med Health labs Inc.</h1>
      <div className="border rounded-xl px-5 py-5 flex flex-col mt-5">
        <h2 className="text-xl font-semibold">Stats:</h2>
        <div className="px-2">
          <p>Current Specimen Collection Centre: {location}</p>
          <p>Virtual Queue ID: {null}</p>
          <p>Your Health Card: {healthcard}</p>
          {/* <p>Please be patient and we will serve you in {"time"}.</p> */}
          {/* Current wait times are ...  */}
        </div>
      </div>
    </div>
  )
}

export default registered