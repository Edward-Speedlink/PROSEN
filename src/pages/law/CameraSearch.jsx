"use client"

import { useState } from "react"
import styled from "styled-components"
import { Camera, Search, MapPin, Calendar, Eye, Download, Share2 } from "lucide-react"

const CameraSearchContainer = styled.div`
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

const SearchPanel = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  margin-bottom: clamp(20px, 4vw, 32px);
`

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(12px, 2vw, 16px);
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const SearchSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.dark.text};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
  }
`

const SearchButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.supportive.teal});
  color: ${(props) => props.theme.colors.primary.darkNavy};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 229, 255, 0.3);
  }
`

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: clamp(16px, 3vw, 24px);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: clamp(16px, 3vw, 20px);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const CameraCard = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid rgba(0, 229, 255, 0.1);
  overflow: hidden;
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateY(-4px);
  }
`

const CameraPreview = styled.div`
  aspect-ratio: 16/9;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid rgba(0, 229, 255, 0.1);
`

const CameraInfo = styled.div`
  padding: 16px;
`

const CameraName = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const CameraDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.dark.textSecondary};
`

const DetailValue = styled.span`
  color: ${(props) => props.theme.colors.dark.text};
  font-weight: 500;
`

const CameraActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const ActionButton = styled.button`
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

const FilterSidebar = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  max-height: 600px;
  overflow-y: auto;
`

const FilterSection = styled.div`
  margin-bottom: 24px;
`

const FilterTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: 12px;
  color: ${(props) => props.theme.colors.dark.textSecondary};
  cursor: pointer;

  input[type="checkbox"] {
    accent-color: ${(props) => props.theme.colors.primary.neonCyan};
  }
`

const CameraSearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [timeRange, setTimeRange] = useState("")
  const [cameras] = useState([
    {
      id: 1,
      name: "Main Entrance",
      location: "Building A - Front",
      status: "online",
      lastRecording: "2 min ago",
      resolution: "4K",
      type: "Fixed",
    },
    {
      id: 2,
      name: "Parking Lot West",
      location: "Parking Area - West Side",
      status: "online",
      lastRecording: "5 min ago",
      resolution: "1080p",
      type: "PTZ",
    },
    {
      id: 3,
      name: "Emergency Exit",
      location: "Building B - Rear",
      status: "offline",
      lastRecording: "2 hours ago",
      resolution: "720p",
      type: "Fixed",
    },
    {
      id: 4,
      name: "Perimeter North",
      location: "North Fence Line",
      status: "online",
      lastRecording: "1 min ago",
      resolution: "4K",
      type: "PTZ",
    },
    {
      id: 5,
      name: "Loading Dock",
      location: "Service Area",
      status: "maintenance",
      lastRecording: "1 day ago",
      resolution: "1080p",
      type: "Fixed",
    },
    {
      id: 6,
      name: "Reception Area",
      location: "Building A - Lobby",
      status: "online",
      lastRecording: "30 sec ago",
      resolution: "4K",
      type: "Dome",
    },
  ])

  const handleSearch = () => {
    console.log("[PROSEN] Searching cameras:", { searchQuery, locationFilter, timeRange })
    // Add search functionality here
  }

  const handleCameraAction = (action, cameraId) => {
    console.log(`[PROSEN] Camera ${cameraId} - ${action}`)
    // Add camera action functionality here
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#06D6A0"
      case "offline":
        return "#FF1744"
      case "maintenance":
        return "#FFB703"
      default:
        return "#90A4AE"
    }
  }

  return (
    <CameraSearchContainer>
      <Header>
        <Title>Camera Search & Management</Title>
        <Subtitle>Search and manage surveillance camera network</Subtitle>
      </Header>

      <SearchPanel>
        <SearchGrid>
          <SearchInput
            type="text"
            placeholder="Search by camera name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchSelect value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            <option value="building-a">Building A</option>
            <option value="building-b">Building B</option>
            <option value="parking">Parking Areas</option>
            <option value="perimeter">Perimeter</option>
            <option value="service">Service Areas</option>
          </SearchSelect>
          <SearchSelect value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="">All Time</option>
            <option value="last-hour">Last Hour</option>
            <option value="last-day">Last 24 Hours</option>
            <option value="last-week">Last Week</option>
            <option value="custom">Custom Range</option>
          </SearchSelect>
          <SearchButton onClick={handleSearch}>
            <Search size={16} />
            Search Cameras
          </SearchButton>
        </SearchGrid>
      </SearchPanel>

      <ResultsContainer>
        <ResultsGrid>
          {cameras.map((camera) => (
            <CameraCard key={camera.id}>
              <CameraPreview>
                <Camera size={48} color="rgba(0, 229, 255, 0.3)" />
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(camera.status),
                  }}
                />
              </CameraPreview>

              <CameraInfo>
                <CameraName>{camera.name}</CameraName>

                <CameraDetails>
                  <DetailItem>
                    <MapPin size={12} />
                    <DetailValue>{camera.location}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <Calendar size={12} />
                    <DetailValue>{camera.lastRecording}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <Eye size={12} />
                    <DetailValue>
                      {camera.resolution} • {camera.type}
                    </DetailValue>
                  </DetailItem>
                </CameraDetails>

                <CameraActions>
                  <ActionButton primary onClick={() => handleCameraAction("view", camera.id)}>
                    <Eye size={12} />
                    View Live
                  </ActionButton>
                  <ActionButton onClick={() => handleCameraAction("download", camera.id)}>
                    <Download size={12} />
                    Download
                  </ActionButton>
                  <ActionButton onClick={() => handleCameraAction("share", camera.id)}>
                    <Share2 size={12} />
                    Share
                  </ActionButton>
                </CameraActions>
              </CameraInfo>
            </CameraCard>
          ))}
        </ResultsGrid>

        <FilterSidebar>
          <FilterSection>
            <FilterTitle>Camera Status</FilterTitle>
            <FilterOption>
              <input type="checkbox" />
              Online (4)
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              Offline (1)
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              Maintenance (1)
            </FilterOption>
          </FilterSection>

          <FilterSection>
            <FilterTitle>Camera Type</FilterTitle>
            <FilterOption>
              <input type="checkbox" />
              Fixed (3)
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              PTZ (2)
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              Dome (1)
            </FilterOption>
          </FilterSection>

          <FilterSection>
            <FilterTitle>Resolution</FilterTitle>
            <FilterOption>
              <input type="checkbox" />
              4K (3)
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              1080p (2)
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              720p (1)
            </FilterOption>
          </FilterSection>
        </FilterSidebar>
      </ResultsContainer>
    </CameraSearchContainer>
  )
}

export default CameraSearch
