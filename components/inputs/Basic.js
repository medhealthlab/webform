import { useEffect, useState } from "react"
import checkEmail from "@/services/utils/verificationFunctions/checkEmail"
import checkPhone from "@/services/utils/verificationFunctions/checkPhone"

import { checkHealthcard, checkVersionCode } from "@/services/utils/verificationFunctions/checkHC"

function Basic({title, tag, type, data, error, errorHandler, validationRule, disabled, maxlength}) {
    let touched = false
    const [selected, setSelected] = useState(false)
    const [titleData, setTitleData] = [...data]
    const [titleError, setTitleError] = [...error]
    const validationRules = [{
      name: "10 digits",
      rule: (input) => {
        if(typeof input == "string"){
          if(input.length != 10){
            setTitleError(prevState => [...prevState, "Enter 10 digits"])
          }
        }else{ 
          setTitleError("")
        }
      }
    },{
      name: "required",
      rule: (input) =>{
        if(touched && !input){
          let obj = {[tag] : "required"}
          errorHandler(obj)
        }
        else{
          let obj = {[tag] : ""}
          errorHandler(obj)
        }
      }
    },{
      name: "email",
      rule: (input) =>{
        console.log("email verification in process")
        if(touched && input && !checkEmail(input)){
          let obj = {[tag]: "provide a correct email address"}
          errorHandler(obj)
        }else{
          let obj = {[tag]: ""}
          errorHandler(obj)
        }
      }
    },
    {
      name: "phone",
      rule: (input) => {
        if(touched && !input && checkPhone(input)){
          let obj = {[tag]: "provide a correct phone number"}
          errorHandler(obj)
        }
      } 
    },{
      name: "healthcard",
      rule: (input) => {
        if(touched && !input && checkHealthcard(input)){
          let obj = {[tag]: "10 digits only"}
          errorHandler(obj)
        }
      } 
    },
    {
      name: "versioncode",
      rule: (input) => {
        if(touched && input && checkVersionCode(input)){
          let obj = {[tag]: "2 letters only"}
          errorHandler(obj)
        }
      } 
    }
  ]

    useEffect(() => {
      console.log(titleError)
      if(selected){
        touched = true;
      }
      if(validationRule){
        validationRule.forEach(rule => {
          validationRules.forEach((ruleBookRule) =>{
            if(rule == ruleBookRule.name){
              ruleBookRule.rule(titleData)
            }
          })
        })
      }
    },[selected, titleData])
  return (
    <fieldset className={`border px-3 rounded-md transition-all ease-in-out duration-300 mt-2 ${selected ? "shadow-md border-blue-500" : "py-1"} ${titleError[tag] != ""  ? "border-red-500" : ""} ${disabled ? "bg-gray-200" : ""}`}>
          <legend className={`bg-white rounded-xl ${selected || titleData ? "transition ease-in-out duration-300 px-2" : "transition ease-in-out opacity-0 hidden"}`}>{title}</legend>
          <input placeholder={selected ? "" : title} inputMode={type} maxlength={maxlength} value={titleData} onChange={(e) => setTitleData(e.target.value)} onFocus={() => setSelected(true)} onBlur={() => {setSelected(false)}} disabled={disabled ? true : false} className="outline-none text-xl transition-all ease-in-out duration-300"/>
    </fieldset>
  )
}

export default Basic