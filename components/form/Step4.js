import { useEffect } from "react"
import {useFormik} from "formik"
import AutoComplete from "react-google-autocomplete";
import {Step1Schema} from "./validation/step1"
function Step1() {
    const formik = useFormik({
        initialValues:{
            healthcard: "",
            vc: "",
        },
        validationSchema: Step1Schema,
        onSubmit: (values) => {
            console.log(values)
        } 
    })

    useEffect(() => {
        console.log(formik.errors)
    },[formik.errors]) 

  return (
    <div className="">
        <AutoComplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} style={{ width: "90%" }} options={{
        types: ['address'],
        componentRestrictions: { country: "ca" },
      }} onPlaceSelected={(place) => {setAddress(place)}} placeholder="Enter your address here" className="border px-2 py-2 mt-2 rounded-xl"/>

        <button disabled={formik.errors} className={`px-3 py-2 rounded-full border border-blue-500 ${formik.errors}`}>Next Page</button>
    </div>
  )
}

export default Step1