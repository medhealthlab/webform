import { useEffect, useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Basic from "./Basic";
function DatePick({title, type, data, error, validationRule}) {
  const [selected, setSelected] = useState(false)
  const [titleData, setTitleData] = [...data]
  console.log("aaa: " + titleData)
  const [year, setYear] = useState(titleData ? titleData.slice(0,4) : "")
  const [month, setMonth] = useState(titleData ? titleData.slice(4,6) : "")
  const [date, setDate] = useState(titleData ? titleData.slice(6,8) : "")
  const [titleError, setTitleError] = [...error]
    
    useEffect(() => {
        setTitleData(`${year}${month}${date}`)
    ,[year, month, date]})
  return (
    <fieldset className={`border-t px-3 rounded-md transition-all ease-in-out duration-300 ${selected ? "shadow-md border-blue-500" : ""} ${titleError.length >= 1  ? "border-red-500" : ""}`}>
          <legend className={`transition ease-in-out duration-300 px-2`}>{title || "DOB"}</legend>
            <div className="flex flex-col">
              <Basic title={"Year"} data={[year, setYear]} maxlength={4} type={"number"} error={[titleError, setTitleError]}/>
              <Basic title={"Month"} data={[month, setMonth]} maxlength={2} type={"number"} error={[titleError, setTitleError]}/>              
              <Basic title={"Day"} data={[date, setDate]} type={""} maxlength={2} error={[titleError, setTitleError]}/>              
            </div>

    </fieldset>
  )
}

export default DatePick