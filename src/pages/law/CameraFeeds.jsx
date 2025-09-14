"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Camera, ArrowLeft, Play, Pause, Maximize, Eye, Filter } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import FormInput from "../../components/auth/FormInput"
import { useNavigate } from "react-router-dom"
import { getCameras } from "../../services/cameraService";


const PageContainer = styled.div`
  width: 100%;
  max-width: none;
  padding: 0;
`

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.lightGray)};
  
  .header-left {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    
    h1 {
      font-family: ${(props) => props.theme.fonts.heading};
      font-size: clamp(20px, 3vw, 28px);
      font-weight: 700;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }
  }
  
  .header-controls {
    display: flex;
    gap: ${(props) => props.theme.spacing.md};
    align-items: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.md};
    
    .header-controls {
      width: 100%;
      justify-content: flex-start;
    }
  }
`

const FilterBar = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.surface : props.theme.colors.light.surface)};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  
  .search-container {
    flex: 1;
    max-width: 300px;
  }
  
  .filter-select {
    min-width: 150px;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
    border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
    border-radius: ${(props) => props.theme.borderRadius.md};
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${(props) => props.theme.spacing.md};
    
    .search-container {
      max-width: none;
    }
    
    .filter-select {
      min-width: auto;
    }
  }
`

const CameraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${(props) => props.theme.spacing.xl};
  }
  
  @media (min-width: 1200px) and (max-width: 1599px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.md};
  }
`

const CameraCard = styled(Card)`
  .camera-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing.md};
    
    .camera-info {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.md};
      
      .camera-icon {
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
        .name {
          font-weight: 700;
          color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
          margin-bottom: 4px;
        }
        
        .location {
          font-size: 12px;
          color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        }
      }
    }
  }
  
  .camera-feed {
    width: 100%;
    height: 200px;
    background: linear-gradient(45deg, ${(props) => props.theme.colors.primary.darkNavy}, ${(props) => props.theme.colors.primary.deepBlue});
    border-radius: ${(props) => props.theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${(props) => props.theme.spacing.md};
    position: relative;
    overflow: hidden;
    
    .feed-placeholder {
      color: ${(props) => props.theme.colors.supportive.coolGray};
      text-align: center;
      
      svg {
        width: 48px;
        height: 48px;
        margin-bottom: ${(props) => props.theme.spacing.sm};
      }
      
      p {
        font-size: 14px;
        opacity: 0.7;
      }
    }
    
    .feed-overlay {
      position: absolute;
      top: ${(props) => props.theme.spacing.sm};
      right: ${(props) => props.theme.spacing.sm};
      display: flex;
      gap: ${(props) => props.theme.spacing.xs};
    }
  }
  
  .camera-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing.md};
    
    .control-buttons {
      display: flex;
      gap: ${(props) => props.theme.spacing.sm};
    }
  }
  
  .camera-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${(props) => props.theme.spacing.md};
    
    .stat-item {
      .label {
        font-size: 11px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }
      
      .value {
        font-weight: 600;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        font-size: 13px;
      }
    }
  }
`

const CameraFeeds = () => {
  const navigate = useNavigate()
  const [cameras, setCameras] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const data = await getCameras();
        setCameras(data);
      } catch (err) {
        console.error("Error fetching cameras:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  // useEffect(() => {
  //   // Simulate loading camera data
  //   setCameras([
  //     {
  //       id: "CAM-001",
  //       name: "Main Street North",
  //       location: "Downtown District",
  //       status: "online",
  //       quality: "HD",
  //       lastActivity: "2 min ago",
  //       detections: 3,
  //     },
  //     {
  //       id: "CAM-002",
  //       name: "Central Plaza",
  //       location: "City Center",
  //       status: "online",
  //       quality: "4K",
  //       lastActivity: "1 min ago",
  //       detections: 7,
  //     },
  //     {
  //       id: "CAM-003",
  //       name: "Parking Lot B",
  //       location: "Commercial Zone",
  //       status: "offline",
  //       quality: "HD",
  //       lastActivity: "15 min ago",
  //       detections: 0,
  //     },
  //     {
  //       id: "CAM-004",
  //       name: "Highway Overpass",
  //       location: "Transport Hub",
  //       status: "online",
  //       quality: "HD",
  //       lastActivity: "30 sec ago",
  //       detections: 12,
  //     },
  //     {
  //       id: "CAM-005",
  //       name: "School Zone",
  //       location: "Education District",
  //       status: "warning",
  //       quality: "HD",
  //       lastActivity: "5 min ago",
  //       detections: 1,
  //     },
  //     {
  //       id: "CAM-006",
  //       name: "Industrial Gate",
  //       location: "Industrial Zone",
  //       status: "online",
  //       quality: "4K",
  //       lastActivity: "1 min ago",
  //       detections: 2,
  //     },
  //   ])
  // }, [])

  const filteredCameras = cameras.filter((camera) => {
    const matchesSearch =
      camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || camera.status === statusFilter
    const matchesLocation = locationFilter === "all" || camera.location.includes(locationFilter)

    return matchesSearch && matchesStatus && matchesLocation
  })

  const onlineCount = cameras.filter((c) => c.status === "online").length
  const totalDetections = cameras.reduce((sum, c) => sum + c.detections, 0)

  if (loading) return <p>Loading camera feeds...</p>;

  return (
    <PageContainer>
      <PageHeader>
        <div className="header-left">
          <Button variant="ghost" size="sm" onClick={() => navigate("/law-dashboard")}>
            <ArrowLeft />
          </Button>
          <h1>Camera Surveillance</h1>
        </div>
        <div className="header-controls">
          <StatusBadge status="online">
            {onlineCount}/{cameras.length} Online
          </StatusBadge>
          <StatusBadge status="active">{totalDetections} Detections</StatusBadge>
          <Button variant="secondary" size="sm" onClick={() => navigate("/face-recognition")}>
            <Eye />
            Face Recognition
          </Button>
        </div>
      </PageHeader>

      <FilterBar>
        <div className="search-container">
          <FormInput
            placeholder="Search cameras by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="warning">Warning</option>
        </select>

        <select className="filter-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="all">All Locations</option>
          <option value="Downtown">Downtown</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Education">Education</option>
        </select>

        <Button variant="outline" size="sm">
          <Filter />
          More Filters
        </Button>
      </FilterBar>

      <CameraGrid>
        {filteredCameras.map((camera) => (
          <CameraCard key={camera.id}>
            <div className="camera-header">
              <div className="camera-info">
                <div className="camera-icon">
                  <Camera />
                </div>
                <div className="details">
                  <div className="name">{camera.name}</div>
                  <div className="location">{camera.location}</div>
                </div>
              </div>
              <StatusBadge status={camera.status}>{camera.status}</StatusBadge>
            </div>

            {/* <div className="camera-feed">
              <div className="feed-placeholder">
                <Camera />
                <p>Live Feed - {camera.quality}</p>
              </div>
              <div className="feed-overlay">
                <Button variant="ghost" size="sm">
                  <Play />
                </Button>
                <Button variant="ghost" size="sm">
                  <Maximize />
                </Button>
              </div>
            </div> */}

            <div className="camera-feed">
  {camera.streamUrl ? (
    // MJPEG stream served by Flask at /video_feed/<camera_id> will work with <img/>
    <img
      src={camera.streamUrl}
      alt={camera.name}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : (
    <div className="feed-placeholder">
      <Camera />
      <p>No Live Feed</p>
    </div>
  )}
  <div className="feed-overlay">
    <Button variant="ghost" size="sm">
      <Play />
    </Button>
    <Button variant="ghost" size="sm">
      <Maximize />
    </Button>
  </div>
</div>


            <div className="camera-controls">
              <div className="control-buttons">
                <Button variant="outline" size="sm">
                  <Play />
                </Button>
                <Button variant="outline" size="sm">
                  <Pause />
                </Button>
                <Button variant="secondary" size="sm">
                  <Eye />
                  Analyze
                </Button>
              </div>
            </div>

            <div className="camera-stats">
              <div className="stat-item">
                <div className="label">Last Activity</div>
                <div className="value">{camera.lastActivity}</div>
              </div>
              <div className="stat-item">
                <div className="label">Detections</div>
                <div className="value">{camera.detections} today</div>
              </div>
              <div className="stat-item">
                <div className="label">Quality</div>
                <div className="value">{camera.quality}</div>
              </div>
              <div className="stat-item">
                <div className="label">ID</div>
                <div className="value">{camera.id}</div>
              </div>
            </div>
          </CameraCard>
        ))}
      </CameraGrid>
    </PageContainer>
  )
}

export default CameraFeeds

