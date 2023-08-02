import { useContext } from "react"
import { NewDataContext } from "@/context/newDataContext"


function Step5() {
  const {state, dispatch} = useContext(NewDataContext)
  console.log(state)
  return (
    <div className="border rounded-xl shadow-xl p-10">
      <h2 className="text-center text-xl font-semibold">Confirm your details</h2>
      <ul>
          <li className="py-2">
            <h2 className="text-lg font-semibold">Firstname</h2>
            <h3 className="px-2">{state.firstname}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Middlename</h2>
            <h3 className="px-2">{state.middlename}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Lastname</h2>
            <h3 className="px-2">{state.lastname}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Date of birth</h2>
            <h3 className="px-2">{`${state.dob.slice(0,4)}-${state.dob.slice(4,6)}-${state.dob.slice(6,8)}`}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Healthcard Number</h2>
            <h3 className="px-2">{`${state.healthcard.slice(0,4)}-${state.healthcard.slice(4,6)}-${state.healthcard.slice(6,8)}`}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Version Code</h2>
            <h3 className="px-2">{state.vc}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Email</h2>
            <h3 className="px-2">{state.email}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Phone</h2>
            <h3 className="px-2">{state.mobile}</h3>
          </li>

          <li className="py-2">
            <h2 className="text-lg font-semibold">Address</h2>
            <h3 className="px-2">{state.address}</h3>
          </li>

        </ul>
    </div>
  )
}

export default Step5