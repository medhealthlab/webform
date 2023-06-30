import { BaseFormValidationSchema } from "@/services/BaseFormValidation"
import { useFormik } from "formik"
function EnterHC({selectedWindow, setSelectedWindow}) {
    const formik = useFormik({
        initialValues: {
            healthcard: ""
        },
        validationSchema: BaseFormValidationSchema,
        onSubmit: () => {
            console.log("submitted")
            console.log(formik.values.healthcard)
        }
    })
  return (
    <form onSubmit={(e) => {e.preventDefault(), formik.handleSubmit(), e.stopPropagation()} }>
        <div className={selectedWindow == 1 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
            <label className="text-xl font-semibold px-5">Enter your Health card number</label>
            {formik.errors.healthcard ? <label>{formik.errors.healthcard}</label>: ""}
            <input type="string" id="healthcard" onChange={formik.handleChange} value={formik.values.healthcard} className="border-b w-[90%] py-2 mx-4 focus:outline-none" placeholder={"Click here to enter your 10 digit healthcard number"} onClick={() => {setSelectedWindow(1)}} autoComplete="off"></input>
            <button type="submit" className="px-5 py-2 rounded-full border shadow-sm mt-2">Submit</button>
        </div>
    </form>
  )
}

export default EnterHC