import Step1 from "./Step1"
import {useState} from "react"
function SelectedStep() {
    const [page, setPage] = useState(1)
  switch(page){
    case 1:
        return <Step1 setPage={setPage}/>
    case 2:
        return "step 2"
    case 3:
        return "step 3"
    case 4:
        return "step 4"
    case 5:
        return "step 5"
  }
}

export default SelectedStep