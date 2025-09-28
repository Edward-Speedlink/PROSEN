"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Camera, ArrowLeft, Play, Pause, Maximize, Eye, Filter, X, AlertTriangle, Shield } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import FormInput from "../../components/auth/FormInput"
import { useNavigate } from "react-router-dom"
import { getCameras } from "../../services/cameraService"

const PageContainer = styled.div`
  width: 100%;
  max-width: none;
  padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.lg};
  min-height: 100vh;
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.light.background)};
  
  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.md};
  }
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  .search-container {
    flex: 1;
    max-width: 350px;
    min-width: 250px;
  }
  
  .filter-select {
    min-width: 150px;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
    border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
    border-radius: ${(props) => props.theme.borderRadius.md};
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.secondary.amber};
      box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.2);
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${(props) => props.theme.spacing.md};
    
    .search-container {
      max-width: none;
      min-width: auto;
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

const FullscreenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  
  .fullscreen-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.theme.spacing.lg};
    background-color: ${(props) => props.theme.colors.primary.darkNavy};
    border-bottom: 2px solid ${(props) => props.theme.colors.primary.deepBlue};
    
    .camera-title {
      color: ${(props) => props.theme.colors.dark.text};
      font-size: 18px;
      font-weight: 600;
    }
    
    .close-button {
      background: none;
      border: none;
      color: ${(props) => props.theme.colors.dark.text};
      cursor: pointer;
      padding: ${(props) => props.theme.spacing.sm};
      border-radius: ${(props) => props.theme.borderRadius.md};
      transition: background-color 0.3s ease;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  
  .fullscreen-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.theme.spacing.lg};
    
    .fullscreen-feed {
      width: 100%;
      height: 100%;
      max-width: 90vw;
      max-height: 80vh;
      background: linear-gradient(45deg, ${(props) => props.theme.colors.primary.darkNavy}, ${(props) => props.theme.colors.primary.deepBlue});
      border-radius: ${(props) => props.theme.borderRadius.lg};
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${(props) => props.theme.borderRadius.lg};
      }
      
      .feed-placeholder {
        color: ${(props) => props.theme.colors.supportive.coolGray};
        text-align: center;
        
        svg {
          width: 64px;
          height: 64px;
          margin-bottom: ${(props) => props.theme.spacing.md};
        }
        
        p {
          font-size: 18px;
          opacity: 0.7;
        }
      }
    }
  }
  
  .fullscreen-controls {
    padding: ${(props) => props.theme.spacing.lg};
    background-color: ${(props) => props.theme.colors.primary.darkNavy};
    display: flex;
    justify-content: center;
    gap: ${(props) => props.theme.spacing.md};
  }
`

const AnalysisModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .analysis-content {
    background-color: ${(props) => props.theme.colors.primary.darkNavy};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    padding: ${(props) => props.theme.spacing.xl};
    max-width: 500px;
    width: 90%;
    text-align: center;
    border: 2px solid ${(props) => props.theme.colors.primary.deepBlue};
    
    .analysis-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto ${(props) => props.theme.spacing.lg};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.safe {
        background-color: rgba(40, 167, 69, 0.2);
        color: #28a745;
      }
      
      &.threat {
        background-color: rgba(220, 53, 69, 0.2);
        color: #dc3545;
      }
    }
    
    .analysis-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: ${(props) => props.theme.spacing.md};
      color: ${(props) => props.theme.colors.dark.text};
    }
    
    .analysis-message {
      font-size: 16px;
      color: ${(props) => props.theme.colors.dark.textSecondary};
      margin-bottom: ${(props) => props.theme.spacing.xl};
      line-height: 1.5;
    }
    
    .analysis-details {
      background-color: ${(props) => props.theme.colors.primary.deepBlue};
      border-radius: ${(props) => props.theme.borderRadius.md};
      padding: ${(props) => props.theme.spacing.md};
      margin-bottom: ${(props) => props.theme.spacing.lg};
      text-align: left;
      
      .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: ${(props) => props.theme.spacing.sm};
        font-size: 14px;
        
        .label {
          color: ${(props) => props.theme.colors.dark.textSecondary};
        }
        
        .value {
          color: ${(props) => props.theme.colors.dark.text};
          font-weight: 600;
        }
      }
    }
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
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
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
  const [loading, setLoading] = useState(true)
  const [fullscreenCamera, setFullscreenCamera] = useState(null)
  const [analyzingCamera, setAnalyzingCamera] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [playingCameras, setPlayingCameras] = useState(new Set())

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const data = await getCameras()
        setCameras(data)
      } catch (err) {
        console.error("Error fetching cameras:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCameras()
  }, [])

  const handlePlayCamera = (cameraId) => {
    setPlayingCameras((prev) => new Set([...prev, cameraId]))
  }

  const handlePauseCamera = (cameraId) => {
    setPlayingCameras((prev) => {
      const newSet = new Set(prev)
      newSet.delete(cameraId)
      return newSet
    })
  }

  const handleFullscreen = (camera) => {
    setFullscreenCamera(camera)
  }

  const handleCloseFullscreen = () => {
    setFullscreenCamera(null)
  }

  const handleAnalyze = async (camera) => {
    setAnalyzingCamera(camera)

    // Simulate analysis delay
    setTimeout(() => {
      const isThreat = Math.random() < 0.3 // 30% chance of threat detection
      setAnalysisResult({
        camera: camera,
        threat: isThreat,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99% confidence
        timestamp: new Date().toLocaleTimeString(),
        details: isThreat
          ? "Suspicious activity detected in camera feed"
          : "No suspicious activity detected in current frame",
      })
      setAnalyzingCamera(null)
    }, 2000)
  }

  const handleCloseAnalysis = () => {
    setAnalysisResult(null)
  }

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

  if (loading) return <p>Loading camera feeds...</p>

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

            <div className="camera-feed">
              {camera.streamUrl && playingCameras.has(camera.id) ? (
                <img
                  src={camera.streamUrl || "/placeholder.svg"}
                  alt={camera.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="feed-placeholder">
                  <Camera />
                  <p>{playingCameras.has(camera.id) ? "Loading Feed..." : "Feed Paused"}</p>
                </div>
              )}
              <div className="feed-overlay">
                <Button variant="ghost" size="sm" onClick={() => handlePlayCamera(camera.id)}>
                  <Play />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleFullscreen(camera)}>
                  <Maximize />
                </Button>
              </div>
            </div>

            <div className="camera-controls">
              <div className="control-buttons">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePlayCamera(camera.id)}
                  disabled={playingCameras.has(camera.id)}
                >
                  <Play />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePauseCamera(camera.id)}
                  disabled={!playingCameras.has(camera.id)}
                >
                  <Pause />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAnalyze(camera)}
                  disabled={analyzingCamera?.id === camera.id}
                >
                  <Eye />
                  {analyzingCamera?.id === camera.id ? "Analyzing..." : "Analyze"}
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

      {fullscreenCamera && (
        <FullscreenModal>
          <div className="fullscreen-header">
            <div className="camera-title">
              {fullscreenCamera.name} - {fullscreenCamera.location}
            </div>
            <button className="close-button" onClick={handleCloseFullscreen}>
              <X size={24} />
            </button>
          </div>
          <div className="fullscreen-content">
            <div className="fullscreen-feed">
              {fullscreenCamera.streamUrl && playingCameras.has(fullscreenCamera.id) ? (
                <img src={fullscreenCamera.streamUrl || "/placeholder.svg"} alt={fullscreenCamera.name} />
              ) : (
                <div className="feed-placeholder">
                  <Camera />
                  <p>Live Feed - {fullscreenCamera.quality}</p>
                </div>
              )}
            </div>
          </div>
          <div className="fullscreen-controls">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePlayCamera(fullscreenCamera.id)}
              disabled={playingCameras.has(fullscreenCamera.id)}
            >
              <Play />
              Play
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePauseCamera(fullscreenCamera.id)}
              disabled={!playingCameras.has(fullscreenCamera.id)}
            >
              <Pause />
              Pause
            </Button>
            <Button variant="secondary" size="sm" onClick={() => handleAnalyze(fullscreenCamera)}>
              <Eye />
              Analyze Feed
            </Button>
          </div>
        </FullscreenModal>
      )}

      {analysisResult && (
        <AnalysisModal onClick={handleCloseAnalysis}>
          <div className="analysis-content" onClick={(e) => e.stopPropagation()}>
            <div className={`analysis-icon ${analysisResult.threat ? "threat" : "safe"}`}>
              {analysisResult.threat ? <AlertTriangle size={32} /> : <Shield size={32} />}
            </div>
            <div className="analysis-title">{analysisResult.threat ? "Threat Detected" : "No Threat Detected"}</div>
            <div className="analysis-message">{analysisResult.details}</div>
            <div className="analysis-details">
              <div className="detail-item">
                <span className="label">Camera:</span>
                <span className="value">{analysisResult.camera.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Confidence:</span>
                <span className="value">{analysisResult.confidence}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Timestamp:</span>
                <span className="value">{analysisResult.timestamp}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className="value">{analysisResult.threat ? "Alert" : "Clear"}</span>
              </div>
            </div>
            <Button variant="primary" onClick={handleCloseAnalysis}>
              Close Analysis
            </Button>
          </div>
        </AnalysisModal>
      )}
    </PageContainer>
  )
}

export default CameraFeeds














// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { Camera, ArrowLeft, Play, Pause, Maximize, Eye, Filter } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import FormInput from "../../components/auth/FormInput"
// import { useNavigate } from "react-router-dom"
// import { getCameras } from "../../services/cameraService";


// const PageContainer = styled.div`
//   width: 100%;
//   max-width: none;
//   padding: 0;
// `

// const PageHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: ${(props) => props.theme.spacing.xl};
//   padding-bottom: ${(props) => props.theme.spacing.lg};
//   border-bottom: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.lightGray)};
  
//   .header-left {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
    
//     h1 {
//       font-family: ${(props) => props.theme.fonts.heading};
//       font-size: clamp(20px, 3vw, 28px);
//       font-weight: 700;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       margin: 0;
//     }
//   }
  
//   .header-controls {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.md};
//     align-items: center;
//     flex-wrap: wrap;
//   }
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .header-controls {
//       width: 100%;
//       justify-content: flex-start;
//     }
//   }
// `

// const FilterBar = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.md};
//   align-items: center;
//   margin-bottom: ${(props) => props.theme.spacing.xl};
//   padding: ${(props) => props.theme.spacing.lg};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.surface : props.theme.colors.light.surface)};
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  
//   .search-container {
//     flex: 1;
//     max-width: 300px;
//   }
  
//   .filter-select {
//     min-width: 150px;
//     padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
//     background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//     border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
//     border-radius: ${(props) => props.theme.borderRadius.md};
//     color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//     font-size: 14px;
//   }
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: stretch;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .search-container {
//       max-width: none;
//     }
    
//     .filter-select {
//       min-width: auto;
//     }
//   }
// `

// const CameraGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//   gap: ${(props) => props.theme.spacing.lg};
  
//   @media (min-width: 1600px) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: ${(props) => props.theme.spacing.xl};
//   }
  
//   @media (min-width: 1200px) and (max-width: 1599px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
  
//   @media (min-width: 768px) and (max-width: 1199px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (max-width: 767px) {
//     grid-template-columns: 1fr;
//     gap: ${(props) => props.theme.spacing.md};
//   }
// `

// const CameraCard = styled(Card)`
//   .camera-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: ${(props) => props.theme.spacing.md};
    
//     .camera-info {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.md};
      
//       .camera-icon {
//         width: 40px;
//         height: 40px;
//         border-radius: ${(props) => props.theme.borderRadius.md};
//         background-color: ${(props) => props.theme.colors.secondary.amber};
//         display: flex;
//         align-items: center;
//         justify-content: center;
        
//         svg {
//           width: 20px;
//           height: 20px;
//           color: ${(props) => props.theme.colors.primary.darkNavy};
//         }
//       }
      
//       .details {
//         .name {
//           font-weight: 700;
//           color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//           margin-bottom: 4px;
//         }
        
//         .location {
//           font-size: 12px;
//           color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         }
//       }
//     }
//   }
  
//   .camera-feed {
//     width: 100%;
//     height: 200px;
//     background: linear-gradient(45deg, ${(props) => props.theme.colors.primary.darkNavy}, ${(props) => props.theme.colors.primary.deepBlue});
//     border-radius: ${(props) => props.theme.borderRadius.md};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: ${(props) => props.theme.spacing.md};
//     position: relative;
//     overflow: hidden;
    
//     .feed-placeholder {
//       color: ${(props) => props.theme.colors.supportive.coolGray};
//       text-align: center;
      
//       svg {
//         width: 48px;
//         height: 48px;
//         margin-bottom: ${(props) => props.theme.spacing.sm};
//       }
      
//       p {
//         font-size: 14px;
//         opacity: 0.7;
//       }
//     }
    
//     .feed-overlay {
//       position: absolute;
//       top: ${(props) => props.theme.spacing.sm};
//       right: ${(props) => props.theme.spacing.sm};
//       display: flex;
//       gap: ${(props) => props.theme.spacing.xs};
//     }
//   }
  
//   .camera-controls {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: ${(props) => props.theme.spacing.md};
    
//     .control-buttons {
//       display: flex;
//       gap: ${(props) => props.theme.spacing.sm};
//     }
//   }
  
//   .camera-stats {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .stat-item {
//       .label {
//         font-size: 11px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//         margin-bottom: 2px;
//       }
      
//       .value {
//         font-weight: 600;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         font-size: 13px;
//       }
//     }
//   }
// `

// const CameraFeeds = () => {
//   const navigate = useNavigate()
//   const [cameras, setCameras] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [locationFilter, setLocationFilter] = useState("all")
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCameras = async () => {
//       try {
//         const data = await getCameras();
//         setCameras(data);
//       } catch (err) {
//         console.error("Error fetching cameras:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCameras();
//   }, []);

//   // useEffect(() => {
//   //   // Simulate loading camera data
//   //   setCameras([
//   //     {
//   //       id: "CAM-001",
//   //       name: "Main Street North",
//   //       location: "Downtown District",
//   //       status: "online",
//   //       quality: "HD",
//   //       lastActivity: "2 min ago",
//   //       detections: 3,
//   //     },
//   //     {
//   //       id: "CAM-002",
//   //       name: "Central Plaza",
//   //       location: "City Center",
//   //       status: "online",
//   //       quality: "4K",
//   //       lastActivity: "1 min ago",
//   //       detections: 7,
//   //     },
//   //     {
//   //       id: "CAM-003",
//   //       name: "Parking Lot B",
//   //       location: "Commercial Zone",
//   //       status: "offline",
//   //       quality: "HD",
//   //       lastActivity: "15 min ago",
//   //       detections: 0,
//   //     },
//   //     {
//   //       id: "CAM-004",
//   //       name: "Highway Overpass",
//   //       location: "Transport Hub",
//   //       status: "online",
//   //       quality: "HD",
//   //       lastActivity: "30 sec ago",
//   //       detections: 12,
//   //     },
//   //     {
//   //       id: "CAM-005",
//   //       name: "School Zone",
//   //       location: "Education District",
//   //       status: "warning",
//   //       quality: "HD",
//   //       lastActivity: "5 min ago",
//   //       detections: 1,
//   //     },
//   //     {
//   //       id: "CAM-006",
//   //       name: "Industrial Gate",
//   //       location: "Industrial Zone",
//   //       status: "online",
//   //       quality: "4K",
//   //       lastActivity: "1 min ago",
//   //       detections: 2,
//   //     },
//   //   ])
//   // }, [])

//   const filteredCameras = cameras.filter((camera) => {
//     const matchesSearch =
//       camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       camera.location.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || camera.status === statusFilter
//     const matchesLocation = locationFilter === "all" || camera.location.includes(locationFilter)

//     return matchesSearch && matchesStatus && matchesLocation
//   })

//   const onlineCount = cameras.filter((c) => c.status === "online").length
//   const totalDetections = cameras.reduce((sum, c) => sum + c.detections, 0)

//   if (loading) return <p>Loading camera feeds...</p>;

//   return (
//     <PageContainer>
//       <PageHeader>
//         <div className="header-left">
//           <Button variant="ghost" size="sm" onClick={() => navigate("/law-dashboard")}>
//             <ArrowLeft />
//           </Button>
//           <h1>Camera Surveillance</h1>
//         </div>
//         <div className="header-controls">
//           <StatusBadge status="online">
//             {onlineCount}/{cameras.length} Online
//           </StatusBadge>
//           <StatusBadge status="active">{totalDetections} Detections</StatusBadge>
//           <Button variant="secondary" size="sm" onClick={() => navigate("/face-recognition")}>
//             <Eye />
//             Face Recognition
//           </Button>
//         </div>
//       </PageHeader>

//       <FilterBar>
//         <div className="search-container">
//           <FormInput
//             placeholder="Search cameras by name or location..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//           <option value="all">All Status</option>
//           <option value="online">Online</option>
//           <option value="offline">Offline</option>
//           <option value="warning">Warning</option>
//         </select>

//         <select className="filter-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
//           <option value="all">All Locations</option>
//           <option value="Downtown">Downtown</option>
//           <option value="Commercial">Commercial</option>
//           <option value="Industrial">Industrial</option>
//           <option value="Education">Education</option>
//         </select>

//         <Button variant="outline" size="sm">
//           <Filter />
//           More Filters
//         </Button>
//       </FilterBar>

//       <CameraGrid>
//         {filteredCameras.map((camera) => (
//           <CameraCard key={camera.id}>
//             <div className="camera-header">
//               <div className="camera-info">
//                 <div className="camera-icon">
//                   <Camera />
//                 </div>
//                 <div className="details">
//                   <div className="name">{camera.name}</div>
//                   <div className="location">{camera.location}</div>
//                 </div>
//               </div>
//               <StatusBadge status={camera.status}>{camera.status}</StatusBadge>
//             </div>

//             {/* <div className="camera-feed">
//               <div className="feed-placeholder">
//                 <Camera />
//                 <p>Live Feed - {camera.quality}</p>
//               </div>
//               <div className="feed-overlay">
//                 <Button variant="ghost" size="sm">
//                   <Play />
//                 </Button>
//                 <Button variant="ghost" size="sm">
//                   <Maximize />
//                 </Button>
//               </div>
//             </div> */}

//             <div className="camera-feed">
//   {camera.streamUrl ? (
//     // MJPEG stream served by Flask at /video_feed/<camera_id> will work with <img/>
//     <img
//       src={camera.streamUrl}
//       alt={camera.name}
//       style={{ width: "100%", height: "100%", objectFit: "cover" }}
//     />
//   ) : (
//     <div className="feed-placeholder">
//       <Camera />
//       <p>No Live Feed</p>
//     </div>
//   )}
//   <div className="feed-overlay">
//     <Button variant="ghost" size="sm">
//       <Play />
//     </Button>
//     <Button variant="ghost" size="sm">
//       <Maximize />
//     </Button>
//   </div>
// </div>


//             <div className="camera-controls">
//               <div className="control-buttons">
//                 <Button variant="outline" size="sm">
//                   <Play />
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Pause />
//                 </Button>
//                 <Button variant="secondary" size="sm">
//                   <Eye />
//                   Analyze
//                 </Button>
//               </div>
//             </div>

//             <div className="camera-stats">
//               <div className="stat-item">
//                 <div className="label">Last Activity</div>
//                 <div className="value">{camera.lastActivity}</div>
//               </div>
//               <div className="stat-item">
//                 <div className="label">Detections</div>
//                 <div className="value">{camera.detections} today</div>
//               </div>
//               <div className="stat-item">
//                 <div className="label">Quality</div>
//                 <div className="value">{camera.quality}</div>
//               </div>
//               <div className="stat-item">
//                 <div className="label">ID</div>
//                 <div className="value">{camera.id}</div>
//               </div>
//             </div>
//           </CameraCard>
//         ))}
//       </CameraGrid>
//     </PageContainer>
//   )
// }

// export default CameraFeeds

