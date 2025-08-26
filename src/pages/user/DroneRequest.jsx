"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Bone as Drone, ArrowLeft, Send, AlertTriangle } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import FormInput from "../../components/auth/FormInput"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  h1 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.primary.darkNavy};
  border: 2px solid ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.primary.deepBlue)};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.dark.text};
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.secondary.amber)};
    box-shadow: 0 0 0 3px ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.secondary.amber)}20;
  }
  
  &::placeholder {
    color: ${(props) => props.theme.colors.supportive.coolGray};
  }
`

const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`

const RequestCard = styled(Card)`
  .request-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    
    .request-info {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.md};
      
      .drone-icon {
        width: 40px;
        height: 40px;
        border-radius: ${(props) => props.theme.borderRadius.md};
        background-color: ${(props) => props.theme.colors.secondary.amber};
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
          width: 20px;
          height: 20px;
          color: ${(props) => props.theme.colors.primary.darkNavy};
        }
      }
      
      .details {
        .id {
          font-weight: 700;
          color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
          margin-bottom: 4px;
        }
        
        .date {
          font-size: 12px;
          color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        }
      }
    }
  }
  
  .request-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${(props) => props.theme.spacing.lg};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    
    .detail-item {
      .label {
        font-size: 12px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }
      
      .value {
        font-weight: 600;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      }
    }
  }
  
  .request-description {
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
    padding: ${(props) => props.theme.spacing.md};
    border-radius: ${(props) => props.theme.borderRadius.md};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    
    .label {
      font-size: 12px;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: ${(props) => props.theme.spacing.sm};
    }
    
    .description {
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      line-height: 1.5;
    }
  }
`

const DroneRequest = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    location: "",
    duration: "",
    priority: "normal",
    description: "",
    contactPhone: "",
  })
  const [errors, setErrors] = useState({})
  const [requests, setRequests] = useState([
    {
      id: "DR-001",
      location: "Downtown District, Main St & 5th Ave",
      duration: "2 hours",
      priority: "normal",
      status: "active",
      description: "Surveillance request for suspicious activity reported in the area",
      requestDate: "2024-01-20",
      estimatedArrival: "15 minutes",
    },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.duration) newErrors.duration = "Duration is required"
    if (!formData.description) newErrors.description = "Description is required"
    if (!formData.contactPhone) newErrors.contactPhone = "Contact phone is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newRequest = {
        id: `DR-${String(requests.length + 1).padStart(3, "0")}`,
        ...formData,
        status: "pending",
        requestDate: new Date().toISOString().split("T")[0],
        estimatedArrival: "Calculating...",
      }

      setRequests((prev) => [newRequest, ...prev])
      setFormData({
        location: "",
        duration: "",
        priority: "normal",
        description: "",
        contactPhone: "",
      })
      setShowForm(false)
    } catch (error) {
      console.error("Request failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader>
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft />
        </Button>
        <h1>Drone Services</h1>
      </PageHeader>

      {!showForm && (
        <Card style={{ marginBottom: "32px" }}>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Drone style={{ width: "64px", height: "64px", color: "#FFB703", marginBottom: "24px" }} />
            <h3 style={{ color: "#F4F6F8", marginBottom: "16px", textTransform: "uppercase" }}>
              Request Drone Surveillance
            </h3>
            <p style={{ color: "#8D99AE", marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px" }}>
              Deploy our advanced surveillance drones for security monitoring, emergency response, or area surveillance.
              Our drones are equipped with high-resolution cameras and real-time streaming capabilities.
            </p>
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              <Send />
              Submit New Request
            </Button>
          </div>
        </Card>
      )}

      {showForm && (
        <Card title="New Drone Request" style={{ marginBottom: "32px" }}>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <div>
                <FormInput
                  label="Location"
                  name="location"
                  placeholder="Enter specific address or area"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={errors.location}
                  required
                />
                <FormInput
                  label="Duration"
                  name="duration"
                  placeholder="e.g., 2 hours, 30 minutes"
                  value={formData.duration}
                  onChange={handleInputChange}
                  error={errors.duration}
                  required
                />
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      color: "#F4F6F8",
                      marginBottom: "8px",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Priority Level <span style={{ color: "#E63946" }}>*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#0D1B2A",
                      border: "2px solid #1D3557",
                      borderRadius: "8px",
                      color: "#F4F6F8",
                      fontSize: "14px",
                    }}
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <FormInput
                  label="Contact Phone"
                  name="contactPhone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  error={errors.contactPhone}
                  required
                />
              </div>

              <div>
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      color: "#F4F6F8",
                      marginBottom: "8px",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Description <span style={{ color: "#E63946" }}>*</span>
                  </label>
                  <TextArea
                    name="description"
                    placeholder="Describe the reason for drone surveillance, specific areas of interest, or any special requirements..."
                    value={formData.description}
                    onChange={handleInputChange}
                    hasError={!!errors.description}
                  />
                  {errors.description && (
                    <span style={{ color: "#E63946", fontSize: "12px", marginTop: "4px", display: "block" }}>
                      {errors.description}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: "#1D3557",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #FFB703",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <AlertTriangle style={{ width: "16px", height: "16px", color: "#FFB703" }} />
                    <strong style={{ color: "#FFB703", fontSize: "14px" }}>Important Notice</strong>
                  </div>
                  <p style={{ color: "#F4F6F8", fontSize: "12px", lineHeight: "1.4" }}>
                    Drone deployment is subject to weather conditions and airspace restrictions. Emergency requests
                    receive priority handling. You will be contacted within 15 minutes of submission.
                  </p>
                </div>
              </div>
            </FormGrid>

            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit" disabled={loading}>
                {loading ? <LoadingSpinner size="sm" /> : <Send />}
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div>
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "20px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "24px",
            color: "#F4F6F8",
          }}
        >
          My Requests ({requests.length})
        </h2>

        <RequestList>
          {requests.map((request) => (
            <RequestCard key={request.id}>
              <div className="request-header">
                <div className="request-info">
                  <div className="drone-icon">
                    <Drone />
                  </div>
                  <div className="details">
                    <div className="id">Request {request.id}</div>
                    <div className="date">{new Date(request.requestDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <StatusBadge status={request.status}>{request.status}</StatusBadge>
              </div>

              <div className="request-details">
                <div className="detail-item">
                  <div className="label">Location</div>
                  <div className="value">{request.location}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Duration</div>
                  <div className="value">{request.duration}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Priority</div>
                  <div className="value" style={{ textTransform: "capitalize" }}>
                    {request.priority}
                  </div>
                </div>
                <div className="detail-item">
                  <div className="label">ETA</div>
                  <div className="value">{request.estimatedArrival}</div>
                </div>
              </div>

              <div className="request-description">
                <div className="label">Description</div>
                <div className="description">{request.description}</div>
              </div>
            </RequestCard>
          ))}
        </RequestList>
      </div>
    </div>
  )
}

export default DroneRequest












// "use client"
// import { useState } from "react"
// import styled from "styled-components"
// import { Bone as Drone, ArrowLeft, Send, AlertTriangle } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import FormInput from "../../components/auth/FormInput"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"

// const PageHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.md};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   h1 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 28px;
//     font-weight: 700;
//     color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//   }
// `

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `

// const TextArea = styled.textarea`
//   width: 100%;
//   min-height: 120px;
//   padding: ${(props) => props.theme.spacing.md};
//   background-color: ${(props) => props.theme.colors.primary.darkNavy};
//   border: 2px solid ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.primary.deepBlue)};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   color: ${(props) => props.theme.colors.dark.text};
//   font-size: 14px;
//   font-family: inherit;
//   resize: vertical;
//   transition: all ${(props) => props.theme.transitions.fast};
  
//   &:focus {
//     outline: none;
//     border-color: ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.secondary.amber)};
//     box-shadow: 0 0 0 3px ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.secondary.amber)}20;
//   }
  
//   &::placeholder {
//     color: ${(props) => props.theme.colors.supportive.coolGray};
//   }
// `

// const RequestList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.lg};
// `

// const RequestCard = styled(Card)`
//   .request-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: ${(props) => props.theme.spacing.lg};
    
//     .request-info {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.md};
      
//       .drone-icon {
//         width: 40px;
//         height: 40px;
//         border-radius: ${(props) => props.theme.borderRadius.md};
//         background-color: ${(props) => props.theme.colors.secondary.amber};
//         display: flex;
//         align-items: center;
//         justify-content: center;
        
//         svg {
//           width: 20px;
//           height: 20px;
//           color: ${(props) => props.theme.colors.primary.darkNavy};
//         }
//       }
      
//       .details {
//         .id {
//           font-weight: 700;
//           color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//           margin-bottom: 4px;
//         }
        
//         .date {
//           font-size: 12px;
//           color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         }
//       }
//     }
//   }
  
//   .request-details {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//     gap: ${(props) => props.theme.spacing.lg};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
    
//     .detail-item {
//       .label {
//         font-size: 12px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//         margin-bottom: 4px;
//       }
      
//       .value {
//         font-weight: 600;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       }
//     }
//   }
  
//   .request-description {
//     background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//     padding: ${(props) => props.theme.spacing.md};
//     border-radius: ${(props) => props.theme.borderRadius.md};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
    
//     .label {
//       font-size: 12px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//       text-transform: uppercase;
//       letter-spacing: 0.5px;
//       margin-bottom: ${(props) => props.theme.spacing.sm};
//     }
    
//     .description {
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       line-height: 1.5;
//     }
//   }
// `

// const DroneRequest = ({ onNavigate }) => {
//   const [showForm, setShowForm] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     location: "",
//     duration: "",
//     priority: "normal",
//     description: "",
//     contactPhone: "",
//   })
//   const [errors, setErrors] = useState({})
//   const [requests, setRequests] = useState([
//     {
//       id: "DR-001",
//       location: "Downtown District, Main St & 5th Ave",
//       duration: "2 hours",
//       priority: "normal",
//       status: "active",
//       description: "Surveillance request for suspicious activity reported in the area",
//       requestDate: "2024-01-20",
//       estimatedArrival: "15 minutes",
//     },
//   ])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.location) newErrors.location = "Location is required"
//     if (!formData.duration) newErrors.duration = "Duration is required"
//     if (!formData.description) newErrors.description = "Description is required"
//     if (!formData.contactPhone) newErrors.contactPhone = "Contact phone is required"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       const newRequest = {
//         id: `DR-${String(requests.length + 1).padStart(3, "0")}`,
//         ...formData,
//         status: "pending",
//         requestDate: new Date().toISOString().split("T")[0],
//         estimatedArrival: "Calculating...",
//       }

//       setRequests((prev) => [newRequest, ...prev])
//       setFormData({
//         location: "",
//         duration: "",
//         priority: "normal",
//         description: "",
//         contactPhone: "",
//       })
//       setShowForm(false)
//     } catch (error) {
//       console.error("Request failed:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div>
//       <PageHeader>
//         <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")}>
//           <ArrowLeft />
//         </Button>
//         <h1>Drone Services</h1>
//       </PageHeader>

//       {!showForm && (
//         <Card style={{ marginBottom: "32px" }}>
//           <div style={{ textAlign: "center", padding: "40px 20px" }}>
//             <Drone style={{ width: "64px", height: "64px", color: "#FFB703", marginBottom: "24px" }} />
//             <h3 style={{ color: "#F4F6F8", marginBottom: "16px", textTransform: "uppercase" }}>
//               Request Drone Surveillance
//             </h3>
//             <p style={{ color: "#8D99AE", marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px" }}>
//               Deploy our advanced surveillance drones for security monitoring, emergency response, or area surveillance.
//               Our drones are equipped with high-resolution cameras and real-time streaming capabilities.
//             </p>
//             <Button variant="secondary" onClick={() => setShowForm(true)}>
//               <Send />
//               Submit New Request
//             </Button>
//           </div>
//         </Card>
//       )}

//       {showForm && (
//         <Card title="New Drone Request" style={{ marginBottom: "32px" }}>
//           <form onSubmit={handleSubmit}>
//             <FormGrid>
//               <div>
//                 <FormInput
//                   label="Location"
//                   name="location"
//                   placeholder="Enter specific address or area"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   error={errors.location}
//                   required
//                 />
//                 <FormInput
//                   label="Duration"
//                   name="duration"
//                   placeholder="e.g., 2 hours, 30 minutes"
//                   value={formData.duration}
//                   onChange={handleInputChange}
//                   error={errors.duration}
//                   required
//                 />
//                 <div style={{ marginBottom: "24px" }}>
//                   <label
//                     style={{
//                       display: "block",
//                       fontWeight: "600",
//                       color: "#F4F6F8",
//                       marginBottom: "8px",
//                       fontSize: "14px",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.5px",
//                     }}
//                   >
//                     Priority Level <span style={{ color: "#E63946" }}>*</span>
//                   </label>
//                   <select
//                     name="priority"
//                     value={formData.priority}
//                     onChange={handleInputChange}
//                     style={{
//                       width: "100%",
//                       padding: "12px",
//                       backgroundColor: "#0D1B2A",
//                       border: "2px solid #1D3557",
//                       borderRadius: "8px",
//                       color: "#F4F6F8",
//                       fontSize: "14px",
//                     }}
//                   >
//                     <option value="low">Low Priority</option>
//                     <option value="normal">Normal Priority</option>
//                     <option value="high">High Priority</option>
//                     <option value="emergency">Emergency</option>
//                   </select>
//                 </div>
//                 <FormInput
//                   label="Contact Phone"
//                   name="contactPhone"
//                   type="tel"
//                   placeholder="Your phone number"
//                   value={formData.contactPhone}
//                   onChange={handleInputChange}
//                   error={errors.contactPhone}
//                   required
//                 />
//               </div>

//               <div>
//                 <div style={{ marginBottom: "24px" }}>
//                   <label
//                     style={{
//                       display: "block",
//                       fontWeight: "600",
//                       color: "#F4F6F8",
//                       marginBottom: "8px",
//                       fontSize: "14px",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.5px",
//                     }}
//                   >
//                     Description <span style={{ color: "#E63946" }}>*</span>
//                   </label>
//                   <TextArea
//                     name="description"
//                     placeholder="Describe the reason for drone surveillance, specific areas of interest, or any special requirements..."
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     hasError={!!errors.description}
//                   />
//                   {errors.description && (
//                     <span style={{ color: "#E63946", fontSize: "12px", marginTop: "4px", display: "block" }}>
//                       {errors.description}
//                     </span>
//                   )}
//                 </div>

//                 <div
//                   style={{
//                     backgroundColor: "#1D3557",
//                     padding: "16px",
//                     borderRadius: "8px",
//                     border: "1px solid #FFB703",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
//                     <AlertTriangle style={{ width: "16px", height: "16px", color: "#FFB703" }} />
//                     <strong style={{ color: "#FFB703", fontSize: "14px" }}>Important Notice</strong>
//                   </div>
//                   <p style={{ color: "#F4F6F8", fontSize: "12px", lineHeight: "1.4" }}>
//                     Drone deployment is subject to weather conditions and airspace restrictions. Emergency requests
//                     receive priority handling. You will be contacted within 15 minutes of submission.
//                   </p>
//                 </div>
//               </div>
//             </FormGrid>

//             <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
//               <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
//                 Cancel
//               </Button>
//               <Button variant="secondary" type="submit" disabled={loading}>
//                 {loading ? <LoadingSpinner size="sm" /> : <Send />}
//                 {loading ? "Submitting..." : "Submit Request"}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       )}

//       <div>
//         <h2
//           style={{
//             fontFamily: "Montserrat, sans-serif",
//             fontSize: "20px",
//             fontWeight: "700",
//             textTransform: "uppercase",
//             letterSpacing: "1px",
//             marginBottom: "24px",
//             color: "#F4F6F8",
//           }}
//         >
//           My Requests ({requests.length})
//         </h2>

//         <RequestList>
//           {requests.map((request) => (
//             <RequestCard key={request.id}>
//               <div className="request-header">
//                 <div className="request-info">
//                   <div className="drone-icon">
//                     <Drone />
//                   </div>
//                   <div className="details">
//                     <div className="id">Request {request.id}</div>
//                     <div className="date">{new Date(request.requestDate).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//                 <StatusBadge status={request.status}>{request.status}</StatusBadge>
//               </div>

//               <div className="request-details">
//                 <div className="detail-item">
//                   <div className="label">Location</div>
//                   <div className="value">{request.location}</div>
//                 </div>
//                 <div className="detail-item">
//                   <div className="label">Duration</div>
//                   <div className="value">{request.duration}</div>
//                 </div>
//                 <div className="detail-item">
//                   <div className="label">Priority</div>
//                   <div className="value" style={{ textTransform: "capitalize" }}>
//                     {request.priority}
//                   </div>
//                 </div>
//                 <div className="detail-item">
//                   <div className="label">ETA</div>
//                   <div className="value">{request.estimatedArrival}</div>
//                 </div>
//               </div>

//               <div className="request-description">
//                 <div className="label">Description</div>
//                 <div className="description">{request.description}</div>
//               </div>
//             </RequestCard>
//           ))}
//         </RequestList>
//       </div>
//     </div>
//   )
// }

// export default DroneRequest
