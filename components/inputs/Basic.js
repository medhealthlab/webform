import { useEffect, useState } from "react"
function Basic({title, type, data, error, validationRule, disabled, maxlength}) {
    const [selected, setSelected] = useState(false)
    const [titleData, setTitleData] = [...data]
    const [titleError, setTitleError] = [...error]
  return (
    <fieldset className={`border px-3 rounded-md transition-all ease-in-out duration-300 mt-2 ${selected ? "shadow-md border-blue-500" : "py-1"} ${titleError.length >= 1  ? "border-red-500" : ""}`}>
          <legend className={`${selected || titleData ? "transition ease-in-out duration-300 px-2" : "transition ease-in-out opacity-0 hidden"}`}>{title}</legend>
          <input placeholder={selected ? "" : title} type={type} maxLength={maxlength} value={titleData} onChange={(e) => setTitleData(e.target.value)} onFocus={() => setSelected(true)} onBlur={() => {setSelected(false)}} disabled={disabled ? true : false}className="outline-none text-xl transition-all ease-in-out duration-300"/>
    </fieldset>
  )
}

export default Basic