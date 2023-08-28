import {useEffect, useState, useContext} from "react"
import Basic from "../inputs/Basic"
import { NewDataContext } from "@/context/newDataContext"
import { ErrorContext } from "@/context/errorContext"

function Step3() {
  const {state, dispatch} = useContext(NewDataContext)
  const [email, setEmail] = useState(state.email ? state.email : "")
  const [mobile, setMobile] = useState(state.mobile ? state.mobile : "")
  const [error, setError] = useState([])

  const {errorState, errorDispatcher} = useContext(ErrorContext)

  const handleContextUpdate = (payload) => {
    dispatch({type: 'UPDATE_DATA', payload: payload})
  }

  const handleErrors = (payload) => {
    errorDispatcher({type: "UPDATE_ERROR", payload: payload})
  }

  useEffect(() => {
    handleContextUpdate({email: email, mobile: mobile})
    console.log(errorState)
  },[email, mobile])

  return (
    <div>
      <Basic title={"Email*"} type="string" tag="email" data={[email, setEmail]} validationRule={["email","required"]} errorHandler={handleErrors} error={[error, setError]}/>
      <Basic title={"Mobile Number*"} type="number" tag="phone" data={[mobile, setMobile]} validationRule={["phone","required"]} errorHandler={handleErrors} error={[error, setError]}/>
    </div>
  )
}

export default Step3