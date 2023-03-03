import { useRouter } from "next/router"
import { useEffect } from "react"
function Location() {
  const ourLocations = [100,101,102,120,201,450,470,474,490,495,499,514,516,600,604,605,701,702,705]  
  const router = useRouter()
    const locnum = parseInt(router.query.locnum)
    const valid = new Set(ourLocations).has(locnum)
    const checkValidity = () => {
      valid ? (window.localStorage.setItem("location", locnum), router.push("/checkRegistration")) : router.push("/location")
    }
    useEffect(() => {(
                      
                      checkValidity()
                    )}
    , [locnum, valid])
    
  return (
    <div className="flex justify-center items-center text-xl font-semibold">
        Welcome to location {locnum}
    </div>
  )
}

export default Location