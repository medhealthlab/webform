import '@/styles/globals.css'
import DataContext from '@/context/dataContext'

export default function App({ Component, pageProps }) {
  return (
      <>
        <DataContext>
          <Component {...pageProps} />
        </DataContext>
      </>
    )
  
}
