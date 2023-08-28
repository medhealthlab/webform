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
  const[sex, setSex] = useState(state.sex ? state.sex : "")
  const [error, setError] = useState([])
  const handleContextUpdate = (payload) => {
    dispatch({type: 'UPDATE_DATA', payload: payload})
  }

  useEffect(() => {
    console.log(sex)
    handleContextUpdate({firstname:firstname, lastname:lastname, middlename:middlename, dob:dob , sex:sex})
  },[firstname, middlename, lastname, dob,sex])
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
        <fieldset className="border-t px-3 w-full">
          <legend className="px-2">Biological Gender*</legend>
          <select className="px-2 bg-white py-2 border rounded-xl w-full mt-2" defaultValue={state.sex ? state.sex : "x"} onChange={(e) => {setSex(e.target.value)}}>
            <option disabled value="x">Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Others</option>
          </select>
        </fieldset>
      </div>
    </div>
  )
}

export default Step2