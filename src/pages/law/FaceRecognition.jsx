"use client"

import { useState } from "react"
import styled from "styled-components"
import { Camera, Search, Users, AlertTriangle, CheckCircle, Filter } from "lucide-react"

const FaceRecognitionContainer = styled.div`
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

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  background: rgba(0, 229, 255, 0.1);
  border: 2px solid ${(props) => props.theme.colors.primary.neonCyan};
  border-radius: ${(props) => props.theme.borderRadius.md};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
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
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.dark.text};
`

const MatchInfo = styled.div`
  flex: 1;
`

const MatchName = styled.div`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 4px;
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

const FaceRecognition = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isScanning, setIsScanning] = useState(true)
  const [matches, setMatches] = useState([
    { id: 1, name: "John Smith", confidence: 95, status: "wanted", lastSeen: "2 min ago" },
    { id: 2, name: "Sarah Johnson", confidence: 87, status: "person of interest", lastSeen: "5 min ago" },
    { id: 3, name: "Mike Davis", confidence: 72, status: "cleared", lastSeen: "8 min ago" },
    { id: 4, name: "Unknown Person", confidence: 45, status: "unidentified", lastSeen: "12 min ago" },
  ])

  const filters = ["all", "wanted", "person of interest", "cleared", "unidentified"]

  const filteredMatches = matches
    .filter((match) => activeFilter === "all" || match.status === activeFilter)
    .filter((match) => match.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <FaceRecognitionContainer>
      <Header>
        <Title>Face Recognition System</Title>
        <Subtitle>Real-time facial recognition and suspect identification</Subtitle>
      </Header>

      <ControlPanel>
        <ControlCard>
          <CardHeader>
            <CardIcon>
              <Search size={18} />
            </CardIcon>
            <CardTitle>Search Database</CardTitle>
          </CardHeader>
          <SearchInput
            type="text"
            placeholder="Search by name, ID, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

        <ControlCard>
          <CardHeader>
            <CardIcon>
              <Users size={18} />
            </CardIcon>
            <CardTitle>Detection Stats</CardTitle>
          </CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span>Active Cameras: 12</span>
            <span>Matches Today: 47</span>
          </div>
        </ControlCard>
      </ControlPanel>

      <MainContent>
        <RecognitionFeed>
          <FeedHeader>
            <FeedTitle>Live Camera Feeds</FeedTitle>
            <StatusIndicator active={isScanning}>
              {isScanning ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
              {isScanning ? "Scanning Active" : "System Offline"}
            </StatusIndicator>
          </FeedHeader>

          <CameraGrid>
            {[1, 2, 3, 4, 5, 6].map((camera) => (
              <CameraFeed key={camera}>
                <CameraLabel>Camera {camera}</CameraLabel>
                <Camera size={32} color="rgba(0, 229, 255, 0.3)" />
                {camera <= 2 && (
                  <DetectionOverlay>
                    <div style={{ color: "#00E5FF", fontSize: "12px", fontWeight: "bold" }}>MATCH DETECTED</div>
                  </DetectionOverlay>
                )}
              </CameraFeed>
            ))}
          </CameraGrid>
        </RecognitionFeed>

        <MatchesSidebar>
          <CardHeader>
            <CardIcon>
              <Users size={18} />
            </CardIcon>
            <CardTitle>Recent Matches ({filteredMatches.length})</CardTitle>
          </CardHeader>

          {filteredMatches.map((match) => (
            <MatchItem key={match.id}>
              <MatchAvatar>
                <Users size={20} />
              </MatchAvatar>
              <MatchInfo>
                <MatchName>{match.name}</MatchName>
                <MatchDetails>
                  {match.status} • {match.lastSeen}
                </MatchDetails>
              </MatchInfo>
              <ConfidenceScore confidence={match.confidence}>{match.confidence}%</ConfidenceScore>
            </MatchItem>
          ))}
        </MatchesSidebar>
      </MainContent>
    </FaceRecognitionContainer>
  )
}

export default FaceRecognition
