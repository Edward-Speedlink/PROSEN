"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Shield, Camera, AlertTriangle, Bone as Drone, Users, Map, Activity, Eye } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { useNavigate } from "react-router-dom"

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 32px);
  min-height: calc(100vh - 70px);
  
  @media (max-width: 768px) {
    padding: clamp(12px, 4vw, 20px);
  }
`

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(24px, 4vw, 40px);
  padding-bottom: clamp(16px, 3vw, 24px);
  border-bottom: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.lightGray)};
  
  .header-info {
    .title {
      font-size: clamp(28px, 4vw, 36px);
      font-weight: 800;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      margin-bottom: ${(props) => props.theme.spacing.xs};
      background: linear-gradient(135deg, ${(props) => props.theme.colors.secondary.amber}, ${(props) => props.theme.colors.supportive.teal});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      font-size: clamp(14px, 2vw, 18px);
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
      font-weight: 500;
    }
  }
  
  .header-actions {
    display: flex;
    gap: ${(props) => props.theme.spacing.md};
    align-items: center;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: ${(props) => props.theme.spacing.sm};
    }
  }
`

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(16px, 3vw, 24px);
  margin-bottom: clamp(24px, 4vw, 40px);
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const StatsCard = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "rgba(0,0,0,0.1)")};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  .stats-content {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.lg};
    
    .icon {
      width: 64px;
      height: 64px;
      border-radius: ${(props) => props.theme.borderRadius.lg};
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, ${(props) => props.iconColor || props.theme.colors.secondary.amber}20, ${(props) => props.iconColor || props.theme.colors.secondary.amber}10);
      border: 2px solid ${(props) => props.iconColor || props.theme.colors.secondary.amber}30;
      
      svg {
        width: 30px;
        height: 30px;
        color: ${(props) => props.iconColor || props.theme.colors.secondary.amber};
      }
    }
    
    .details {
      flex: 1;
      
      .number {
        font-size: clamp(28px, 4vw, 36px);
        font-weight: 800;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        line-height: 1;
        margin-bottom: ${(props) => props.theme.spacing.xs};
      }
      
      .label {
        font-size: 14px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
      }
      
      .change {
        font-size: 12px;
        margin-top: 6px;
        font-weight: 600;
        
        &.positive {
          color: ${(props) => props.theme.colors.supportive.teal};
        }
        
        &.negative {
          color: ${(props) => props.theme.colors.secondary.red};
        }
      }
    }
  }
`

const AlertsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(16px, 3vw, 24px);
  margin-bottom: clamp(24px, 4vw, 40px);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.secondary.amber};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.supportive.teal};
  }
`

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-left: 4px solid ${(props) => {
    switch (props.priority) {
      case "critical":
        return props.theme.colors.secondary.red
      case "high":
        return props.theme.colors.secondary.amber
      default:
        return props.theme.colors.supportive.teal
    }
  }};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: clamp(12px, 2vw, 20px);
  margin-bottom: clamp(24px, 4vw, 40px);
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ActionButton = styled(Button)`
  height: 90px;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "rgba(255,255,255,0.2)")};
  background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : "rgba(255,255,255,0.05)")};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) => props.theme.colors.secondary.amber};
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "rgba(255,255,255,0.1)")};
  }
  
  svg {
    width: 26px;
    height: 26px;
    color: ${(props) => props.theme.colors.secondary.amber};
  }
  
  .action-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
  }
`

const SystemStatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(12px, 2vw, 18px);
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${(props) => props.theme.colors.secondary.amber};
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`

const LawEnforcementDashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    activeCameras: 0,
    activeDrones: 0,
    openComplaints: 0,
    activeSuspects: 0,
  })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        activeCameras: 127,
        activeDrones: 8,
        openComplaints: 23,
        activeSuspects: 5,
      })
      setLoading(false)
    }, 1000)
  }, [])

  const activeAlerts = [
    {
      id: 1,
      message: "Suspicious activity detected",
      location: "Downtown District - Camera #45",
      time: "2 minutes ago",
      priority: "critical",
      icon: <AlertTriangle />,
    },
    {
      id: 2,
      message: "Vehicle theft reported",
      location: "Parking Lot B - License: ABC-123",
      time: "15 minutes ago",
      priority: "high",
      icon: <Shield />,
    },
    {
      id: 3,
      message: "Face recognition match",
      location: "Main Street - Camera #12",
      time: "1 hour ago",
      priority: "normal",
      icon: <Eye />,
    },
    {
      id: 4,
      message: "Drone battery low",
      location: "Patrol Unit DR-003",
      time: "2 hours ago",
      priority: "normal",
      icon: <Drone />,
    },
  ]

  const systemStatus = [
    { name: "Camera Network", count: "127/130 Online", icon: <Camera />, status: "online" },
    { name: "Drone Fleet", count: "8/12 Active", icon: <Drone />, status: "active" },
    { name: "Database", count: "Connected", icon: <Activity />, status: "connected" },
    { name: "Face Recognition", count: "Processing", icon: <Eye />, status: "active" },
    { name: "Data Analysis ", count: "Processing", icon: <Eye />, status: "active" },

  ]

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <LoadingSpinner size="lg" text="Loading command center..." />
      </div>
    )
  }

  return (
    <PageContainer>
      <DashboardHeader>
        <div className="header-info">
          <div className="title">Command Center</div>
          <div className="subtitle">Real-time surveillance and security management</div>
        </div>
        <div className="header-actions">
          <StatusBadge status="online">System Online</StatusBadge>
          <Button variant="outline" size="sm">
            <Activity style={{ width: 16, height: 16, marginRight: 8 }} />
            System Status
          </Button>
        </div>
      </DashboardHeader>

      <DashboardGrid>
        <StatsCard title="Active Cameras" iconColor="#06D6A0">
          <div className="stats-content">
            <div className="icon">
              <Camera />
            </div>
            <div className="details">
              <div className="number">{stats.activeCameras}</div>
              <div className="label">Surveillance Points</div>
              <div className="change positive">+3 since yesterday</div>
            </div>
          </div>
        </StatsCard>

        <StatsCard title="Drone Fleet" iconColor="#FFB703">
          <div className="stats-content">
            <div className="icon">
              <Drone />
            </div>
            <div className="details">
              <div className="number">{stats.activeDrones}</div>
              <div className="label">Units Deployed</div>
              <div className="change positive">2 on patrol</div>
            </div>
          </div>
        </StatsCard>

        <StatsCard title="Open Cases" iconColor="#E63946">
          <div className="stats-content">
            <div className="icon">
              <AlertTriangle />
            </div>
            <div className="details">
              <div className="number">{stats.openComplaints}</div>
              <div className="label">Active Complaints</div>
              <div className="change negative">+5 today</div>
            </div>
          </div>
        </StatsCard>

        <StatsCard title="Suspects" iconColor="#8D99AE">
          <div className="stats-content">
            <div className="icon">
              <Users />
            </div>
            <div className="details">
              <div className="number">{stats.activeSuspects}</div>
              <div className="label">Under Surveillance</div>
              <div className="change positive">2 apprehended</div>
            </div>
          </div>
        </StatsCard>
      </DashboardGrid>

      <QuickActionsGrid>
        <ActionButton variant="secondary" onClick={() => navigate("/camera-feeds")}>
          <Camera />
          <span className="action-label">Camera Feeds</span>
        </ActionButton>

        <ActionButton variant="primary" onClick={() => navigate("/complaints")}>
          <AlertTriangle />
          <span className="action-label">View Complaints</span>
        </ActionButton>

        <ActionButton variant="outline" onClick={() => navigate("/face-recognition")}>
          <Eye />
          <span className="action-label">Face Recognition</span>
        </ActionButton>

        <ActionButton variant="outline" onClick={() => navigate("/drone-dispatch")}>
          <Drone />
          <span className="action-label">Drone Control</span>
        </ActionButton>

        <ActionButton variant="outline" onClick={() => navigate("/plate-recognition")}>
  <Eye /> {/* you can swap this for a better icon later */}
  <span className="action-label">Plate Recognition</span>
</ActionButton>

        <ActionButton variant="outline" onClick={() => navigate("/camera-search")}>
          <Map />
          <span className="action-label">Camera Search</span>
        </ActionButton>

       

<ActionButton variant="outline" onClick={() => navigate("/data-analysis")}>
  <Activity /> {/* good icon for analysis */}
  <span className="action-label">Data Analysis</span>
</ActionButton>

      </QuickActionsGrid>

      <AlertsSection>
        <Card
          title="Active Alerts"
          headerAction={<StatusBadge status="critical">{activeAlerts.length} Active</StatusBadge>}
        >
          <AlertList>
            {activeAlerts.map((alert) => (
              <AlertItem key={alert.id} priority={alert.priority}>
                <div className="alert-icon">{alert.icon}</div>
                <div className="alert-details">
                  <div className="message">{alert.message}</div>
                  <div className="location">{alert.location}</div>
                  <div className="time">{alert.time}</div>
                </div>
                <div className="alert-actions">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </AlertItem>
            ))}
          </AlertList>
        </Card>

        <Card title="System Status">
          <SystemStatusGrid>
            {systemStatus.map((system, index) => (
              <StatusItem key={index}>
                <div className="status-info">
                  <div className="status-icon">{system.icon}</div>
                  <div className="details">
                    <div className="name">{system.name}</div>
                    <div className="count">{system.count}</div>
                  </div>
                </div>
                <StatusBadge status={system.status}>{system.status}</StatusBadge>
              </StatusItem>
            ))}
          </SystemStatusGrid>
        </Card>
      </AlertsSection>
    </PageContainer>
  )
}

export default LawEnforcementDashboard