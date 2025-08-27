"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Car, Save, ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import FormInput from "../../components/auth/FormInput"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { between  } from "polished" // Import clamp from polished library

const PageContainer = styled.div`
  width: 100%;
  max-width: none;
  padding: clamp(16px, 3vw, 40px);
  margin: 0;
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(24px, 4vw, 40px);
  
  .header-left {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    
    h1 {
      font-family: ${(props) => props.theme.fonts.heading};
      font-size: clamp(24px, 4vw, 32px);
      font-weight: 700;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.md};
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: clamp(20px, 3vw, 32px);
  margin-bottom: clamp(24px, 4vw, 40px);
  
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const FormSection = styled.div`
  h3 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: clamp(16px, 2.5vw, 20px);
    font-weight: 600;
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    padding-bottom: ${(props) => props.theme.spacing.sm};
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary.amber};
  }
`

const VehicleList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
  gap: clamp(16px, 2.5vw, 24px);
  margin-bottom: clamp(24px, 4vw, 40px);
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const VehicleCard = styled(Card)`
  .vehicle-header {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    
    .vehicle-icon {
      width: 50px;
      height: 50px;
      border-radius: ${(props) => props.theme.borderRadius.lg};
      background-color: ${(props) => props.theme.colors.secondary.amber};
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        width: 24px;
        height: 24px;
        color: ${(props) => props.theme.colors.primary.darkNavy};
      }
    }
    
    .vehicle-info {
      flex: 1;
      
      .name {
        font-weight: 700;
        font-size: 16px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        margin-bottom: 4px;
      }
      
      .plate {
        font-size: 14px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
    
    .status {
      align-self: flex-start;
    }
  }
  
  .vehicle-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${(props) => props.theme.spacing.md};
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
  
  .vehicle-actions {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm};
    justify-content: flex-end;
  }
`

const VehicleRegistration = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2022,
      plate: "ABC-123",
      vin: "1HGBH41JXMN109186",
      color: "Silver",
      status: "active",
      registeredDate: "2024-01-15",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2021,
      plate: "XYZ-789",
      vin: "2HGFC2F59MH123456",
      color: "Blue",
      status: "active",
      registeredDate: "2024-02-20",
    },
  ])

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    plate: "",
    vin: "",
    color: "",
  })

  const [errors, setErrors] = useState({})

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

    if (!formData.make) newErrors.make = "Make is required"
    if (!formData.model) newErrors.model = "Model is required"
    if (!formData.year) newErrors.year = "Year is required"
    if (!formData.plate) newErrors.plate = "License plate is required"
    if (!formData.vin) newErrors.vin = "VIN is required"
    if (!formData.color) newErrors.color = "Color is required"

    if (formData.year && (formData.year < 1900 || formData.year > new Date().getFullYear() + 1)) {
      newErrors.year = "Please enter a valid year"
    }

    if (formData.vin && formData.vin.length !== 17) {
      newErrors.vin = "VIN must be 17 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newVehicle = {
        id: Date.now(),
        ...formData,
        year: Number.parseInt(formData.year),
        status: "active",
        registeredDate: new Date().toISOString().split("T")[0],
      }

      setVehicles((prev) => [...prev, newVehicle])
      setFormData({
        make: "",
        model: "",
        year: "",
        plate: "",
        vin: "",
        color: "",
      })
      setShowForm(false)
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVehicle = (vehicleId) => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== vehicleId))
  }

  return (
    <PageContainer>
      <PageHeader>
        <div className="header-left">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft />
          </Button>
          <h1>Vehicle Management</h1>
        </div>
        <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
          <Plus />
          Register Vehicle
        </Button>
      </PageHeader>

      {showForm && (
        <Card title="Register New Vehicle" style={{ marginBottom: "32px" }}>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormSection>
                <h3>Vehicle Information</h3>
                <FormInput
                  label="Make"
                  name="make"
                  placeholder="e.g., Toyota, Honda, Ford"
                  value={formData.make}
                  onChange={handleInputChange}
                  error={errors.make}
                  required
                />
                <FormInput
                  label="Model"
                  name="model"
                  placeholder="e.g., Camry, Civic, F-150"
                  value={formData.model}
                  onChange={handleInputChange}
                  error={errors.model}
                  required
                />
                <FormInput
                  label="Year"
                  name="year"
                  type="number"
                  placeholder="e.g., 2022"
                  value={formData.year}
                  onChange={handleInputChange}
                  error={errors.year}
                  required
                />
                <FormInput
                  label="Color"
                  name="color"
                  placeholder="e.g., Silver, Blue, Black"
                  value={formData.color}
                  onChange={handleInputChange}
                  error={errors.color}
                  required
                />
              </FormSection>

              <FormSection>
                <h3>Registration Details</h3>
                <FormInput
                  label="License Plate"
                  name="plate"
                  placeholder="e.g., ABC-123"
                  value={formData.plate}
                  onChange={handleInputChange}
                  error={errors.plate}
                  required
                />
                <FormInput
                  label="VIN Number"
                  name="vin"
                  placeholder="17-character VIN"
                  value={formData.vin}
                  onChange={handleInputChange}
                  error={errors.vin}
                  required
                />
              </FormSection>
            </FormGrid>

            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
              <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit" disabled={loading}>
                {loading ? <LoadingSpinner size="sm" /> : <Save />}
                {loading ? "Registering..." : "Register Vehicle"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div>
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 'clamp("18px", "3vw", "24px")',
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "24px",
            color: "#F4F6F8",
          }}
        >
          Registered Vehicles ({vehicles.length})
        </h2>

        {vehicles.length > 0 ? (
          <VehicleList>
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id}>
                <div className="vehicle-header">
                  <div className="vehicle-icon">
                    <Car />
                  </div>
                  <div className="vehicle-info">
                    <div className="name">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                    <div className="plate">{vehicle.plate}</div>
                  </div>
                  <div className="status">
                    <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
                  </div>
                </div>

                <div className="vehicle-details">
                  <div className="detail-item">
                    <div className="label">VIN</div>
                    <div className="value">{vehicle.vin}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Color</div>
                    <div className="value">{vehicle.color}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Registered</div>
                    <div className="value">{new Date(vehicle.registeredDate).toLocaleDateString()}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Status</div>
                    <div className="value">Protected</div>
                  </div>
                </div>

                <div className="vehicle-actions">
                  <Button variant="outline" size="sm">
                    <Edit />
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteVehicle(vehicle.id)}>
                    <Trash2 />
                    Remove
                  </Button>
                </div>
              </VehicleCard>
            ))}
          </VehicleList>
        ) : (
          <Card>
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <Car style={{ width: "64px", height: "64px", color: "#8D99AE", marginBottom: "24px" }} />
              <h3 style={{ color: "#8D99AE", marginBottom: "16px" }}>No Vehicles Registered</h3>
              <p style={{ color: "#8D99AE", marginBottom: "24px" }}>
                Start protecting your assets by registering your first vehicle
              </p>
              <Button variant="secondary" onClick={() => setShowForm(true)}>
                <Plus />
                Register Your First Vehicle
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  )
}

export default VehicleRegistration