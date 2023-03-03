import {useRouter} from "next/router"
import Link from "next/link"
import {useState} from "react"
function location() {
  const [location , setLocation] = useState("")
  const handleChange = (e) => {
    window.localStorage.setItem("location",e.target.value)
    setLocation(window.localStorage.getItem("location"))
  }
  return (
    <div className="mx-10 flex">
      <div className="border rounded-xl shadow-md px-5 py-10 flex flex-col relative">
        <div className="pb-5">
          <label className="text-lg">Select A location:</label>
          <select onChange={(e) => handleChange(e)} className="px-5 focus:outline-none" required>
            <option disabled selected hidden>select a location</option>
            <option disabled>North York</option>
            <option>101</option>
            <option>102</option>
            <option>120</option>
            <option>201</option>
            <option disabled>Brampton</option>
            <option>450</option>
            <option>490</option>
            <option>499</option>
            <option disabled>Mississauga</option>
            <option>470</option>
            <option>474</option>
            <option>495</option>
            <option disabled>Scarborough</option>
            <option>514</option>
            <option>516</option>
            <option disabled>Hamilton</option>
            <option>701</option>
            <option>702</option>
            <option disabled>New Market</option>
            <option>600</option>
            <option disabled>Lindsay</option>
            <option>604</option>
            <option disabled>Aurora</option>
            <option>605</option>
            <option disabled>St. Catharines</option>
            <option>705</option>
          </select>
        </div>
        {
          location ? <Link className="border rounded-full px-3 py-1 shadow hover:shadow-lg focus:outline-none text-center" href="/checkRegistration">Next</Link> : ""
        }
      </div>
    </div>
  )
}

export default location