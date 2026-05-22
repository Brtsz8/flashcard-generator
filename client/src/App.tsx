import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import LoginPage from "./pages/LoginPage"
import './App.css'
import ProtectedRoute from "./components/ui/ProtectedRoute"
import DashboardPage from "./pages/DashboardPage"
import DeckPage from "./pages/DeckPage"
import StudyPage from "./pages/StudyPage"
import RegisterPage from "./pages/RegisterPage"
import AdminRoute from "./components/auth/AdminRoute"
import AdminPage from "./pages/AdminPage"

function App() {
  return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/register"
          element={<RegisterPage/>}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/deck/:id"
          element={
            <ProtectedRoute>
              <DeckPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/deck/:id/study"
          element={
            <ProtectedRoute>
              <StudyPage/>
            </ProtectedRoute>
          }
        />
        <Route
            path="/admin"
            element={
                <AdminRoute>
                    <AdminPage />
                </AdminRoute>
            }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
