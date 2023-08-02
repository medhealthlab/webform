import '@/styles/globals.css'
import DataContext from '@/context/dataContext'
import NewDataContext from "@/context/newDataContext"
export default function App({ Component, pageProps }) {
  return (
      <>
        <NewDataContext>
          <DataContext>
            <Component {...pageProps} />
          </DataContext>
        </NewDataContext>
      </>
    )
  
}
