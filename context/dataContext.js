import {createContext, useState} from "react"

export const Data = createContext(null);

function DataContext({children}){
    const [data, setData] = useState({})
    return (
        <Data.Provider value={{data, setData}}>
            {children}
        </Data.Provider>
    )
}


export default DataContext