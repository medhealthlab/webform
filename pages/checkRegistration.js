import {useState} from "react"
import Axios from "axios"
import {useRouter} from "next/router"
import Spinner from "../components/spinner/Spinner.js"
function CheckRegistration() {
    const router = useRouter()
    const [touched, setTouched] = useState()
    const [loading, setLoading] = useState(false)
    const [healthcard, setHealthCard] = useState("Enter Health card")
    const [formError, setFormError] = useState([])
    const handleChange = (event) => {
      setHealthCard(event.target.value)
    }
    const handleSubmit = async () => {
      setLoading(true)
      healthcard.length === 10 ? 
        (
          console.log("call action"),
          console.log(process.env.NEXT_PUBLIC_CHECK_REGISTRATION_ENDPOINT),
          await Axios.post(process.env.NEXT_PUBLIC_CHECK_REGISTRATION_ENDPOINT,{ num: healthcard})
          .then((response) => {
            if(response.data.resp === "Registered"){
                setLoading(false),
                window.localStorage.setItem("healthcard", healthcard), 
                router.push("/registered")
              }
              else{
                setLoading(false),
                router.push("/patient/Registration")
              } 
              }, 
              (err) => {
                setLoading(false),
                console.log(err)
              }
          )
        )
        :
        (
          setFormError([`length of the health card less than 10`]), 
          console.log(formError)
        )
    }
    const selectInput = () => {
      touched ? {} : (setHealthCard(""), console.log("reset the input"))
      setTouched(true)
    }
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="mb-5 mx-2 py-5 border rounded-xl shadow-md flex flex-col justify-center item-center transition duration-700 ease-in-out absolute z-20 bg-white bg-opacity-25">
        <form onSubmit={(e) => (e.preventDefault(), handleSubmit())} className="px-5">
            <div className='input-field'>
                <label className='label'>Health card number*</label>
                {touched ? <p>{touched + formError[0]}</p>:<></>}
                <input value={healthcard} placeholder="Enter Health card" name="healthcard" onChange={(e) => handleChange(e)} className="classic-input" onSelect={() => selectInput()}/>
                <br/>
                {loading ? <Spinner /> : <button type="submit" className="button">Submit</button>}
            </div>
        </form>
      </div>
    </div>
  )
}

export default CheckRegistration