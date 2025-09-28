"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Car, Save, ArrowLeft, Plus, Edit, Trash2, MapPin } from "lucide-react"
import { MapContainer as LeafletMapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import FormInput from "../../components/auth/FormInput"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import L from "leaflet"

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
  grid-template-columns: 1fr;
  gap: clamp(24px, 4vw, 32px);
  margin-bottom: clamp(24px, 4vw, 40px);
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  
  h3 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: clamp(16px, 2.5vw, 18px);
    font-weight: 600;
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
    padding-bottom: ${(props) => props.theme.spacing.sm};
    border-bottom: 2px solid ${(props) => props.theme.colors.secondary.amber};
  }
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.error ? "#FF6B47" : "#2D3748")};
  background-color: #1A202C;
  color: #F4F6F8;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.secondary.amber};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.secondary.amber}20;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  option {
    background-color: #1A202C;
    color: #F4F6F8;
  }
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-weight: 600;
    color: #F4F6F8;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .error {
    color: #FF6B47;
    font-size: 12px;
    margin-top: 4px;
  }
`

const MapContainer = styled.div`
  height: 250px;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: hidden;
  border: 2px solid ${(props) => props.theme.colors.primary.neonCyan}30;
  margin-top: 8px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.deepBlue} 0%, #1a2332 100%);
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  
  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: ${(props) => props.theme.borderRadius.md};
  }
  
  .location-overlay {
    position: absolute;
    top: 12px;
    left: 12px;
    background: ${(props) => props.theme.colors.dark.surface}95;
    backdrop-filter: blur(10px);
    padding: 8px 12px;
    border-radius: ${(props) => props.theme.borderRadius.sm};
    border: 1px solid ${(props) => props.theme.colors.primary.neonCyan}30;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    
    .location-info {
      display: flex;
      align-items: center;
      gap: 6px;
      color: ${(props) => props.theme.colors.dark.text};
      font-size: 12px;
      font-weight: 600;
      
      svg {
        width: 14px;
        height: 14px;
        color: ${(props) => props.theme.colors.primary.neonCyan};
      }
    }
  }
`

const LocationSection = styled.div`
  grid-column: 1 / -1;
  
  @media (min-width: 1200px) {
    grid-column: span 2;
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
  const [mapPosition, setMapPosition] = useState([9.0765, 8.6753]) // Nigeria center coordinates
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
    location: "",
    latitude: "",
    longitude: "",
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
        location: "",
        latitude: "",
        longitude: "",
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

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setMapPosition([lat, lng])
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString(),
          location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        }))
      },
    })
    return null
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
      "Peugeot",
      "Renault",
      "Mitsubishi",
      "Suzuki",
      "Isuzu",
      "Jeep",
      "Land Rover",
      "Volvo",
    ],
    models: {
      Toyota: [
        "Camry",
        "Corolla",
        "RAV4",
        "Highlander",
        "Prius",
        "Sienna",
        "Tacoma",
        "Tundra",
        "4Runner",
        "Sequoia",
        "Avalon",
        "Venza",
      ],
      Honda: [
        "Civic",
        "Accord",
        "CR-V",
        "Pilot",
        "Odyssey",
        "Ridgeline",
        "HR-V",
        "Passport",
        "Fit",
        "Insight",
        "Element",
      ],
      Ford: [
        "F-150",
        "Escape",
        "Explorer",
        "Mustang",
        "Edge",
        "Expedition",
        "Ranger",
        "Bronco",
        "Focus",
        "Fusion",
        "Transit",
      ],
      Chevrolet: [
        "Silverado",
        "Equinox",
        "Malibu",
        "Traverse",
        "Tahoe",
        "Suburban",
        "Camaro",
        "Corvette",
        "Cruze",
        "Impala",
      ],
      Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder", "Armada", "Titan", "Maxima", "Murano", "Versa", "Frontier"],
      BMW: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7", "Z4", "i3", "i8", "M3", "M5"],
      "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "GLS", "A-Class", "CLA", "AMG GT"],
      Audi: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"],
      Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Beetle", "Arteon", "ID.4"],
      Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Accent", "Veloster", "Genesis"],
      Kia: ["Forte", "Optima", "Sorento", "Telluride", "Sportage", "Rio", "Stinger", "Soul"],
      Mazda: ["Mazda3", "Mazda6", "CX-3", "CX-5", "CX-9", "MX-5 Miata", "CX-30"],
      Subaru: ["Impreza", "Legacy", "Outback", "Forester", "Ascent", "WRX", "BRZ"],
      Lexus: ["ES", "IS", "GS", "LS", "NX", "RX", "GX", "LX", "LC", "RC"],
      Infiniti: ["Q50", "Q60", "QX50", "QX60", "QX80", "Q70", "QX30"],
      Acura: ["ILX", "TLX", "RLX", "RDX", "MDX", "NSX"],
      Peugeot: ["208", "308", "508", "2008", "3008", "5008", "Partner", "Expert"],
      Renault: ["Clio", "Megane", "Scenic", "Kadjar", "Koleos", "Captur", "Talisman"],
      Mitsubishi: ["Mirage", "Lancer", "Outlander", "Eclipse Cross", "Pajero", "L200"],
      Suzuki: ["Swift", "Baleno", "Vitara", "S-Cross", "Jimny", "Ertiga"],
      Isuzu: ["D-Max", "MU-X", "NPR", "FRR", "Trooper"],
      Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator"],
      "Land Rover": ["Range Rover", "Discovery", "Defender", "Evoque", "Velar", "Sport"],
      Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
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

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
  L.Marker.prototype.options.icon = DefaultIcon

  return (
    <PageContainer>
      <PageHeader>
        <div className="header-left">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft />
          </Button>
          <h1>Vehicle Management</h1>
        </div>
        {!showForm && (
          <Button variant="secondary" onClick={() => setShowForm(true)}>
            <Plus />
            Register Vehicle
          </Button>
        )}
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
                <FormField>
                  <label>Make (Manufacturer) *</label>
                  <StyledSelect name="make" value={formData.make} onChange={handleInputChange} error={errors.make}>
                    <option value="">Select Manufacturer</option>
                    {dropdownOptions.makes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </StyledSelect>
                  {errors.make && <span className="error">{errors.make}</span>}
                </FormField>

                <FormField>
                  <label>Model *</label>
                  <StyledSelect
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    disabled={!formData.make}
                    error={errors.model}
                  >
                    <option value="">Select Model</option>
                    {formData.make &&
                      dropdownOptions.models[formData.make]?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                  </StyledSelect>
                  {errors.model && <span className="error">{errors.model}</span>}
                </FormField>

                <FormField>
                  <label>Vehicle Type *</label>
                  <StyledSelect
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    error={errors.vehicleType}
                  >
                    <option value="">Select Vehicle Type</option>
                    {dropdownOptions.vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </StyledSelect>
                  {errors.vehicleType && <span className="error">{errors.vehicleType}</span>}
                </FormField>

                <FormField>
                  <label>Year of Manufacture *</label>
                  <StyledSelect name="year" value={formData.year} onChange={handleInputChange} error={errors.year}>
                    <option value="">Select Year</option>
                    {dropdownOptions.years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </StyledSelect>
                  {errors.year && <span className="error">{errors.year}</span>}
                </FormField>
              </FormSection>

              <FormSection>
                <h3>Usage & Details</h3>
                <FormField>
                  <label>Vehicle Usage *</label>
                  <StyledSelect
                    name="vehicleUsage"
                    value={formData.vehicleUsage}
                    onChange={handleInputChange}
                    error={errors.vehicleUsage}
                  >
                    <option value="">Select Usage</option>
                    {dropdownOptions.vehicleUsage.map((usage) => (
                      <option key={usage} value={usage}>
                        {usage}
                      </option>
                    ))}
                  </StyledSelect>
                  {errors.vehicleUsage && <span className="error">{errors.vehicleUsage}</span>}
                </FormField>

                <FormField>
                  <label>Color *</label>
                  <StyledSelect name="color" value={formData.color} onChange={handleInputChange} error={errors.color}>
                    <option value="">Select Color</option>
                    {dropdownOptions.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </StyledSelect>
                  {errors.color && <span className="error">{errors.color}</span>}
                </FormField>

                <FormField>
                  <label>Source of Vehicle *</label>
                  <StyledSelect
                    name="sourceOfVehicle"
                    value={formData.sourceOfVehicle}
                    onChange={handleInputChange}
                    error={errors.sourceOfVehicle}
                  >
                    <option value="">Select Source</option>
                    {dropdownOptions.sources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </StyledSelect>
                  {errors.sourceOfVehicle && <span className="error">{errors.sourceOfVehicle}</span>}
                </FormField>
              </FormSection>

              <LocationSection>
                <FormSection>
                  <h3>Registration Location</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <FormField>
                      <label>State Licencing Office *</label>
                      <StyledSelect
                        name="stateLicencingOffice"
                        value={formData.stateLicencingOffice}
                        onChange={handleInputChange}
                        error={errors.stateLicencingOffice}
                      >
                        <option value="">Select State</option>
                        {dropdownOptions.states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </StyledSelect>
                      {errors.stateLicencingOffice && <span className="error">{errors.stateLicencingOffice}</span>}
                    </FormField>

                    <FormField>
                      <label>State Requesting From *</label>
                      <StyledSelect
                        name="stateRequestingFrom"
                        value={formData.stateRequestingFrom}
                        onChange={handleInputChange}
                        error={errors.stateRequestingFrom}
                      >
                        <option value="">Select State</option>
                        {dropdownOptions.states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </StyledSelect>
                      {errors.stateRequestingFrom && <span className="error">{errors.stateRequestingFrom}</span>}
                    </FormField>
                  </div>

                  <FormField>
                    <label>
                      <MapPin style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                      Vehicle Location (Click on map to select)
                    </label>
                    <FormInput
                      name="location"
                      placeholder="Click on map to set location"
                      value={formData.location}
                      onChange={handleInputChange}
                      readOnly
                    />
                    <MapContainer>
                      <LeafletMapContainer center={mapPosition} zoom={6} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={mapPosition} />
                        <LocationPicker />
                      </LeafletMapContainer>

                      {formData.location && (
                        <div className="location-overlay">
                          <div className="location-info">
                            <MapPin />
                            Selected: {formData.location}
                          </div>
                        </div>
                      )}
                    </MapContainer>
                  </FormField>
                </FormSection>
              </LocationSection>
            </FormGrid>

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "flex-end",
                paddingTop: "24px",
                borderTop: "1px solid #2D3748",
              }}
            >
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
            fontSize: "clamp(18px, 3vw, 24px)",
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











// "use client"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import styled from "styled-components"
// import { Car, Save, ArrowLeft, Plus, Edit, Trash2, MapPin } from "lucide-react"
// import { MapContainer as LeafletMapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
// import "leaflet/dist/leaflet.css"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import FormInput from "../../components/auth/FormInput"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"

// const PageContainer = styled.div`
//   width: 100%;
//   max-width: none;
//   padding: clamp(16px, 3vw, 40px);
//   margin: 0;
// `

// const PageHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: clamp(24px, 4vw, 40px);
  
//   .header-left {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
    
//     h1 {
//       font-family: ${(props) => props.theme.fonts.heading};
//       font-size: clamp(24px, 4vw, 32px);
//       font-weight: 700;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       text-transform: uppercase;
//       letter-spacing: 1px;
//     }
//   }
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: ${(props) => props.theme.spacing.md};
//   }
// `

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: clamp(24px, 4vw, 32px);
//   margin-bottom: clamp(24px, 4vw, 40px);
  
//   @media (min-width: 768px) {
//     grid-template-columns: 1fr 1fr;
//   }
  
//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `

// const FormSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.lg};
  
//   h3 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: clamp(16px, 2.5vw, 18px);
//     font-weight: 600;
//     color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//     margin: 0;
//     padding-bottom: ${(props) => props.theme.spacing.sm};
//     border-bottom: 2px solid ${(props) => props.theme.colors.secondary.amber};
//   }
// `

// const StyledSelect = styled.select`
//   width: 100%;
//   padding: 12px 16px;
//   border-radius: 8px;
//   border: 2px solid ${(props) => (props.error ? "#FF6B47" : "#2D3748")};
//   background-color: #1A202C;
//   color: #F4F6F8;
//   font-size: 16px;
//   font-family: inherit;
//   transition: all 0.2s ease;
  
//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.colors.secondary.amber};
//     box-shadow: 0 0 0 3px ${(props) => props.theme.colors.secondary.amber}20;
//   }
  
//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
  
//   option {
//     background-color: #1A202C;
//     color: #F4F6F8;
//   }
// `

// const FormField = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
  
//   label {
//     font-weight: 600;
//     color: #F4F6F8;
//     font-size: 14px;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//   }
  
//   .error {
//     color: #FF6B47;
//     font-size: 12px;
//     margin-top: 4px;
//   }
// `

// const MapContainer = styled.div`
//   height: 300px;
//   width: 100%;
//   border-radius: 8px;
//   overflow: hidden;
//   border: 2px solid #2D3748;
//   margin-top: 8px;
  
//   .leaflet-container {
//     height: 100%;
//     width: 100%;
//   }
// `

// const LocationSection = styled.div`
//   grid-column: 1 / -1;
  
//   @media (min-width: 1200px) {
//     grid-column: span 2;
//   }
// `

// const VehicleList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
//   gap: clamp(16px, 2.5vw, 24px);
//   margin-bottom: clamp(24px, 4vw, 40px);
  
//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
//   }
  
//   @media (min-width: 1600px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
// `

// const VehicleCard = styled(Card)`
//   .vehicle-header {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
    
//     .vehicle-icon {
//       width: 50px;
//       height: 50px;
//       border-radius: ${(props) => props.theme.borderRadius.lg};
//       background-color: ${(props) => props.theme.colors.secondary.amber};
//       display: flex;
//       align-items: center;
//       justify-content: center;
      
//       svg {
//         width: 24px;
//         height: 24px;
//         color: ${(props) => props.theme.colors.primary.darkNavy};
//       }
//     }
    
//     .vehicle-info {
//       flex: 1;
      
//       .name {
//         font-weight: 700;
//         font-size: 16px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         margin-bottom: 4px;
//       }
      
//       .plate {
//         font-size: 14px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 1px;
//       }
//     }
    
//     .status {
//       align-self: flex-start;
//     }
//   }
  
//   .vehicle-details {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: ${(props) => props.theme.spacing.md};
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
  
//   .vehicle-actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.sm};
//     justify-content: flex-end;
//   }
// `

// const VehicleRegistration = () => {
//   const navigate = useNavigate()
//   const [showForm, setShowForm] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [mapPosition, setMapPosition] = useState([9.0765, 8.6753]) // Nigeria center coordinates
//   const [vehicles, setVehicles] = useState([
//     {
//       id: 1,
//       make: "Toyota",
//       model: "Camry",
//       year: 2022,
//       plate: "ABC-123",
//       vin: "1HGBH41JXMN109186",
//       color: "Silver",
//       status: "active",
//       registeredDate: "2024-01-15",
//     },
//     {
//       id: 2,
//       make: "Honda",
//       model: "Civic",
//       year: 2021,
//       plate: "XYZ-789",
//       vin: "2HGFC2F59MH123456",
//       color: "Blue",
//       status: "active",
//       registeredDate: "2024-02-20",
//     },
//   ])

//   const [formData, setFormData] = useState({
//     licencePlate: "",
//     vinChassis: "",
//     engineNumber: "",
//     make: "",
//     model: "",
//     vehicleType: "",
//     year: "",
//     vehicleUsage: "",
//     color: "",
//     sourceOfVehicle: "",
//     stateLicencingOffice: "",
//     stateRequestingFrom: "",
//     location: "",
//     latitude: "",
//     longitude: "",
//   })

//   const [errors, setErrors] = useState({})

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

//     if (!formData.licencePlate) newErrors.licencePlate = "Licence plate is required"
//     if (!formData.vinChassis) newErrors.vinChassis = "VIN/Chassis number is required"
//     if (!formData.engineNumber) newErrors.engineNumber = "Engine number is required"
//     if (!formData.make) newErrors.make = "Make is required"
//     if (!formData.model) newErrors.model = "Model is required"
//     if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required"
//     if (!formData.year) newErrors.year = "Year is required"
//     if (!formData.vehicleUsage) newErrors.vehicleUsage = "Vehicle usage is required"
//     if (!formData.color) newErrors.color = "Color is required"
//     if (!formData.sourceOfVehicle) newErrors.sourceOfVehicle = "Source of vehicle is required"
//     if (!formData.stateLicencingOffice) newErrors.stateLicencingOffice = "State licencing office is required"
//     if (!formData.stateRequestingFrom) newErrors.stateRequestingFrom = "State requesting from is required"

//     if (formData.vinChassis && formData.vinChassis.length !== 17) {
//       newErrors.vinChassis = "VIN must be 17 characters"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setLoading(true)
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       const newVehicle = {
//         id: Date.now(),
//         ...formData,
//         year: Number.parseInt(formData.year),
//         status: "active",
//         registeredDate: new Date().toISOString().split("T")[0],
//       }

//       setVehicles((prev) => [...prev, newVehicle])
//       setFormData({
//         licencePlate: "",
//         vinChassis: "",
//         engineNumber: "",
//         make: "",
//         model: "",
//         vehicleType: "",
//         year: "",
//         vehicleUsage: "",
//         color: "",
//         sourceOfVehicle: "",
//         stateLicencingOffice: "",
//         stateRequestingFrom: "",
//         location: "",
//         latitude: "",
//         longitude: "",
//       })
//       setShowForm(false)
//     } catch (error) {
//       console.error("Registration failed:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDeleteVehicle = (vehicleId) => {
//     setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== vehicleId))
//   }

//   const LocationPicker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng
//         setMapPosition([lat, lng])
//         setFormData((prev) => ({
//           ...prev,
//           latitude: lat.toString(),
//           longitude: lng.toString(),
//           location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
//         }))
//       },
//     })
//     return null
//   }

//   const dropdownOptions = {
//     makes: [
//       "Toyota",
//       "Honda",
//       "Ford",
//       "Chevrolet",
//       "Nissan",
//       "BMW",
//       "Mercedes-Benz",
//       "Audi",
//       "Volkswagen",
//       "Hyundai",
//       "Kia",
//       "Mazda",
//       "Subaru",
//       "Lexus",
//       "Infiniti",
//       "Acura",
//       "Peugeot",
//       "Renault",
//       "Mitsubishi",
//       "Suzuki",
//       "Isuzu",
//       "Jeep",
//       "Land Rover",
//       "Volvo",
//     ],
//     models: {
//       Toyota: [
//         "Camry",
//         "Corolla",
//         "RAV4",
//         "Highlander",
//         "Prius",
//         "Sienna",
//         "Tacoma",
//         "Tundra",
//         "4Runner",
//         "Sequoia",
//         "Avalon",
//         "Venza",
//       ],
//       Honda: [
//         "Civic",
//         "Accord",
//         "CR-V",
//         "Pilot",
//         "Odyssey",
//         "Ridgeline",
//         "HR-V",
//         "Passport",
//         "Fit",
//         "Insight",
//         "Element",
//       ],
//       Ford: [
//         "F-150",
//         "Escape",
//         "Explorer",
//         "Mustang",
//         "Edge",
//         "Expedition",
//         "Ranger",
//         "Bronco",
//         "Focus",
//         "Fusion",
//         "Transit",
//       ],
//       Chevrolet: [
//         "Silverado",
//         "Equinox",
//         "Malibu",
//         "Traverse",
//         "Tahoe",
//         "Suburban",
//         "Camaro",
//         "Corvette",
//         "Cruze",
//         "Impala",
//       ],
//       Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder", "Armada", "Titan", "Maxima", "Murano", "Versa", "Frontier"],
//       BMW: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7", "Z4", "i3", "i8", "M3", "M5"],
//       "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "GLS", "A-Class", "CLA", "AMG GT"],
//       Audi: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"],
//       Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Beetle", "Arteon", "ID.4"],
//       Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Accent", "Veloster", "Genesis"],
//       Kia: ["Forte", "Optima", "Sorento", "Telluride", "Sportage", "Rio", "Stinger", "Soul"],
//       Mazda: ["Mazda3", "Mazda6", "CX-3", "CX-5", "CX-9", "MX-5 Miata", "CX-30"],
//       Subaru: ["Impreza", "Legacy", "Outback", "Forester", "Ascent", "WRX", "BRZ"],
//       Lexus: ["ES", "IS", "GS", "LS", "NX", "RX", "GX", "LX", "LC", "RC"],
//       Infiniti: ["Q50", "Q60", "QX50", "QX60", "QX80", "Q70", "QX30"],
//       Acura: ["ILX", "TLX", "RLX", "RDX", "MDX", "NSX"],
//       Peugeot: ["208", "308", "508", "2008", "3008", "5008", "Partner", "Expert"],
//       Renault: ["Clio", "Megane", "Scenic", "Kadjar", "Koleos", "Captur", "Talisman"],
//       Mitsubishi: ["Mirage", "Lancer", "Outlander", "Eclipse Cross", "Pajero", "L200"],
//       Suzuki: ["Swift", "Baleno", "Vitara", "S-Cross", "Jimny", "Ertiga"],
//       Isuzu: ["D-Max", "MU-X", "NPR", "FRR", "Trooper"],
//       Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade", "Gladiator"],
//       "Land Rover": ["Range Rover", "Discovery", "Defender", "Evoque", "Velar", "Sport"],
//       Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
//     },
//     vehicleTypes: ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Hatchback", "Wagon", "Van", "Motorcycle", "Bus"],
//     years: Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i),
//     vehicleUsage: ["Personal", "Commercial", "Government", "Rental", "Fleet", "Emergency Services", "Public Transport"],
//     colors: ["White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Orange", "Brown", "Purple", "Gold"],
//     sources: ["Dealership", "Private Sale", "Auction", "Import", "Lease", "Government", "Insurance", "Manufacturer"],
//     states: [
//       "Abia",
//       "Adamawa",
//       "Akwa Ibom",
//       "Anambra",
//       "Bauchi",
//       "Bayelsa",
//       "Benue",
//       "Borno",
//       "Cross River",
//       "Delta",
//       "Ebonyi",
//       "Edo",
//       "Ekiti",
//       "Enugu",
//       "FCT",
//       "Gombe",
//       "Imo",
//       "Jigawa",
//       "Kaduna",
//       "Kano",
//       "Katsina",
//       "Kebbi",
//       "Kogi",
//       "Kwara",
//       "Lagos",
//       "Nasarawa",
//       "Niger",
//       "Ogun",
//       "Ondo",
//       "Osun",
//       "Oyo",
//       "Plateau",
//       "Rivers",
//       "Sokoto",
//       "Taraba",
//       "Yobe",
//       "Zamfara",
//     ],
//   }

//   return (
//     <PageContainer>
//       <PageHeader>
//         <div className="header-left">
//           <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
//             <ArrowLeft />
//           </Button>
//           <h1>Vehicle Management</h1>
//         </div>
//         {!showForm && (
//           <Button variant="secondary" onClick={() => setShowForm(true)}>
//             <Plus />
//             Register Vehicle
//           </Button>
//         )}
//       </PageHeader>

//       {showForm && (
//         <Card title="Register New Vehicle" style={{ marginBottom: "32px" }}>
//           <form onSubmit={handleSubmit}>
//             <FormGrid>
//               <FormSection>
//                 <h3>Vehicle Identification</h3>
//                 <FormInput
//                   label="Licence Plate Number"
//                   name="licencePlate"
//                   placeholder="e.g., ABC-123-XY"
//                   value={formData.licencePlate}
//                   onChange={handleInputChange}
//                   error={errors.licencePlate}
//                   required
//                 />
//                 <FormInput
//                   label="VIN/Chassis Number"
//                   name="vinChassis"
//                   placeholder="17-character VIN/Chassis number"
//                   value={formData.vinChassis}
//                   onChange={handleInputChange}
//                   error={errors.vinChassis}
//                   required
//                 />
//                 <FormInput
//                   label="Engine Number"
//                   name="engineNumber"
//                   placeholder="Engine identification number"
//                   value={formData.engineNumber}
//                   onChange={handleInputChange}
//                   error={errors.engineNumber}
//                   required
//                 />
//               </FormSection>

//               <FormSection>
//                 <h3>Vehicle Specifications</h3>
//                 <FormField>
//                   <label>Make (Manufacturer) *</label>
//                   <StyledSelect name="make" value={formData.make} onChange={handleInputChange} error={errors.make}>
//                     <option value="">Select Manufacturer</option>
//                     {dropdownOptions.makes.map((make) => (
//                       <option key={make} value={make}>
//                         {make}
//                       </option>
//                     ))}
//                   </StyledSelect>
//                   {errors.make && <span className="error">{errors.make}</span>}
//                 </FormField>

//                 <FormField>
//                   <label>Model *</label>
//                   <StyledSelect
//                     name="model"
//                     value={formData.model}
//                     onChange={handleInputChange}
//                     disabled={!formData.make}
//                     error={errors.model}
//                   >
//                     <option value="">Select Model</option>
//                     {formData.make &&
//                       dropdownOptions.models[formData.make]?.map((model) => (
//                         <option key={model} value={model}>
//                           {model}
//                         </option>
//                       ))}
//                   </StyledSelect>
//                   {errors.model && <span className="error">{errors.model}</span>}
//                 </FormField>

//                 <FormField>
//                   <label>Vehicle Type *</label>
//                   <StyledSelect
//                     name="vehicleType"
//                     value={formData.vehicleType}
//                     onChange={handleInputChange}
//                     error={errors.vehicleType}
//                   >
//                     <option value="">Select Vehicle Type</option>
//                     {dropdownOptions.vehicleTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </StyledSelect>
//                   {errors.vehicleType && <span className="error">{errors.vehicleType}</span>}
//                 </FormField>

//                 <FormField>
//                   <label>Year of Manufacture *</label>
//                   <StyledSelect name="year" value={formData.year} onChange={handleInputChange} error={errors.year}>
//                     <option value="">Select Year</option>
//                     {dropdownOptions.years.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </StyledSelect>
//                   {errors.year && <span className="error">{errors.year}</span>}
//                 </FormField>
//               </FormSection>

//               <FormSection>
//                 <h3>Usage & Details</h3>
//                 <FormField>
//                   <label>Vehicle Usage *</label>
//                   <StyledSelect
//                     name="vehicleUsage"
//                     value={formData.vehicleUsage}
//                     onChange={handleInputChange}
//                     error={errors.vehicleUsage}
//                   >
//                     <option value="">Select Usage</option>
//                     {dropdownOptions.vehicleUsage.map((usage) => (
//                       <option key={usage} value={usage}>
//                         {usage}
//                       </option>
//                     ))}
//                   </StyledSelect>
//                   {errors.vehicleUsage && <span className="error">{errors.vehicleUsage}</span>}
//                 </FormField>

//                 <FormField>
//                   <label>Color *</label>
//                   <StyledSelect name="color" value={formData.color} onChange={handleInputChange} error={errors.color}>
//                     <option value="">Select Color</option>
//                     {dropdownOptions.colors.map((color) => (
//                       <option key={color} value={color}>
//                         {color}
//                       </option>
//                     ))}
//                   </StyledSelect>
//                   {errors.color && <span className="error">{errors.color}</span>}
//                 </FormField>

//                 <FormField>
//                   <label>Source of Vehicle *</label>
//                   <StyledSelect
//                     name="sourceOfVehicle"
//                     value={formData.sourceOfVehicle}
//                     onChange={handleInputChange}
//                     error={errors.sourceOfVehicle}
//                   >
//                     <option value="">Select Source</option>
//                     {dropdownOptions.sources.map((source) => (
//                       <option key={source} value={source}>
//                         {source}
//                       </option>
//                     ))}
//                   </StyledSelect>
//                   {errors.sourceOfVehicle && <span className="error">{errors.sourceOfVehicle}</span>}
//                 </FormField>
//               </FormSection>

//               <LocationSection>
//                 <FormSection>
//                   <h3>Registration Location</h3>
//                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
//                     <FormField>
//                       <label>State Licencing Office *</label>
//                       <StyledSelect
//                         name="stateLicencingOffice"
//                         value={formData.stateLicencingOffice}
//                         onChange={handleInputChange}
//                         error={errors.stateLicencingOffice}
//                       >
//                         <option value="">Select State</option>
//                         {dropdownOptions.states.map((state) => (
//                           <option key={state} value={state}>
//                             {state}
//                           </option>
//                         ))}
//                       </StyledSelect>
//                       {errors.stateLicencingOffice && <span className="error">{errors.stateLicencingOffice}</span>}
//                     </FormField>

//                     <FormField>
//                       <label>State Requesting From *</label>
//                       <StyledSelect
//                         name="stateRequestingFrom"
//                         value={formData.stateRequestingFrom}
//                         onChange={handleInputChange}
//                         error={errors.stateRequestingFrom}
//                       >
//                         <option value="">Select State</option>
//                         {dropdownOptions.states.map((state) => (
//                           <option key={state} value={state}>
//                             {state}
//                           </option>
//                         ))}
//                       </StyledSelect>
//                       {errors.stateRequestingFrom && <span className="error">{errors.stateRequestingFrom}</span>}
//                     </FormField>
//                   </div>

//                   <FormField>
//                     <label>
//                       <MapPin style={{ width: "16px", height: "16px", marginRight: "8px" }} />
//                       Vehicle Location (Click on map to select)
//                     </label>
//                     <FormInput
//                       name="location"
//                       placeholder="Click on map to set location"
//                       value={formData.location}
//                       onChange={handleInputChange}
//                       readOnly
//                     />
//                     <LeafletMapContainer center={mapPosition} zoom={6} style={{ height: "100%", width: "100%" }}>
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                       />
//                       <Marker position={mapPosition} />
//                       <LocationPicker />
//                     </LeafletMapContainer>
//                   </FormField>
//                 </FormSection>
//               </LocationSection>
//             </FormGrid>

//             <div
//               style={{
//                 display: "flex",
//                 gap: "16px",
//                 justifyContent: "flex-end",
//                 paddingTop: "24px",
//                 borderTop: "1px solid #2D3748",
//               }}
//             >
//               <Button variant="outline" type="button" onClick={() => setShowForm(false)}>
//                 Cancel
//               </Button>
//               <Button variant="secondary" type="submit" disabled={loading}>
//                 {loading ? <LoadingSpinner size="sm" /> : <Save />}
//                 {loading ? "Registering..." : "Register Vehicle"}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       )}

//       <div>
//         <h2
//           style={{
//             fontFamily: "Montserrat, sans-serif",
//             fontSize: "clamp(18px, 3vw, 24px)",
//             fontWeight: "700",
//             textTransform: "uppercase",
//             letterSpacing: "1px",
//             marginBottom: "24px",
//             color: "#F4F6F8",
//           }}
//         >
//           Registered Vehicles ({vehicles.length})
//         </h2>

//         {vehicles.length > 0 ? (
//           <VehicleList>
//             {vehicles.map((vehicle) => (
//               <VehicleCard key={vehicle.id}>
//                 <div className="vehicle-header">
//                   <div className="vehicle-icon">
//                     <Car />
//                   </div>
//                   <div className="vehicle-info">
//                     <div className="name">
//                       {vehicle.year} {vehicle.make} {vehicle.model}
//                     </div>
//                     <div className="plate">{vehicle.plate}</div>
//                   </div>
//                   <div className="status">
//                     <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
//                   </div>
//                 </div>

//                 <div className="vehicle-details">
//                   <div className="detail-item">
//                     <div className="label">VIN</div>
//                     <div className="value">{vehicle.vin}</div>
//                   </div>
//                   <div className="detail-item">
//                     <div className="label">Color</div>
//                     <div className="value">{vehicle.color}</div>
//                   </div>
//                   <div className="detail-item">
//                     <div className="label">Registered</div>
//                     <div className="value">{new Date(vehicle.registeredDate).toLocaleDateString()}</div>
//                   </div>
//                   <div className="detail-item">
//                     <div className="label">Status</div>
//                     <div className="value">Protected</div>
//                   </div>
//                 </div>

//                 <div className="vehicle-actions">
//                   <Button variant="outline" size="sm">
//                     <Edit />
//                     Edit
//                   </Button>
//                   <Button variant="danger" size="sm" onClick={() => handleDeleteVehicle(vehicle.id)}>
//                     <Trash2 />
//                     Remove
//                   </Button>
//                 </div>
//               </VehicleCard>
//             ))}
//           </VehicleList>
//         ) : (
//           <Card>
//             <div style={{ textAlign: "center", padding: "60px 20px" }}>
//               <Car style={{ width: "64px", height: "64px", color: "#8D99AE", marginBottom: "24px" }} />
//               <h3 style={{ color: "#8D99AE", marginBottom: "16px" }}>No Vehicles Registered</h3>
//               <p style={{ color: "#8D99AE", marginBottom: "24px" }}>
//                 Start protecting your assets by registering your first vehicle
//               </p>
//               <Button variant="secondary" onClick={() => setShowForm(true)}>
//                 <Plus />
//                 Register Your First Vehicle
//               </Button>
//             </div>
//           </Card>
//         )}
//       </div>
//     </PageContainer>
//   )
// }

// export default VehicleRegistration
