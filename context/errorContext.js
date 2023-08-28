import {createContext, useReducer} from "react"

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
    sex: ""
}


const reducer = (state, action) => {
    switch(action.type){
        case "UPDATE_ERROR" :
            console.log("updating error context")
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const ErrorContext = createContext()

const ErrorContextProvider = ({ children}) => {
    const [errorState, errorDispatcher] = useReducer(reducer, initState)
    return(
        <ErrorContext.Provider value={{errorState, errorDispatcher}}>
            {children}
        </ErrorContext.Provider>
    )
}

export {ErrorContext}

export default ErrorContextProvider