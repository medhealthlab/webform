import Basic from "../inputs/Basic"
import {useEffect, useState, useContext} from "react"
import { NewDataContext } from "@/context/newDataContext"
function Step1() {
  const {state, dispatch} = useContext(NewDataContext)
  const [vc, setVc] = useState(state.vc ? state.vc : "")
  const [healthcard, setHealthcard] = useState(state.healthcard ? state.healthcard : "")


  const [error, setError] = useState([])
  const handleContextUpdate = (payload) => {
    dispatch({type: 'UPDATE_DATA', payload: payload})
  }

  useEffect(() => {
    handleContextUpdate({healthcard: healthcard, vc: vc})
  },[healthcard, vc])

  return (
    <div className='border rounded-xl h-96 shadow-xl px-5 py-2 '>
      <div className="flex flex-col justify-center items-center gap-5 pt-5">
        <Basic disabled={true} title={"Healthcard"} type="string" data={[healthcard, setHealthcard]} error={[error, setError]} validationRule={""}/>
        <Basic title={"Version Code"} type="text" data={[vc, setVc]} error={[error, setError]}/>
      </div>
    </div>
  )
}

export default Step1