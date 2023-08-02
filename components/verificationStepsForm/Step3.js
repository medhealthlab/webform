import {useEffect, useState, useContext} from "react"
import Basic from "../inputs/Basic"
import { NewDataContext } from "@/context/newDataContext"
function Step3() {
  const {state, dispatch} = useContext(NewDataContext)
  const [email, setEmail] = useState(state.email ? state.email : "")
  const [mobile, setMobile] = useState(state.mobile ? state.mobile : "")
  const [error, setError] = useState([])

  const handleContextUpdate = (payload) => {
    dispatch({type: 'UPDATE_DATA', payload: payload})
  }

  useEffect(() => {
    handleContextUpdate({email: email, mobile: mobile})
  },[email, mobile])
  return (
    <div>
      <Basic title={"Email*"} type="string" data={[email, setEmail]} error={[error, setError]}/>
      <Basic title={"Mobile Number*"} type="number" data={[mobile, setMobile]} error={[error, setError]}/>
    </div>
  )
}

export default Step3