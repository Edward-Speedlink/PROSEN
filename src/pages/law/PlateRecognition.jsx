"use client"

import { useState } from "react"
import styled from "styled-components"
import { Camera, Search, Car, AlertTriangle, CheckCircle, Filter, ArrowLeft, Plus, X } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const PlateRecognitionContainer = styled.div`
  padding: clamp(16px, 4vw, 32px);
  max-width: 1400px;
  margin: 0 auto;
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(24px, 5vw, 48px);
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(0, 229, 255, 0.2);
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 6px;
  color: rgba(0, 229, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 229, 255, 0.1);
    border-color: rgba(0, 229, 255, 0.5);
    color: #00E5FF;
  }
`

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: ${(props) => props.theme.colors.dark.text};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.dark.textSecondary};
  font-size: clamp(14px, 2.5vw, 16px);
  font-family: ${(props) => props.theme.fonts.body};
  margin: 4px 0 0 0;
`

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(16px, 3vw, 24px);
  margin-bottom: clamp(24px, 5vw, 32px);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ControlCard = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

const CardIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}20, ${(props) => props.theme.colors.primary.neonCyan}10);
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary.neonCyan};
`

const CardTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.dark.text};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  transition: all ${(props) => props.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
    box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.1);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.dark.textSecondary};
  }
`

const PlateInput = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`

const AddPlateButton = styled.button`
  padding: 8px 16px;
  background: ${(props) => props.theme.colors.primary.neonCyan};
  color: ${(props) => props.theme.colors.primary.darkNavy};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: rgba(0, 229, 255, 0.8);
  }
`

const WatchedPlatesList = styled.div`
  max-height: 120px;
  overflow-y: auto;
`

const WatchedPlateItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  margin-bottom: 6px;
  font-size: 13px;
  color: ${(props) => props.theme.colors.dark.text};
  
  .plate-number {
    font-weight: 600;
    font-family: monospace;
    letter-spacing: 1px;
  }
  
  .remove-button {
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.secondary.red};
    cursor: pointer;
    padding: 2px;
    
    &:hover {
      color: #ff4757;
    }
  }
`

const FilterButton = styled.button`
  padding: 8px 16px;
  background: ${(props) => (props.active ? props.theme.colors.primary.neonCyan : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.primary.darkNavy : props.theme.colors.dark.text)};
  border: 1px solid ${(props) => (props.active ? props.theme.colors.primary.neonCyan : "rgba(0, 229, 255, 0.2)")};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  margin-right: 8px;
  margin-bottom: 8px;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
  }
`

const CameraSelector = styled.div`
  .camera-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    margin-top: 12px;
  }
  
  .camera-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: ${(props) => props.theme.colors.primary.darkNavy};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    font-size: 12px;
    cursor: pointer;
    transition: all ${(props) => props.theme.transitions.fast};
    
    &:hover {
      background: rgba(0, 229, 255, 0.1);
    }
    
    input[type="checkbox"] {
      accent-color: ${(props) => props.theme.colors.primary.neonCyan};
    }
  }
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: clamp(16px, 3vw, 24px);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const RecognitionFeed = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  min-height: 600px;
`

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`

const FeedTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(16px, 3vw, 18px);
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: ${(props) => (props.active ? "rgba(6, 214, 160, 0.1)" : "rgba(255, 23, 68, 0.1)")};
  border: 1px solid ${(props) => (props.active ? props.theme.colors.supportive.teal : props.theme.colors.secondary.red)};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.active ? props.theme.colors.supportive.teal : props.theme.colors.secondary.red)};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const CameraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CameraFeed = styled.div`
  aspect-ratio: 16/9;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid rgba(0, 229, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CameraLabel = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: ${(props) => props.theme.colors.dark.text};
  padding: 4px 8px;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DetectionOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 193, 7, 0.1);
  border: 2px solid ${(props) => props.theme.colors.secondary.amber};
  border-radius: ${(props) => props.theme.borderRadius.md};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  .detection-text {
    color: ${(props) => props.theme.colors.secondary.amber};
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
`

const MatchesSidebar = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  max-height: 800px;
  overflow-y: auto;
`

const MatchItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid rgba(0, 229, 255, 0.1);
  margin-bottom: 12px;
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateX(4px);
  }
`

const MatchAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.supportive.coolGray};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.dark.text};
  font-family: monospace;
  font-size: 10px;
  font-weight: bold;
`

const MatchInfo = styled.div`
  flex: 1;
`

const MatchPlate = styled.div`
  font-family: monospace;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 4px;
  letter-spacing: 1px;
`

const MatchDetails = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.dark.textSecondary};
`

const ConfidenceScore = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) =>
    props.confidence > 80
      ? props.theme.colors.supportive.teal
      : props.confidence > 60
        ? props.theme.colors.secondary.amber
        : props.theme.colors.secondary.red};
`

const MapWrapper = styled.div`
  margin-top: 24px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  border-radius: ${(props) => props.theme.borderRadius.lg};
  overflow: hidden;

  .leaflet-container {
    width: 100%;
    height: 300px;
  }
`

const PlateRecognition = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [newPlate, setNewPlate] = useState("")
  const [watchedPlates, setWatchedPlates] = useState(["ABC-123", "XYZ-789", "DEF-456"])
  const [selectedCameras, setSelectedCameras] = useState(new Set([1, 2, 3]))
  const [activeFilter, setActiveFilter] = useState("all")
  const [isScanning, setIsScanning] = useState(true)
  const [matches, setMatches] = useState([
    { id: 1, plate: "ABC-123", confidence: 95, status: "wanted", lastSeen: "2 min ago", camera: "Camera 1" },
    { id: 2, plate: "XYZ-789", confidence: 87, status: "stolen", lastSeen: "5 min ago", camera: "Camera 3" },
    {
      id: 3,
      plate: "DEF-456",
      confidence: 72,
      status: "person of interest",
      lastSeen: "8 min ago",
      camera: "Camera 2",
    },
    { id: 4, plate: "GHI-321", confidence: 65, status: "unregistered", lastSeen: "12 min ago", camera: "Camera 4" },
  ])

  const cameras = [
    { id: 1, name: "Camera 1", streamUrl: "/traffic-camera-view-with-cars.jpg" },
    { id: 2, name: "Camera 2", streamUrl: "/highway-surveillance-camera.jpg" },
    { id: 3, name: "Camera 3", streamUrl: "/parking-lot-security-camera.png" },
    { id: 4, name: "Camera 4", streamUrl: "/intersection-traffic-camera.jpg" },
    { id: 5, name: "Camera 5", streamUrl: "/toll-booth-camera-view.jpg" },
    { id: 6, name: "Camera 6", streamUrl: "/bridge-traffic-monitoring.jpg" },
  ]

  const filters = ["all", "wanted", "stolen", "person of interest", "unregistered"]

  const addPlate = () => {
    if (newPlate.trim() && !watchedPlates.includes(newPlate.trim().toUpperCase())) {
      setWatchedPlates([...watchedPlates, newPlate.trim().toUpperCase()])
      setNewPlate("")
    }
  }

  const removePlate = (plate) => {
    setWatchedPlates(watchedPlates.filter((p) => p !== plate))
  }

  const toggleCamera = (cameraId) => {
    const newSelected = new Set(selectedCameras)
    if (newSelected.has(cameraId)) {
      newSelected.delete(cameraId)
    } else {
      newSelected.add(cameraId)
    }
    setSelectedCameras(newSelected)
  }

  const filteredMatches = matches
    .filter((match) => activeFilter === "all" || match.status === activeFilter)
    .filter((match) => match.plate.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleBack = () => {
    // Navigate back to dashboard or previous page
    if (onNavigate) {
      onNavigate("dashboard")
    }
  }

  return (
    <PlateRecognitionContainer>
      <PageHeader>
        <div className="header-left">
          <BackButton onClick={handleBack}>
            <ArrowLeft size={16} />
          </BackButton>
          <div>
            <Title>License Plate Recognition</Title>
            <Subtitle>Real-time license plate detection and tracking</Subtitle>
          </div>
        </div>
      </PageHeader>

      <ControlPanel>
        <ControlCard>
          <CardHeader>
            <CardIcon>
              <Search size={18} />
            </CardIcon>
            <CardTitle>Search Plates</CardTitle>
          </CardHeader>
          <SearchInput
            type="text"
            placeholder="Search by plate number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </ControlCard>

        <ControlCard>
          <CardHeader>
            <CardIcon>
              <Car size={18} />
            </CardIcon>
            <CardTitle>Watch List</CardTitle>
          </CardHeader>
          <PlateInput>
            <SearchInput
              type="text"
              placeholder="Enter plate number..."
              value={newPlate}
              onChange={(e) => setNewPlate(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === "Enter" && addPlate()}
            />
            <AddPlateButton onClick={addPlate}>
              <Plus size={14} />
              Add
            </AddPlateButton>
          </PlateInput>
          <WatchedPlatesList>
            {watchedPlates.map((plate) => (
              <WatchedPlateItem key={plate}>
                <span className="plate-number">{plate}</span>
                <button className="remove-button" onClick={() => removePlate(plate)}>
                  <X size={14} />
                </button>
              </WatchedPlateItem>
            ))}
          </WatchedPlatesList>
        </ControlCard>

        <ControlCard>
          <CardHeader>
            <CardIcon>
              <Camera size={18} />
            </CardIcon>
            <CardTitle>Camera Selection</CardTitle>
          </CardHeader>
          <CameraSelector>
            <div className="camera-grid">
              {cameras.map((camera) => (
                <label key={camera.id} className="camera-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCameras.has(camera.id)}
                    onChange={() => toggleCamera(camera.id)}
                  />
                  <span>{camera.name}</span>
                </label>
              ))}
            </div>
          </CameraSelector>
        </ControlCard>

        <ControlCard>
          <CardHeader>
            <CardIcon>
              <Filter size={18} />
            </CardIcon>
            <CardTitle>Filter Results</CardTitle>
          </CardHeader>
          <div>
            {filters.map((filter) => (
              <FilterButton key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                {filter.replace("_", " ")}
              </FilterButton>
            ))}
          </div>
        </ControlCard>
      </ControlPanel>

      <MainContent>
        <RecognitionFeed>
          <FeedHeader>
            <FeedTitle>Active Camera Feeds</FeedTitle>
            <StatusIndicator active={isScanning}>
              {isScanning ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
              {isScanning ? "Scanning Active" : "System Offline"}
            </StatusIndicator>
          </FeedHeader>

          <CameraGrid>
            {cameras
              .filter((camera) => selectedCameras.has(camera.id))
              .map((camera) => (
                <CameraFeed key={camera.id}>
                  <CameraLabel>{camera.name}</CameraLabel>
                  <img src={camera.streamUrl || "/placeholder.svg"} alt={camera.name} />
                  {camera.id <= 3 && (
                    <DetectionOverlay>
                      <div className="detection-text">
                        PLATE DETECTED
                        <br />
                        {watchedPlates[camera.id - 1] || "ABC-123"}
                      </div>
                    </DetectionOverlay>
                  )}
                </CameraFeed>
              ))}
          </CameraGrid>

          <MapWrapper>
            <MapContainer center={[4.8156, 7.0498]} zoom={12} scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[4.8156, 7.0498]}>
                <Popup>Detection Point 1</Popup>
              </Marker>
              <Marker position={[4.8256, 7.0598]}>
                <Popup>Detection Point 2</Popup>
              </Marker>
            </MapContainer>
          </MapWrapper>
        </RecognitionFeed>

        <MatchesSidebar>
          <CardHeader>
            <CardIcon>
              <Car size={18} />
            </CardIcon>
            <CardTitle>Recent Detections ({filteredMatches.length})</CardTitle>
          </CardHeader>

          {filteredMatches.map((match) => (
            <MatchItem key={match.id}>
              <MatchAvatar>{match.plate.substring(0, 3)}</MatchAvatar>
              <MatchInfo>
                <MatchPlate>{match.plate}</MatchPlate>
                <MatchDetails>
                  {match.status} • {match.lastSeen} • {match.camera}
                </MatchDetails>
              </MatchInfo>
              <ConfidenceScore confidence={match.confidence}>{match.confidence}%</ConfidenceScore>
            </MatchItem>
          ))}
        </MatchesSidebar>
      </MainContent>
    </PlateRecognitionContainer>
  )
}

export default PlateRecognition















// "use client"

// import { useState } from "react"
// import styled from "styled-components"
// import { Camera, Search, Car, AlertTriangle, CheckCircle, Filter, ArrowLeft, Plus, X } from "lucide-react"
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
// import "leaflet/dist/leaflet.css"

// const PlateRecognitionContainer = styled.div`
//   padding: clamp(16px, 4vw, 32px);
//   max-width: 1400px;
//   margin: 0 auto;
// `

// const PageHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: clamp(24px, 5vw, 48px);
//   padding-bottom: 16px;
//   border-bottom: 2px solid rgba(0, 229, 255, 0.2);
  
//   .header-left {
//     display: flex;
//     align-items: center;
//     gap: 16px;
//   }
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 16px;
//   }
// `

// const BackButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 8px 12px;
//   background: transparent;
//   border: 1px solid rgba(0, 229, 255, 0.3);
//   border-radius: 6px;
//   color: rgba(0, 229, 255, 0.8);
//   font-size: 14px;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background: rgba(0, 229, 255, 0.1);
//     border-color: rgba(0, 229, 255, 0.5);
//     color: #00E5FF;
//   }
// `

// const Title = styled.h1`
//   font-family: ${(props) => props.theme.fonts.heading};
//   font-size: clamp(24px, 4vw, 32px);
//   font-weight: 700;
//   color: ${(props) => props.theme.colors.dark.text};
//   margin: 0;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const Subtitle = styled.p`
//   color: ${(props) => props.theme.colors.dark.textSecondary};
//   font-size: clamp(14px, 2.5vw, 16px);
//   font-family: ${(props) => props.theme.fonts.body};
//   margin: 4px 0 0 0;
// `

// const ControlPanel = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: clamp(16px, 3vw, 24px);
//   margin-bottom: clamp(24px, 5vw, 32px);
  
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `

// const ControlCard = styled.div`
//   background: ${(props) => props.theme.colors.dark.surface};
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   padding: clamp(16px, 3vw, 24px);
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   transition: all ${(props) => props.theme.transitions.normal};

//   &:hover {
//     border-color: rgba(0, 229, 255, 0.3);
//   }
// `

// const CardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   margin-bottom: 16px;
// `

// const CardIcon = styled.div`
//   width: 36px;
//   height: 36px;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}20, ${(props) => props.theme.colors.primary.neonCyan}10);
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${(props) => props.theme.colors.primary.neonCyan};
// `

// const CardTitle = styled.h3`
//   font-family: ${(props) => props.theme.fonts.heading};
//   font-size: clamp(14px, 2.5vw, 16px);
//   font-weight: 600;
//   color: ${(props) => props.theme.colors.dark.text};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const SearchInput = styled.input`
//   width: 100%;
//   padding: 12px 16px;
//   background: ${(props) => props.theme.colors.primary.darkNavy};
//   border: 1px solid rgba(0, 229, 255, 0.2);
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   color: ${(props) => props.theme.colors.dark.text};
//   font-family: ${(props) => props.theme.fonts.body};
//   font-size: 14px;
//   transition: all ${(props) => props.theme.transitions.fast};

//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.colors.primary.neonCyan};
//     box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.1);
//   }

//   &::placeholder {
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//   }
// `

// const PlateInput = styled.div`
//   display: flex;
//   gap: 8px;
//   margin-bottom: 12px;
// `

// const AddPlateButton = styled.button`
//   padding: 8px 16px;
//   background: ${(props) => props.theme.colors.primary.neonCyan};
//   color: ${(props) => props.theme.colors.primary.darkNavy};
//   border: none;
//   border-radius: ${(props) => props.theme.borderRadius.sm};
//   font-family: ${(props) => props.theme.fonts.body};
//   font-size: 12px;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.fast};
//   display: flex;
//   align-items: center;
//   gap: 4px;

//   &:hover {
//     background: rgba(0, 229, 255, 0.8);
//   }
// `

// const WatchedPlatesList = styled.div`
//   max-height: 120px;
//   overflow-y: auto;
// `

// const WatchedPlateItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 8px 12px;
//   background: ${(props) => props.theme.colors.primary.darkNavy};
//   border-radius: ${(props) => props.theme.borderRadius.sm};
//   margin-bottom: 6px;
//   font-size: 13px;
//   color: ${(props) => props.theme.colors.dark.text};
  
//   .plate-number {
//     font-weight: 600;
//     font-family: monospace;
//     letter-spacing: 1px;
//   }
  
//   .remove-button {
//     background: none;
//     border: none;
//     color: ${(props) => props.theme.colors.secondary.red};
//     cursor: pointer;
//     padding: 2px;
    
//     &:hover {
//       color: #ff4757;
//     }
//   }
// `

// const FilterButton = styled.button`
//   padding: 8px 16px;
//   background: ${(props) => (props.active ? props.theme.colors.primary.neonCyan : "transparent")};
//   color: ${(props) => (props.active ? props.theme.colors.primary.darkNavy : props.theme.colors.dark.text)};
//   border: 1px solid ${(props) => (props.active ? props.theme.colors.primary.neonCyan : "rgba(0, 229, 255, 0.2)")};
//   border-radius: ${(props) => props.theme.borderRadius.sm};
//   font-family: ${(props) => props.theme.fonts.body};
//   font-size: 12px;
//   font-weight: 500;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.fast};
//   margin-right: 8px;
//   margin-bottom: 8px;

//   &:hover {
//     border-color: ${(props) => props.theme.colors.primary.neonCyan};
//   }
// `

// const CameraSelector = styled.div`
//   .camera-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
//     gap: 8px;
//     margin-top: 12px;
//   }
  
//   .camera-checkbox {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 8px;
//     background: ${(props) => props.theme.colors.primary.darkNavy};
//     border-radius: ${(props) => props.theme.borderRadius.sm};
//     font-size: 12px;
//     cursor: pointer;
//     transition: all ${(props) => props.theme.transitions.fast};
    
//     &:hover {
//       background: rgba(0, 229, 255, 0.1);
//     }
    
//     input[type="checkbox"] {
//       accent-color: ${(props) => props.theme.colors.primary.neonCyan};
//     }
//   }
// `

// const MainContent = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 350px;
//   gap: clamp(16px, 3vw, 24px);
  
//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr;
//   }
// `

// const RecognitionFeed = styled.div`
//   background: ${(props) => props.theme.colors.dark.surface};
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   padding: clamp(16px, 3vw, 24px);
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   min-height: 600px;
// `

// const FeedHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 20px;
//   flex-wrap: wrap;
//   gap: 12px;
// `

// const FeedTitle = styled.h3`
//   font-family: ${(props) => props.theme.fonts.heading};
//   font-size: clamp(16px, 3vw, 18px);
//   font-weight: 600;
//   color: ${(props) => props.theme.colors.dark.text};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const StatusIndicator = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 6px 12px;
//   background: ${(props) => (props.active ? "rgba(6, 214, 160, 0.1)" : "rgba(255, 23, 68, 0.1)")};
//   border: 1px solid ${(props) => (props.active ? props.theme.colors.supportive.teal : props.theme.colors.secondary.red)};
//   border-radius: ${(props) => props.theme.borderRadius.sm};
//   font-size: 12px;
//   font-weight: 500;
//   color: ${(props) => (props.active ? props.theme.colors.supportive.teal : props.theme.colors.secondary.red)};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const CameraGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 16px;
//   margin-bottom: 24px;
  
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `

// const CameraFeed = styled.div`
//   aspect-ratio: 16/9;
//   background: ${(props) => props.theme.colors.primary.darkNavy};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border: 1px solid rgba(0, 229, 255, 0.2);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   overflow: hidden;
  
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `

// const CameraLabel = styled.div`
//   position: absolute;
//   top: 8px;
//   left: 8px;
//   background: rgba(0, 0, 0, 0.7);
//   color: ${(props) => props.theme.colors.dark.text};
//   padding: 4px 8px;
//   border-radius: ${(props) => props.theme.borderRadius.sm};
//   font-size: 10px;
//   font-weight: 500;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const DetectionOverlay = styled.div`
//   position: absolute;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: rgba(255, 193, 7, 0.1);
//   border: 2px solid ${(props) => props.theme.colors.secondary.amber};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   animation: pulse 2s infinite;

//   @keyframes pulse {
//     0%, 100% { opacity: 0.5; }
//     50% { opacity: 1; }
//   }
  
//   .detection-text {
//     color: ${(props) => props.theme.colors.secondary.amber};
//     font-size: 12px;
//     font-weight: bold;
//     text-align: center;
//   }
// `

// const MatchesSidebar = styled.div`
//   background: ${(props) => props.theme.colors.dark.surface};
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   padding: clamp(16px, 3vw, 24px);
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   max-height: 800px;
//   overflow-y: auto;
// `

// const MatchItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 12px;
//   background: ${(props) => props.theme.colors.primary.darkNavy};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   margin-bottom: 12px;
//   transition: all ${(props) => props.theme.transitions.fast};

//   &:hover {
//     border-color: rgba(0, 229, 255, 0.3);
//     transform: translateX(4px);
//   }
// `

// const MatchAvatar = styled.div`
//   width: 40px;
//   height: 40px;
//   background: ${(props) => props.theme.colors.supportive.coolGray};
//   border-radius: ${(props) => props.theme.borderRadius.sm};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${(props) => props.theme.colors.dark.text};
//   font-family: monospace;
//   font-size: 10px;
//   font-weight: bold;
// `

// const MatchInfo = styled.div`
//   flex: 1;
// `

// const MatchPlate = styled.div`
//   font-family: monospace;
//   font-size: 14px;
//   font-weight: 600;
//   color: ${(props) => props.theme.colors.dark.text};
//   margin-bottom: 4px;
//   letter-spacing: 1px;
// `

// const MatchDetails = styled.div`
//   font-size: 12px;
//   color: ${(props) => props.theme.colors.dark.textSecondary};
// `

// const ConfidenceScore = styled.div`
//   font-size: 12px;
//   font-weight: 600;
//   color: ${(props) =>
//     props.confidence > 80
//       ? props.theme.colors.supportive.teal
//       : props.confidence > 60
//         ? props.theme.colors.secondary.amber
//         : props.theme.colors.secondary.red};
// `

// const MapWrapper = styled.div`
//   margin-top: 24px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   overflow: hidden;

//   .leaflet-container {
//     width: 100%;
//     height: 300px;
//   }
// `

// const PlateRecognition = () => {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [newPlate, setNewPlate] = useState("")
//   const [watchedPlates, setWatchedPlates] = useState(["ABC-123", "XYZ-789", "DEF-456"])
//   const [selectedCameras, setSelectedCameras] = useState(new Set([1, 2, 3]))
//   const [activeFilter, setActiveFilter] = useState("all")
//   const [isScanning, setIsScanning] = useState(true)
//   const [matches, setMatches] = useState([
//     { id: 1, plate: "ABC-123", confidence: 95, status: "wanted", lastSeen: "2 min ago", camera: "Camera 1" },
//     { id: 2, plate: "XYZ-789", confidence: 87, status: "stolen", lastSeen: "5 min ago", camera: "Camera 3" },
//     {
//       id: 3,
//       plate: "DEF-456",
//       confidence: 72,
//       status: "person of interest",
//       lastSeen: "8 min ago",
//       camera: "Camera 2",
//     },
//     { id: 4, plate: "GHI-321", confidence: 65, status: "unregistered", lastSeen: "12 min ago", camera: "Camera 4" },
//   ])

//   const cameras = [
//     { id: 1, name: "Camera 1", streamUrl: "/traffic-camera-view-with-cars.jpg" },
//     { id: 2, name: "Camera 2", streamUrl: "/highway-surveillance-camera.jpg" },
//     { id: 3, name: "Camera 3", streamUrl: "/parking-lot-security-camera.png" },
//     { id: 4, name: "Camera 4", streamUrl: "/intersection-traffic-camera.jpg" },
//     { id: 5, name: "Camera 5", streamUrl: "/toll-booth-camera-view.jpg" },
//     { id: 6, name: "Camera 6", streamUrl: "/bridge-traffic-monitoring.jpg" },
//   ]

//   const filters = ["all", "wanted", "stolen", "person of interest", "unregistered"]

//   const addPlate = () => {
//     if (newPlate.trim() && !watchedPlates.includes(newPlate.trim().toUpperCase())) {
//       setWatchedPlates([...watchedPlates, newPlate.trim().toUpperCase()])
//       setNewPlate("")
//     }
//   }

//   const removePlate = (plate) => {
//     setWatchedPlates(watchedPlates.filter((p) => p !== plate))
//   }

//   const toggleCamera = (cameraId) => {
//     const newSelected = new Set(selectedCameras)
//     if (newSelected.has(cameraId)) {
//       newSelected.delete(cameraId)
//     } else {
//       newSelected.add(cameraId)
//     }
//     setSelectedCameras(newSelected)
//   }

//   const filteredMatches = matches
//     .filter((match) => activeFilter === "all" || match.status === activeFilter)
//     .filter((match) => match.plate.toLowerCase().includes(searchQuery.toLowerCase()))

//   const handleBack = () => {
//     // Navigate back to dashboard or previous page
//     console.log("Navigate back")
//   }

//   return (
//     <PlateRecognitionContainer>
//       <PageHeader>
//         <div className="header-left">
//           <BackButton onClick={handleBack}>
//             <ArrowLeft size={16} />
//             Back
//           </BackButton>
//           <div>
//             <Title>License Plate Recognition</Title>
//             <Subtitle>Real-time license plate detection and tracking</Subtitle>
//           </div>
//         </div>
//       </PageHeader>

//       <ControlPanel>
//         <ControlCard>
//           <CardHeader>
//             <CardIcon>
//               <Search size={18} />
//             </CardIcon>
//             <CardTitle>Search Plates</CardTitle>
//           </CardHeader>
//           <SearchInput
//             type="text"
//             placeholder="Search by plate number..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </ControlCard>

//         <ControlCard>
//           <CardHeader>
//             <CardIcon>
//               <Car size={18} />
//             </CardIcon>
//             <CardTitle>Watch List</CardTitle>
//           </CardHeader>
//           <PlateInput>
//             <SearchInput
//               type="text"
//               placeholder="Enter plate number..."
//               value={newPlate}
//               onChange={(e) => setNewPlate(e.target.value.toUpperCase())}
//               onKeyPress={(e) => e.key === "Enter" && addPlate()}
//             />
//             <AddPlateButton onClick={addPlate}>
//               <Plus size={14} />
//               Add
//             </AddPlateButton>
//           </PlateInput>
//           <WatchedPlatesList>
//             {watchedPlates.map((plate) => (
//               <WatchedPlateItem key={plate}>
//                 <span className="plate-number">{plate}</span>
//                 <button className="remove-button" onClick={() => removePlate(plate)}>
//                   <X size={14} />
//                 </button>
//               </WatchedPlateItem>
//             ))}
//           </WatchedPlatesList>
//         </ControlCard>

//         <ControlCard>
//           <CardHeader>
//             <CardIcon>
//               <Camera size={18} />
//             </CardIcon>
//             <CardTitle>Camera Selection</CardTitle>
//           </CardHeader>
//           <CameraSelector>
//             <div className="camera-grid">
//               {cameras.map((camera) => (
//                 <label key={camera.id} className="camera-checkbox">
//                   <input
//                     type="checkbox"
//                     checked={selectedCameras.has(camera.id)}
//                     onChange={() => toggleCamera(camera.id)}
//                   />
//                   <span>{camera.name}</span>
//                 </label>
//               ))}
//             </div>
//           </CameraSelector>
//         </ControlCard>

//         <ControlCard>
//           <CardHeader>
//             <CardIcon>
//               <Filter size={18} />
//             </CardIcon>
//             <CardTitle>Filter Results</CardTitle>
//           </CardHeader>
//           <div>
//             {filters.map((filter) => (
//               <FilterButton key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
//                 {filter.replace("_", " ")}
//               </FilterButton>
//             ))}
//           </div>
//         </ControlCard>
//       </ControlPanel>

//       <MainContent>
//         <RecognitionFeed>
//           <FeedHeader>
//             <FeedTitle>Active Camera Feeds</FeedTitle>
//             <StatusIndicator active={isScanning}>
//               {isScanning ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
//               {isScanning ? "Scanning Active" : "System Offline"}
//             </StatusIndicator>
//           </FeedHeader>

//           <CameraGrid>
//             {cameras
//               .filter((camera) => selectedCameras.has(camera.id))
//               .map((camera) => (
//                 <CameraFeed key={camera.id}>
//                   <CameraLabel>{camera.name}</CameraLabel>
//                   <img src={camera.streamUrl || "/placeholder.svg"} alt={camera.name} />
//                   {camera.id <= 3 && (
//                     <DetectionOverlay>
//                       <div className="detection-text">
//                         PLATE DETECTED
//                         <br />
//                         {watchedPlates[camera.id - 1] || "ABC-123"}
//                       </div>
//                     </DetectionOverlay>
//                   )}
//                 </CameraFeed>
//               ))}
//           </CameraGrid>

//           <MapWrapper>
//             <MapContainer center={[4.8156, 7.0498]} zoom={12} scrollWheelZoom>
//               <TileLayer
//                 attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <Marker position={[4.8156, 7.0498]}>
//                 <Popup>Detection Point 1</Popup>
//               </Marker>
//               <Marker position={[4.8256, 7.0598]}>
//                 <Popup>Detection Point 2</Popup>
//               </Marker>
//             </MapContainer>
//           </MapWrapper>
//         </RecognitionFeed>

//         <MatchesSidebar>
//           <CardHeader>
//             <CardIcon>
//               <Car size={18} />
//             </CardIcon>
//             <CardTitle>Recent Detections ({filteredMatches.length})</CardTitle>
//           </CardHeader>

//           {filteredMatches.map((match) => (
//             <MatchItem key={match.id}>
//               <MatchAvatar>{match.plate.substring(0, 3)}</MatchAvatar>
//               <MatchInfo>
//                 <MatchPlate>{match.plate}</MatchPlate>
//                 <MatchDetails>
//                   {match.status} • {match.lastSeen} • {match.camera}
//                 </MatchDetails>
//               </MatchInfo>
//               <ConfidenceScore confidence={match.confidence}>{match.confidence}%</ConfidenceScore>
//             </MatchItem>
//           ))}
//         </MatchesSidebar>
//       </MainContent>
//     </PlateRecognitionContainer>
//   )
// }

// export default PlateRecognition
