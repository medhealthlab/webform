import { useState, useEffect, useContext } from "react"
import {useFormik} from "formik"
import AutoComplete from "react-google-autocomplete";
// import {Step1Schema} from "./validation/step1"
import { FormContext } from "@/context/formContext";
function Step4({page, setPage}) {
  const {state, dispatch} = useContext(FormContext)
  const [address, setAddress] = useState("")
  const [unit, setUnit] = useState(state.sub ? state.sub.unit : "")
  const [street, setStreet] = useState(state.sub ? state.sub.street : "")
  const [city, setCity] = useState(state.sub ? state.sub.city : "")
  const [province, setProvince] = useState(state.sub ? state.sub.province : "")
  const [postalcode, setPostalcode] = useState(state.sub ? state.sub.postalcode : "")
    const handleStateUpdate = (payload) => {
      console.log("saving state")
      dispatch({type: "UPDATE_STATE", payload: payload})
  }
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
    formik.values.address = `${unit ? `${unit} - ` : ""} ${street}, ${city}, ${province}, ${postalcode}.`
  }
    const formik = useFormik({
        initialValues:{
            address: ""
        },
        // validationSchema: Step1Schema,
        onSubmit: (values) => {
            console.log(values);
            handleStateUpdate(values)
        } 
    })

    useEffect(() => {
      updateAddress(address)
      console.log(address)
        console.log(formik.values.address)
        // formik.values.address = address
    },[formik.errors, address, unit]) 

  return (
    <div className="border rounded-xl shadow-xl p-10">
      <div id="address-field" className="flex flex-col">
          <label className="text-xl">Address*</label>
          <AutoComplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} style={{ width: "100%" }} options={{
          types: ['address'],
          componentRestrictions: { country: "ca" },
        }} onPlaceSelected={(place) => {setAddress(place)}} placeholder="Enter your address here" className="border px-2 py-2 mt-2 rounded-xl"/>
      </div>
      <div id="unit" className="flex flex-col">
                <label className="text-xl">Unit*</label>
                <input
                    placeholder="Unit"
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
      </div>


      <div id="street" className="flex flex-col">
                <label className="text-xl">Street*</label>
                <input
                    placeholder="street"
                    id="street"
                    value={street}
                    disabled={true}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
      </div>


      <div id="city" className="flex flex-col">
                <label className="text-xl">City*</label>
                <input
                    placeholder="city"
                    id="city"
                    value={city}
                    disabled={true}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
      </div>


      <div id="province" className="flex flex-col">
                <label className="text-xl">Province*</label>
                <input
                    placeholder="province"
                    id="province"
                    value={province}
                    disabled={true}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
      </div>


      <div id="postalcode" className="flex flex-col">
                <label className="text-xl">Postal code*</label>
                <input
                    placeholder="postalcode"
                    id="postalcode"
                    value={postalcode}
                    disabled={true}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
      </div>
      <button
            type="button"
            // disabled={formik.errors}
            className={`px-3 py-2 rounded-full border border-blue-500 ${formik.isValid ? "" : "opacity-50 border-red-500 cursor-not-allowed"}`}
            onClick={(e) => {
                e.preventDefault();
                if (formik.isValid) {
                    setPage(val => val - 1);
                }
            }}
        >
            Previous Page
        </button>

            <button
            type="button"
            // disabled={formik.errors}
            className={`px-3 py-2 rounded-full border border-blue-500 ${formik.isValid ? "" : "opacity-50 border-red-500 cursor-not-allowed"}`}
            onClick={(e) => {
                e.preventDefault();
                if (formik.isValid) {
                    setPage(val => val + 1);
                };
                formik.handleSubmit()
            }}
        >
            Next Page
        </button>
    </div>
  )
}

export default Step4