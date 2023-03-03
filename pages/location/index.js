import Link from "next/link"
import {useState, useEffect} from "react"
function location() {
  const [location , setLocation] = useState("")
  const handleChange = (e) => {
    window.localStorage.setItem("location",e.target.value)
    setLocation(window.localStorage.getItem("location"))
  }
  useEffect(()=> {
    setLocation(window.localStorage.getItem("location") ? window.localStorage.getItem("location") : "")
  },[])

  return (
    <div className="mx-10 flex">
      <div className="border rounded-xl shadow-md px-5 py-10 flex flex-col relative">
        <div className="pb-5">
          <label className="text-lg">Select A location:</label>
          <select onChange={(e) => handleChange(e)} className="px-5 focus:outline-none" required>
            <option disabled selected={!location} hidden>select a location</option>
            <option disabled selected={location} hidden>{location}</option>
            <option disabled className="bg-gray-200 font-semibold">North York</option>
            <option>100</option>
            <option>101</option>
            <option>102</option>
            <option>120</option>
            <option>201</option>
            <option disabled className="bg-gray-200 font-semibold">Brampton</option>
            <option>450</option>
            <option>490</option>
            <option>499</option>
            <option disabled className="bg-gray-200 font-semibold">Mississauga</option>
            <option>470</option>
            <option>474</option>
            <option>495</option>
            <option disabled className="bg-gray-200 font-semibold">Scarborough</option>
            <option>514</option>
            <option>516</option>
            <option disabled className="bg-gray-200 font-semibold">Hamilton</option>
            <option>701</option>
            <option>702</option>
            <option disabled className="bg-gray-200 font-semibold">New Market</option>
            <option>600</option>
            <option disabled className="bg-gray-200 font-semibold">Lindsay</option>
            <option>604</option>
            <option disabled className="bg-gray-200 font-semibold">Aurora</option>
            <option>605</option>
            <option disabled className="bg-gray-200 font-semibold">St. Catharines</option>
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