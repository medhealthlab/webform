import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import Step4 from "./Step4"
import Step5 from "./Step5"
import {useState, useEffect} from "react"

function SelectedStep() {
    const [page, setPage] = useState(1)
    useEffect(() => {
        console.log("page change: " + page)     
    },[page])
  switch(page){
    case 1:
        return <Step1 page={page} setPage={setPage}/>
    case 2:
        return <Step2 page={page} setPage={setPage}/>
    case 3:
        return <Step3 page={page} setPage={setPage}/>
    case 4:
        return <Step4 page={page} setPage={setPage}/>
    case 5:
        return <Step5 page={page} setPage={setPage}/>
  }
}

export default SelectedStep