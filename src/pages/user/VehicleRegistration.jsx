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
    licencePlate: "",
    vinChassis: "",
    engineNumber: "",
    make: "",
    model: "",
    vehicleType: "",
    year: "",
    vehicleUsage: "",
    color: "",
    sourceOfVehicle: "",
    stateLicencingOffice: "",
    stateRequestingFrom: "",
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

    if (!formData.licencePlate) newErrors.licencePlate = "Licence plate is required"
    if (!formData.vinChassis) newErrors.vinChassis = "VIN/Chassis number is required"
    if (!formData.engineNumber) newErrors.engineNumber = "Engine number is required"
    if (!formData.make) newErrors.make = "Make is required"
    if (!formData.model) newErrors.model = "Model is required"
    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required"
    if (!formData.year) newErrors.year = "Year is required"
    if (!formData.vehicleUsage) newErrors.vehicleUsage = "Vehicle usage is required"
    if (!formData.color) newErrors.color = "Color is required"
    if (!formData.sourceOfVehicle) newErrors.sourceOfVehicle = "Source of vehicle is required"
    if (!formData.stateLicencingOffice) newErrors.stateLicencingOffice = "State licencing office is required"
    if (!formData.stateRequestingFrom) newErrors.stateRequestingFrom = "State requesting from is required"

    if (formData.vinChassis && formData.vinChassis.length !== 17) {
      newErrors.vinChassis = "VIN must be 17 characters"
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
        licencePlate: "",
        vinChassis: "",
        engineNumber: "",
        make: "",
        model: "",
        vehicleType: "",
        year: "",
        vehicleUsage: "",
        color: "",
        sourceOfVehicle: "",
        stateLicencingOffice: "",
        stateRequestingFrom: "",
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

  const dropdownOptions = {
    makes: [
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "Nissan",
      "BMW",
      "Mercedes-Benz",
      "Audi",
      "Volkswagen",
      "Hyundai",
      "Kia",
      "Mazda",
      "Subaru",
      "Lexus",
      "Infiniti",
      "Acura",
    ],
    models: {
      Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Prius", "Sienna", "Tacoma", "Tundra"],
      Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "Ridgeline", "HR-V", "Passport"],
      Ford: ["F-150", "Escape", "Explorer", "Mustang", "Edge", "Expedition", "Ranger", "Bronco"],
      // Add more models for other makes as needed
    },
    vehicleTypes: ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Hatchback", "Wagon", "Van", "Motorcycle", "Bus"],
    years: Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i),
    vehicleUsage: ["Personal", "Commercial", "Government", "Rental", "Fleet", "Emergency Services", "Public Transport"],
    colors: ["White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Orange", "Brown", "Purple", "Gold"],
    sources: ["Dealership", "Private Sale", "Auction", "Import", "Lease", "Government", "Insurance", "Manufacturer"],
    states: [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "FCT",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
    ],
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
                <h3>Vehicle Identification</h3>
                <FormInput
                  label="Licence Plate Number"
                  name="licencePlate"
                  placeholder="e.g., ABC-123-XY"
                  value={formData.licencePlate}
                  onChange={handleInputChange}
                  error={errors.licencePlate}
                  required
                />
                <FormInput
                  label="VIN/Chassis Number"
                  name="vinChassis"
                  placeholder="17-character VIN/Chassis number"
                  value={formData.vinChassis}
                  onChange={handleInputChange}
                  error={errors.vinChassis}
                  required
                />
                <FormInput
                  label="Engine Number"
                  name="engineNumber"
                  placeholder="Engine identification number"
                  value={formData.engineNumber}
                  onChange={handleInputChange}
                  error={errors.engineNumber}
                  required
                />
              </FormSection>

              <FormSection>
                <h3>Vehicle Specifications</h3>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    Make (Manufacturer) *
                  </label>
                  <select
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.make ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Manufacturer</option>
                    {dropdownOptions.makes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                  {errors.make && <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.make}</span>}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    Model *
                  </label>
                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    disabled={!formData.make}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.model ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                      opacity: !formData.make ? 0.5 : 1,
                    }}
                  >
                    <option value="">Select Model</option>
                    {formData.make &&
                      dropdownOptions.models[formData.make]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                  </select>
                  {errors.model && <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.model}</span>}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.vehicleType ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Vehicle Type</option>
                    {dropdownOptions.vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleType && (
                    <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.vehicleType}</span>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    Year of Manufacture *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.year ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Year</option>
                    {dropdownOptions.years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.year && <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.year}</span>}
                </div>
              </FormSection>

              <FormSection>
                <h3>Usage & Details</h3>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    Vehicle Usage *
                  </label>
                  <select
                    name="vehicleUsage"
                    value={formData.vehicleUsage}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.vehicleUsage ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Usage</option>
                    {dropdownOptions.vehicleUsage.map((usage) => (
                      <option key={usage} value={usage}>
                        {usage}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleUsage && (
                    <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.vehicleUsage}</span>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    Color *
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.color ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Color</option>
                    {dropdownOptions.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  {errors.color && <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.color}</span>}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    Source of Vehicle *
                  </label>
                  <select
                    name="sourceOfVehicle"
                    value={formData.sourceOfVehicle}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.sourceOfVehicle ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Source</option>
                    {dropdownOptions.sources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  {errors.sourceOfVehicle && (
                    <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.sourceOfVehicle}</span>
                  )}
                </div>
              </FormSection>

              <FormSection>
                <h3>Registration Location</h3>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    State Licencing Office *
                  </label>
                  <select
                    name="stateLicencingOffice"
                    value={formData.stateLicencingOffice}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.stateLicencingOffice ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select State</option>
                    {dropdownOptions.states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.stateLicencingOffice && (
                    <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.stateLicencingOffice}</span>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#F4F6F8" }}>
                    State Requesting From *
                  </label>
                  <select
                    name="stateRequestingFrom"
                    value={formData.stateRequestingFrom}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: errors.stateRequestingFrom ? "2px solid #FF6B47" : "2px solid #2D3748",
                      backgroundColor: "#1A202C",
                      color: "#F4F6F8",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select State</option>
                    {dropdownOptions.states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.stateRequestingFrom && (
                    <span style={{ color: "#FF6B47", fontSize: "14px" }}>{errors.stateRequestingFrom}</span>
                  )}
                </div>
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