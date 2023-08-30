import { useEffect } from "react"
import {useFormik} from "formik"
import {Step3Schema} from "./validation/step3"
function Step3({page, setPage}) {
    const formik = useFormik({
        initialValues:{
            email: "",
            mobile: "",
        },
        validationSchema: Step3Schema,
        onSubmit: (values) => {
            console.log(values)
        } 
    })

    useEffect(() => {
        console.log(formik.errors)
    },[formik.errors]) 

  return (
    <div className="">
            <div id="email" className="flex flex-col">
                <label className="text-xl">Email*</label>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
            </div>

            <div id="mobile" className="flex flex-col">
                <label className="text-xl">Mobile*</label>
                <input
                    type="tel"
                    placeholder="Mobile"
                    id="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    className="pl-5 text-lg border rounded-xl mt-1 mb-3"
                />
            </div>

            <button
            type="button"
            // disabled={formik.errors}
            className={`px-3 py-2 rounded-full border border-blue-500 ${formik.errors ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={(e) => {
                e.preventDefault();
                // if (formik.isValid) {
                    setPage(val => val + 1);
                // }
            }}
        >
            Next Page
        </button>
        </div>
  )
}

export default Step3