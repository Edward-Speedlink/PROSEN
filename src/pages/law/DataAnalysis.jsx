"use client"

import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import {
  ArrowLeft,
  Activity,
  Users,
  Car,
  Zap,
  AlertTriangle,
  CheckCircle,
  Cpu,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  X,
  MapPin,
  Plane,
  Shield,
  Radio,
} from "lucide-react"

const slideInAnimation = keyframes`
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`

const fadeInAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const pulseAnimation = keyframes`
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.4; transform: scale(1); }
`

const scanAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const dataFlowAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-20px) rotate(180deg); opacity: 0; }
`

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.6), 0 0 30px rgba(0, 229, 255, 0.3); }
  100% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.3); }
`

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  color: #ffffff;
  padding: 24px;
  overflow-x: hidden;
  animation: ${fadeInAnimation} 0.8s ease-out;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 229, 255, 0.2);
  animation: ${slideInAnimation} 0.6s ease-out;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: #00E5FF;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 229, 255, 0.1);
    transform: translateX(-2px);
  }
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  background: #06d6a0;
  border-radius: 50%;
  animation: ${pulseAnimation} 2s infinite;
`

const NavigationTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  animation: ${slideInAnimation} 0.8s ease-out 0.2s both;
`

const TabButton = styled.button`
  background: ${(props) => (props.$active ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 229, 255, 0.05)")};
  border: 1px solid ${(props) => (props.$active ? "#00E5FF" : "rgba(0, 229, 255, 0.1)")};
  color: ${(props) => (props.$active ? "#00E5FF" : "#a0a0a0")};
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(0, 229, 255, 0.15);
    color: #00E5FF;
    transform: translateY(-2px);
  }
`

const ContentContainer = styled.div`
  animation: ${slideInAnimation} 1s ease-out 0.4s both;
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$activeTab === "trends" ? "1fr 1fr" : props.$activeTab === "heatmap" ? "1fr 1fr" : "1fr 350px")};
  gap: 24px;
  min-height: calc(100vh - 200px);
`

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ChartContainer = styled.div`
  background: #1e1e2e;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  animation: ${glowAnimation} 3s infinite;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 229, 255, 0.2);
  }
`

const PieChartSVG = styled.svg`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
`

const PieSlice = styled.path`
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
  justify-content: center;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${(props) => props.$color};
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeInAnimation} 0.3s ease-out;
`

const ModalContent = styled.div`
  background: #1e1e2e;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(0, 229, 255, 0.2);
  max-width: 500px;
  width: 90%;
  animation: ${slideInAnimation} 0.3s ease-out;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const ModalTitle = styled.h3`
  color: #00E5FF;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #00E5FF;
    background: rgba(0, 229, 255, 0.1);
  }
`

const SystemOverview = styled.div`
  background: #1e1e2e;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  animation: ${glowAnimation} 3s infinite;
`

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`

const MetricCard = styled.div`
  background: rgba(0, 229, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  border: 1px solid rgba(0, 229, 255, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(0, 229, 255, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00E5FF, transparent);
    animation: ${scanAnimation} 3s infinite;
  }
`

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #00E5FF;
  margin-bottom: 4px;
`

const MetricLabel = styled.div`
  font-size: 12px;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ActivityFeed = styled.div`
  background: #1e1e2e;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  flex: 1;
  overflow: hidden;
`

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #00E5FF;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const FeedList = styled.div`
  height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 229, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00E5FF;
    border-radius: 2px;
  }
`

const FeedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(0, 229, 255, 0.03);
  border-radius: 8px;
  border-left: 3px solid ${(props) =>
    props.$type === "face"
      ? "#06d6a0"
      : props.$type === "plate"
        ? "#ffc107"
        : props.$type === "alert"
          ? "#dc3545"
          : "#00E5FF"};
  animation: ${dataFlowAnimation} 0.5s ease-out;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 229, 255, 0.08);
    transform: translateX(4px);
  }
`

const FeedIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$type === "face"
      ? "rgba(6, 214, 160, 0.2)"
      : props.$type === "plate"
        ? "rgba(255, 193, 7, 0.2)"
        : props.$type === "alert"
          ? "rgba(220, 53, 69, 0.2)"
          : "rgba(0, 229, 255, 0.2)"};
  color: ${(props) =>
    props.$type === "face"
      ? "#06d6a0"
      : props.$type === "plate"
        ? "#ffc107"
        : props.$type === "alert"
          ? "#dc3545"
          : "#00E5FF"};
`

const FeedContent = styled.div`
  flex: 1;
`

const FeedTitle = styled.div`
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2px;
`

const FeedDetails = styled.div`
  font-size: 12px;
  color: #a0a0a0;
`

const FeedTime = styled.div`
  font-size: 11px;
  color: #6c757d;
`

const DetectionPanel = styled.div`
  background: #1e1e2e;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  height: 300px;
`

const DetectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  gap: 8px;
  margin-bottom: 16px;
  color: #00E5FF;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DetectionList = styled.div`
  height: 220px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 229, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00E5FF;
    border-radius: 2px;
  }
`

const DetectionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 6px;
  background: rgba(0, 229, 255, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 229, 255, 0.08);
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateX(4px);
  }
`

const DetectionInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const DetectionId = styled.div`
  font-weight: 600;
  color: #ffffff;
  font-size: 14px;
`

const DetectionMeta = styled.div`
  font-size: 11px;
  color: #a0a0a0;
`

const DetectionStatus = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) =>
    props.$status === "active"
      ? "rgba(6, 214, 160, 0.2)"
      : props.$status === "watch"
        ? "rgba(255, 193, 7, 0.2)"
        : "rgba(108, 117, 125, 0.2)"};
  color: ${(props) => (props.$status === "active" ? "#06d6a0" : props.$status === "watch" ? "#ffc107" : "#6c757d")};
`

const HeatMapContainer = styled.div`
  background: #1e1e2e;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  animation: ${glowAnimation} 3s infinite;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 229, 255, 0.2);
  }
`

const HeatMapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin: 20px 0;
  aspect-ratio: 3/2;
`

const HeatMapCell = styled.div`
  background: ${(props) => {
    const intensity = props.$intensity
    if (intensity >= 80) return "rgba(220, 53, 69, 0.8)" // High danger - red
    if (intensity >= 60) return "rgba(255, 193, 7, 0.8)" // Medium - yellow
    if (intensity >= 40) return "rgba(255, 152, 0, 0.8)" // Low-medium - orange
    if (intensity >= 20) return "rgba(6, 214, 160, 0.6)" // Low - green
    return "rgba(0, 229, 255, 0.3)" // Very low - cyan
  }};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
    z-index: 10;
    box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${scanAnimation} 4s infinite;
  }
`

const HeatMapLegend = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 11px;
  color: #a0a0a0;
`

const LegendScale = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const LegendColorBox = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${(props) => props.$color};
`

const DispatchPanel = styled.div`
  background: #1e1e2e;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  margin-top: 16px;
`

const DispatchButton = styled.button`
  background: ${(props) => (props.$type === "drone" ? "rgba(0, 229, 255, 0.1)" : "rgba(6, 214, 160, 0.1)")};
  border: 1px solid ${(props) => (props.$type === "drone" ? "#00E5FF" : "#06d6a0")};
  color: ${(props) => (props.$type === "drone" ? "#00E5FF" : "#06d6a0")};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-right: 8px;

  &:hover {
    background: ${(props) => (props.$type === "drone" ? "rgba(0, 229, 255, 0.2)" : "rgba(6, 214, 160, 0.2)")};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const DispatchInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const DispatchButtons = styled.div`
  display: flex;
  gap: 8px;
`

const RotatingIcon = styled(TrendingUp)`
  animation: ${rotateAnimation} 3s linear infinite;
`;

const DataAnalysis = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("trends")
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [selectedZone, setSelectedZone] = useState(null)
  const [dispatchStatus, setDispatchStatus] = useState({})

  const [activityFeed, setActivityFeed] = useState([])

  const [detectedPlates, setDetectedPlates] = useState([
    { id: "ABC-123", location: "Camera 01", status: "active", time: "2 min ago" },
    { id: "XYZ-789", location: "Camera 05", status: "watch", time: "5 min ago" },
    { id: "DEF-456", location: "Camera 12", status: "cleared", time: "8 min ago" },
    { id: "GHI-321", location: "Camera 03", status: "active", time: "12 min ago" },
    { id: "JKL-654", location: "Camera 08", status: "watch", time: "15 min ago" },
  ])

  const [detectedFaces, setDetectedFaces] = useState([
    { id: "Person-001", name: "John Smith", status: "active", time: "1 min ago" },
    { id: "Person-047", name: "Unknown", status: "watch", time: "4 min ago" },
    { id: "Person-023", name: "Jane Doe", status: "cleared", time: "7 min ago" },
    { id: "Person-089", name: "Mike Johnson", status: "active", time: "10 min ago" },
    { id: "Person-156", name: "Unknown", status: "watch", time: "13 min ago" },
  ])

  const [metrics, setMetrics] = useState({
    activeCameras: 24,
    detectionsToday: 156,
    systemUptime: 98.5,
    activeAlerts: 3,
  })

  const [chartData] = useState({
    detectionTypes: [
      { label: "Face Recognition", value: 45, color: "#06d6a0" },
      { label: "License Plates", value: 35, color: "#ffc107" },
      { label: "Security Alerts", value: 15, color: "#dc3545" },
      { label: "System Events", value: 5, color: "#00E5FF" },
    ],
    hourlyTrends: [
      { hour: "00:00", faces: 12, plates: 8, alerts: 2 },
      { hour: "06:00", faces: 25, plates: 18, alerts: 1 },
      { hour: "12:00", faces: 45, plates: 32, alerts: 5 },
      { hour: "18:00", faces: 38, plates: 28, alerts: 3 },
    ],
  })

  const [heatMapData] = useState([
    { id: "A1", intensity: 25, zone: "North Entrance", cameras: 3 },
    { id: "A2", intensity: 45, zone: "Parking Lot A", cameras: 2 },
    { id: "A3", intensity: 15, zone: "Garden Area", cameras: 1 },
    { id: "A4", intensity: 85, zone: "Main Plaza", cameras: 4 },
    { id: "A5", intensity: 65, zone: "Food Court", cameras: 3 },
    { id: "A6", intensity: 30, zone: "East Wing", cameras: 2 },

    { id: "B1", intensity: 40, zone: "West Entrance", cameras: 2 },
    { id: "B2", intensity: 75, zone: "Central Hub", cameras: 5 },
    { id: "B3", intensity: 55, zone: "Retail Zone", cameras: 3 },
    { id: "B4", intensity: 90, zone: "Security Checkpoint", cameras: 6 },
    { id: "B5", intensity: 35, zone: "Quiet Zone", cameras: 1 },
    { id: "B6", intensity: 20, zone: "Storage Area", cameras: 1 },
  ])

  const createPieChart = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = 0

    return data.map((item, index) => {
      const percentage = item.value / total
      const angle = percentage * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle

      const x1 = 100 + 80 * Math.cos(((startAngle - 90) * Math.PI) / 180)
      const y1 = 100 + 80 * Math.sin(((startAngle - 90) * Math.PI) / 180)
      const x2 = 100 + 80 * Math.cos(((endAngle - 90) * Math.PI) / 180)
      const y2 = 100 + 80 * Math.sin(((endAngle - 90) * Math.PI) / 180)

      const largeArcFlag = angle > 180 ? 1 : 0

      const pathData = [`M 100 100`, `L ${x1} ${y1}`, `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`, "Z"].join(" ")

      currentAngle += angle

      return {
        ...item,
        pathData,
        percentage: Math.round(percentage * 100),
      }
    })
  }

  const handleItemClick = (item, type) => {
    setModalData({ item, type })
    setShowModal(true)
  }

  const handleZoneClick = (zone) => {
    setSelectedZone(zone)
    setModalData({ item: zone, type: "heatmap" })
    setShowModal(true)
  }

  const handleDispatch = (zoneId, type) => {
    setDispatchStatus((prev) => ({
      ...prev,
      [zoneId]: { type, status: "dispatched", time: new Date().toLocaleTimeString() },
    }))

    // Add to activity feed
    const newActivity = {
      id: Date.now().toString(),
      type: "system",
      title: `${type === "drone" ? "Drone" : "Ground Unit"} Dispatched`,
      details: `${type === "drone" ? "Surveillance drone" : "Security team"} sent to ${selectedZone?.zone}`,
      time: "Just now",
    }

    setActivityFeed((prev) => [newActivity, ...prev.slice(0, 9)])
    setShowModal(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const activities = [
        { type: "face", title: "Face Detected", details: "Unknown individual at Camera 05" },
        { type: "plate", title: "License Plate Scanned", details: "ABC-123 detected at Main Entrance" },
        { type: "alert", title: "Security Alert", details: "Suspicious activity detected" },
        { type: "system", title: "System Update", details: "Camera 12 back online" },
      ]

      const randomActivity = activities[Math.floor(Math.random() * activities.length)]
      const newActivity = {
        id: Date.now().toString(),
        ...randomActivity,
        time: "Just now",
      }

      setActivityFeed((prev) => [newActivity, ...prev.slice(0, 9)])

      setMetrics((prev) => ({
        ...prev,
        detectionsToday: prev.detectionsToday + Math.floor(Math.random() * 3),
        activeAlerts: Math.max(0, prev.activeAlerts + (Math.random() > 0.7 ? 1 : -1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const pieChartData = createPieChart(chartData.detectionTypes)

  return (
    <Container>
      <Header>
        <BackButton onClick={() => onNavigate("dashboard")}>
          <ArrowLeft size={20} />
        </BackButton>
        <Title>
          <Cpu size={32} />
          Data Analysis Engine
          <StatusIndicator />
        </Title>
      </Header>

      <NavigationTabs>
        <TabButton $active={activeTab === "trends"} onClick={() => setActiveTab("trends")}>
          <TrendingUp size={16} />
          Trends
        </TabButton>
        <TabButton $active={activeTab === "realtime"} onClick={() => setActiveTab("realtime")}>
          <Target size={16} />
          Real-time Tracking
        </TabButton>
        <TabButton $active={activeTab === "heatmap"} onClick={() => setActiveTab("heatmap")}>
          <MapPin size={16} />
          Heat Map
        </TabButton>
      </NavigationTabs>

      <ContentContainer>
        <MainGrid $activeTab={activeTab}>
          <LeftPanel>
            <SystemOverview>
              <FeedHeader>
                <Activity size={16} />
                System Overview
              </FeedHeader>
              <OverviewGrid>
                <MetricCard onClick={() => handleItemClick(metrics, "cameras")}>
                  <MetricValue>{metrics.activeCameras}</MetricValue>
                  <MetricLabel>Active Cameras</MetricLabel>
                </MetricCard>
                <MetricCard onClick={() => handleItemClick(metrics, "detections")}>
                  <MetricValue>{metrics.detectionsToday}</MetricValue>
                  <MetricLabel>Detections Today</MetricLabel>
                </MetricCard>
                <MetricCard onClick={() => handleItemClick(metrics, "uptime")}>
                  <MetricValue>{metrics.systemUptime}%</MetricValue>
                  <MetricLabel>System Uptime</MetricLabel>
                </MetricCard>
                <MetricCard onClick={() => handleItemClick(metrics, "alerts")}>
                  <MetricValue>{metrics.activeAlerts}</MetricValue>
                  <MetricLabel>Active Alerts</MetricLabel>
                </MetricCard>
              </OverviewGrid>
            </SystemOverview>

            {activeTab === "trends" ? (
              <ChartContainer onClick={() => handleItemClick(chartData.detectionTypes, "chart")}>
                <FeedHeader>
                  <PieChart size={16} />
                  Detection Distribution
                </FeedHeader>
                <PieChartSVG viewBox="0 0 200 200">
                  {pieChartData.map((slice, index) => (
                    <PieSlice key={index} d={slice.pathData} fill={slice.color} stroke="#1e1e2e" strokeWidth="2" />
                  ))}
                </PieChartSVG>
                <ChartLegend>
                  {pieChartData.map((item, index) => (
                    <LegendItem key={index}>
                      <LegendColor $color={item.color} />
                      <span>
                        {item.label}: {item.percentage}%
                      </span>
                    </LegendItem>
                  ))}
                </ChartLegend>
              </ChartContainer>
            ) : activeTab === "heatmap" ? (
              <HeatMapContainer>
                <FeedHeader>
                  <MapPin size={16} />
                  Surveillance Heat Map
                </FeedHeader>
                <HeatMapGrid>
                  {heatMapData.map((zone) => (
                    <HeatMapCell
                      key={zone.id}
                      $intensity={zone.intensity}
                      onClick={() => handleZoneClick(zone)}
                      title={`${zone.zone}: ${zone.intensity}% activity`}
                    >
                      {zone.id}
                    </HeatMapCell>
                  ))}
                </HeatMapGrid>
                <HeatMapLegend>
                  <LegendScale>
                    <span>Activity Level:</span>
                    <LegendColorBox $color="rgba(0, 229, 255, 0.3)" />
                    <span>Low</span>
                    <LegendColorBox $color="rgba(6, 214, 160, 0.6)" />
                    <span>Medium</span>
                    <LegendColorBox $color="rgba(255, 193, 7, 0.8)" />
                    <span>High</span>
                    <LegendColorBox $color="rgba(220, 53, 69, 0.8)" />
                    <span>Critical</span>
                  </LegendScale>
                  <span>Click zones to dispatch units</span>
                </HeatMapLegend>
              </HeatMapContainer>
            ) : (
              <ActivityFeed>
                <FeedHeader>
                  <Zap size={16} />
                  Real-Time Activity Feed
                </FeedHeader>
                <FeedList>
                  {activityFeed.map((item) => (
                    <FeedItem key={item.id} $type={item.type} onClick={() => handleItemClick(item, "activity")}>
                      <FeedIcon $type={item.type}>
                        {item.type === "face" && <Users size={16} />}
                        {item.type === "plate" && <Car size={16} />}
                        {item.type === "alert" && <AlertTriangle size={16} />}
                        {item.type === "system" && <CheckCircle size={16} />}
                      </FeedIcon>
                      <FeedContent>
                        <FeedTitle>{item.title}</FeedTitle>
                        <FeedDetails>{item.details}</FeedDetails>
                      </FeedContent>
                      <FeedTime>{item.time}</FeedTime>
                    </FeedItem>
                  ))}
                </FeedList>
              </ActivityFeed>
            )}
          </LeftPanel>

          <RightPanel>
            {activeTab === "trends" ? (
              <ChartContainer onClick={() => handleItemClick(chartData.hourlyTrends, "trends")}>
                <FeedHeader>
                  <BarChart3 size={16} />
                  Hourly Trends
                </FeedHeader>
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", color: "#00E5FF", marginBottom: "16px" }}>
                    {/* <TrendingUp size={48} style={{ animation: `${rotateAnimation} 3s linear infinite` }} /> */}
                    <RotatingIcon size={48} />
                  </div>
                  <div style={{ color: "#a0a0a0", fontSize: "14px" }}>
                    Peak Activity: 12:00 PM
                    <br />
                    Average Detection Rate: 28/hour
                    <br />
                    Trend: ↗ +15% from yesterday
                  </div>
                </div>
              </ChartContainer>
            ) : activeTab === "heatmap" ? (
              <DetectionPanel>
                <DetectionHeader>
                  <Radio size={16} />
                  Active Dispatches
                </DetectionHeader>
                <DetectionList>
                  {Object.entries(dispatchStatus).map(([zoneId, dispatch]) => {
                    const zone = heatMapData.find((z) => z.id === zoneId)
                    return (
                      <DetectionItem key={zoneId}>
                        <DetectionInfo>
                          <DetectionId>{zone?.zone}</DetectionId>
                          <DetectionMeta>
                            {dispatch.type === "drone" ? "Drone Unit" : "Ground Team"} • {dispatch.time}
                          </DetectionMeta>
                        </DetectionInfo>
                        <DetectionStatus $status="active">{dispatch.status}</DetectionStatus>
                      </DetectionItem>
                    )
                  })}
                  {Object.keys(dispatchStatus).length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#a0a0a0",
                        padding: "40px 20px",
                        fontSize: "14px",
                      }}
                    >
                      No active dispatches
                      <br />
                      <span style={{ fontSize: "12px" }}>Click on heat map zones to deploy units</span>
                    </div>
                  )}
                </DetectionList>
              </DetectionPanel>
            ) : (
              <>
                <DetectionPanel>
                  <DetectionHeader>
                    <Car size={16} />
                    Detected Plates
                  </DetectionHeader>
                  <DetectionList>
                    {detectedPlates.map((plate) => (
                      <DetectionItem key={plate.id} onClick={() => handleItemClick(plate, "plate")}>
                        <DetectionInfo>
                          <DetectionId>{plate.id}</DetectionId>
                          <DetectionMeta>
                            {plate.location} • {plate.time}
                          </DetectionMeta>
                        </DetectionInfo>
                        <DetectionStatus $status={plate.status}>{plate.status}</DetectionStatus>
                      </DetectionItem>
                    ))}
                  </DetectionList>
                </DetectionPanel>

                <DetectionPanel>
                  <DetectionHeader>
                    <Users size={16} />
                    Identified Individuals
                  </DetectionHeader>
                  <DetectionList>
                    {detectedFaces.map((face) => (
                      <DetectionItem key={face.id} onClick={() => handleItemClick(face, "face")}>
                        <DetectionInfo>
                          <DetectionId>{face.name}</DetectionId>
                          <DetectionMeta>
                            {face.id} • {face.time}
                          </DetectionMeta>
                        </DetectionInfo>
                        <DetectionStatus $status={face.status}>{face.status}</DetectionStatus>
                      </DetectionItem>
                    ))}
                  </DetectionList>
                </DetectionPanel>
              </>
            )}
          </RightPanel>
        </MainGrid>
      </ContentContainer>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {modalData?.type === "chart"
                  ? "Detection Analytics"
                  : modalData?.type === "activity"
                    ? "Activity Details"
                    : modalData?.type === "plate"
                      ? "License Plate Details"
                      : modalData?.type === "face"
                        ? "Individual Details"
                        : modalData?.type === "heatmap"
                          ? "Zone Surveillance Details"
                          : "System Information"}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <div style={{ color: "#a0a0a0", lineHeight: "1.6" }}>
              {modalData?.type === "heatmap" && (
                <div>
                  <p>
                    <strong>Zone:</strong> {modalData.item.zone}
                  </p>
                  <p>
                    <strong>Activity Level:</strong> {modalData.item.intensity}%
                  </p>
                  <p>
                    <strong>Active Cameras:</strong> {modalData.item.cameras}
                  </p>
                  <p>
                    <strong>Risk Assessment:</strong>{" "}
                    {modalData.item.intensity >= 80
                      ? "Critical - Immediate attention required"
                      : modalData.item.intensity >= 60
                        ? "High - Monitor closely"
                        : modalData.item.intensity >= 40
                          ? "Medium - Standard surveillance"
                          : "Low - Normal activity"}
                  </p>

                  <DispatchPanel>
                    <DispatchInfo>
                      <span style={{ color: "#00E5FF", fontWeight: "600" }}>Deploy Response Unit:</span>
                    </DispatchInfo>
                    <DispatchButtons>
                      <DispatchButton
                        $type="drone"
                        onClick={() => handleDispatch(modalData.item.id, "drone")}
                        disabled={dispatchStatus[modalData.item.id]?.type === "drone"}
                      >
                        <Plane size={14} />
                        Deploy Drone
                      </DispatchButton>
                      <DispatchButton
                        $type="ground"
                        onClick={() => handleDispatch(modalData.item.id, "ground")}
                        disabled={dispatchStatus[modalData.item.id]?.type === "ground"}
                      >
                        <Shield size={14} />
                        Send Ground Unit
                      </DispatchButton>
                    </DispatchButtons>
                    {dispatchStatus[modalData.item.id] && (
                      <div
                        style={{
                          marginTop: "12px",
                          padding: "8px",
                          background: "rgba(6, 214, 160, 0.1)",
                          borderRadius: "4px",
                          fontSize: "12px",
                          color: "#06d6a0",
                        }}
                      >
                        ✓ {dispatchStatus[modalData.item.id].type === "drone" ? "Drone" : "Ground unit"} dispatched at{" "}
                        {dispatchStatus[modalData.item.id].time}
                      </div>
                    )}
                  </DispatchPanel>
                </div>
              )}
              {modalData?.type === "chart" && (
                <div>
                  <p>Real-time detection distribution across all active surveillance systems.</p>
                  <ul>
                    {modalData.item.map((item, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        <strong style={{ color: item.color }}>{item.label}</strong>: {item.value} detections (
                        {Math.round((item.value / modalData.item.reduce((sum, i) => sum + i.value, 0)) * 100)}%)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {modalData?.type === "activity" && (
                <div>
                  <p>
                    <strong>Event:</strong> {modalData.item.title}
                  </p>
                  <p>
                    <strong>Details:</strong> {modalData.item.details}
                  </p>
                  <p>
                    <strong>Time:</strong> {modalData.item.time}
                  </p>
                  <p>
                    <strong>Type:</strong> {modalData.item.type.toUpperCase()}
                  </p>
                </div>
              )}
              {modalData?.type === "plate" && (
                <div>
                  <p>
                    <strong>License Plate:</strong> {modalData.item.id}
                  </p>
                  <p>
                    <strong>Location:</strong> {modalData.item.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {modalData.item.status.toUpperCase()}
                  </p>
                  <p>
                    <strong>Last Seen:</strong> {modalData.item.time}
                  </p>
                  <p>
                    <strong>Confidence:</strong> 98.5%
                  </p>
                </div>
              )}
              {modalData?.type === "face" && (
                <div>
                  <p>
                    <strong>Individual:</strong> {modalData.item.name}
                  </p>
                  <p>
                    <strong>ID:</strong> {modalData.item.id}
                  </p>
                  <p>
                    <strong>Status:</strong> {modalData.item.status.toUpperCase()}
                  </p>
                  <p>
                    <strong>Last Seen:</strong> {modalData.item.time}
                  </p>
                  <p>
                    <strong>Confidence:</strong> 94.2%
                  </p>
                </div>
              )}
              {(modalData?.type === "cameras" ||
                modalData?.type === "detections" ||
                modalData?.type === "uptime" ||
                modalData?.type === "alerts") && (
                <div>
                  <p>System metrics are updated in real-time from all connected surveillance devices.</p>
                  <p>
                    <strong>Current Status:</strong> All systems operational
                  </p>
                  <p>
                    <strong>Last Update:</strong> Just now
                  </p>
                </div>
              )}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  )
}

export default DataAnalysis













// "use client"

// import { useState, useEffect } from "react"
// import styled, { keyframes } from "styled-components"
// import {
//   ArrowLeft,
//   Activity,
//   Users,
//   Car,
//   Zap,
//   AlertTriangle,
//   CheckCircle,
//   Cpu,
//   TrendingUp,
//   BarChart3,
//   PieChart,
//   Target,
//   X,
// } from "lucide-react"

// const slideInAnimation = keyframes`
//   0% { transform: translateY(30px); opacity: 0; }
//   100% { transform: translateY(0); opacity: 1; }
// `

// const fadeInAnimation = keyframes`
//   0% { opacity: 0; }
//   100% { opacity: 1; }
// `

// const pulseAnimation = keyframes`
//   0% { opacity: 0.4; transform: scale(1); }
//   50% { opacity: 1; transform: scale(1.05); }
//   100% { opacity: 0.4; transform: scale(1); }
// `

// const scanAnimation = keyframes`
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// `

// const dataFlowAnimation = keyframes`
//   0% { transform: translateY(0) rotate(0deg); opacity: 0; }
//   50% { opacity: 1; }
//   100% { transform: translateY(-20px) rotate(180deg); opacity: 0; }
// `

// const glowAnimation = keyframes`
//   0% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.3); }
//   50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.6), 0 0 30px rgba(0, 229, 255, 0.3); }
//   100% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.3); }
// `

// const rotateAnimation = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `

// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
//   color: #ffffff;
//   padding: 24px;
//   overflow-x: hidden;
//   animation: ${fadeInAnimation} 0.8s ease-out;
// `

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   margin-bottom: 32px;
//   padding-bottom: 16px;
//   border-bottom: 1px solid rgba(0, 229, 255, 0.2);
//   animation: ${slideInAnimation} 0.6s ease-out;
// `

// const BackButton = styled.button`
//   background: none;
//   border: none;
//   color: #00E5FF;
//   cursor: pointer;
//   padding: 8px;
//   border-radius: 8px;
//   transition: all 0.2s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background: rgba(0, 229, 255, 0.1);
//     transform: translateX(-2px);
//   }
// `

// const Title = styled.h1`
//   font-size: 32px;
//   font-weight: 700;
//   color: #ffffff;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   margin: 0;
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `

// const StatusIndicator = styled.div`
//   width: 12px;
//   height: 12px;
//   background: #06d6a0;
//   border-radius: 50%;
//   animation: ${pulseAnimation} 2s infinite;
// `

// const NavigationTabs = styled.div`
//   display: flex;
//   gap: 8px;
//   margin-bottom: 24px;
//   animation: ${slideInAnimation} 0.8s ease-out 0.2s both;
// `

// const TabButton = styled.button`
//   background: ${(props) => (props.$active ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 229, 255, 0.05)")};
//   border: 1px solid ${(props) => (props.$active ? "#00E5FF" : "rgba(0, 229, 255, 0.1)")};
//   color: ${(props) => (props.$active ? "#00E5FF" : "#a0a0a0")};
//   padding: 12px 24px;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   transition: all 0.3s ease;
//   display: flex;
//   align-items: center;
//   gap: 8px;

//   &:hover {
//     background: rgba(0, 229, 255, 0.15);
//     color: #00E5FF;
//     transform: translateY(-2px);
//   }
// `

// const ContentContainer = styled.div`
//   animation: ${slideInAnimation} 1s ease-out 0.4s both;
// `

// const MainGrid = styled.div`
//   display: grid;
//   grid-template-columns: ${(props) => (props.$activeTab === "trends" ? "1fr 1fr" : "1fr 350px")};
//   gap: 24px;
//   min-height: calc(100vh - 200px);
// `

// const LeftPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
// `

// const RightPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `

// const ChartContainer = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 24px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   animation: ${glowAnimation} 3s infinite;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 8px 25px rgba(0, 229, 255, 0.2);
//   }
// `

// const PieChartSVG = styled.svg`
//   width: 200px;
//   height: 200px;
//   margin: 0 auto;
//   display: block;
// `

// const PieSlice = styled.path`
//   transition: all 0.3s ease;
//   cursor: pointer;

//   &:hover {
//     transform: scale(1.05);
//     filter: brightness(1.2);
//   }
// `

// const ChartLegend = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 16px;
//   margin-top: 16px;
//   justify-content: center;
// `

// const LegendItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 12px;
// `

// const LegendColor = styled.div`
//   width: 12px;
//   height: 12px;
//   border-radius: 2px;
//   background: ${(props) => props.$color};
// `

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.8);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   animation: ${fadeInAnimation} 0.3s ease-out;
// `

// const ModalContent = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 32px;
//   border: 1px solid rgba(0, 229, 255, 0.2);
//   max-width: 500px;
//   width: 90%;
//   animation: ${slideInAnimation} 0.3s ease-out;
// `

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 24px;
// `

// const ModalTitle = styled.h3`
//   color: #00E5FF;
//   margin: 0;
//   font-size: 20px;
//   font-weight: 600;
// `

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   color: #a0a0a0;
//   cursor: pointer;
//   padding: 4px;
//   border-radius: 4px;
//   transition: all 0.2s ease;

//   &:hover {
//     color: #00E5FF;
//     background: rgba(0, 229, 255, 0.1);
//   }
// `

// const SystemOverview = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 24px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   animation: ${glowAnimation} 3s infinite;
// `

// const OverviewGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 16px;
//   margin-bottom: 24px;
// `

// const MetricCard = styled.div`
//   background: rgba(0, 229, 255, 0.05);
//   border-radius: 8px;
//   padding: 16px;
//   text-align: center;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   position: relative;
//   overflow: hidden;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     background: rgba(0, 229, 255, 0.1);
//   }

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, #00E5FF, transparent);
//     animation: ${scanAnimation} 3s infinite;
//   }
// `

// const MetricValue = styled.div`
//   font-size: 24px;
//   font-weight: 700;
//   color: #00E5FF;
//   margin-bottom: 4px;
// `

// const MetricLabel = styled.div`
//   font-size: 12px;
//   color: #a0a0a0;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const ActivityFeed = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 20px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   flex: 1;
//   overflow: hidden;
// `

// const FeedHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-bottom: 16px;
//   color: #00E5FF;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const FeedList = styled.div`
//   height: 300px;
//   overflow-y: auto;
  
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: rgba(0, 229, 255, 0.1);
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: #00E5FF;
//     border-radius: 2px;
//   }
// `

// const FeedItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 12px;
//   margin-bottom: 8px;
//   background: rgba(0, 229, 255, 0.03);
//   border-radius: 8px;
//   border-left: 3px solid ${(props) =>
//     props.$type === "face"
//       ? "#06d6a0"
//       : props.$type === "plate"
//         ? "#ffc107"
//         : props.$type === "alert"
//           ? "#dc3545"
//           : "#00E5FF"};
//   animation: ${dataFlowAnimation} 0.5s ease-out;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background: rgba(0, 229, 255, 0.08);
//     transform: translateX(4px);
//   }
// `

// const FeedIcon = styled.div`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: ${(props) =>
//     props.$type === "face"
//       ? "rgba(6, 214, 160, 0.2)"
//       : props.$type === "plate"
//         ? "rgba(255, 193, 7, 0.2)"
//         : props.$type === "alert"
//           ? "rgba(220, 53, 69, 0.2)"
//           : "rgba(0, 229, 255, 0.2)"};
//   color: ${(props) =>
//     props.$type === "face"
//       ? "#06d6a0"
//       : props.$type === "plate"
//         ? "#ffc107"
//         : props.$type === "alert"
//           ? "#dc3545"
//           : "#00E5FF"};
// `

// const FeedContent = styled.div`
//   flex: 1;
// `

// const FeedTitle = styled.div`
//   font-weight: 600;
//   color: #ffffff;
//   margin-bottom: 2px;
// `

// const FeedDetails = styled.div`
//   font-size: 12px;
//   color: #a0a0a0;
// `

// const FeedTime = styled.div`
//   font-size: 11px;
//   color: #6c757d;
// `

// const DetectionPanel = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 20px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   height: 300px;
// `

// const DetectionHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: between;
//   gap: 8px;
//   margin-bottom: 16px;
//   color: #00E5FF;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const DetectionList = styled.div`
//   height: 220px;
//   overflow-y: auto;
  
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: rgba(0, 229, 255, 0.1);
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: #00E5FF;
//     border-radius: 2px;
//   }
// `

// const DetectionItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 8px 12px;
//   margin-bottom: 6px;
//   background: rgba(0, 229, 255, 0.03);
//   border-radius: 6px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   transition: all 0.2s ease;
//   cursor: pointer;

//   &:hover {
//     background: rgba(0, 229, 255, 0.08);
//     border-color: rgba(0, 229, 255, 0.3);
//     transform: translateX(4px);
//   }
// `

// const DetectionInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const DetectionId = styled.div`
//   font-weight: 600;
//   color: #ffffff;
//   font-size: 14px;
// `

// const DetectionMeta = styled.div`
//   font-size: 11px;
//   color: #a0a0a0;
// `

// const DetectionStatus = styled.div`
//   padding: 4px 8px;
//   border-radius: 4px;
//   font-size: 10px;
//   font-weight: 600;
//   text-transform: uppercase;
//   background: ${(props) =>
//     props.$status === "active"
//       ? "rgba(6, 214, 160, 0.2)"
//       : props.$status === "watch"
//         ? "rgba(255, 193, 7, 0.2)"
//         : "rgba(108, 117, 125, 0.2)"};
//   color: ${(props) => (props.$status === "active" ? "#06d6a0" : props.$status === "watch" ? "#ffc107" : "#6c757d")};
// `

// // const rotateAnimation = keyframes`
// //   from {
// //     transform: rotate(0deg);
// //   }
// //   to {
// //     transform: rotate(360deg);
// //   }
// // `;

// const RotatingIcon = styled(TrendingUp)`
//   animation: ${rotateAnimation} 3s linear infinite;
// `;

// const DataAnalysis = ({ onNavigate }) => {
//   const [activeTab, setActiveTab] = useState("trends")
//   const [showModal, setShowModal] = useState(false)
//   const [modalData, setModalData] = useState(null)

//   const [activityFeed, setActivityFeed] = useState([])

//   const [detectedPlates, setDetectedPlates] = useState([
//     { id: "ABC-123", location: "Camera 01", status: "active", time: "2 min ago" },
//     { id: "XYZ-789", location: "Camera 05", status: "watch", time: "5 min ago" },
//     { id: "DEF-456", location: "Camera 12", status: "cleared", time: "8 min ago" },
//     { id: "GHI-321", location: "Camera 03", status: "active", time: "12 min ago" },
//     { id: "JKL-654", location: "Camera 08", status: "watch", time: "15 min ago" },
//   ])

//   const [detectedFaces, setDetectedFaces] = useState([
//     { id: "Person-001", name: "John Smith", status: "active", time: "1 min ago" },
//     { id: "Person-047", name: "Unknown", status: "watch", time: "4 min ago" },
//     { id: "Person-023", name: "Jane Doe", status: "cleared", time: "7 min ago" },
//     { id: "Person-089", name: "Mike Johnson", status: "active", time: "10 min ago" },
//     { id: "Person-156", name: "Unknown", status: "watch", time: "13 min ago" },
//   ])

//   const [metrics, setMetrics] = useState({
//     activeCameras: 24,
//     detectionsToday: 156,
//     systemUptime: 98.5,
//     activeAlerts: 3,
//   })

//   const [chartData] = useState({
//     detectionTypes: [
//       { label: "Face Recognition", value: 45, color: "#06d6a0" },
//       { label: "License Plates", value: 35, color: "#ffc107" },
//       { label: "Security Alerts", value: 15, color: "#dc3545" },
//       { label: "System Events", value: 5, color: "#00E5FF" },
//     ],
//     hourlyTrends: [
//       { hour: "00:00", faces: 12, plates: 8, alerts: 2 },
//       { hour: "06:00", faces: 25, plates: 18, alerts: 1 },
//       { hour: "12:00", faces: 45, plates: 32, alerts: 5 },
//       { hour: "18:00", faces: 38, plates: 28, alerts: 3 },
//     ],
//   })

//   const createPieChart = (data) => {
//     const total = data.reduce((sum, item) => sum + item.value, 0)
//     let currentAngle = 0

//     return data.map((item, index) => {
//       const percentage = item.value / total
//       const angle = percentage * 360
//       const startAngle = currentAngle
//       const endAngle = currentAngle + angle

//       const x1 = 100 + 80 * Math.cos(((startAngle - 90) * Math.PI) / 180)
//       const y1 = 100 + 80 * Math.sin(((startAngle - 90) * Math.PI) / 180)
//       const x2 = 100 + 80 * Math.cos(((endAngle - 90) * Math.PI) / 180)
//       const y2 = 100 + 80 * Math.sin(((endAngle - 90) * Math.PI) / 180)

//       const largeArcFlag = angle > 180 ? 1 : 0

//       const pathData = [`M 100 100`, `L ${x1} ${y1}`, `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`, "Z"].join(" ")

//       currentAngle += angle

//       return {
//         ...item,
//         pathData,
//         percentage: Math.round(percentage * 100),
//       }
//     })
//   }

//   const handleItemClick = (item, type) => {
//     setModalData({ item, type })
//     setShowModal(true)
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const activities = [
//         { type: "face", title: "Face Detected", details: "Unknown individual at Camera 05" },
//         { type: "plate", title: "License Plate Scanned", details: "ABC-123 detected at Main Entrance" },
//         { type: "alert", title: "Security Alert", details: "Suspicious activity detected" },
//         { type: "system", title: "System Update", details: "Camera 12 back online" },
//       ]

//       const randomActivity = activities[Math.floor(Math.random() * activities.length)]
//       const newActivity = {
//         id: Date.now().toString(),
//         ...randomActivity,
//         time: "Just now",
//       }

//       setActivityFeed((prev) => [newActivity, ...prev.slice(0, 9)])

//       setMetrics((prev) => ({
//         ...prev,
//         detectionsToday: prev.detectionsToday + Math.floor(Math.random() * 3),
//         activeAlerts: Math.max(0, prev.activeAlerts + (Math.random() > 0.7 ? 1 : -1)),
//       }))
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])

//   const pieChartData = createPieChart(chartData.detectionTypes)

//   return (
//     <Container>
//       <Header>
//         <BackButton onClick={() => onNavigate("dashboard")}>
//           <ArrowLeft size={20} />
//         </BackButton>
//         <Title>
//           <Cpu size={32} />
//           Data Analysis Engine
//           <StatusIndicator />
//         </Title>
//       </Header>

//       <NavigationTabs>
//         <TabButton $active={activeTab === "trends"} onClick={() => setActiveTab("trends")}>
//           <TrendingUp size={16} />
//           Trends
//         </TabButton>
//         <TabButton $active={activeTab === "realtime"} onClick={() => setActiveTab("realtime")}>
//           <Target size={16} />
//           Real-time Tracking
//         </TabButton>
//       </NavigationTabs>

//       <ContentContainer>
//         <MainGrid $activeTab={activeTab}>
//           <LeftPanel>
//             <SystemOverview>
//               <FeedHeader>
//                 <Activity size={16} />
//                 System Overview
//               </FeedHeader>
//               <OverviewGrid>
//                 <MetricCard onClick={() => handleItemClick(metrics, "cameras")}>
//                   <MetricValue>{metrics.activeCameras}</MetricValue>
//                   <MetricLabel>Active Cameras</MetricLabel>
//                 </MetricCard>
//                 <MetricCard onClick={() => handleItemClick(metrics, "detections")}>
//                   <MetricValue>{metrics.detectionsToday}</MetricValue>
//                   <MetricLabel>Detections Today</MetricLabel>
//                 </MetricCard>
//                 <MetricCard onClick={() => handleItemClick(metrics, "uptime")}>
//                   <MetricValue>{metrics.systemUptime}%</MetricValue>
//                   <MetricLabel>System Uptime</MetricLabel>
//                 </MetricCard>
//                 <MetricCard onClick={() => handleItemClick(metrics, "alerts")}>
//                   <MetricValue>{metrics.activeAlerts}</MetricValue>
//                   <MetricLabel>Active Alerts</MetricLabel>
//                 </MetricCard>
//               </OverviewGrid>
//             </SystemOverview>

//             {activeTab === "trends" ? (
//               <ChartContainer onClick={() => handleItemClick(chartData.detectionTypes, "chart")}>
//                 <FeedHeader>
//                   <PieChart size={16} />
//                   Detection Distribution
//                 </FeedHeader>
//                 <PieChartSVG viewBox="0 0 200 200">
//                   {pieChartData.map((slice, index) => (
//                     <PieSlice key={index} d={slice.pathData} fill={slice.color} stroke="#1e1e2e" strokeWidth="2" />
//                   ))}
//                 </PieChartSVG>
//                 <ChartLegend>
//                   {pieChartData.map((item, index) => (
//                     <LegendItem key={index}>
//                       <LegendColor $color={item.color} />
//                       <span>
//                         {item.label}: {item.percentage}%
//                       </span>
//                     </LegendItem>
//                   ))}
//                 </ChartLegend>
//               </ChartContainer>
//             ) : (
//               <ActivityFeed>
//                 <FeedHeader>
//                   <Zap size={16} />
//                   Real-Time Activity Feed
//                 </FeedHeader>
//                 <FeedList>
//                   {activityFeed.map((item) => (
//                     <FeedItem key={item.id} $type={item.type} onClick={() => handleItemClick(item, "activity")}>
//                       <FeedIcon $type={item.type}>
//                         {item.type === "face" && <Users size={16} />}
//                         {item.type === "plate" && <Car size={16} />}
//                         {item.type === "alert" && <AlertTriangle size={16} />}
//                         {item.type === "system" && <CheckCircle size={16} />}
//                       </FeedIcon>
//                       <FeedContent>
//                         <FeedTitle>{item.title}</FeedTitle>
//                         <FeedDetails>{item.details}</FeedDetails>
//                       </FeedContent>
//                       <FeedTime>{item.time}</FeedTime>
//                     </FeedItem>
//                   ))}
//                 </FeedList>
//               </ActivityFeed>
//             )}
//           </LeftPanel>

//           <RightPanel>
//             {activeTab === "trends" ? (
//               <ChartContainer onClick={() => handleItemClick(chartData.hourlyTrends, "trends")}>
//                 <FeedHeader>
//                   <BarChart3 size={16} />
//                   Hourly Trends
//                 </FeedHeader>
//                 {/* <div style={{ textAlign: "center", padding: "40px 0" }}>
//                   <div style={{ fontSize: "48px", color: "#00E5FF", marginBottom: "16px" }}>
//                     <TrendingUp size={48} style={{ animation: `${rotateAnimation} 3s linear infinite` }} />
//                   </div>
//                   <div style={{ color: "#a0a0a0", fontSize: "14px" }}>
//                     Peak Activity: 12:00 PM
//                     <br />
//                     Average Detection Rate: 28/hour
//                     <br /> */}
//                     <div style={{ textAlign: "center", padding: "40px 0" }}>
//   <div style={{ fontSize: "48px", color: "#00E5FF", marginBottom: "16px" }}>
//     <RotatingIcon size={48} />
//   </div>
//   <div style={{ color: "#a0a0a0", fontSize: "14px" }}>
//     Peak Activity: 12:00 PM
//     <br />
//     Average Detection Rate: 28/hour
//     <br />
//                     Trend: ↗ +15% from yesterday
//                   </div>
//                 </div>
//               </ChartContainer>
//             ) : (
//               <>
//                 <DetectionPanel>
//                   <DetectionHeader>
//                     <Car size={16} />
//                     Detected Plates
//                   </DetectionHeader>
//                   <DetectionList>
//                     {detectedPlates.map((plate) => (
//                       <DetectionItem key={plate.id} onClick={() => handleItemClick(plate, "plate")}>
//                         <DetectionInfo>
//                           <DetectionId>{plate.id}</DetectionId>
//                           <DetectionMeta>
//                             {plate.location} • {plate.time}
//                           </DetectionMeta>
//                         </DetectionInfo>
//                         <DetectionStatus $status={plate.status}>{plate.status}</DetectionStatus>
//                       </DetectionItem>
//                     ))}
//                   </DetectionList>
//                 </DetectionPanel>

//                 <DetectionPanel>
//                   <DetectionHeader>
//                     <Users size={16} />
//                     Identified Individuals
//                   </DetectionHeader>
//                   <DetectionList>
//                     {detectedFaces.map((face) => (
//                       <DetectionItem key={face.id} onClick={() => handleItemClick(face, "face")}>
//                         <DetectionInfo>
//                           <DetectionId>{face.name}</DetectionId>
//                           <DetectionMeta>
//                             {face.id} • {face.time}
//                           </DetectionMeta>
//                         </DetectionInfo>
//                         <DetectionStatus $status={face.status}>{face.status}</DetectionStatus>
//                       </DetectionItem>
//                     ))}
//                   </DetectionList>
//                 </DetectionPanel>
//               </>
//             )}
//           </RightPanel>
//         </MainGrid>
//       </ContentContainer>

//       {showModal && (
//         <ModalOverlay onClick={() => setShowModal(false)}>
//           <ModalContent onClick={(e) => e.stopPropagation()}>
//             <ModalHeader>
//               <ModalTitle>
//                 {modalData?.type === "chart"
//                   ? "Detection Analytics"
//                   : modalData?.type === "activity"
//                     ? "Activity Details"
//                     : modalData?.type === "plate"
//                       ? "License Plate Details"
//                       : modalData?.type === "face"
//                         ? "Individual Details"
//                         : "System Information"}
//               </ModalTitle>
//               <CloseButton onClick={() => setShowModal(false)}>
//                 <X size={20} />
//               </CloseButton>
//             </ModalHeader>
//             <div style={{ color: "#a0a0a0", lineHeight: "1.6" }}>
//               {modalData?.type === "chart" && (
//                 <div>
//                   <p>Real-time detection distribution across all active surveillance systems.</p>
//                   <ul>
//                     {modalData.item.map((item, index) => (
//                       <li key={index} style={{ marginBottom: "8px" }}>
//                         <strong style={{ color: item.color }}>{item.label}</strong>: {item.value} detections (
//                         {Math.round((item.value / modalData.item.reduce((sum, i) => sum + i.value, 0)) * 100)}%)
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {modalData?.type === "activity" && (
//                 <div>
//                   <p>
//                     <strong>Event:</strong> {modalData.item.title}
//                   </p>
//                   <p>
//                     <strong>Details:</strong> {modalData.item.details}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {modalData.item.time}
//                   </p>
//                   <p>
//                     <strong>Type:</strong> {modalData.item.type.toUpperCase()}
//                   </p>
//                 </div>
//               )}
//               {modalData?.type === "plate" && (
//                 <div>
//                   <p>
//                     <strong>License Plate:</strong> {modalData.item.id}
//                   </p>
//                   <p>
//                     <strong>Location:</strong> {modalData.item.location}
//                   </p>
//                   <p>
//                     <strong>Status:</strong> {modalData.item.status.toUpperCase()}
//                   </p>
//                   <p>
//                     <strong>Last Seen:</strong> {modalData.item.time}
//                   </p>
//                   <p>
//                     <strong>Confidence:</strong> 98.5%
//                   </p>
//                 </div>
//               )}
//               {modalData?.type === "face" && (
//                 <div>
//                   <p>
//                     <strong>Individual:</strong> {modalData.item.name}
//                   </p>
//                   <p>
//                     <strong>ID:</strong> {modalData.item.id}
//                   </p>
//                   <p>
//                     <strong>Status:</strong> {modalData.item.status.toUpperCase()}
//                   </p>
//                   <p>
//                     <strong>Last Seen:</strong> {modalData.item.time}
//                   </p>
//                   <p>
//                     <strong>Confidence:</strong> 94.2%
//                   </p>
//                 </div>
//               )}
//               {(modalData?.type === "cameras" ||
//                 modalData?.type === "detections" ||
//                 modalData?.type === "uptime" ||
//                 modalData?.type === "alerts") && (
//                 <div>
//                   <p>System metrics are updated in real-time from all connected surveillance devices.</p>
//                   <p>
//                     <strong>Current Status:</strong> All systems operational
//                   </p>
//                   <p>
//                     <strong>Last Update:</strong> Just now
//                   </p>
//                 </div>
//               )}
//             </div>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </Container>
//   )
// }

// export default DataAnalysis













// "use client"


// import { useState, useEffect } from "react"
// import styled, { keyframes } from "styled-components"
// import { ArrowLeft, Activity, Camera, Users, Car, Zap, AlertTriangle, CheckCircle, Cpu } from "lucide-react"

// const pulseAnimation = keyframes`
//   0% { opacity: 0.4; transform: scale(1); }
//   50% { opacity: 1; transform: scale(1.05); }
//   100% { opacity: 0.4; transform: scale(1); }
// `

// const scanAnimation = keyframes`
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// `

// const dataFlowAnimation = keyframes`
//   0% { transform: translateY(0) rotate(0deg); opacity: 0; }
//   50% { opacity: 1; }
//   100% { transform: translateY(-20px) rotate(180deg); opacity: 0; }
// `

// const glowAnimation = keyframes`
//   0% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.3); }
//   50% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.6), 0 0 30px rgba(0, 229, 255, 0.3); }
//   100% { box-shadow: 0 0 5px rgba(0, 229, 255, 0.3); }
// `

// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
//   color: #ffffff;
//   padding: 24px;
//   overflow-x: hidden;
// `

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   margin-bottom: 32px;
//   padding-bottom: 16px;
//   border-bottom: 1px solid rgba(0, 229, 255, 0.2);
// `

// const BackButton = styled.button`
//   background: none;
//   border: none;
//   color: #00E5FF;
//   cursor: pointer;
//   padding: 8px;
//   border-radius: 8px;
//   transition: all 0.2s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background: rgba(0, 229, 255, 0.1);
//     transform: translateX(-2px);
//   }
// `

// const Title = styled.h1`
//   font-size: 32px;
//   font-weight: 700;
//   color: #ffffff;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   margin: 0;
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `

// const StatusIndicator = styled.div`
//   width: 12px;
//   height: 12px;
//   background: #06d6a0;
//   border-radius: 50%;
//   animation: ${pulseAnimation} 2s infinite;
// `

// const MainGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 350px;
//   gap: 24px;
//   height: calc(100vh - 120px);
// `

// const LeftPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
// `

// const RightPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `

// const SystemOverview = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 24px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   animation: ${glowAnimation} 3s infinite;
// `

// const OverviewGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 16px;
//   margin-bottom: 24px;
// `

// const MetricCard = styled.div`
//   background: rgba(0, 229, 255, 0.05);
//   border-radius: 8px;
//   padding: 16px;
//   text-align: center;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   position: relative;
//   overflow: hidden;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, #00E5FF, transparent);
//     animation: ${scanAnimation} 3s infinite;
//   }
// `

// const MetricValue = styled.div`
//   font-size: 24px;
//   font-weight: 700;
//   color: #00E5FF;
//   margin-bottom: 4px;
// `

// const MetricLabel = styled.div`
//   font-size: 12px;
//   color: #a0a0a0;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const ActivityFeed = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 20px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   flex: 1;
//   overflow: hidden;
// `

// const FeedHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-bottom: 16px;
//   color: #00E5FF;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const FeedList = styled.div`
//   height: 300px;
//   overflow-y: auto;
  
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: rgba(0, 229, 255, 0.1);
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: #00E5FF;
//     border-radius: 2px;
//   }
// `

// const FeedItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 12px;
//   margin-bottom: 8px;
//   background: rgba(0, 229, 255, 0.03);
//   border-radius: 8px;
//   border-left: 3px solid ${(props) =>
//     props.$type === "face"
//       ? "#06d6a0"
//       : props.$type === "plate"
//         ? "#ffc107"
//         : props.$type === "alert"
//           ? "#dc3545"
//           : "#00E5FF"};
//   animation: ${dataFlowAnimation} 0.5s ease-out;
// `

// const FeedIcon = styled.div`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: ${(props) =>
//     props.$type === "face"
//       ? "rgba(6, 214, 160, 0.2)"
//       : props.$type === "plate"
//         ? "rgba(255, 193, 7, 0.2)"
//         : props.$type === "alert"
//           ? "rgba(220, 53, 69, 0.2)"
//           : "rgba(0, 229, 255, 0.2)"};
//   color: ${(props) =>
//     props.$type === "face"
//       ? "#06d6a0"
//       : props.$type === "plate"
//         ? "#ffc107"
//         : props.$type === "alert"
//           ? "#dc3545"
//           : "#00E5FF"};
// `

// const FeedContent = styled.div`
//   flex: 1;
// `

// const FeedTitle = styled.div`
//   font-weight: 600;
//   color: #ffffff;
//   margin-bottom: 2px;
// `

// const FeedDetails = styled.div`
//   font-size: 12px;
//   color: #a0a0a0;
// `

// const FeedTime = styled.div`
//   font-size: 11px;
//   color: #6c757d;
// `

// const DetectionPanel = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 20px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   height: 300px;
// `

// const DetectionHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: between;
//   gap: 8px;
//   margin-bottom: 16px;
//   color: #00E5FF;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const DetectionList = styled.div`
//   height: 220px;
//   overflow-y: auto;
  
//   &::-webkit-scrollbar {
//     width: 4px;
//   }
  
//   &::-webkit-scrollbar-track {
//     background: rgba(0, 229, 255, 0.1);
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background: #00E5FF;
//     border-radius: 2px;
//   }
// `

// const DetectionItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 8px 12px;
//   margin-bottom: 6px;
//   background: rgba(0, 229, 255, 0.03);
//   border-radius: 6px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   transition: all 0.2s ease;

//   &:hover {
//     background: rgba(0, 229, 255, 0.08);
//     border-color: rgba(0, 229, 255, 0.3);
//   }
// `

// const DetectionInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const DetectionId = styled.div`
//   font-weight: 600;
//   color: #ffffff;
//   font-size: 14px;
// `

// const DetectionMeta = styled.div`
//   font-size: 11px;
//   color: #a0a0a0;
// `

// const DetectionStatus = styled.div`
//   padding: 4px 8px;
//   border-radius: 4px;
//   font-size: 10px;
//   font-weight: 600;
//   text-transform: uppercase;
//   background: ${(props) =>
//     props.$status === "active"
//       ? "rgba(6, 214, 160, 0.2)"
//       : props.$status === "watch"
//         ? "rgba(255, 193, 7, 0.2)"
//         : "rgba(108, 117, 125, 0.2)"};
//   color: ${(props) => (props.$status === "active" ? "#06d6a0" : props.$status === "watch" ? "#ffc107" : "#6c757d")};
// `

// const CameraGrid = styled.div`
//   background: #1e1e2e;
//   border-radius: 12px;
//   padding: 20px;
//   border: 1px solid rgba(0, 229, 255, 0.1);
//   flex: 1;
// `

// const CameraHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-bottom: 16px;
//   color: #00E5FF;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const CameraGridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 12px;
//   height: 200px;
// `

// const CameraFeed = styled.div`
//   background: #000;
//   border-radius: 8px;
//   border: 1px solid rgba(0, 229, 255, 0.2);
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: linear-gradient(45deg, transparent 30%, rgba(0, 229, 255, 0.1) 50%, transparent 70%);
//     animation: ${scanAnimation} 4s infinite;
//   }
// `

// const CameraImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `

// const CameraOverlay = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
//   padding: 8px;
//   color: #00E5FF;
//   font-size: 10px;
//   font-weight: 600;
// `



// // const DataAnalysis: React.FC<DataAnalysisProps> = ({ onNavigate }) => {
//     const DataAnalysis = ({ onNavigate }) => {

//   const [activityFeed, setActivityFeed] = useState([])


//   const [detectedPlates, setDetectedPlates] = useState([
//     { id: "ABC-123", location: "Camera 01", status: "active", time: "2 min ago" },
//     { id: "XYZ-789", location: "Camera 05", status: "watch", time: "5 min ago" },
//     { id: "DEF-456", location: "Camera 12", status: "cleared", time: "8 min ago" },
//     { id: "GHI-321", location: "Camera 03", status: "active", time: "12 min ago" },
//     { id: "JKL-654", location: "Camera 08", status: "watch", time: "15 min ago" },
//   ])

//   const [detectedFaces, setDetectedFaces] = useState([
//     { id: "Person-001", name: "John Smith", status: "active", time: "1 min ago" },
//     { id: "Person-047", name: "Unknown", status: "watch", time: "4 min ago" },
//     { id: "Person-023", name: "Jane Doe", status: "cleared", time: "7 min ago" },
//     { id: "Person-089", name: "Mike Johnson", status: "active", time: "10 min ago" },
//     { id: "Person-156", name: "Unknown", status: "watch", time: "13 min ago" },
//   ])

//   const [metrics, setMetrics] = useState({
//     activeCameras: 24,
//     detectionsToday: 156,
//     systemUptime: 98.5,
//     activeAlerts: 3,
//   })

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Simulate real-time activity
//       const activities = [
//         { type: "face", title: "Face Detected", details: "Unknown individual at Camera 05" },
//         { type: "plate", title: "License Plate Scanned", details: "ABC-123 detected at Main Entrance" },
//         { type: "alert", title: "Security Alert", details: "Suspicious activity detected" },
//         { type: "system", title: "System Update", details: "Camera 12 back online" },
//       ]

//       const randomActivity = activities[Math.floor(Math.random() * activities.length)]
//       const newActivity = {
//         id: Date.now().toString(),
//         ...randomActivity,
//         time: "Just now",
//       }

//       setActivityFeed((prev) => [newActivity, ...prev.slice(0, 9)])

//       // Update metrics
//       setMetrics((prev) => ({
//         ...prev,
//         detectionsToday: prev.detectionsToday + Math.floor(Math.random() * 3),
//         activeAlerts: Math.max(0, prev.activeAlerts + (Math.random() > 0.7 ? 1 : -1)),
//       }))
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <Container>
//       <Header>
//         <BackButton onClick={() => onNavigate("dashboard")}>
//           <ArrowLeft size={20} />
//         </BackButton>
//         <Title>
//           <Cpu size={32} />
//           Data Analysis Engine
//           <StatusIndicator />
//         </Title>
//       </Header>

//       <MainGrid>
//         <LeftPanel>
//           <SystemOverview>
//             <FeedHeader>
//               <Activity size={16} />
//               System Overview
//             </FeedHeader>
//             <OverviewGrid>
//               <MetricCard>
//                 <MetricValue>{metrics.activeCameras}</MetricValue>
//                 <MetricLabel>Active Cameras</MetricLabel>
//               </MetricCard>
//               <MetricCard>
//                 <MetricValue>{metrics.detectionsToday}</MetricValue>
//                 <MetricLabel>Detections Today</MetricLabel>
//               </MetricCard>
//               <MetricCard>
//                 <MetricValue>{metrics.systemUptime}%</MetricValue>
//                 <MetricLabel>System Uptime</MetricLabel>
//               </MetricCard>
//               <MetricCard>
//                 <MetricValue>{metrics.activeAlerts}</MetricValue>
//                 <MetricLabel>Active Alerts</MetricLabel>
//               </MetricCard>
//             </OverviewGrid>
//           </SystemOverview>

//           <CameraGrid>
//             <CameraHeader>
//               <Camera size={16} />
//               Live Camera Feeds
//             </CameraHeader>
//             <CameraGridContainer>
//               <CameraFeed>
//                 <CameraImage src="/traffic-camera-view-with-cars.jpg" alt="Camera 01" />
//                 <CameraOverlay>CAM-01 • ACTIVE</CameraOverlay>
//               </CameraFeed>
//               <CameraFeed>
//                 <CameraImage src="/highway-surveillance-camera.jpg" alt="Camera 02" />
//                 <CameraOverlay>CAM-02 • ACTIVE</CameraOverlay>
//               </CameraFeed>
//               <CameraFeed>
//                 <CameraImage src="/parking-lot-security-camera.png" alt="Camera 03" />
//                 <CameraOverlay>CAM-03 • ACTIVE</CameraOverlay>
//               </CameraFeed>
//               <CameraFeed>
//                 <CameraImage src="/intersection-traffic-camera.jpg" alt="Camera 04" />
//                 <CameraOverlay>CAM-04 • ACTIVE</CameraOverlay>
//               </CameraFeed>
//               <CameraFeed>
//                 <CameraImage src="/toll-booth-camera-view.jpg" alt="Camera 05" />
//                 <CameraOverlay>CAM-05 • ACTIVE</CameraOverlay>
//               </CameraFeed>
//               <CameraFeed>
//                 <CameraImage src="/bridge-traffic-monitoring.jpg" alt="Camera 06" />
//                 <CameraOverlay>CAM-06 • ACTIVE</CameraOverlay>
//               </CameraFeed>
//             </CameraGridContainer>
//           </CameraGrid>

//           <ActivityFeed>
//             <FeedHeader>
//               <Zap size={16} />
//               Real-Time Activity Feed
//             </FeedHeader>
//             <FeedList>
//               {activityFeed.map((item) => (
//                 <FeedItem key={item.id} $type={item.type}>
//                   <FeedIcon $type={item.type}>
//                     {item.type === "face" && <Users size={16} />}
//                     {item.type === "plate" && <Car size={16} />}
//                     {item.type === "alert" && <AlertTriangle size={16} />}
//                     {item.type === "system" && <CheckCircle size={16} />}
//                   </FeedIcon>
//                   <FeedContent>
//                     <FeedTitle>{item.title}</FeedTitle>
//                     <FeedDetails>{item.details}</FeedDetails>
//                   </FeedContent>
//                   <FeedTime>{item.time}</FeedTime>
//                 </FeedItem>
//               ))}
//             </FeedList>
//           </ActivityFeed>
//         </LeftPanel>

//         <RightPanel>
//           <DetectionPanel>
//             <DetectionHeader>
//               <Car size={16} />
//               Detected Plates
//             </DetectionHeader>
//             <DetectionList>
//               {detectedPlates.map((plate) => (
//                 <DetectionItem key={plate.id}>
//                   <DetectionInfo>
//                     <DetectionId>{plate.id}</DetectionId>
//                     <DetectionMeta>
//                       {plate.location} • {plate.time}
//                     </DetectionMeta>
//                   </DetectionInfo>
//                   <DetectionStatus $status={plate.status}>{plate.status}</DetectionStatus>
//                 </DetectionItem>
//               ))}
//             </DetectionList>
//           </DetectionPanel>

//           <DetectionPanel>
//             <DetectionHeader>
//               <Users size={16} />
//               Identified Individuals
//             </DetectionHeader>
//             <DetectionList>
//               {detectedFaces.map((face) => (
//                 <DetectionItem key={face.id}>
//                   <DetectionInfo>
//                     <DetectionId>{face.name}</DetectionId>
//                     <DetectionMeta>
//                       {face.id} • {face.time}
//                     </DetectionMeta>
//                   </DetectionInfo>
//                   <DetectionStatus $status={face.status}>{face.status}</DetectionStatus>
//                 </DetectionItem>
//               ))}
//             </DetectionList>
//           </DetectionPanel>
//         </RightPanel>
//       </MainGrid>
//     </Container>
//   )
// }

// export default DataAnalysis