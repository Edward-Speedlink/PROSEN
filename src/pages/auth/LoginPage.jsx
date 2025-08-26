// "use client"
// import { useState } from "react"
// import { Camera, Shield, Map, Bone as Drone } from "lucide-react"
// import AuthLayout from "../../components/auth/AuthLayout"
// import AuthCard from "../../components/auth/AuthCard"
// import FormInput from "../../components/auth/FormInput"
// import UserTypeSelector from "../../components/auth/UserTypeSelector"
// import Button from "../../components/ui/Button"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"
// import { useAuth } from "../../context/AuthContext"

// const LoginPage = () => {
//   const { login } = useAuth()
//   const [userType, setUserType] = useState("civilian")
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)

//   const features = [
//     {
//       icon: <Camera />,
//       title: "Real-time Surveillance",
//       description: "Monitor street cameras with advanced face recognition technology",
//     },
//     {
//       icon: <Shield />,
//       title: "Asset Protection",
//       description: "Track and protect your vehicles with our comprehensive system",
//     },
//     {
//       icon: <Map />,
//       title: "Live Tracking",
//       description: "Real-time location tracking for suspects and stolen vehicles",
//     },
//     {
//       icon: <Drone />,
//       title: "Drone Services",
//       description: "On-demand drone dispatch for surveillance and emergency response",
//     },
//   ]

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)
//     try {
//       const result = await login(formData, userType)
//       if (!result.success) {
//         setErrors({ general: result.error })
//       }
//     } catch (error) {
//       setErrors({ general: "Login failed. Please try again." })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <AuthLayout features={features}>
//       <AuthCard title="Sign In" subtitle="Access your PROSEN account">
//         <form onSubmit={handleSubmit}>
//           <UserTypeSelector selectedType={userType} onTypeChange={setUserType} />

//           <FormInput
//             label="Email Address"
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleInputChange}
//             error={errors.email}
//             required
//           />

//           <FormInput
//             label="Password"
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleInputChange}
//             error={errors.password}
//             required
//           />

//           {errors.general && (
//             <div
//               style={{
//                 color: "#E63946",
//                 fontSize: "14px",
//                 marginBottom: "20px",
//                 textAlign: "center",
//                 fontWeight: "500",
//               }}
//             >
//               {errors.general}
//             </div>
//           )}

//           <Button
//             type="submit"
//             variant="secondary"
//             size="lg"
//             disabled={loading}
//             style={{ width: "100%", marginBottom: "20px" }}
//           >
//             {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
//           </Button>

//           <div
//             style={{
//               textAlign: "center",
//               fontSize: "14px",
//               color: "#8D99AE",
//             }}
//           >
//             Don't have an account?{" "}
//             <button
//               type="button"
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#FFB703",
//                 textDecoration: "underline",
//                 cursor: "pointer",
//                 fontSize: "14px",
//               }}
//               onClick={() => (window.location.href = "/register")}
//             >
//               Sign up here
//             </button>
//           </div>
//         </form>
//       </AuthCard>
//     </AuthLayout>
//   )
// }

// export default LoginPage






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
import { useNavigate } from "react-router-dom" // add this

const LoginPage = () => {
  const { login } = useAuth()
  const [userType, setUserType] = useState("civilian")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()  // initialize navigation


  const features = [
    {
      icon: <Camera />,
      title: "Real-time Surveillance",
      description: "Monitor street cameras with advanced face recognition technology",
    },
    {
      icon: <Shield />,
      title: "Asset Protection",
      description: "Track and protect your vehicles with our comprehensive system",
    },
    {
      icon: <Map />,
      title: "Live Tracking",
      description: "Real-time location tracking for suspects and stolen vehicles",
    },
    {
      icon: <Drone />,
      title: "Drone Services",
      description: "On-demand drone dispatch for surveillance and emergency response",
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

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!validateForm()) return

  //   setLoading(true)
  //   try {
  //     const result = await login(formData, userType)
  //     if (!result.success) {
  //       setErrors({ general: result.error })
  //     }
  //   } catch (error) {
  //     setErrors({ general: "Login failed. Please try again." })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

   const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const result = await login(formData, userType)
      if (result.success) {

         const target = userType === "law_enforcement" ? "/law-dashboard" : "/dashboard";
  navigate(target, { replace: true }); // react-router-dom's useNavigate
        // navigate("/dashboard")  // ✅ redirect to dashboard
      } else {
        setErrors({ general: result.error })
      }
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout features={features}>
      <AuthCard title="Sign In" subtitle="Access your PROSEN account">
        <form onSubmit={handleSubmit}>
          <UserTypeSelector selectedType={userType} onTypeChange={setUserType} />

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

          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
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
            {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
          </Button>

          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#8D99AE",
            }}
          >
            Don't have an account?{" "}
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
              onClick={() => console.log("Navigate to register")}
            >
              Sign up here
            </button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}

export default LoginPage
