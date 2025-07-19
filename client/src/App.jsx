import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, NotAuthenticatedUser } from './comp/ProtectedRoute'
import { ProgressPageProtectedRoute } from './comp/ProgressPageProtectedRoute'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        )
      },
      {
        path: "my-learning",
        element: (
          <NotAuthenticatedUser>
            <MyLearning />
          </NotAuthenticatedUser>
        )
      },
      {
        path: "profile",
        element: (
          <NotAuthenticatedUser>
            <Profile />
          </NotAuthenticatedUser>
        )
      },
      {
        path: "course/search",
        element:
          (
            <NotAuthenticatedUser>
              <SearchPage />
            </NotAuthenticatedUser>
          )
      },
      {
        path: "course-detail/:courseId",
        element: (
          <NotAuthenticatedUser>
            <CourseDetail />
          </NotAuthenticatedUser>
        )
      },
      {
        path: "course-progress/:courseId",
        element: (
          <NotAuthenticatedUser>
            <ProgressPageProtectedRoute>
              <CourseProgress />
            </ProgressPageProtectedRoute>
          </NotAuthenticatedUser>
        )
      },

      // admin routes starts from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
        ]
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