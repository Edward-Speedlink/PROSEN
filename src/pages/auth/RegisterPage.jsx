"use client"
import { useState } from "react"
import { Camera, Shield, Map, Bone as Drone } from "lucide-react"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"
import FormInput from "../../components/auth/FormInput"
import UserTypeSelector from "../../components/auth/UserTypeSelector"
import Button from "../../components/ui/Button"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { useAuth } from "../../context/AuthContext"

const RegisterPage = () => {
  const { register } = useAuth()
  const [userType, setUserType] = useState("civilian")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    badge: "", // For law enforcement only
    department: "", // For law enforcement only
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const features = [
    {
      icon: <Camera />,
      title: "Advanced Monitoring",
      description: "State-of-the-art surveillance with AI-powered recognition",
    },
    {
      icon: <Shield />,
      title: "Secure Platform",
      description: "Military-grade security for all your sensitive data",
    },
    {
      icon: <Map />,
      title: "GPS Integration",
      description: "Precise location tracking with real-time updates",
    },
    {
      icon: <Drone />,
      title: "Drone Network",
      description: "Access to our fleet of surveillance and response drones",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = "Full name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Law enforcement specific validation
    if (userType === "law_enforcement") {
      if (!formData.badge) {
        newErrors.badge = "Badge number is required"
      }
      if (!formData.department) {
        newErrors.department = "Department is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const result = await register(formData, userType)
      if (!result.success) {
        setErrors({ general: result.error })
      }
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout features={features}>
      <AuthCard title="Create Account" subtitle="Join the PROSEN security network">
        <form onSubmit={handleSubmit}>
          <UserTypeSelector selectedType={userType} onTypeChange={setUserType} />

          <FormInput
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
          />

          <FormInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />

          {userType === "law_enforcement" && (
            <>
              <FormInput
                label="Badge Number"
                type="text"
                name="badge"
                placeholder="Enter your badge number"
                value={formData.badge}
                onChange={handleInputChange}
                error={errors.badge}
                required
              />

              <FormInput
                label="Department"
                type="text"
                name="department"
                placeholder="Enter your department"
                value={formData.department}
                onChange={handleInputChange}
                error={errors.department}
                required
              />
            </>
          )}

          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />

          {errors.general && (
            <div
              style={{
                color: "#E63946",
                fontSize: "14px",
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {errors.general}
            </div>
          )}

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            disabled={loading}
            style={{ width: "100%", marginBottom: "20px" }}
          >
            {loading ? <LoadingSpinner size="sm" /> : "Create Account"}
          </Button>

          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#8D99AE",
            }}
          >
            Already have an account?{" "}
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#FFB703",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => (window.location.href = "/login")}
            >
              Sign in here
            </button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}

export default RegisterPage