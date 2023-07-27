import {useState} from "react"
import Basic from "../inputs/Basic"
function Step3() {
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [mobile, setMobile] = useState()
  const [error, setError] = useState([])
  return (
    <div>
      <Basic title={"Email*"} type="string" data={[email, setEmail]} error={[error, setError]}/>
      <Basic title={"Phone*"} type="number" data={[phone, setPhone]} error={[error, setError]}/>
      <Basic title={"Mobile*"} type="number" data={[mobile, setMobile]} error={[error, setError]}/>
    </div>
  )
}

export default Step3