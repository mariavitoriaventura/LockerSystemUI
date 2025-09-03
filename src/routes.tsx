import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { isAuthenticated } from './services/authService'
import Dashboard from './pages/Dashboard'
import Residents from './pages/Residents'
import History from './pages/History'
import Deliveries from './pages/Deliveries'
import Profile from './pages/Profile'

// import Product from './pages/Product'

function PrivateRoute({ children }: { children: JSX.Element }) {
  return isAuthenticated() ? children : <Navigate to="/login" />
}
const RoutesMain = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/residents"
      element={
        <PrivateRoute>
          <Residents />
        </PrivateRoute>
      }
    />
    <Route
      path="/deliveries"
      element={
        <PrivateRoute>
          <Deliveries />
        </PrivateRoute>
      }
    />
    <Route
      path="/history"
      element={
        <PrivateRoute>
          <History />
        </PrivateRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<Navigate to="/dashboard" />} />
  </Routes>
)

export default RoutesMain
