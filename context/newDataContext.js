import {createContext, useReducer} from "react"

const initState = {
    location: "",
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
    address: ""
}


const reducer = (state, action) => {
    switch(action.type){
        case "UPDATE_DATA" :
            console.log("updating context")
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const NewDataContext = createContext()

const NewDataContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(reducer, initState)
    return(
        <NewDataContext.Provider value={{state, dispatch}}>
            {children}
        </NewDataContext.Provider>
    )
}

export {NewDataContext}

export default NewDataContextProvider