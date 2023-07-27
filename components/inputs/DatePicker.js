import { useEffect, useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function Basic({title, type, data, error, validationRule}) {
  const [selected, setSelected] = useState(false)
  const [titleData, setTitleData] = [...data]
  const [titleError, setTitleError] = [...error]
    
    useEffect(() => {
        
    })
  return (
    <fieldset className={`border px-3 rounded-md transition-all ease-in-out duration-300 ${selected ? "shadow-md border-blue-500" : ""} ${titleError.length >= 1  ? "border-red-500" : ""}`}>
          <legend className={`transition ease-in-out duration-300 px-2`}>{title || "DOB"}</legend>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex gap-2">
              <DatePicker label={["Year"]} views={["year"]}/>
              <DatePicker  sx={{
    '& .MuiPickersCalendarHeader-label': {
        display: 'hidden', 
      },
  }} label={["month"]} views={["month"]}/>
              <DatePicker label={["day"]} views={["day"]}/>
            </div>
          </LocalizationProvider>
    </fieldset>
  )
}

export default Basic