import {useState} from "react"
import Basic from "../inputs/Basic"
import ReactGoogleAutocomplete from "react-google-autocomplete"
function Step4() {
  const [address, setAddress] = useState()
  const [error, setError] = useState([])
  return (
    <div>
      <ReactGoogleAutocomplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} style={{ width: "90%" }} options={{
    types: ["(regions"],
    componentRestrictions: { country: "ca" },
  }} onPlaceSelected={(place, inputRef, autocomplete) => {console.log(autocomplete);}}/>
      {/* <Basic title={"Address*"} type="string" data={[address, setAddress]} error={[error, setError]}/> */}
      <p className="text-center text-sm pt-4">Your address will be self populated underneath</p> 
      <Basic title={"Unit / Building number"} type="string" data={[address, setAddress]} error={[error, setError]} disabled={true}/>
      <Basic title={"Street"} type="string" data={[address, setAddress]} error={[error, setError]} disabled={true}/>
      <Basic title={"City"} type="string" data={[address, setAddress]} error={[error, setError]} disabled={true}/>
      <Basic title={"Province"} type="string" data={[address, setAddress]} error={[error, setError]} disabled={true}/>
    
    </div>
  )
}

export default Step4