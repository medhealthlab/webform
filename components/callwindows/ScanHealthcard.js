import { useState } from "react"
function ScanHealthcard({selectedWindow, setSelectedWindow}) {
    const [photoFile, setPhotoFile] = useState()
    const handleFileChange= (e) => {
        setPhotoFile(e.target.value[0])
        console.log(photoFile)
    }
    const handleSubmit = () => {
        console.log("submit pressed")
    }
  return (
    <form onSubmit={(e) => {e.preventDefault(), handleSubmit(), e.stopPropagation()} }>
        <div className={selectedWindow == 2 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
            <label className="text-xl font-semibold px-5">Scan your healthcard</label>
            <input type="file" id="photoFile" onChange={() => {handleFileChange(), console.log("trigger"), setSelectedWindow()}} className="border-b w-54 py-2 mx-4  focus:outline-none" onClick={() => setSelectedWindow(2)} ></input>
            <button type="submit" className="px-5 py-2 rounded-full border shadow-sm mt-2">Submit</button>
        </div>
    </form>
  )
}

export default ScanHealthcard