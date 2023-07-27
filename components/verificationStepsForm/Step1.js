import Basic from "../inputs/Basic"
import {useEffect, useState} from "react"

function Step1() {
  const [healthcard, setHealthcard] = useState()
  const [vc, setVc] = useState("")

  const [error, setError] = useState([])
  useEffect(() => {
    console.log(healthcard)
  },[healthcard])
  return (
    <div className='border rounded-xl h-96 shadow-xl px-5 py-2 '>
      
      <div className="flex flex-col justify-center items-center gap-5 pt-5">
        <Basic disabled={true} title={"Healthcard"} type="number" data={[healthcard, setHealthcard]} error={[error, setError]} validationRule={""}/>
        <Basic title={"Version Code"} type="text" data={[vc, setVc]} error={[error, setError]}/>

      </div>
    </div>
  )
}

export default Step1