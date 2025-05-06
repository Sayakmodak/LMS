import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: (<>
          <HeroSection />
          <Courses />
        </>
        ),
      },
      {
        path: "login",
        element: <Login />
      }
    ],
  },
])

function App() {

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App