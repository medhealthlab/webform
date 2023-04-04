import {useState, useEffect} from "react"
const regPat = new RegExp("^[0-9]*$")
function Otp() {
    const [otp, setOtp] = useState("")
    const [submitObject, setSubmitObject] = useState({status: "", value: ""})
    const handleSubmit = (e) => {
        e.preventDefault()
        otp.length === 6 ? console.log("success", otp) : console.log("length error", otp)
    }
    const readyForSubmit = (otp) =>{
        if(otp.length === 6 && regPat.test(otp)){
            return {status: "ready", value: otp}
        }
        else{
            return {status: "length error", value: "NA"}
        }
    }
    useEffect(() => {
        setSubmitObject(readyForSubmit(otp))
    }, [otp])
  return (
    <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col border items-center px-10 py-10 rounded-xl shadow-lg ">
            <label className="text-xl font-semibold pb-5">OTP</label>
            <label>Please enter the OTP your received on your registered phone number</label>
            <label>If you do not receive an otp please visit the information desk and register.</label>
            <input onChange={(e)=> setOtp(e.target.value)} maxlength="6" className="border-b text-center text-lg outline-none py-1 focus:border-b-4 focus:border-b-black focus:animate-pulse transition-all ease-in focus:duration-300" value={otp} placeholder="XXXXXX"/>
            <button type="submit" className={`${submitObject.status == "ready" ? "bg-green-300" : "bg-red-100"} px-5 py-2 my-2 rounded-xl hover:shadow-md shadow text-md font-semibold`}>Submit</button>
        </form>
    </div>
  )
}

export default Otp