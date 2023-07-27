import Basic from "../inputs/Basic"
import DatePicker from "../inputs/DatePicker"
import { useState } from "react"
function Step2() {
  const [firstname, setFirstname] = useState()
  const [middlename, setMiddlename] = useState()
  const [lastname, setLastname] = useState()
  const [dob, setDob] = useState()
  const [error, setError] = useState([])
  return (
    <div className='border rounded-xl shadow-xl px-5 pt-2 pb-5  '>
      
      <div className="flex flex-col justify-center items-center gap-2 pt-5">
        
        <Basic title={"Firstname*"} type="number" data={[firstname, setFirstname]} error={[error, setError]}/>
        <Basic title={"Middlename"} type="text" data={[middlename, setMiddlename]} error={[error, setError]}/>
        <Basic title={"Lastname*"} type="text" data={[lastname, setLastname]} error={[error, setError]}/>
        <DatePicker title={"DOB*"}  data={[]} error={[error, setError]}/>
      </div>
    </div>
  )
}

export default Step2