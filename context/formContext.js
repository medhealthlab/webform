import { PickersActionBar } from "@mui/x-date-pickers";
import { createContext, useReducer } from "react";

const initState = {
    healthcard: "",
    vc: "",
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    email: "",
    mobile: "",
    issueDate: "",
    expiryDate: "",
    phone:"",
    address: "",
    sex: "x"
}

const reducer = (state, action) => {
    switch(action.type){
        case "UPDATE_STATE" :
            console.log("state update")
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const FormContext = createContext()

const FormContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <FormContext.Provider value={{state, dispatch}}>
            {children}
        </FormContext.Provider>
    )
}

export {FormContext}
export default FormContextProvider