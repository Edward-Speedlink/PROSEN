"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Shield, Camera, AlertTriangle, Bone as Drone, Users, Map, Activity, Eye } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { useNavigate } from "react-router-dom"

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.lightGray)};
  
  .header-info {
    .title {
      font-size: clamp(24px, 3vw, 32px);
      font-weight: 800;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      margin-bottom: ${(props) => props.theme.spacing.xs};
    }
    
    .subtitle {
      font-size: 16px;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
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
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  @media (min-width: 1600px) {
    gap: ${(props) => props.theme.spacing.xxl};
  }
  
  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.lg};
  }
`

const StatsCard = styled(Card)`
  .stats-content {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.lg};
    
    .icon {
      width: 60px;
      height: 60px;
      border-radius: ${(props) => props.theme.borderRadius.lg};
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${(props) => props.iconColor || props.theme.colors.secondary.amber}20;
      
      svg {
        width: 28px;
        height: 28px;
        color: ${(props) => props.iconColor || props.theme.colors.secondary.amber};
      }
    }
    
    .details {
      flex: 1;
      
      .number {
        font-size: 32px;
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
        margin-top: 4px;
        
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
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  @media (min-width: 1600px) {
    gap: ${(props) => props.theme.spacing.xxl};
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.lg};
  }
`

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  max-height: 400px;
  overflow-y: auto;
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
  
  .alert-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => {
      switch (props.priority) {
        case "critical":
          return props.theme.colors.secondary.red
        case "high":
          return props.theme.colors.secondary.amber
        default:
          return props.theme.colors.supportive.teal
      }
    }}20;
    
    svg {
      width: 18px;
      height: 18px;
      color: ${(props) => {
        switch (props.priority) {
          case "critical":
            return props.theme.colors.secondary.red
          case "high":
            return props.theme.colors.secondary.amber
          default:
            return props.theme.colors.supportive.teal
        }
      }};
    }
  }
  
  .alert-details {
    flex: 1;
    
    .message {
      font-weight: 600;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      margin-bottom: 4px;
      font-size: 14px;
    }
    
    .location {
      font-size: 12px;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
      margin-bottom: 2px;
    }
    
    .time {
      font-size: 11px;
      color: ${(props) => props.theme.colors.supportive.coolGray};
    }
  }
  
  .alert-actions {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm};
  }
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  @media (min-width: 1600px) {
    gap: ${(props) => props.theme.spacing.xl};
  }
  
  @media (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${(props) => props.theme.spacing.md};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ActionButton = styled(Button)`
  height: 80px;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  .action-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const SystemStatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
  .status-info {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    
    .status-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${(props) => props.theme.colors.supportive.teal}20;
      
      svg {
        width: 16px;
        height: 16px;
        color: ${(props) => props.theme.colors.supportive.teal};
      }
    }
    
    .details {
      .name {
        font-weight: 600;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        margin-bottom: 2px;
        font-size: 14px;
      }
      
      .count {
        font-size: 12px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
      }
    }
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
  ]

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <LoadingSpinner size="lg" text="Loading command center..." />
      </div>
    )
  }

  return (
    <div>
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

        <ActionButton variant="outline" onClick={() => navigate("/camera-search")}>
          <Map />
          <span className="action-label">Camera Search</span>
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
    </div>
  )
}

export default LawEnforcementDashboard










// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { Shield, Camera, AlertTriangle, Bone as Drone, Users, Map, Activity, Eye } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"
// import { useNavigate } from "react-router-dom"

// const DashboardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   @media (min-width: 1600px) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: ${(props) => props.theme.spacing.xxl};
//   }
  
//   @media (min-width: 1200px) and (max-width: 1599px) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: ${(props) => props.theme.spacing.xl};
//   }
  
//   @media (min-width: 768px) and (max-width: 1199px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (max-width: 767px) {
//     grid-template-columns: 1fr;
//     gap: ${(props) => props.theme.spacing.lg};
//   }
// `

// const StatsCard = styled(Card)`
//   .stats-content {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.lg};
    
//     .icon {
//       width: 60px;
//       height: 60px;
//       border-radius: ${(props) => props.theme.borderRadius.lg};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background-color: ${(props) => props.iconColor || props.theme.colors.secondary.amber}20;
      
//       svg {
//         width: 28px;
//         height: 28px;
//         color: ${(props) => props.iconColor || props.theme.colors.secondary.amber};
//       }
//     }
    
//     .details {
//       flex: 1;
      
//       .number {
//         font-size: 32px;
//         font-weight: 800;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         line-height: 1;
//         margin-bottom: ${(props) => props.theme.spacing.xs};
//       }
      
//       .label {
//         font-size: 14px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//         font-weight: 600;
//       }
      
//       .change {
//         font-size: 12px;
//         margin-top: 4px;
        
//         &.positive {
//           color: ${(props) => props.theme.colors.supportive.teal};
//         }
        
//         &.negative {
//           color: ${(props) => props.theme.colors.secondary.red};
//         }
//       }
//     }
//   }
// `

// const AlertsSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   @media (min-width: 1600px) {
//     gap: ${(props) => props.theme.spacing.xxl};
//   }
  
//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr;
//     gap: ${(props) => props.theme.spacing.lg};
//   }
// `

// const AlertList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.md};
//   max-height: 400px;
//   overflow-y: auto;
// `

// const AlertItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.md};
//   padding: ${(props) => props.theme.spacing.md};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border-left: 4px solid ${(props) => {
//     switch (props.priority) {
//       case "critical":
//         return props.theme.colors.secondary.red
//       case "high":
//         return props.theme.colors.secondary.amber
//       default:
//         return props.theme.colors.supportive.teal
//     }
//   }};
  
//   .alert-icon {
//     width: 36px;
//     height: 36px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: ${(props) => {
//       switch (props.priority) {
//         case "critical":
//           return props.theme.colors.secondary.red
//         case "high":
//           return props.theme.colors.secondary.amber
//         default:
//           return props.theme.colors.supportive.teal
//       }
//     }}20;
    
//     svg {
//       width: 18px;
//       height: 18px;
//       color: ${(props) => {
//         switch (props.priority) {
//           case "critical":
//             return props.theme.colors.secondary.red
//           case "high":
//             return props.theme.colors.secondary.amber
//           default:
//             return props.theme.colors.supportive.teal
//         }
//       }};
//     }
//   }
  
//   .alert-details {
//     flex: 1;
    
//     .message {
//       font-weight: 600;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       margin-bottom: 4px;
//       font-size: 14px;
//     }
    
//     .location {
//       font-size: 12px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//       margin-bottom: 2px;
//     }
    
//     .time {
//       font-size: 11px;
//       color: ${(props) => props.theme.colors.supportive.coolGray};
//     }
//   }
  
//   .alert-actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.sm};
//   }
// `

// const QuickActionsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//   gap: ${(props) => props.theme.spacing.lg};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   @media (min-width: 1600px) {
//     grid-template-columns: repeat(5, 1fr);
//     gap: ${(props) => props.theme.spacing.xl};
//   }
  
//   @media (min-width: 1200px) and (max-width: 1599px) {
//     grid-template-columns: repeat(5, 1fr);
//   }
  
//   @media (min-width: 768px) and (max-width: 1199px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
  
//   @media (max-width: 767px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: ${(props) => props.theme.spacing.md};
//   }
// `

// const ActionButton = styled(Button)`
//   height: 80px;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.sm};
  
//   svg {
//     width: 24px;
//     height: 24px;
//   }
  
//   .action-label {
//     font-size: 12px;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//   }
// `

// const SystemStatusGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//   gap: ${(props) => props.theme.spacing.lg};
  
//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (max-width: 767px) {
//     grid-template-columns: 1fr;
//   }
// `

// const StatusItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: ${(props) => props.theme.spacing.md};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
//   .status-info {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .status-icon {
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background-color: ${(props) => props.theme.colors.supportive.teal}20;
      
//       svg {
//         width: 16px;
//         height: 16px;
//         color: ${(props) => props.theme.colors.supportive.teal};
//       }
//     }
    
//     .details {
//       .name {
//         font-weight: 600;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         margin-bottom: 2px;
//         font-size: 14px;
//       }
      
//       .count {
//         font-size: 12px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//       }
//     }
//   }
// `

// const LawEnforcementDashboard = () => {
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({
//     activeCameras: 0,
//     activeDrones: 0,
//     openComplaints: 0,
//     activeSuspects: 0,
//   })

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => {
//       setStats({
//         activeCameras: 127,
//         activeDrones: 8,
//         openComplaints: 23,
//         activeSuspects: 5,
//       })
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const activeAlerts = [
//     {
//       id: 1,
//       message: "Suspicious activity detected",
//       location: "Downtown District - Camera #45",
//       time: "2 minutes ago",
//       priority: "critical",
//       icon: <AlertTriangle />,
//     },
//     {
//       id: 2,
//       message: "Vehicle theft reported",
//       location: "Parking Lot B - License: ABC-123",
//       time: "15 minutes ago",
//       priority: "high",
//       icon: <Shield />,
//     },
//     {
//       id: 3,
//       message: "Face recognition match",
//       location: "Main Street - Camera #12",
//       time: "1 hour ago",
//       priority: "normal",
//       icon: <Eye />,
//     },
//     {
//       id: 4,
//       message: "Drone battery low",
//       location: "Patrol Unit DR-003",
//       time: "2 hours ago",
//       priority: "normal",
//       icon: <Drone />,
//     },
//   ]

//   const systemStatus = [
//     { name: "Camera Network", count: "127/130 Online", icon: <Camera />, status: "online" },
//     { name: "Drone Fleet", count: "8/12 Active", icon: <Drone />, status: "active" },
//     { name: "Database", count: "Connected", icon: <Activity />, status: "connected" },
//     { name: "Face Recognition", count: "Processing", icon: <Eye />, status: "active" },
//   ]

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
//         <LoadingSpinner size="lg" text="Loading command center..." />
//       </div>
//     )
//   }

//   return (
//     <div>
//       <DashboardGrid>
//         <StatsCard title="Active Cameras" iconColor="#06D6A0">
//           <div className="stats-content">
//             <div className="icon">
//               <Camera />
//             </div>
//             <div className="details">
//               <div className="number">{stats.activeCameras}</div>
//               <div className="label">Surveillance Points</div>
//               <div className="change positive">+3 since yesterday</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Drone Fleet" iconColor="#FFB703">
//           <div className="stats-content">
//             <div className="icon">
//               <Drone />
//             </div>
//             <div className="details">
//               <div className="number">{stats.activeDrones}</div>
//               <div className="label">Units Deployed</div>
//               <div className="change positive">2 on patrol</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Open Cases" iconColor="#E63946">
//           <div className="stats-content">
//             <div className="icon">
//               <AlertTriangle />
//             </div>
//             <div className="details">
//               <div className="number">{stats.openComplaints}</div>
//               <div className="label">Active Complaints</div>
//               <div className="change negative">+5 today</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Suspects" iconColor="#8D99AE">
//           <div className="stats-content">
//             <div className="icon">
//               <Users />
//             </div>
//             <div className="details">
//               <div className="number">{stats.activeSuspects}</div>
//               <div className="label">Under Surveillance</div>
//               <div className="change positive">2 apprehended</div>
//             </div>
//           </div>
//         </StatsCard>
//       </DashboardGrid>

//       <QuickActionsGrid>
//         <ActionButton variant="secondary" onClick={() => navigate("/camera-feeds")}>
//           <Camera />
//           <span className="action-label">Camera Feeds</span>
//         </ActionButton>

//         <ActionButton variant="primary" onClick={() => navigate("/complaints")}>
//           <AlertTriangle />
//           <span className="action-label">View Complaints</span>
//         </ActionButton>

//         <ActionButton variant="outline" onClick={() => navigate("/face-recognition")}>
//           <Eye />
//           <span className="action-label">Face Recognition</span>
//         </ActionButton>

//         <ActionButton variant="outline" onClick={() => navigate("/drone-dispatch")}>
//           <Drone />
//           <span className="action-label">Drone Control</span>
//         </ActionButton>

//         <ActionButton variant="outline" onClick={() => navigate("/camera-search")}>
//           <Map />
//           <span className="action-label">Camera Search</span>
//         </ActionButton>
//       </QuickActionsGrid>

//       <AlertsSection>
//         <Card
//           title="Active Alerts"
//           headerAction={<StatusBadge status="critical">{activeAlerts.length} Active</StatusBadge>}
//         >
//           <AlertList>
//             {activeAlerts.map((alert) => (
//               <AlertItem key={alert.id} priority={alert.priority}>
//                 <div className="alert-icon">{alert.icon}</div>
//                 <div className="alert-details">
//                   <div className="message">{alert.message}</div>
//                   <div className="location">{alert.location}</div>
//                   <div className="time">{alert.time}</div>
//                 </div>
//                 <div className="alert-actions">
//                   <Button variant="outline" size="sm">
//                     View
//                   </Button>
//                 </div>
//               </AlertItem>
//             ))}
//           </AlertList>
//         </Card>

//         <Card title="System Status">
//           <SystemStatusGrid>
//             {systemStatus.map((system, index) => (
//               <StatusItem key={index}>
//                 <div className="status-info">
//                   <div className="status-icon">{system.icon}</div>
//                   <div className="details">
//                     <div className="name">{system.name}</div>
//                     <div className="count">{system.count}</div>
//                   </div>
//                 </div>
//                 <StatusBadge status={system.status}>{system.status}</StatusBadge>
//               </StatusItem>
//             ))}
//           </SystemStatusGrid>
//         </Card>
//       </AlertsSection>
//     </div>
//   )
// }

// export default LawEnforcementDashboard













// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { Shield, Camera, AlertTriangle, Bone as Drone, Users, Map, Activity, Eye } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"

// const DashboardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
// `

// const StatsCard = styled(Card)`
//   .stats-content {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.lg};
    
//     .icon {
//       width: 60px;
//       height: 60px;
//       border-radius: ${(props) => props.theme.borderRadius.lg};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background-color: ${(props) => props.iconColor || props.theme.colors.secondary.amber}20;
      
//       svg {
//         width: 28px;
//         height: 28px;
//         color: ${(props) => props.iconColor || props.theme.colors.secondary.amber};
//       }
//     }
    
//     .details {
//       flex: 1;
      
//       .number {
//         font-size: 32px;
//         font-weight: 800;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         line-height: 1;
//         margin-bottom: ${(props) => props.theme.spacing.xs};
//       }
      
//       .label {
//         font-size: 14px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//         font-weight: 600;
//       }
      
//       .change {
//         font-size: 12px;
//         margin-top: 4px;
        
//         &.positive {
//           color: ${(props) => props.theme.colors.supportive.teal};
//         }
        
//         &.negative {
//           color: ${(props) => props.theme.colors.secondary.red};
//         }
//       }
//     }
//   }
// `

// const AlertsSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr;
//   }
// `

// const AlertList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.md};
//   max-height: 400px;
//   overflow-y: auto;
// `

// const AlertItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.md};
//   padding: ${(props) => props.theme.spacing.md};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border-left: 4px solid ${(props) => {
//     switch (props.priority) {
//       case "critical":
//         return props.theme.colors.secondary.red
//       case "high":
//         return props.theme.colors.secondary.amber
//       default:
//         return props.theme.colors.supportive.teal
//     }
//   }};
  
//   .alert-icon {
//     width: 36px;
//     height: 36px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: ${(props) => {
//       switch (props.priority) {
//         case "critical":
//           return props.theme.colors.secondary.red
//         case "high":
//           return props.theme.colors.secondary.amber
//         default:
//           return props.theme.colors.supportive.teal
//       }
//     }}20;
    
//     svg {
//       width: 18px;
//       height: 18px;
//       color: ${(props) => {
//         switch (props.priority) {
//           case "critical":
//             return props.theme.colors.secondary.red
//           case "high":
//             return props.theme.colors.secondary.amber
//           default:
//             return props.theme.colors.supportive.teal
//         }
//       }};
//     }
//   }
  
//   .alert-details {
//     flex: 1;
    
//     .message {
//       font-weight: 600;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       margin-bottom: 4px;
//       font-size: 14px;
//     }
    
//     .location {
//       font-size: 12px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//       margin-bottom: 2px;
//     }
    
//     .time {
//       font-size: 11px;
//       color: ${(props) => props.theme.colors.supportive.coolGray};
//     }
//   }
  
//   .alert-actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.sm};
//   }
// `

// const QuickActionsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: ${(props) => props.theme.spacing.lg};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
// `

// const ActionButton = styled(Button)`
//   height: 80px;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.sm};
  
//   svg {
//     width: 24px;
//     height: 24px;
//   }
  
//   .action-label {
//     font-size: 12px;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//   }
// `

// const SystemStatusGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: ${(props) => props.theme.spacing.lg};
// `

// const StatusItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: ${(props) => props.theme.spacing.md};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
//   .status-info {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .status-icon {
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background-color: ${(props) => props.theme.colors.supportive.teal}20;
      
//       svg {
//         width: 16px;
//         height: 16px;
//         color: ${(props) => props.theme.colors.supportive.teal};
//       }
//     }
    
//     .details {
//       .name {
//         font-weight: 600;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         margin-bottom: 2px;
//         font-size: 14px;
//       }
      
//       .count {
//         font-size: 12px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//       }
//     }
//   }
// `

// const LawEnforcementDashboard = ({ onNavigate }) => {
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({
//     activeCameras: 0,
//     activeDrones: 0,
//     openComplaints: 0,
//     activeSuspects: 0,
//   })

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => {
//       setStats({
//         activeCameras: 127,
//         activeDrones: 8,
//         openComplaints: 23,
//         activeSuspects: 5,
//       })
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const activeAlerts = [
//     {
//       id: 1,
//       message: "Suspicious activity detected",
//       location: "Downtown District - Camera #45",
//       time: "2 minutes ago",
//       priority: "critical",
//       icon: <AlertTriangle />,
//     },
//     {
//       id: 2,
//       message: "Vehicle theft reported",
//       location: "Parking Lot B - License: ABC-123",
//       time: "15 minutes ago",
//       priority: "high",
//       icon: <Shield />,
//     },
//     {
//       id: 3,
//       message: "Face recognition match",
//       location: "Main Street - Camera #12",
//       time: "1 hour ago",
//       priority: "normal",
//       icon: <Eye />,
//     },
//     {
//       id: 4,
//       message: "Drone battery low",
//       location: "Patrol Unit DR-003",
//       time: "2 hours ago",
//       priority: "normal",
//       icon: <Drone />,
//     },
//   ]

//   const systemStatus = [
//     { name: "Camera Network", count: "127/130 Online", icon: <Camera />, status: "online" },
//     { name: "Drone Fleet", count: "8/12 Active", icon: <Drone />, status: "active" },
//     { name: "Database", count: "Connected", icon: <Activity />, status: "connected" },
//     { name: "Face Recognition", count: "Processing", icon: <Eye />, status: "active" },
//   ]

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
//         <LoadingSpinner size="lg" text="Loading command center..." />
//       </div>
//     )
//   }

//   return (
//     <div>
//       <DashboardGrid>
//         <StatsCard title="Active Cameras" iconColor="#06D6A0">
//           <div className="stats-content">
//             <div className="icon">
//               <Camera />
//             </div>
//             <div className="details">
//               <div className="number">{stats.activeCameras}</div>
//               <div className="label">Surveillance Points</div>
//               <div className="change positive">+3 since yesterday</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Drone Fleet" iconColor="#FFB703">
//           <div className="stats-content">
//             <div className="icon">
//               <Drone />
//             </div>
//             <div className="details">
//               <div className="number">{stats.activeDrones}</div>
//               <div className="label">Units Deployed</div>
//               <div className="change positive">2 on patrol</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Open Cases" iconColor="#E63946">
//           <div className="stats-content">
//             <div className="icon">
//               <AlertTriangle />
//             </div>
//             <div className="details">
//               <div className="number">{stats.openComplaints}</div>
//               <div className="label">Active Complaints</div>
//               <div className="change negative">+5 today</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Suspects" iconColor="#8D99AE">
//           <div className="stats-content">
//             <div className="icon">
//               <Users />
//             </div>
//             <div className="details">
//               <div className="number">{stats.activeSuspects}</div>
//               <div className="label">Under Surveillance</div>
//               <div className="change positive">2 apprehended</div>
//             </div>
//           </div>
//         </StatsCard>
//       </DashboardGrid>

//       <QuickActionsGrid>
//         <ActionButton variant="secondary" onClick={() => onNavigate("cameras")}>
//           <Camera />
//           <span className="action-label">Camera Feeds</span>
//         </ActionButton>

//         <ActionButton variant="primary" onClick={() => onNavigate("complaints")}>
//           <AlertTriangle />
//           <span className="action-label">View Complaints</span>
//         </ActionButton>

//         <ActionButton variant="outline" onClick={() => onNavigate("tracking")}>
//           <Map />
//           <span className="action-label">Track Suspects</span>
//         </ActionButton>

//         <ActionButton variant="outline" onClick={() => onNavigate("drones")}>
//           <Drone />
//           <span className="action-label">Drone Control</span>
//         </ActionButton>

//         <ActionButton variant="outline" onClick={() => onNavigate("suspects")}>
//           <Users />
//           <span className="action-label">Suspects DB</span>
//         </ActionButton>
//       </QuickActionsGrid>

//       <AlertsSection>
//         <Card
//           title="Active Alerts"
//           headerAction={<StatusBadge status="critical">{activeAlerts.length} Active</StatusBadge>}
//         >
//           <AlertList>
//             {activeAlerts.map((alert) => (
//               <AlertItem key={alert.id} priority={alert.priority}>
//                 <div className="alert-icon">{alert.icon}</div>
//                 <div className="alert-details">
//                   <div className="message">{alert.message}</div>
//                   <div className="location">{alert.location}</div>
//                   <div className="time">{alert.time}</div>
//                 </div>
//                 <div className="alert-actions">
//                   <Button variant="outline" size="sm">
//                     View
//                   </Button>
//                 </div>
//               </AlertItem>
//             ))}
//           </AlertList>
//         </Card>

//         <Card title="System Status">
//           <SystemStatusGrid>
//             {systemStatus.map((system, index) => (
//               <StatusItem key={index}>
//                 <div className="status-info">
//                   <div className="status-icon">{system.icon}</div>
//                   <div className="details">
//                     <div className="name">{system.name}</div>
//                     <div className="count">{system.count}</div>
//                   </div>
//                 </div>
//                 <StatusBadge status={system.status}>{system.status}</StatusBadge>
//               </StatusItem>
//             ))}
//           </SystemStatusGrid>
//         </Card>
//       </AlertsSection>
//     </div>
//   )
// }

// export default LawEnforcementDashboard
