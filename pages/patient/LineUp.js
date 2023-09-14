import SelectStep from "@/components/form/SelectStep"

function RegistrationMultipleStep() {
  return (

        <div className="flex flex-col m-5 items-center justify-center min-h-[75vh]">
          <div className="flex flex-col">
              <div id="reg-form" className=" flex flex-col justify-center items-center m-2" >
                  <div className="py-5">
                    <h1 className="text-xl text-center font-semibold">Line up registration</h1>
                    <h2 className="text-center">Skip the queue. Provide your details here.</h2>                
                  </div>
                  <div id="verification-steps">
                    <SelectStep />
                  </div>
                </div>
            </div>

        </div>
  )
}

export default RegistrationMultipleStep