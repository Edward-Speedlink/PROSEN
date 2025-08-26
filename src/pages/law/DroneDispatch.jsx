"use client"

import { useState } from "react"
import styled from "styled-components"
import { Bone as Drone, MapPin, Battery, Signal, Play, Pause, RotateCcw, Camera, Navigation } from "lucide-react"

const DroneDispatchContainer = styled.div`
  padding: clamp(16px, 4vw, 32px);
  max-width: 1400px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: clamp(24px, 5vw, 48px);
`

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.dark.textSecondary};
  font-size: clamp(14px, 2.5vw, 16px);
  font-family: ${(props) => props.theme.fonts.body};
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: clamp(16px, 3vw, 24px);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const MapContainer = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  min-height: 600px;
  position: relative;
`

const MapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`

const MapTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(16px, 3vw, 18px);
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const MapPlaceholder = styled.div`
  width: 100%;
  height: 500px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid rgba(0, 229, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const DroneMarker = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.primary.neonCyan};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary.darkNavy};
  font-weight: bold;
  font-size: 12px;
  animation: pulse 2s infinite;
  cursor: pointer;
  
  ${(props) =>
    props.position &&
    `
    top: ${props.position.top}%;
    left: ${props.position.left}%;
  `}

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  &:hover {
    transform: scale(1.2);
  }
`

const ControlPanel = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  max-height: 800px;
  overflow-y: auto;
`

const DroneList = styled.div`
  margin-bottom: 24px;
`

const DroneCard = styled.div`
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 16px;
  border: 1px solid ${(props) => (props.active ? props.theme.colors.primary.neonCyan : "rgba(0, 229, 255, 0.1)")};
  margin-bottom: 12px;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateY(-2px);
  }
`

const DroneHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const DroneName = styled.div`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DroneStatus = styled.div`
  padding: 4px 8px;
  background: ${(props) => {
    switch (props.status) {
      case "active":
        return "rgba(6, 214, 160, 0.2)"
      case "standby":
        return "rgba(255, 183, 3, 0.2)"
      case "maintenance":
        return "rgba(255, 23, 68, 0.2)"
      default:
        return "rgba(144, 164, 174, 0.2)"
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "active":
        return props.theme.colors.supportive.teal
      case "standby":
        return props.theme.colors.secondary.amber
      case "maintenance":
        return props.theme.colors.secondary.red
      default:
        return props.theme.colors.supportive.coolGray
    }
  }};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DroneStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.dark.textSecondary};
`

const StatValue = styled.span`
  color: ${(props) => props.theme.colors.dark.text};
  font-weight: 600;
`

const DroneControls = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const ControlButton = styled.button`
  padding: 6px 12px;
  background: ${(props) => (props.primary ? props.theme.colors.primary.neonCyan : "transparent")};
  color: ${(props) => (props.primary ? props.theme.colors.primary.darkNavy : props.theme.colors.dark.text)};
  border: 1px solid ${(props) => (props.primary ? props.theme.colors.primary.neonCyan : "rgba(0, 229, 255, 0.2)")};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
    background: ${(props) => (props.primary ? props.theme.colors.primary.neonCyan : "rgba(0, 229, 255, 0.1)")};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`

const MissionPanel = styled.div`
  border-top: 1px solid rgba(0, 229, 255, 0.1);
  padding-top: 20px;
`

const MissionTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`

const MissionInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: ${(props) => props.theme.borderRadius.sm};
  color: ${(props) => props.theme.colors.dark.text};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 12px;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.dark.textSecondary};
  }
`

const DroneDispatch = () => {
  const [selectedDrone, setSelectedDrone] = useState(null)
  const [missionCoords, setMissionCoords] = useState("")
  const [drones] = useState([
    {
      id: 1,
      name: "Alpha-01",
      status: "active",
      battery: 87,
      signal: 95,
      altitude: 150,
      speed: 25,
      position: { top: 20, left: 30 },
    },
    {
      id: 2,
      name: "Bravo-02",
      status: "standby",
      battery: 92,
      signal: 88,
      altitude: 0,
      speed: 0,
      position: { top: 60, left: 70 },
    },
    {
      id: 3,
      name: "Charlie-03",
      status: "active",
      battery: 45,
      signal: 76,
      altitude: 200,
      speed: 18,
      position: { top: 40, left: 50 },
    },
    {
      id: 4,
      name: "Delta-04",
      status: "maintenance",
      battery: 0,
      signal: 0,
      altitude: 0,
      speed: 0,
      position: null,
    },
  ])

  const handleDroneSelect = (drone) => {
    setSelectedDrone(drone)
  }

  const handleDroneControl = (action, droneId) => {
    console.log(`[PROSEN] Drone ${droneId} - ${action}`)
    // Add drone control functionality here
  }

  const handleMissionDispatch = () => {
    if (selectedDrone && missionCoords) {
      console.log(`[PROSEN] Dispatching ${selectedDrone.name} to ${missionCoords}`)
      // Add mission dispatch functionality here
    }
  }

  return (
    <DroneDispatchContainer>
      <Header>
        <Title>Drone Dispatch Center</Title>
        <Subtitle>Command and control aerial surveillance units</Subtitle>
      </Header>

      <MainGrid>
        <MapContainer>
          <MapHeader>
            <MapTitle>Operational Area Map</MapTitle>
            <div style={{ fontSize: "12px", color: "#90A4AE" }}>
              Active Drones: {drones.filter((d) => d.status === "active").length} / {drones.length}
            </div>
          </MapHeader>

          <MapPlaceholder>
            <div style={{ color: "rgba(0, 229, 255, 0.3)", textAlign: "center" }}>
              <MapPin size={48} />
              <div style={{ marginTop: "12px", fontSize: "14px" }}>Interactive Map View</div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>Click drone markers for details</div>
            </div>

            {drones
              .filter((drone) => drone.position)
              .map((drone) => (
                <DroneMarker key={drone.id} position={drone.position} onClick={() => handleDroneSelect(drone)}>
                  {drone.id}
                </DroneMarker>
              ))}
          </MapPlaceholder>
        </MapContainer>

        <ControlPanel>
          <DroneList>
            <MissionTitle>Fleet Status</MissionTitle>
            {drones.map((drone) => (
              <DroneCard
                key={drone.id}
                active={selectedDrone?.id === drone.id}
                onClick={() => handleDroneSelect(drone)}
              >
                <DroneHeader>
                  <DroneName>{drone.name}</DroneName>
                  <DroneStatus status={drone.status}>{drone.status}</DroneStatus>
                </DroneHeader>

                <DroneStats>
                  <StatItem>
                    <Battery size={12} />
                    <StatValue>{drone.battery}%</StatValue>
                  </StatItem>
                  <StatItem>
                    <Signal size={12} />
                    <StatValue>{drone.signal}%</StatValue>
                  </StatItem>
                  <StatItem>
                    <Navigation size={12} />
                    <StatValue>{drone.altitude}m</StatValue>
                  </StatItem>
                  <StatItem>
                    <Drone size={12} />
                    <StatValue>{drone.speed} km/h</StatValue>
                  </StatItem>
                </DroneStats>

                <DroneControls>
                  {drone.status === "active" ? (
                    <>
                      <ControlButton onClick={() => handleDroneControl("pause", drone.id)}>
                        <Pause size={12} />
                        Pause
                      </ControlButton>
                      <ControlButton onClick={() => handleDroneControl("return", drone.id)}>
                        <RotateCcw size={12} />
                        Return
                      </ControlButton>
                    </>
                  ) : drone.status === "standby" ? (
                    <ControlButton primary onClick={() => handleDroneControl("deploy", drone.id)}>
                      <Play size={12} />
                      Deploy
                    </ControlButton>
                  ) : null}
                  <ControlButton onClick={() => handleDroneControl("camera", drone.id)}>
                    <Camera size={12} />
                    Camera
                  </ControlButton>
                </DroneControls>
              </DroneCard>
            ))}
          </DroneList>

          {selectedDrone && (
            <MissionPanel>
              <MissionTitle>Mission Control</MissionTitle>
              <MissionInput
                type="text"
                placeholder="Enter coordinates or address..."
                value={missionCoords}
                onChange={(e) => setMissionCoords(e.target.value)}
              />
              <ControlButton primary onClick={handleMissionDispatch}>
                <Navigation size={12} />
                Dispatch Mission
              </ControlButton>
            </MissionPanel>
          )}
        </ControlPanel>
      </MainGrid>
    </DroneDispatchContainer>
  )
}

export default DroneDispatch
