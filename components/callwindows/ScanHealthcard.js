import { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { Data } from "@/context/dataContext"
import { useRouter } from "next/router"
import Spinner from "../spinner/Spinner"
function ScanHealthcard({selectedWindow, setSelectedWindow, loading, setLoading}) {
    const {data, setData} = useContext(Data)
    const router = useRouter()
    const [parse, setParse] = useState(false)
    const [photoFile, setPhotoFile] = useState()
    const handleFileChange= (e) => {
        setPhotoFile(e)
    }
    
    function convertImageToBase64(imageFile) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
      
          fileReader.onload = () => {
            const srcData = fileReader.result;
            resolve(srcData);
          };
      
          fileReader.onerror = () => {
            reject(new Error('Error occurred while reading the file.'));
          };
          fileReader.readAsDataURL(imageFile);
        });
      }

    const parseImage = async () => {
    setLoading(true);
    try {
        const imageStr = await convertImageToBase64(photoFile);
        const resp = await Axios.post('https://healthcard-ocr.nn.r.appspot.com/scan', { image: imageStr });
        console.log(`name: ${resp.data.firstname}`)
        console.log(`hc: ${resp.data.healthcard}`)
        console.log(`dob: ${resp.data.dob}`)
        console.log(`last: ${resp.data.lastname}`)
        console.log(`iss: ${resp.data.issueDate}`)
        console.log(`exp: ${resp.data.expDate}`)


        if(resp.status == 200){
          setData((data) => ({
            ...data,
            healthcard: resp.data.heathcard.slice(0,10),
            firstname: resp.data.firstname,
            lastname: resp.data.lastname,
            dob: resp.data.dob,
            issueDate: resp.data.issueDate,
            expDate: resp.data.expDate
          }))
          setTimeout(() => {
          },300)
        // call another api for validation
        console.log({healthcard: resp.data.heathcard.slice(0,10), location: data.location})
        console.log(data.healthcard)
        await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: resp.data.heathcard.slice(0,10), location: data.location.toString()}).then(async (resp) => {
          if(resp.data.msg == "visit created"){
            window.localStorage.setItem("token", resp.data.token)
            setData(data => ({...data, token: resp.data.token}))
            setLoading(false),
            console.log("visit created"),
            router.push("/registered")
          }else{
            setLoading(false),
            console.log("error occured."),
            router.push("/patient/Registration")
          }
        }, err => {setLoading(false), console.log(err.message)})
        }else{
          router.push("/registration")
        }
    } catch (error) {
        console.error(error);
    }
    };

    const handleSubmit = () => {
      parseImage()
      console.log("submit pressed")
    }
  return (
    <form onSubmit={(e) => {e.preventDefault(), handleSubmit(), e.stopPropagation()} }>
        <div className={selectedWindow == 2 ? "flex flex-col items-center py-5 border rounded-xl shadow-xl transition scale-105 ease-in-out duration-300 my-2": "flex flex-col items-center py-5 border rounded-xl transition-all ease-in-out duration-300 my-2"}>
            {
              loading ? <div className="flex flex-col items-center px-2"><p>Please wait while we process your request...</p><Spinner /></div> :
              <div className="flex flex-col items-center justify-center">
                <label className="text-xl font-semibold px-5">Scan your healthcard</label>
                <input type="file" id="photoFile" onChange={(e) => {handleFileChange(e.target.files[0]), console.log("trigger"), setSelectedWindow()}} className="border-b w-54 py-2 mx-4  focus:outline-none" onClick={() => setSelectedWindow(2)} />
                {/* <button type="button" className="px-5 py-2 rounded-full border shadow-sm mt-2" onClick={() => {useProcessed(true)}}>Process Image</button> */}
                <button type="submit" className="px-5 py-2 rounded-full border shadow-sm mt-2">Submit</button>
              </div>
            }
        </div>
    </form>
  )
}

export default ScanHealthcard