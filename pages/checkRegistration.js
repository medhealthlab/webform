import {useState} from "react"
function CheckRegistration() {
    const [touched, setTouched] = useState(false)
    const [healthcard, setHealthCard] = useState("Enter Health card")
    const [formError, setFormError] = useState([])
    const handleChange = (event) => {
      setHealthCard(event.target.value)
    }
    const handleSubmit = () => {
      healthcard.length === 10 ? console.log("call action"): setFormError([`length of the health card less than 10`]), console.log(formError)
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
                    <label className='label' >Health card number*</label>
                    <input value={healthcard} placeholder="Enter Health card" name="healthcard" onChange={(e) => handleChange(e)} className="classic-input" onSelect={() => selectInput()}/>
                    <br/>
                    <button type="submit" className="button">Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default CheckRegistration