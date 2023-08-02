import { NewDataContext } from "@/context/newDataContext"
import Basic from "../inputs/Basic"
import DatePicker from "../inputs/DatePicker"
import { useContext, useEffect, useState } from "react"
function Step2() {
  const {state, dispatch} = useContext(NewDataContext)
  const [firstname, setFirstname] = useState(state.firstname ? state.firstname :"")
  const [middlename, setMiddlename] = useState(state.middlename ? state.middlename : "")
  const [lastname, setLastname] = useState(state.lastname ? state.lastname : "")
  const [dob, setDob] = useState(state.dob ? state.dob : "")
  const [error, setError] = useState([])

  const handleContextUpdate = (payload) => {
    dispatch({type: 'UPDATE_DATA', payload: payload})
  }

  useEffect(() => {
    handleContextUpdate({firstname:firstname, lastname:lastname, middlename:middlename, dob:dob})
  },[firstname, middlename, lastname, dob])
  return (
    <div className='border rounded-xl shadow-xl px-5 pt-2 pb-5 '>
      <div className="flex flex-col justify-center items-center gap-2 pt-5">
        <fieldset className="border-t px-3">
          <legend className="px-2">Your Info</legend>
          <Basic title={"Firstname*"} type="text" data={[firstname, setFirstname]} error={[error, setError]}/>
          <Basic title={"Middlename"} type="text" data={[middlename, setMiddlename]} error={[error, setError]}/>
          <Basic title={"Lastname*"} type="text" data={[lastname, setLastname]} error={[error, setError]}/>
        </fieldset>
        <DatePicker title={"DOB*"}  data={[dob, setDob]} error={[error, setError]}/>
      </div>
    </div>
  )
}

export default Step2