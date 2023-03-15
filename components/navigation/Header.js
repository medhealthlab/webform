import Link from "next/link"
import styles from "../navigation/Header.module.css"
function header() {
  return (
    <div className='px-5 py-5 flex justify-between border-b shadow-sm mb-5'>
        <div>
            <div>
                <h1 className='lg:text-4xl text-2xl'>
                    <Link href="/">MHL Service Portal</Link> 
                </h1>
            </div>
        </div>
        <div>
            <ul className="flex gap-10 mx-10 my-2">
                <li className={styles.headerLinks}>
                    {/* <Link href="/patient/Registration" className="text-xl">Patients</Link> */}
                </li>
                {/* <li>
                    <Link href="/patient/Registration" className="text-xl">Physicians</Link>
                </li> */}
            
            
            
            </ul>

        </div>
    </div>
  )
}

export default header