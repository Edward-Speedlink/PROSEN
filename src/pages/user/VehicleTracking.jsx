"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Map, MapPin, Navigation, RefreshCw, Car, Clock, Battery } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"

const TrackingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${(props) => props.theme.spacing.xl};
  height: calc(100vh - 200px);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
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
  
  @media (max-width: 1024px) {
    grid-row: 1;
  }
`

const VehicleCard = styled(Card)`
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  border: 2px solid ${(props) => (props.isSelected ? props.theme.colors.primary.neonCyan : "transparent")};
  
  &:hover {
    border-color: ${(props) => props.theme.colors.primary.neonCyan}60;
    transform: translateY(-2px);
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
      
      svg {
        width: 14px;
        height: 14px;
        color: ${(props) => props.theme.colors.supportive.coolGray};
      }
      
      .label {
        color: ${(props) => props.theme.colors.supportive.coolGray};
        min-width: 60px;
      }
      
      .value {
        color: ${(props) => props.theme.colors.dark.text};
        font-weight: 500;
      }
    }
  }
`

const VehicleTracking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    // Simulate loading vehicle data
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
            address: "123 Main St, Downtown",
            coordinates: { lat: 40.7128, lng: -74.006 },
            lastUpdate: "2 minutes ago",
            speed: "0 mph",
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
            address: "456 Oak Ave, Midtown",
            coordinates: { lat: 40.7589, lng: -73.9851 },
            lastUpdate: "1 minute ago",
            speed: "35 mph",
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
      // Update last update time
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <LoadingSpinner size="lg" text="Loading vehicle tracking..." />
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#ECEFF1", marginBottom: "8px" }}>
            Vehicle Tracking
          </h1>
          <p style={{ color: "#90A4AE" }}>Real-time location monitoring for your registered vehicles</p>
        </div>
        <Button variant="primary" onClick={handleRefresh} disabled={isTracking}>
          <RefreshCw style={{ width: "16px", height: "16px", marginRight: "8px" }} />
          {isTracking ? "Updating..." : "Refresh"}
        </Button>
      </div>

      <TrackingContainer>
        <MapContainer>
          <div className="map-placeholder">
            <Map />
            <h3>Interactive Map</h3>
            <p>Real-time vehicle locations will be displayed here</p>
          </div>

          {selectedVehicle && (
            <div className="tracking-overlay">
              <div className="tracking-info">
                <Navigation />
                Tracking: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </div>
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
    </div>
  )
}

export default VehicleTracking
