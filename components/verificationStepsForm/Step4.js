import {useState, useEffect, useContext} from "react"
import Basic from "../inputs/Basic"
import AutoComplete from "react-google-autocomplete";
import axios  from "axios"
import { NewDataContext } from "@/context/newDataContext";
function Step4() {
  const {state, dispatch} = useContext(NewDataContext)
  const [unit, setUnit] = useState(state.sub ? state.sub.unit : "")
  const [street, setStreet] = useState(state.sub ? state.sub.street : "")
  const [city, setCity] = useState(state.sub ? state.sub.city : "")
  const [province, setProvince] = useState(state.sub ? state.sub.province : "")
  const [postalcode, setPostalcode] = useState(state.sub ? state.sub.postalcode : "")
  const [address, setAddress] = useState(state.address ? state.address : "")
  const [error, setError] = useState([])
  
  const updateAddress = (resp) => {
    if(resp.address_components){
      setStreet(`${resp.address_components[0].long_name} ${resp.address_components[1].long_name}`)
      resp.address_components.map((address_array_ele) => {
        
        if(address_array_ele.types.includes("administrative_area_level_3")){
          setCity(address_array_ele.long_name)
        }
        if(address_array_ele.types.includes("administrative_area_level_1")){
          setProvince(address_array_ele.long_name)
        }
        if(address_array_ele.types == "postal_code"){
          setPostalcode(address_array_ele.long_name)
        }
      })
    }
    setAddress(`${unit ? `${unit} - ` : ""} ${street}, ${city}, ${province}, ${postalcode}.`)
    dispatch({type: "UPDATE_DATA", payload:{ address: address, sub: { unit:unit, street:street, city:city, province:province, postalcode:postalcode}}})
  }
  useEffect(() =>{
    updateAddress(address)
  },[unit, address])
  return (
    <div>
      <AutoComplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} style={{ width: "90%" }} options={{
        types: ['address'],
        componentRestrictions: { country: "ca" },
      }} onPlaceSelected={(place) => {setAddress(place)}} placeholder="Enter your address here" className="border px-2 py-2 mt-2 rounded-xl"/>
      <p className="text-center text-sm pt-4">Your address will be self populated underneath</p>
      <Basic title={"Unit / Building number"} type="string" data={[unit, setUnit]} error={[error, setError]}/>
      <Basic title={"Street"} type="string" data={[street, setStreet]} error={[error, setError]} disabled={true}/>
      <Basic title={"City"} type="string" data={[city, setCity]} error={[error, setError]} disabled={true}/>
      <Basic title={"Province"} type="string" data={[province, setProvince]} error={[error, setError]} disabled={true}/>
      <Basic title={"Postal code"} type="string" data={[postalcode, setPostalcode]} error={[error, setError]} disabled={true}/>
    </div>
  )
}

export default Step4