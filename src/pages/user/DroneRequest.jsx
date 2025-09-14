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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(16px, 4vw, 32px);
  min-height: calc(100vh - 70px);
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.deepBlue}40;
  
  h1 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 700;
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    text-transform: uppercase;
    letter-spacing: 1px;
    background: linear-gradient(135deg, ${(props) => props.theme.colors.secondary.amber}, ${(props) => props.theme.colors.secondary.amber}80);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const WelcomeCard = styled(Card)`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy}95, ${(props) => props.theme.colors.primary.deepBlue}80);
  border: 1px solid ${(props) => props.theme.colors.secondary.amber}30;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  .welcome-content {
    text-align: center;
    padding: clamp(32px, 6vw, 48px) clamp(20px, 4vw, 32px);
    
    .drone-icon {
      width: clamp(56px, 8vw, 72px);
      height: clamp(56px, 8vw, 72px);
      color: ${(props) => props.theme.colors.secondary.amber};
      margin: 0 auto 24px;
      filter: drop-shadow(0 4px 8px rgba(255, 183, 3, 0.3));
    }
    
    h3 {
      color: ${(props) => props.theme.colors.dark.text};
      margin-bottom: 16px;
      font-size: clamp(20px, 3vw, 24px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    p {
      color: ${(props) => props.theme.colors.dark.textSecondary};
      margin-bottom: 32px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
      font-size: clamp(14px, 2vw, 16px);
    }
  }
`

const FormCard = styled(Card)`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy}95, ${(props) => props.theme.colors.primary.deepBlue}80);
  border: 1px solid ${(props) => props.theme.colors.secondary.amber}30;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 32px;
  
  .card-header {
    padding: 24px 24px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary.deepBlue}40;
    margin-bottom: 24px;
    
    h3 {
      color: ${(props) => props.theme.colors.dark.text};
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 16px 0;
    }
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 32px);
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const SectionHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.deepBlue}40;
  
  h2 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: clamp(18px, 3vw, 22px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${(props) => props.theme.colors.dark.text};
    margin: 0;
    
    .count {
      color: ${(props) => props.theme.colors.secondary.amber};
      font-weight: 400;
    }
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
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy}95, ${(props) => props.theme.colors.primary.deepBlue}80);
  border: 1px solid ${(props) => props.theme.colors.primary.deepBlue}60;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: ${(props) => props.theme.colors.secondary.amber}40;
  }
  
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

const FormActions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid ${(props) => props.theme.colors.primary.deepBlue}40;
  margin-top: 24px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    button {
      width: 100%;
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
    <Container>
      <PageHeader>
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft />
        </Button>
        <h1>Drone Services</h1>
      </PageHeader>

      {!showForm && (
        <WelcomeCard>
          <div className="welcome-content">
            <Drone className="drone-icon" />
            <h3>Request Drone Surveillance</h3>
            <p>
              Deploy our advanced surveillance drones for security monitoring, emergency response, or area surveillance.
              Our drones are equipped with high-resolution cameras and real-time streaming capabilities.
            </p>
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              <Send />
              Submit New Request
            </Button>
          </div>
        </WelcomeCard>
      )}

      {showForm && (
        <FormCard>
          <div className="card-header">
            <h3>New Drone Request</h3>
          </div>
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

            <FormActions>
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit" disabled={loading}>
                {loading ? <LoadingSpinner size="sm" /> : <Send />}
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </FormActions>
          </form>
        </FormCard>
      )}

      <div>
        <SectionHeader>
          <h2>
            My Requests <span className="count">({requests.length})</span>
          </h2>
        </SectionHeader>

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
    </Container>
  )
}

export default DroneRequest