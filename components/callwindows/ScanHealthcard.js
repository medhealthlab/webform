import { useState, useContext } from "react"
import Axios from "axios"
import { Data } from "@/context/dataContext"
import { useRouter } from "next/router"
import Spinner from "../spinner/Spinner"
import { FormContext } from "@/context/formContext"
import { NewDataContext } from "@/context/newDataContext"
function ScanHealthcard({selectedWindow, setSelectedWindow, loading, setLoading}) {
    const {data, setData} = useContext(Data)
    const {state, dispatch} = useContext(FormContext)
    // const {state, dispatch} = useContext(NewDataContext)
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
    const handleStateUpdate = (payload) => {
      console.log("updating state")
        dispatch({type: "UPDATE_STATE", payload: payload})
        console.log(state)
      console.log("state updated")
    }
    const parseImage = async () => {
    setLoading(true);
    try {
        const imageStr = await convertImageToBase64(photoFile);
        console.log(imageStr)
        // ocr call
        await Axios.post('https://healthcard-ocr.nn.r.appspot.com/scan', { image: imageStr }).then(async resp => {
          console.log(resp)
          console.log(`name: ${resp.data.firstname}`)
          console.log(`hc: ${resp.data.heathcard}`)
          console.log(`dob: ${resp.data.dob}`)
          console.log(`last: ${resp.data.lastname}`)
          console.log(`iss: ${resp.data.issueDate}`)
          console.log(`exp: ${resp.data.expDate}`)
          const formattedData = {
              healthcard: resp.data.heathcard.length >= 10 ? resp.data.heathcard.slice(0,10) : "", 
              vc: resp.data.heathcard.length >=10 ? resp.data.heathcard.slice(10,12) : "" , 
              firstname: resp.data.firstname ? resp.data.firstname : "NOT DETECTED",
              middlename: resp.data.middlename ? resp.data.middlename : "NOT DETECTED",
              lastname: resp.data.lastname ? resp.data.lastname : "NOT DETECTED",
              // dob: resp.data.dob ? resp.data.dob : ""
            }
            console.log(formattedData)
          if(resp.status == 200){
            // console.log(resp.data)
            console.log(state)
            setData((data) => ({
              ...data,
              healthcard: resp.data.heathcard.slice(0,10),
              vc: resp.data.heathcard.length >=10 ? resp.data.heathcard.slice(10,12) : "" , 
              firstname: resp.data.firstname,
              lastname: resp.data.lastname,
              dob: resp.data.dob,
              issueDate: resp.data.issueDate,
              expDate: resp.data.expDate
            }))
            console.log(data)
            // 
            setTimeout(() => {
            },400)
          // firebase for reg and validation
          console.log({healthcard: resp.data.heathcard.slice(0,10), location: data.location})
          await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: resp.data.heathcard.slice(0,10), location: data.location.toString()}).then(async (resp) => {
            if(resp.data.msg == "visit created"){
              // generate token mechanism
              window.localStorage.setItem("token", resp.data.token)
              setData(data => ({...data, token: resp.data.token}))
              setLoading(false),
              console.log("visit created"),
              router.push("/registered")
            }else{
              // send to webforms
              setLoading(false),
              handleStateUpdate(data)
              console.log(data)
              console.log(state)
              console.log("error occured."),
              router.push("/patient/LineUp")
            }
          }, err => {setLoading(false), console.log(err.message)})
          }else{
            router.push("/patient/LineUp")
          }
        });
        
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