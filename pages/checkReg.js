import { BaseFormValidationSchema } from "@/services/BaseFormValidation"
import {useFormik, createRef} from "formik"
import { useEffect, useState, useContext, useRef} from "react"
import { Data } from "@/context/dataContext"
import Axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"
import EnterHC from "@/components/callwindows/EnterHC"
import ScanHealthcard from "@/components/callwindows/ScanHealthcard"
function CheckReg() {
    const [selectedWindow, setSelectedWindow] = useState()
    const [uploadWindow, setUploadWindow] = useState(true)
    let location
    const {data, setData} = useContext(Data)
    const recaptchaRef = useRef()
    const onReCAPTCHAChange = (captchaCode) => {
        if(!captchaCode) {
          return;
        }
        recaptchaRef.current.reset();
      }

    const formik = useFormik({
        initialValues:{
            healthcard: "",
            photoFile: ""
        },
        validationSchema: BaseFormValidationSchema,
        onSubmit: async () => {
            console.log(formik.errors)

            setLoading(true);
            (healthcard && location) ? (
                window.localStorage.setItem("healthcard", healthcard),
                setData({healthcard: healthcard}),
                recaptchaRef.current.execute(),
                // console.log(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT),
                await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: healthcard, location: location}).then(async (resp) => {
                console.log(resp);
                if(resp.data.msg == "visit created"){
                    window.localStorage.setItem("token", resp.data.token)
                    setLoading(false),
                    console.log("visit created"),
                    router.push("/registered")
                }else{
                    setLoading(false),
                    console.log("error occured."),
                    router.push("/patient/Registration")
                }
                }, err => {setLoading(false), console.log(err.message)})
                // await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT,{healthcard: healthcard, location: location}).then(async (response) => {
                //   console.log(response)
                // }
                // )
            ): (
                setLoading(false),
                console.log("something went wrong"),
                console.log("health card number: " + healthcard , "from location: " + location)
            )

            // let resp
            // formik.values.healthcard ? (
            //     setData({healthcard: formik.values.healthcard}),
            //     resp = await Axios.post(process.env.NEXT_PUBLIC_CREATE_NEW_VISIT, {healthcard: formik.values.healthcard, location: 100}),
            //     console.log(resp)
            // ) 
            // :
            // (
            //     console.log("call photo api"),
            //     console.log(formik.values.file),
            //     formik.values.file ? console.log("found data") : console.log("not found")
            //     // on response update the data in the context.
            //     // then call the check if register api again
            //     // if the response is not found redirect to the form alogn with the access to the data.
            //     //  if success redirect to the welcome page.
            // )
            
        }
    })

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
    // console.log('parsing the file.');
    setLoading(true);
    // console.log('converting');
    try {
        const imageStr = await convertImageToBase64(file);
        const resp = await Axios.post('https://healthcard-ocr.nn.r.appspot.com/scan', { image: imageStr });
        setData(resp)
        handleSubmit()
    } catch (error) {
        console.error(error);
    }
    };
    useEffect(()=>{
        location = window.localStorage.getItem("location")
        formik.values
    },[formik.values, uploadWindow])
    return(
        <div onSubmit={(e) => {e.preventDefault(), formik.handleSubmit()} } className="flex justify-center items-center h-screen -mt-48" onMouseDown={() => setSelectedWindow("")}>
            <div className="flex flex-col border items-center justify-center p-5 rounded-xl shadow-lg transition-all ease-in-out duration-300" onMouseDown={() => setSelectedWindow("")}>
                {uploadWindow ? 
                <ScanHealthcard selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow}/>
                :
                <EnterHC selectedWindow={selectedWindow} setSelectedWindow={setSelectedWindow} />
                }
                <button type="button" onClick={() => {setUploadWindow(val => !val)}} className="px-5 py-2 border rounded-full shadow-sm focus:outline-none">{uploadWindow ? "Enter Healthcard number manually" : "Scan healthcard"}</button>
                <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onReCAPTCHAChange} />
                {/* <button type="submit" className="px-5 py-2 rounded-full border shadow-sm mt-2">Submit</button> */}
            </div>
        </div>
    )


}


export default CheckReg

