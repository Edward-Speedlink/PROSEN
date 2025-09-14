"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

// Import pages
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"
import UserDashboard from "../pages/user/UserDashboard"
import VehicleRegistration from "../pages/user/VehicleRegistration"
import DroneRequest from "../pages/user/DroneRequest"
import VehicleTracking from "../pages/user/VehicleTracking"
import UserSettings from "../pages/user/UserSettings"
import LawEnforcementDashboard from "../pages/law/LawEnforcementDashboard"
import CameraFeeds from "../pages/law/CameraFeeds"
import ComplaintsManagement from "../pages/law/ComplaintsManagement"
import FaceRecognition from "../pages/law/FaceRecognition"
import DroneDispatch from "../pages/law/DroneDispatch"
import CameraSearch from "../pages/law/CameraSearch"


const ProtectedRoute = ({ children, requiredUserType }) => {
  const { user, userType, isAuthenticated, loading } = useAuth();

  // ✅ block decisions until hydration/login finishes
  if (loading) return <div />; // or a spinner

  // ✅ source of truth for role (works whether role is in user or context)
  const role = user?.userType || userType;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && role !== requiredUserType) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Civilian User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredUserType="civilian">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register-vehicle"
        element={
          <ProtectedRoute requiredUserType="civilian">
            <VehicleRegistration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-drone"
        element={
          <ProtectedRoute requiredUserType="civilian">
            <DroneRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehicle-tracking"
        element={
          <ProtectedRoute requiredUserType="civilian">
            <VehicleTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute requiredUserType="civilian">
            <UserSettings />
          </ProtectedRoute>
        }
      />

      {/* Law Enforcement Routes */}
      <Route
        path="/law-dashboard"
        element={
          <ProtectedRoute requiredUserType="law_enforcement">
            <LawEnforcementDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/camera-feeds"
        element={
          <ProtectedRoute requiredUserType="law_enforcement">
            <CameraFeeds />
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints"
        element={
          <ProtectedRoute requiredUserType="law_enforcement">
            <ComplaintsManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/face-recognition"
        element={
          <ProtectedRoute requiredUserType="law_enforcement">
            <FaceRecognition />
          </ProtectedRoute>
        }
      />
      <Route
        path="/drone-dispatch"
        element={
          <ProtectedRoute requiredUserType="law_enforcement">
            <DroneDispatch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/camera-search"
        element={
          <ProtectedRoute requiredUserType="law_enforcement">
            <CameraSearch />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes