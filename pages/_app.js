import '@/styles/globals.css'
import DataContext from '@/context/dataContext'
import NewDataContext from "@/context/newDataContext"
import FormContext from "@/context/formContext"

export default function App({ Component, pageProps }) {
  return (
      <>
      <FormContext>
        <NewDataContext>
          <DataContext>
            <Component {...pageProps} />
          </DataContext>
        </NewDataContext>
      </FormContext>
      </>
    )
  
}
