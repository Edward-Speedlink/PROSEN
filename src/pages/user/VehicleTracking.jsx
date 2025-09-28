"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Map, MapPin, Navigation, RefreshCw, Car, Clock, Battery, ArrowLeft } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(16px, 4vw, 32px);
  min-height: calc(100vh - 140px);
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: clamp(24px, 5vw, 40px);
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
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
      margin: 0;
    }
    
    p {
      color: #90A4AE;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
    }
  }
  
  .header-actions {
    display: flex;
    gap: 12px;
    
    @media (max-width: 768px) {
      align-self: flex-start;
    }
  }
`

const TrackingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: clamp(20px, 3vw, 32px);
  height: calc(100vh - 280px);
  min-height: 600px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: auto;
  }
`

const MapContainer = styled.div`
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.deepBlue} 0%, #1a2332 100%);
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.primary.neonCyan}30;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  .map-placeholder {
    text-align: center;
    color: ${(props) => props.theme.colors.supportive.coolGray};
    
    svg {
      width: 64px;
      height: 64px;
      margin-bottom: ${(props) => props.theme.spacing.lg};
      color: ${(props) => props.theme.colors.primary.neonCyan};
    }
    
    h3 {
      font-size: 18px;
      margin-bottom: ${(props) => props.theme.spacing.sm};
      color: ${(props) => props.theme.colors.dark.text};
    }
    
    p {
      font-size: 14px;
      color: ${(props) => props.theme.colors.supportive.coolGray};
    }
  }
  
  .tracking-overlay {
    position: absolute;
    top: ${(props) => props.theme.spacing.lg};
    left: ${(props) => props.theme.spacing.lg};
    background: ${(props) => props.theme.colors.dark.surface}95;
    backdrop-filter: blur(10px);
    padding: ${(props) => props.theme.spacing.md};
    border-radius: ${(props) => props.theme.borderRadius.md};
    border: 1px solid ${(props) => props.theme.colors.primary.neonCyan}30;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    
    .tracking-info {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.sm};
      color: ${(props) => props.theme.colors.dark.text};
      font-size: 14px;
      font-weight: 600;
      
      svg {
        width: 16px;
        height: 16px;
        color: ${(props) => props.theme.colors.primary.neonCyan};
      }
    }
  }
`

const VehiclePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  max-height: calc(100vh - 280px);
  overflow-y: auto;
  padding-right: 8px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.dark.surface};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary.neonCyan}40;
    border-radius: 3px;
    
    &:hover {
      background: ${(props) => props.theme.colors.primary.neonCyan}60;
    }
  }
  
  @media (max-width: 1024px) {
    grid-row: 1;
    max-height: none;
    overflow-y: visible;
    padding-right: 0;
  }
`

const VehicleCard = styled(Card)`
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  border: 2px solid ${(props) => (props.isSelected ? props.theme.colors.primary.neonCyan : "transparent")};
  box-shadow: ${(props) =>
    props.isSelected ? `0 8px 32px ${props.theme.colors.primary.neonCyan}20` : "0 4px 16px rgba(0, 0, 0, 0.2)"};
  
  &:hover {
    border-color: ${(props) => props.theme.colors.primary.neonCyan}60;
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
  
  .vehicle-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing.md};
    
    .vehicle-info {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.md};
      
      .vehicle-icon {
        width: 40px;
        height: 40px;
        border-radius: ${(props) => props.theme.borderRadius.md};
        background: ${(props) => props.theme.colors.primary.neonCyan}20;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ${(props) => props.theme.transitions.fast};
        
        svg {
          width: 20px;
          height: 20px;
          color: ${(props) => props.theme.colors.primary.neonCyan};
        }
      }
      
      .details {
        .name {
          font-weight: 600;
          color: ${(props) => props.theme.colors.dark.text};
          margin-bottom: 2px;
          font-size: 15px;
        }
        
        .plate {
          font-size: 12px;
          color: ${(props) => props.theme.colors.supportive.coolGray};
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      }
    }
  }
  
  .location-info {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.sm};
    
    .location-row {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.sm};
      font-size: 13px;
      padding: 4px 0;
      
      svg {
        width: 14px;
        height: 14px;
        color: ${(props) => props.theme.colors.supportive.coolGray};
        flex-shrink: 0;
      }
      
      .label {
        color: ${(props) => props.theme.colors.supportive.coolGray};
        min-width: 60px;
        flex-shrink: 0;
      }
      
      .value {
        color: ${(props) => props.theme.colors.dark.text};
        font-weight: 500;
        flex: 1;
      }
    }
  }
  
  ${(props) =>
    props.isSelected &&
    `
    .vehicle-icon {
      background: ${props.theme.colors.primary.neonCyan}30;
      transform: scale(1.05);
    }
  `}
`

const VehicleTracking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isTracking, setIsTracking] = useState(false)

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
  L.Marker.prototype.options.icon = DefaultIcon

  useEffect(() => {
    setTimeout(() => {
      const mockVehicles = [
        {
          id: 1,
          make: "Toyota",
          model: "Camry",
          year: 2022,
          plate: "ABC-123",
          color: "Silver",
          status: "active",
          location: {
            address: "Okey Wali Estate, Port Harcourt",
            coordinates: { lat: 4.8353, lng: 7.0134 }, // Okey Wali Estate area
            lastUpdate: "2 minutes ago",
            speed: "0 km/h",
            battery: "98%",
          },
        },
        {
          id: 2,
          make: "Honda",
          model: "Civic",
          year: 2021,
          plate: "XYZ-789",
          color: "Blue",
          status: "moving",
          location: {
            address: "Okey Wali Estate, Port Harcourt",
            coordinates: { lat: 4.8355, lng: 7.015 }, // close by, still inside estate
            lastUpdate: "1 minute ago",
            speed: "35 km/h",
            battery: "87%",
          },
        },
      ]
      setVehicles(mockVehicles)
      setSelectedVehicle(mockVehicles[0])
      setLoading(false)
    }, 1000)
  }, [])

  const handleRefresh = () => {
    setIsTracking(true)
    setTimeout(() => {
      setIsTracking(false)
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          location: {
            ...v.location,
            lastUpdate: "Just now",
          },
        })),
      )
    }, 2000)
  }

  if (loading) {
    return (
      <PageContainer>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <LoadingSpinner size="lg" text="Loading vehicle tracking..." />
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader>
        <div className="header-left">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft />
          </Button>
          <div>
            <h1>Vehicle Tracking</h1>
            <p>Real-time location monitoring for your registered vehicles</p>
          </div>
        </div>
        <div className="header-actions">
          <Button variant="primary" onClick={handleRefresh} disabled={isTracking}>
            <RefreshCw style={{ width: "16px", height: "16px", marginRight: "8px" }} />
            {isTracking ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </PageHeader>

      <TrackingContainer>
        <MapContainer>
          <LeafletMap
            center={
              selectedVehicle
                ? [selectedVehicle.location.coordinates.lat, selectedVehicle.location.coordinates.lng]
                : [4.8156, 7.0498] // fallback to Portharcourt
            }
            zoom={selectedVehicle ? 14 : 12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {selectedVehicle && (
              <Marker position={[selectedVehicle.location.coordinates.lat, selectedVehicle.location.coordinates.lng]}>
                <Popup>
                  {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} <br />
                  {selectedVehicle.plate}
                </Popup>
              </Marker>
            )}
          </LeafletMap>

          {selectedVehicle ? (
            <div className="tracking-overlay">
              <div className="tracking-info">
                <Navigation />
                Tracking: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </div>
            </div>
          ) : (
            <div className="map-placeholder">
              <Map />
              <h3>Interactive Map</h3>
              <p>Click on a vehicle to see its live location in Portharcourt</p>
            </div>
          )}
        </MapContainer>

        <VehiclePanel>
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              isSelected={selectedVehicle?.id === vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="vehicle-header">
                <div className="vehicle-info">
                  <div className="vehicle-icon">
                    <Car />
                  </div>
                  <div className="details">
                    <div className="name">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </div>
                    <div className="plate">{vehicle.plate}</div>
                  </div>
                </div>
                <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
              </div>

              <div className="location-info">
                <div className="location-row">
                  <MapPin />
                  <span className="label">Location:</span>
                  <span className="value">{vehicle.location.address}</span>
                </div>
                <div className="location-row">
                  <Clock />
                  <span className="label">Updated:</span>
                  <span className="value">{vehicle.location.lastUpdate}</span>
                </div>
                <div className="location-row">
                  <Navigation />
                  <span className="label">Speed:</span>
                  <span className="value">{vehicle.location.speed}</span>
                </div>
                <div className="location-row">
                  <Battery />
                  <span className="label">Battery:</span>
                  <span className="value">{vehicle.location.battery}</span>
                </div>
              </div>
            </VehicleCard>
          ))}
        </VehiclePanel>
      </TrackingContainer>
    </PageContainer>
  )
}

export default VehicleTracking










// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { Map, MapPin, Navigation, RefreshCw, Car, Clock, Battery, ArrowLeft } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"
// import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet"
// import "leaflet/dist/leaflet.css"
// import L from "leaflet"

// const PageContainer = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: clamp(16px, 4vw, 32px);
//   min-height: calc(100vh - 140px);
  
//   @media (max-width: 768px) {
//     padding: 16px;
//   }
// `

// const PageHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: clamp(24px, 5vw, 40px);
//   gap: 20px;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: stretch;
//     gap: 16px;
//   }
  
//   .header-content {
//     h1 {
//       font-size: clamp(24px, 4vw, 32px);
//       font-weight: 700;
//       color: #ECEFF1;
//       margin-bottom: 8px;
//       line-height: 1.2;
//     }
    
//     p {
//       color: #90A4AE;
//       font-size: 16px;
//       line-height: 1.5;
//     }
//   }
  
//   .header-actions {
//     @media (max-width: 768px) {
//       align-self: flex-start;
//     }
//   }
// `

// const TrackingContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 380px;
//   gap: clamp(20px, 3vw, 32px);
//   height: calc(100vh - 280px);
//   min-height: 600px;
  
//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr;
//     height: auto;
//     min-height: auto;
//   }
// `

// const MapContainer = styled.div`
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.deepBlue} 0%, #1a2332 100%);
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   border: 1px solid ${(props) => props.theme.colors.primary.neonCyan}30;
//   position: relative;
//   overflow: hidden;
//   min-height: 500px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
//   .map-placeholder {
//     text-align: center;
//     color: ${(props) => props.theme.colors.supportive.coolGray};
    
//     svg {
//       width: 64px;
//       height: 64px;
//       margin-bottom: ${(props) => props.theme.spacing.lg};
//       color: ${(props) => props.theme.colors.primary.neonCyan};
//     }
    
//     h3 {
//       font-size: 18px;
//       margin-bottom: ${(props) => props.theme.spacing.sm};
//       color: ${(props) => props.theme.colors.dark.text};
//     }
    
//     p {
//       font-size: 14px;
//       color: ${(props) => props.theme.colors.supportive.coolGray};
//     }
//   }
  
//   .tracking-overlay {
//     position: absolute;
//     top: ${(props) => props.theme.spacing.lg};
//     left: ${(props) => props.theme.spacing.lg};
//     background: ${(props) => props.theme.colors.dark.surface}95;
//     backdrop-filter: blur(10px);
//     padding: ${(props) => props.theme.spacing.md};
//     border-radius: ${(props) => props.theme.borderRadius.md};
//     border: 1px solid ${(props) => props.theme.colors.primary.neonCyan}30;
//     box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    
//     .tracking-info {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.sm};
//       color: ${(props) => props.theme.colors.dark.text};
//       font-size: 14px;
//       font-weight: 600;
      
//       svg {
//         width: 16px;
//         height: 16px;
//         color: ${(props) => props.theme.colors.primary.neonCyan};
//       }
//     }
//   }
// `

// const VehiclePanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.lg};
//   max-height: calc(100vh - 280px);
//   overflow-y: auto;
//   padding-right: 8px;
  
//   &::-webkit-scrollbar {
//     width: 6px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: ${(props) => props.theme.colors.dark.surface};
//     border-radius: 3px;
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: ${(props) => props.theme.colors.primary.neonCyan}40;
//     border-radius: 3px;
    
//     &:hover {
//       background: ${(props) => props.theme.colors.primary.neonCyan}60;
//     }
//   }
  
//   @media (max-width: 1024px) {
//     grid-row: 1;
//     max-height: none;
//     overflow-y: visible;
//     padding-right: 0;
//   }
// `

// const VehicleCard = styled(Card)`
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.fast};
//   border: 2px solid ${(props) => (props.isSelected ? props.theme.colors.primary.neonCyan : "transparent")};
//   box-shadow: ${(props) =>
//     props.isSelected ? `0 8px 32px ${props.theme.colors.primary.neonCyan}20` : "0 4px 16px rgba(0, 0, 0, 0.2)"};
  
//   &:hover {
//     border-color: ${(props) => props.theme.colors.primary.neonCyan}60;
//     transform: translateY(-4px);
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
//   }
  
//   .vehicle-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: ${(props) => props.theme.spacing.md};
    
//     .vehicle-info {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.md};
      
//       .vehicle-icon {
//         width: 40px;
//         height: 40px;
//         border-radius: ${(props) => props.theme.borderRadius.md};
//         background: ${(props) => props.theme.colors.primary.neonCyan}20;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         transition: all ${(props) => props.theme.transitions.fast};
        
//         svg {
//           width: 20px;
//           height: 20px;
//           color: ${(props) => props.theme.colors.primary.neonCyan};
//         }
//       }
      
//       .details {
//         .name {
//           font-weight: 600;
//           color: ${(props) => props.theme.colors.dark.text};
//           margin-bottom: 2px;
//           font-size: 15px;
//         }
        
//         .plate {
//           font-size: 12px;
//           color: ${(props) => props.theme.colors.supportive.coolGray};
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
//       }
//     }
//   }
  
//   .location-info {
//     display: flex;
//     flex-direction: column;
//     gap: ${(props) => props.theme.spacing.sm};
    
//     .location-row {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.sm};
//       font-size: 13px;
//       padding: 4px 0;
      
//       svg {
//         width: 14px;
//         height: 14px;
//         color: ${(props) => props.theme.colors.supportive.coolGray};
//         flex-shrink: 0;
//       }
      
//       .label {
//         color: ${(props) => props.theme.colors.supportive.coolGray};
//         min-width: 60px;
//         flex-shrink: 0;
//       }
      
//       .value {
//         color: ${(props) => props.theme.colors.dark.text};
//         font-weight: 500;
//         flex: 1;
//       }
//     }
//   }
  
//   ${(props) =>
//     props.isSelected &&
//     `
//     .vehicle-icon {
//       background: ${props.theme.colors.primary.neonCyan}30;
//       transform: scale(1.05);
//     }
//   `}
// `

// const VehicleTracking = () => {
//   const [selectedVehicle, setSelectedVehicle] = useState(null)
//   const [vehicles, setVehicles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isTracking, setIsTracking] = useState(false)

//   const DefaultIcon = L.icon({
//     iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//     shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
//   })
//   L.Marker.prototype.options.icon = DefaultIcon

//   useEffect(() => {
//     setTimeout(() => {
//       const mockVehicles = [
//         {
//           id: 1,
//           make: "Toyota",
//           model: "Camry",
//           year: 2022,
//           plate: "ABC-123",
//           color: "Silver",
//           status: "active",
//           location: {
//             address: "Okey Wali Estate, Port Harcourt",
//             coordinates: { lat: 4.8353, lng: 7.0134 }, // Okey Wali Estate area
//             lastUpdate: "2 minutes ago",
//             speed: "0 km/h",
//             battery: "98%",
//           },
//         },
//         {
//           id: 2,
//           make: "Honda",
//           model: "Civic",
//           year: 2021,
//           plate: "XYZ-789",
//           color: "Blue",
//           status: "moving",
//           location: {
//             address: "Okey Wali Estate, Port Harcourt",
//             coordinates: { lat: 4.8355, lng: 7.015 }, // close by, still inside estate
//             lastUpdate: "1 minute ago",
//             speed: "35 km/h",
//             battery: "87%",
//           },
//         },
//       ]
//       setVehicles(mockVehicles)
//       setSelectedVehicle(mockVehicles[0])
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const handleRefresh = () => {
//     setIsTracking(true)
//     setTimeout(() => {
//       setIsTracking(false)
//       setVehicles((prev) =>
//         prev.map((v) => ({
//           ...v,
//           location: {
//             ...v.location,
//             lastUpdate: "Just now",
//           },
//         })),
//       )
//     }, 2000)
//   }

//   if (loading) {
//     return (
//       <PageContainer>
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
//           <LoadingSpinner size="lg" text="Loading vehicle tracking..." />
//         </div>
//       </PageContainer>
//     )
//   }

//   return (
//     <PageContainer>
//       <PageHeader>
//         <div className="header-content">
//           <h1>Vehicle Tracking</h1>
//           <p>Real-time location monitoring for your registered vehicles</p>
//         </div>
//         <div className="header-actions">
//           <Button variant="secondary" onClick={() => window.history.back()} style={{ marginRight: "12px" }}>
//             <ArrowLeft style={{ width: "16px", height: "16px", marginRight: "8px" }} />
//             Back
//           </Button>
//           <Button variant="primary" onClick={handleRefresh} disabled={isTracking}>
//             <RefreshCw style={{ width: "16px", height: "16px", marginRight: "8px" }} />
//             {isTracking ? "Updating..." : "Refresh"}
//           </Button>
//         </div>
//       </PageHeader>

//       <TrackingContainer>
//         <MapContainer>
//           <LeafletMap
//             center={
//               selectedVehicle
//                 ? [selectedVehicle.location.coordinates.lat, selectedVehicle.location.coordinates.lng]
//                 : [4.8156, 7.0498] // fallback to Portharcourt
//             }
//             zoom={selectedVehicle ? 14 : 12}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {selectedVehicle && (
//               <Marker position={[selectedVehicle.location.coordinates.lat, selectedVehicle.location.coordinates.lng]}>
//                 <Popup>
//                   {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} <br />
//                   {selectedVehicle.plate}
//                 </Popup>
//               </Marker>
//             )}
//           </LeafletMap>

//           {selectedVehicle ? (
//             <div className="tracking-overlay">
//               <div className="tracking-info">
//                 <Navigation />
//                 Tracking: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
//               </div>
//             </div>
//           ) : (
//             <div className="map-placeholder">
//               <Map />
//               <h3>Interactive Map</h3>
//               <p>Click on a vehicle to see its live location in Portharcourt</p>
//             </div>
//           )}
//         </MapContainer>

//         <VehiclePanel>
//           {vehicles.map((vehicle) => (
//             <VehicleCard
//               key={vehicle.id}
//               isSelected={selectedVehicle?.id === vehicle.id}
//               onClick={() => setSelectedVehicle(vehicle)}
//             >
//               <div className="vehicle-header">
//                 <div className="vehicle-info">
//                   <div className="vehicle-icon">
//                     <Car />
//                   </div>
//                   <div className="details">
//                     <div className="name">
//                       {vehicle.year} {vehicle.make} {vehicle.model}
//                     </div>
//                     <div className="plate">{vehicle.plate}</div>
//                   </div>
//                 </div>
//                 <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
//               </div>

//               <div className="location-info">
//                 <div className="location-row">
//                   <MapPin />
//                   <span className="label">Location:</span>
//                   <span className="value">{vehicle.location.address}</span>
//                 </div>
//                 <div className="location-row">
//                   <Clock />
//                   <span className="label">Updated:</span>
//                   <span className="value">{vehicle.location.lastUpdate}</span>
//                 </div>
//                 <div className="location-row">
//                   <Navigation />
//                   <span className="label">Speed:</span>
//                   <span className="value">{vehicle.location.speed}</span>
//                 </div>
//                 <div className="location-row">
//                   <Battery />
//                   <span className="label">Battery:</span>
//                   <span className="value">{vehicle.location.battery}</span>
//                 </div>
//               </div>
//             </VehicleCard>
//           ))}
//         </VehiclePanel>
//       </TrackingContainer>
//     </PageContainer>
//   )
// }

// export default VehicleTracking















// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { Map, MapPin, Navigation, RefreshCw, Car, Clock, Battery } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"
// import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet"
// import "leaflet/dist/leaflet.css"
// import L from "leaflet"



// const PageContainer = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: clamp(16px, 4vw, 32px);
//   min-height: calc(100vh - 140px);
  
//   @media (max-width: 768px) {
//     padding: 16px;
//   }
// `

// const PageHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: clamp(24px, 5vw, 40px);
//   gap: 20px;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: stretch;
//     gap: 16px;
//   }
  
//   .header-content {
//     h1 {
//       font-size: clamp(24px, 4vw, 32px);
//       font-weight: 700;
//       color: #ECEFF1;
//       margin-bottom: 8px;
//       line-height: 1.2;
//     }
    
//     p {
//       color: #90A4AE;
//       font-size: 16px;
//       line-height: 1.5;
//     }
//   }
  
//   .header-actions {
//     @media (max-width: 768px) {
//       align-self: flex-start;
//     }
//   }
// `

// const TrackingContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 380px;
//   gap: clamp(20px, 3vw, 32px);
//   height: calc(100vh - 280px);
//   min-height: 600px;
  
//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr;
//     height: auto;
//     min-height: auto;
//   }
// `

// const MapContainer = styled.div`
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.deepBlue} 0%, #1a2332 100%);
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   border: 1px solid ${(props) => props.theme.colors.primary.neonCyan}30;
//   position: relative;
//   overflow: hidden;
//   min-height: 500px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
//   .map-placeholder {
//     text-align: center;
//     color: ${(props) => props.theme.colors.supportive.coolGray};
    
//     svg {
//       width: 64px;
//       height: 64px;
//       margin-bottom: ${(props) => props.theme.spacing.lg};
//       color: ${(props) => props.theme.colors.primary.neonCyan};
//     }
    
//     h3 {
//       font-size: 18px;
//       margin-bottom: ${(props) => props.theme.spacing.sm};
//       color: ${(props) => props.theme.colors.dark.text};
//     }
    
//     p {
//       font-size: 14px;
//       color: ${(props) => props.theme.colors.supportive.coolGray};
//     }
//   }
  
//   .tracking-overlay {
//     position: absolute;
//     top: ${(props) => props.theme.spacing.lg};
//     left: ${(props) => props.theme.spacing.lg};
//     background: ${(props) => props.theme.colors.dark.surface}95;
//     backdrop-filter: blur(10px);
//     padding: ${(props) => props.theme.spacing.md};
//     border-radius: ${(props) => props.theme.borderRadius.md};
//     border: 1px solid ${(props) => props.theme.colors.primary.neonCyan}30;
//     box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    
//     .tracking-info {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.sm};
//       color: ${(props) => props.theme.colors.dark.text};
//       font-size: 14px;
//       font-weight: 600;
      
//       svg {
//         width: 16px;
//         height: 16px;
//         color: ${(props) => props.theme.colors.primary.neonCyan};
//       }
//     }
//   }
// `

// const VehiclePanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.lg};
//   max-height: calc(100vh - 280px);
//   overflow-y: auto;
//   padding-right: 8px;
  
//   &::-webkit-scrollbar {
//     width: 6px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: ${(props) => props.theme.colors.dark.surface};
//     border-radius: 3px;
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: ${(props) => props.theme.colors.primary.neonCyan}40;
//     border-radius: 3px;
    
//     &:hover {
//       background: ${(props) => props.theme.colors.primary.neonCyan}60;
//     }
//   }
  
//   @media (max-width: 1024px) {
//     grid-row: 1;
//     max-height: none;
//     overflow-y: visible;
//     padding-right: 0;
//   }
// `

// const VehicleCard = styled(Card)`
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.fast};
//   border: 2px solid ${(props) => (props.isSelected ? props.theme.colors.primary.neonCyan : "transparent")};
//   box-shadow: ${(props) =>
//     props.isSelected ? `0 8px 32px ${props.theme.colors.primary.neonCyan}20` : "0 4px 16px rgba(0, 0, 0, 0.2)"};
  
//   &:hover {
//     border-color: ${(props) => props.theme.colors.primary.neonCyan}60;
//     transform: translateY(-4px);
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
//   }
  
//   .vehicle-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: ${(props) => props.theme.spacing.md};
    
//     .vehicle-info {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.md};
      
//       .vehicle-icon {
//         width: 40px;
//         height: 40px;
//         border-radius: ${(props) => props.theme.borderRadius.md};
//         background: ${(props) => props.theme.colors.primary.neonCyan}20;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         transition: all ${(props) => props.theme.transitions.fast};
        
//         svg {
//           width: 20px;
//           height: 20px;
//           color: ${(props) => props.theme.colors.primary.neonCyan};
//         }
//       }
      
//       .details {
//         .name {
//           font-weight: 600;
//           color: ${(props) => props.theme.colors.dark.text};
//           margin-bottom: 2px;
//           font-size: 15px;
//         }
        
//         .plate {
//           font-size: 12px;
//           color: ${(props) => props.theme.colors.supportive.coolGray};
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
//       }
//     }
//   }
  
//   .location-info {
//     display: flex;
//     flex-direction: column;
//     gap: ${(props) => props.theme.spacing.sm};
    
//     .location-row {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.sm};
//       font-size: 13px;
//       padding: 4px 0;
      
//       svg {
//         width: 14px;
//         height: 14px;
//         color: ${(props) => props.theme.colors.supportive.coolGray};
//         flex-shrink: 0;
//       }
      
//       .label {
//         color: ${(props) => props.theme.colors.supportive.coolGray};
//         min-width: 60px;
//         flex-shrink: 0;
//       }
      
//       .value {
//         color: ${(props) => props.theme.colors.dark.text};
//         font-weight: 500;
//         flex: 1;
//       }
//     }
//   }
  
//   ${(props) =>
//     props.isSelected &&
//     `
//     .vehicle-icon {
//       background: ${props.theme.colors.primary.neonCyan}30;
//       transform: scale(1.05);
//     }
//   `}
// `


// const VehicleTracking = () => {
//   const [selectedVehicle, setSelectedVehicle] = useState(null)
//   const [vehicles, setVehicles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isTracking, setIsTracking] = useState(false)


//   const DefaultIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// })
// L.Marker.prototype.options.icon = DefaultIcon


//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     const mockVehicles = [
//   //       {
//   //         id: 1,
//   //         make: "Toyota",
//   //         model: "Camry",
//   //         year: 2022,
//   //         plate: "ABC-123",
//   //         color: "Silver",
//   //         status: "active",
//   //         location: {
//   //           address: "123 Main St, Downtown",
//   //           coordinates: { lat: 40.7128, lng: -74.006 },
//   //           lastUpdate: "2 minutes ago",
//   //           speed: "0 mph",
//   //           battery: "98%",
//   //         },
//   //       },
//   //       {
//   //         id: 2,
//   //         make: "Honda",
//   //         model: "Civic",
//   //         year: 2021,
//   //         plate: "XYZ-789",
//   //         color: "Blue",
//   //         status: "moving",
//   //         location: {
//   //           address: "456 Oak Ave, Midtown",
//   //           coordinates: { lat: 40.7589, lng: -73.9851 },
//   //           lastUpdate: "1 minute ago",
//   //           speed: "35 mph",
//   //           battery: "87%",
//   //         },
//   //       },
//   //     ]
//   //     setVehicles(mockVehicles)
//   //     setSelectedVehicle(mockVehicles[0])
//   //     setLoading(false)
//   //   }, 1000)
//   // }, [])

//   useEffect(() => {
//   setTimeout(() => {
//     const mockVehicles = [
//       {
//         id: 1,
//         make: "Toyota",
//         model: "Camry",
//         year: 2022,
//         plate: "ABC-123",
//         color: "Silver",
//         status: "active",
//         location: {
//           address: "Okey Wali Estate, Port Harcourt",
//           coordinates: { lat: 4.8353, lng: 7.0134 }, // Okey Wali Estate area
//           lastUpdate: "2 minutes ago",
//           speed: "0 km/h",
//           battery: "98%",
//         },
//       },
//       {
//         id: 2,
//         make: "Honda",
//         model: "Civic",
//         year: 2021,
//         plate: "XYZ-789",
//         color: "Blue",
//         status: "moving",
//         location: {
//           address: "Okey Wali Estate, Port Harcourt",
//           coordinates: { lat: 4.8355, lng: 7.0150 }, // close by, still inside estate
//           lastUpdate: "1 minute ago",
//           speed: "35 km/h",
//           battery: "87%",
//         },
//       },
//     ]
//     setVehicles(mockVehicles)
//     setSelectedVehicle(mockVehicles[0])
//     setLoading(false)
//   }, 1000)
// }, [])


//   const handleRefresh = () => {
//     setIsTracking(true)
//     setTimeout(() => {
//       setIsTracking(false)
//       setVehicles((prev) =>
//         prev.map((v) => ({
//           ...v,
//           location: {
//             ...v.location,
//             lastUpdate: "Just now",
//           },
//         })),
//       )
//     }, 2000)
//   }

//   if (loading) {
//     return (
//       <PageContainer>
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
//           <LoadingSpinner size="lg" text="Loading vehicle tracking..." />
//         </div>
//       </PageContainer>
//     )
//   }

//   return (
//     <PageContainer>
//       <PageHeader>
//         <div className="header-content">
//           <h1>Vehicle Tracking</h1>
//           <p>Real-time location monitoring for your registered vehicles</p>
//         </div>
//         <div className="header-actions">
//           <Button variant="primary" onClick={handleRefresh} disabled={isTracking}>
//             <RefreshCw style={{ width: "16px", height: "16px", marginRight: "8px" }} />
//             {isTracking ? "Updating..." : "Refresh"}
//           </Button>
//         </div>
//       </PageHeader>

//       <TrackingContainer>
//         {/* <MapContainer>
//           <div className="map-placeholder">
//             <Map />
//             <h3>Interactive Map</h3>
//             <p>Real-time vehicle locations will be displayed here</p>
//           </div>

//           {selectedVehicle && (
//             <div className="tracking-overlay">
//               <div className="tracking-info">
//                 <Navigation />
//                 Tracking: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
//               </div>
//             </div>
//           )}
//         </MapContainer> */}

//         <MapContainer>
//   <LeafletMap
//     center={
//       selectedVehicle
//         ? [selectedVehicle.location.coordinates.lat, selectedVehicle.location.coordinates.lng]
//         : [4.8156, 7.0498] // fallback to Portharcourt
//     }
//     zoom={selectedVehicle ? 14 : 12}
//     style={{ height: "100%", width: "100%" }}
//   >
//     <TileLayer
//       attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />

//     {selectedVehicle && (
//       <Marker
//         position={[
//           selectedVehicle.location.coordinates.lat,
//           selectedVehicle.location.coordinates.lng,
//         ]}
//       >
//         <Popup>
//           {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} <br />
//           {selectedVehicle.plate}
//         </Popup>
//       </Marker>
//     )}
//   </LeafletMap>

//   {selectedVehicle ? (
//     <div className="tracking-overlay">
//       <div className="tracking-info">
//         <Navigation />
//         Tracking: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
//       </div>
//     </div>
//   ) : (
//     <div className="map-placeholder">
//       <Map />
//       <h3>Interactive Map</h3>
//       <p>Click on a vehicle to see its live location in Portharcourt</p>
//     </div>
//   )}
// </MapContainer>

//         <VehiclePanel>
//           {vehicles.map((vehicle) => (
//             <VehicleCard
//               key={vehicle.id}
//               isSelected={selectedVehicle?.id === vehicle.id}
//               onClick={() => setSelectedVehicle(vehicle)}
//             >
//               <div className="vehicle-header">
//                 <div className="vehicle-info">
//                   <div className="vehicle-icon">
//                     <Car />
//                   </div>
//                   <div className="details">
//                     <div className="name">
//                       {vehicle.year} {vehicle.make} {vehicle.model}
//                     </div>
//                     <div className="plate">{vehicle.plate}</div>
//                   </div>
//                 </div>
//                 <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
//               </div>

//               <div className="location-info">
//                 <div className="location-row">
//                   <MapPin />
//                   <span className="label">Location:</span>
//                   <span className="value">{vehicle.location.address}</span>
//                 </div>
//                 <div className="location-row">
//                   <Clock />
//                   <span className="label">Updated:</span>
//                   <span className="value">{vehicle.location.lastUpdate}</span>
//                 </div>
//                 <div className="location-row">
//                   <Navigation />
//                   <span className="label">Speed:</span>
//                   <span className="value">{vehicle.location.speed}</span>
//                 </div>
//                 <div className="location-row">
//                   <Battery />
//                   <span className="label">Battery:</span>
//                   <span className="value">{vehicle.location.battery}</span>
//                 </div>
//               </div>
//             </VehicleCard>
//           ))}
//         </VehiclePanel>
//       </TrackingContainer>
//     </PageContainer>
//   )
// }

// export default VehicleTracking