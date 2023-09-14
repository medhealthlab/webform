import { BaseFormValidationSchema } from "@/services/BaseFormValidation"
import {useFormik, createRef} from "formik"
import { useEffect, useState, useContext, useRef} from "react"
import { Data } from "@/context/dataContext"
import { FormContext } from "@/context/formContext"
import Axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"
import EnterHC from "@/components/callwindows/EnterHC"
import ScanHealthcard from "@/components/callwindows/ScanHealthcard"
function CheckReg() {
    const [loading, setLoading] = useState()
    const [selectedWindow, setSelectedWindow] = useState()
    const [uploadWindow, setUploadWindow] = useState(true)
    let location
    const recaptchaRef = useRef()
    const onReCAPTCHAChange = (captchaCode) => {
        if(!captchaCode) {
          return;
        }
        recaptchaRef.current.reset();
      }

    // function convertImageToBase64(imageFile) {
    //     return new Promise((resolve, reject) => {
    //       const fileReader = new FileReader();
      
    //       fileReader.onload = () => {
    //         const srcData = fileReader.result;
    //         resolve(srcData);
    //       };
      
    //       fileReader.onerror = () => {
    //         reject(new Error('Error occurred while reading the file.'));
    //       };
      
    //       fileReader.readAsDataURL(imageFile);
    //     });
    //   }

    // const parseImage = async () => {
    // // console.log('parsing the file.');
    // setLoading(true);
    // // console.log('converting');
    // try {
    //     const imageStr = await convertImageToBase64(file);
    //     const resp = await Axios.post('https://healthcard-ocr.nn.r.appspot.com/scan', { image: imageStr });
    //     setData(resp)
    //     console.log(resp)
    //     handleSubmit()
    // } catch (error) {
    //     console.error(error);
    // }
    // };
    useEffect(()=>{
        location = window.localStorage.getItem("location")
        // console.log(location)
        // console.log(data)
    },[uploadWindow])
    return(
        <div onSubmit={(e) => {e.preventDefault(), formik.handleSubmit()} } className="flex justify-center items-center h-screen -mt-48" onMouseDown={() => setSelectedWindow("")}>
            <div className="flex flex-col border items-center justify-center p-5 rounded-xl shadow-lg transition-all ease-in-out duration-300" onMouseDown={() => setSelectedWindow("")}>
                {uploadWindow ? 
                    (<ScanHealthcard selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} loading={loading} setLoading={setLoading}/>)
                    :
                    (<EnterHC selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} loading={loading} setLoading={setLoading}/>)
                }
                {/* <EnterHC selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} loading={loading} setLoading={setLoading}/> */}
                <button type="button" onClick={() => {setUploadWindow(val => !val)}} className="px-5 py-2 border rounded-full shadow-sm focus:outline-none">{uploadWindow ? "Enter Healthcard number manually" : "Scan healthcard"}</button>
                <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onReCAPTCHAChange} />
                {/* <button type="submit" className="px-5 py-2 rounded-full border shadow-sm mt-2">Submit</button> */}
            </div>
        </div>
    )


}


export default CheckReg

