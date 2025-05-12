import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/sonner'
import { useLoadUserQuery } from './features/api/authApi'
import Loading from './comp/Loading.jsx'

const CustomLoading = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return (
    <>
      {
        isLoading ? <><Loading size="lg" color="indigo" /></> : <>{children}</>
      }
    </>
  )
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <CustomLoading>
      <App />
      <Toaster />
    </CustomLoading>
  </Provider>
  // </StrictMode>,
)
