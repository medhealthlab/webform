import { useState, useEffect, useContext } from "react"
import Step1 from "@/components/verificationStepsForm/Step1"
import Step2 from "@/components/verificationStepsForm/Step2"
import Step3 from "@/components/verificationStepsForm/Step3"
import Step4 from "@/components/verificationStepsForm/Step4"
import Step5 from "@/components/verificationStepsForm/Step5"
import SelectedStep from "@/components/verificationStepsForm/SelectedStep"
import { NewDataContext } from "@/context/newDataContext"
import ErrorContext from '@/context/errorContext'


function RegistrationMultipleStep() {
    const [page, setPage] = useState(1)
    const {state, dispatch} = useContext(NewDataContext)
    const stepsMap = new Map()
    stepsMap.set("1", <Step1/>)
    stepsMap.set("2", <Step2/>)
    stepsMap.set("3", <Step3/>)
    stepsMap.set("4", <Step4/>)
    stepsMap.set("5", <Step5/>)
    // map.set("1", <Step1/>)

    const numberOfSteps = 5
    const [completedProgressBar, setCompletedProgressBar ] = useState()
    const progressBarStyle = {
        width: `${completedProgressBar}%`,
      };
    const progressBarIncompleteStyle = {
        width: `${100 - completedProgressBar}%`,
      };
    const [formStatus, setFormStatus] = useState({1: false, 2: false, 3: false, 4: false, 5: false})
    
    useEffect(() => {
        const cal = (page * 100) / numberOfSteps;
        setCompletedProgressBar(cal)
        // console.log(state)
    },[page, state])
  return (
    <ErrorContext>
      <div className="flex flex-col m-5 border items-center justify-center">
          <div className="flex flex-col">
              <div className="flex border mx-5 rounded-full my-5 overflow-hidden">
                  <div id="progress-bar" style={progressBarStyle} className={completedProgressBar == 100 ? `border-8 transition-all ease-in-out duration-500 border-green-600` : `border-8 transition-all ease-in-out duration-500 border-blue-600`}></div>
                  <div id="progress-bar-incomplete" style={progressBarIncompleteStyle} className={completedProgressBar != 100 ? `border-8 transition-all ease-in-out duration-500 border-blue-200` : "transition-all ease-in-out duration-500"}></div>
              </div>
              <div id="reg-form" className=" flex flex-col justify-center items-center m-2" >
                  <h1 className="text-xl font-semibold">Patient Registration</h1>                
                  <div id="verification-steps">
                    <SelectedStep currentPage={page} />
                  </div>
                  <div className="flex gap-5 my-5">
                    {page != 1 ? <button className="px-3 py-1 border rounded-full shadow-sm hover:shadow-xl outline-none hover:border-blue-500" onClick={() => { (page > 1) ? (console.log("updating") , setPage(val => val-1) ): (setPage(1) ) , console.log("page updated")}}>Previous</button> : ""}
                    {page != 5 ? <button className="px-3 py-1 border rounded-full shadow-sm hover:shadow-xl outline-none hover:border-blue-500" onClick={() => { (page < 5) ? (console.log("updating", state) , setPage(val => val+1) ): (setPage(1) ) , console.log("page updated")}}>{page == 5 ? "Submit" : "Next"}</button> : ""}
                  </div>
              </div>
          </div>
      </div>
    </ErrorContext>
  )
}

export default RegistrationMultipleStep