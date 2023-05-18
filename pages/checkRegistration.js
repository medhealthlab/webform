import {createRef, useState, useEffect} from "react"
import Axios from "axios"
import {useRouter} from "next/router"
import Spinner from "../components/spinner/Spinner.js"
import ReCAPTCHA from "react-google-recaptcha"
function CheckRegistration() {
    const router = useRouter()
    const [touched, setTouched] = useState()
    const [loading, setLoading] = useState(false)
    const [healthcard, setHealthCard] = useState("Enter Health card")
    const [location, setLocation] = useState()
    const [formError, setFormError] = useState([])
    const recaptchaRef = createRef()

    useEffect(()=>{
      if(!window){
        setLocation(window.localStorage.getItem("location")).then(() => console.log("location update"))
        setHealthCard(window.localStorage.getItem("healthcard")).then(() => console.log("HC update"))
      }
      setLocation(window.localStorage.getItem("location"));
    })

    const handleChange = (event) => {
      setHealthCard(event.target.value)
    }
    const onReCAPTCHAChange = (captchaCode) => {
      if(!captchaCode) {
        return;
      }
      recaptchaRef.current.reset();
    }
    const handleSubmit = async () => {
      // Loading true
      setLoading(true);
      
      (healthcard && location) ? (
        window.localStorage.setItem("healthcard",healthcard),
        console.log("health card number: " + healthcard , "from location: " + location),
        recaptchaRef.current.execute(),
        // console.log(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT),
        await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: healthcard, location: location}).then(async (resp) => {
          console.log(resp);
          if(resp.data.msg == "visit created"){
            window.localStorage.setItem("token", resp.data.token)
            setLoading(false),
            console.log("visit created"),
            router.push("/registered")
          }else{
            setLoading(false),
            console.log("error occured."),
            router.push("/patient/Registration")
          }
        }, err => {setLoading(false), console.log(err.message)})
        // await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT,{healthcard: healthcard, location: location}).then(async (response) => {
        //   console.log(response)
        // }
        // )
      ): (
        setLoading(false),
        console.log("something went wrong"),
        console.log("health card number: " + healthcard , "from location: " + location)
      )




      // setLoading(true)
      // console.log(healthcard, location)
      // // healthcard.length === 12 ? 
      //   // (
      //     // window.localStorage.setItem("healthcard", healthcard),
      //     recaptchaRef.current.execute(),
      //     await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT,{ healthcard: healthcard, location: location})
      //     .then(async (response) => {
      //       console.log(response)
      //       if(response.data.resp == "visit created"){
      //           setLoading(false),
      //           router.push("/registered")
      //         }
      //         else{
      //           setLoading(false),
      //           router.push("/patient/Registration")
      //         } 
      //         }, 
      //         (err) => {
      //           setLoading(false),
      //           console.log(err)
      //         }
      //     )
        // )
        // :
        // (
        //   setFormError([`length of the health card must be equal to 12`]), 
        //   console.log(formError)
        // )
    }
    const selectInput = () => {
      touched ? {} : (setHealthCard(""), console.log("reset the input"))
      setTouched(true)
    }
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className="mb-5 mx-2 py-5 border rounded-xl shadow-md flex flex-col justify-center item-center transition duration-700 ease-in-out absolute z-20 bg-white bg-opacity-25">
        <form onSubmit={(e) => (e.preventDefault(), handleSubmit())} className="px-5">
          <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onReCAPTCHAChange} />
            <div className='input-field'>
                <label className='label'>Health card number*</label>
                {touched ? <p>{formError[0]}</p>:<></>}
                <input value={healthcard} placeholder="Enter Health card" name="healthcard" onChange={(e) => handleChange(e)} className="classic-input" onSelect={() => selectInput()}/>
                <lable className="text-lg font-semibold text-center py-5">or</lable>
                <label className='label'>Scan Health Card*</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
                <br/>
                {loading ? <Spinner /> : <button type="submit" className="button">Submit</button>}
            </div>
        </form>
      </div>
    </div>
  )
}

export default CheckRegistration