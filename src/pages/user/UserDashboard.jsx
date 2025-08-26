"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { Car, Plus, Bone as Drone, Shield, AlertTriangle, Map, User, Settings } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import LoadingSpinner from "../../components/ui/LoadingSpinner"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${(props) => props.theme.spacing.xxl};
  }
  
  @media (min-width: 1200px) and (max-width: 1599px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${(props) => props.theme.spacing.xl};
  }
  
  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.lg};
  }
`

const StatsCard = styled(Card)`
  position: relative;
  overflow: hidden;
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px ${(props) => props.theme.colors.primary.neonCyan}20;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
  }
  
  .stats-content {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xl};
    padding: ${(props) => props.theme.spacing.lg} 0;
    
    .icon {
      width: 70px;
      height: 70px;
      border-radius: ${(props) => props.theme.borderRadius.xl};
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}20, ${(props) => props.theme.colors.secondary.amber}10);
      border: 2px solid ${(props) => props.theme.colors.primary.neonCyan}30;
      
      svg {
        width: 32px;
        height: 32px;
        color: ${(props) => props.theme.colors.primary.neonCyan};
      }
    }
    
    .details {
      flex: 1;
      
      .number {
        font-size: 36px;
        font-weight: 900;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        line-height: 1;
        margin-bottom: ${(props) => props.theme.spacing.sm};
        background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .label {
        font-size: 14px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 0.8px;
        font-weight: 700;
      }
    }
  }
`

const QuickActionsSection = styled.section`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: between;
    margin-bottom: ${(props) => props.theme.spacing.xl};
    
    h2 {
      font-family: ${(props) => props.theme.fonts.heading};
      font-size: 24px;
      font-weight: 700;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
        border-radius: 2px;
      }
    }
  }
`

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${(props) => props.theme.spacing.xxl};
  }
  
  @media (min-width: 1200px) and (max-width: 1599px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const ActionCard = styled(Card)`
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
    transform: scaleX(0);
    transition: transform ${(props) => props.theme.transitions.normal};
  }
  
  &:hover {
    transform: translateY(-6px);
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
    box-shadow: 0 15px 35px ${(props) => props.theme.colors.primary.neonCyan}25;
    
    &::before {
      transform: scaleX(1);
    }
    
    .action-content .icon {
      background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
      
      svg {
        color: ${(props) => props.theme.colors.primary.deepBlue};
      }
    }
  }
  
  .action-content {
    text-align: center;
    padding: ${(props) => props.theme.spacing.lg} 0;
    
    .icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.primary.deepBlue};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto ${(props) => props.theme.spacing.lg};
      transition: all ${(props) => props.theme.transitions.normal};
      border: 2px solid ${(props) => props.theme.colors.primary.neonCyan}30;
      
      svg {
        width: 28px;
        height: 28px;
        color: ${(props) => props.theme.colors.primary.neonCyan};
        transition: color ${(props) => props.theme.transitions.fast};
      }
    }
    
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: ${(props) => props.theme.spacing.sm};
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    }
    
    p {
      font-size: 14px;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
      line-height: 1.5;
    }
  }
`

const ContentSection = styled.section`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing.xl};
    
    h2 {
      font-family: ${(props) => props.theme.fonts.heading};
      font-size: 22px;
      font-weight: 700;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 50px;
        height: 2px;
        background: ${(props) => props.theme.colors.primary.neonCyan};
        border-radius: 1px;
      }
    }
  }
`

const VehicleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`

const VehicleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
  .vehicle-info {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    
    .vehicle-icon {
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
        font-weight: 600;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        margin-bottom: 2px;
      }
      
      .plate {
        font-size: 12px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
  
  .actions {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm};
  }
`

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
  &:last-child {
    border-bottom: none;
  }
  
  .activity-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.supportive.teal}20;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 16px;
      height: 16px;
      color: ${(props) => props.theme.colors.supportive.teal};
    }
  }
  
  .activity-details {
    flex: 1;
    
    .message {
      font-size: 14px;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      margin-bottom: 2px;
    }
    
    .time {
      font-size: 12px;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
    }
  }
`

const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  padding: ${(props) => props.theme.spacing.xl} 0;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.deepBlue}10, ${(props) => props.theme.colors.primary.neonCyan}05);
  border-radius: ${(props) => props.theme.borderRadius.xl};
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}30;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xl};
    padding: 0 ${(props) => props.theme.spacing.xl};
    
    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px ${(props) => props.theme.colors.primary.neonCyan}30;
      
      svg {
        width: 28px;
        height: 28px;
        color: ${(props) => props.theme.colors.primary.deepBlue};
      }
    }
    
    .user-info {
      h1 {
        font-family: ${(props) => props.theme.fonts.heading};
        font-size: clamp(24px, 4vw, 32px);
        font-weight: 800;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        margin-bottom: 6px;
        background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .subtitle {
        font-size: 16px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
      }
    }
  }
  
  .header-actions {
    display: flex;
    gap: ${(props) => props.theme.spacing.md};
    padding: 0 ${(props) => props.theme.spacing.xl};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.lg};
    
    .header-left {
      padding: 0 ${(props) => props.theme.spacing.lg};
    }
    
    .header-actions {
      width: 100%;
      justify-content: flex-start;
      padding: 0 ${(props) => props.theme.spacing.lg};
    }
  }
`

const ColorfulStatsCard = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  position: relative;
  overflow: hidden;
  transition: all ${(props) => props.theme.transitions.normal};
  background: ${(props) => props.bgColor || props.theme.colors.secondary.amber};
  color: ${(props) => props.textColor || props.theme.colors.primary.darkNavy};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px ${(props) => props.bgColor}40;
  }
  
  .stats-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .details {
      .number {
        font-size: clamp(32px, 5vw, 48px);
        font-weight: 900;
        line-height: 1;
        margin-bottom: ${(props) => props.theme.spacing.sm};
      }
      
      .label {
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        font-weight: 600;
        opacity: 0.8;
      }
      
      .change {
        font-size: 12px;
        margin-top: ${(props) => props.theme.spacing.xs};
        font-weight: 600;
      }
    }
    
    .icon {
      width: 60px;
      height: 60px;
      border-radius: ${(props) => props.theme.borderRadius.lg};
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
      
      svg {
        width: 28px;
        height: 28px;
      }
    }
  }
`

const QuickActionsSidebar = styled.div`
  background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.primary.deepBlue)};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: ${(props) => props.theme.spacing.xl};
  color: ${(props) => props.theme.colors.dark.text};
  
  .sidebar-header {
    margin-bottom: ${(props) => props.theme.spacing.xl};
    
    h3 {
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${(props) => props.theme.colors.secondary.amber};
      margin-bottom: ${(props) => props.theme.spacing.sm};
    }
    
    .progress-bar {
      width: 60px;
      height: 3px;
      background: ${(props) => props.theme.colors.secondary.amber};
      border-radius: 2px;
    }
  }
  
  .action-list {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
  }
`

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  border: 1px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${(props) => props.theme.colors.primary.neonCyan}40;
  }
  
  .step-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.secondary.amber};
    color: ${(props) => props.theme.colors.primary.darkNavy};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
  
  .action-details {
    flex: 1;
    
    .title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    
    .description {
      font-size: 12px;
      opacity: 0.7;
      line-height: 1.3;
    }
  }
  
  .status-icon {
    width: 16px;
    height: 16px;
    color: ${(props) => props.theme.colors.supportive.teal};
    flex-shrink: 0;
  }
`

const DashboardMainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${(props) => props.theme.spacing.xxl};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.xl};
  }
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ActivityChart = styled.div`
  background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.primary.deepBlue)};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  color: ${(props) => props.theme.colors.dark.text};
  
  .chart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${(props) => props.theme.colors.secondary.amber};
    }
    
    .time-period {
      font-size: 12px;
      opacity: 0.7;
    }
  }
  
  .chart-placeholder {
    height: 120px;
    background: linear-gradient(90deg, 
      ${(props) => props.theme.colors.secondary.amber}20 0%,
      ${(props) => props.theme.colors.secondary.amber}40 20%,
      ${(props) => props.theme.colors.secondary.amber}60 40%,
      ${(props) => props.theme.colors.secondary.amber}30 60%,
      ${(props) => props.theme.colors.secondary.amber}80 80%,
      ${(props) => props.theme.colors.secondary.amber}50 100%
    );
    border-radius: ${(props) => props.theme.borderRadius.md};
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: ${(props) => props.theme.colors.secondary.amber};
    }
  }
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: ${(props) => props.theme.spacing.xxl};
  margin-top: ${(props) => props.theme.spacing.xl};
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.xl};
  }
`

const AssetsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.lg};
  }
`

const SectionCard = styled(Card)`
  padding: ${(props) => props.theme.spacing.xl};
  
  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: ${(props) => props.theme.colors.primary.neonCyan};
      border-radius: 1px;
    }
  }
`

const UserDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeAlerts: 0,
    droneRequests: 0,
  })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setVehicles([
        {
          id: 1,
          make: "Toyota",
          model: "Camry",
          year: 2022,
          plate: "ABC-123",
          color: "Silver",
          status: "active",
        },
        {
          id: 2,
          make: "Honda",
          model: "Civic",
          year: 2021,
          plate: "XYZ-789",
          color: "Blue",
          status: "active",
        },
      ])
      setStats({
        totalVehicles: 2,
        activeAlerts: 0,
        droneRequests: 1,
      })
      setLoading(false)
    }, 1000)
  }, [])

  const recentActivity = [
    {
      icon: <Car />,
      message: "Vehicle Toyota Camry (ABC-123) registered successfully",
      time: "2 hours ago",
    },
    {
      icon: <Drone />,
      message: "Drone surveillance request submitted",
      time: "1 day ago",
    },
    {
      icon: <Shield />,
      message: "Security alert cleared for Honda Civic",
      time: "3 days ago",
    },
  ]

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    )
  }

  return (
    <div>
      <DashboardHeader>
        <div className="header-left">
          <div className="user-avatar">
            <User />
          </div>
          <div className="user-info">
            <h1>Welcome back, {user?.name || "User"}</h1>
            <div className="subtitle">Civilian Dashboard</div>
          </div>
        </div>
        <div className="header-actions">
          <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
            <Settings />
            Settings
          </Button>
        </div>
      </DashboardHeader>

      {/* Metrics grid section */}
      <MetricsGrid>
        <ColorfulStatsCard bgColor="#B8A082" textColor="#1A1A1A">
          <div className="stats-content">
            <div className="details">
              <div className="number">{stats.totalVehicles}</div>
              <div className="label">My Vehicles</div>
              <div className="change">+0 this month</div>
            </div>
            <div className="icon">
              <Car />
            </div>
          </div>
        </ColorfulStatsCard>

        <ColorfulStatsCard bgColor="#B8A082" textColor="#1A1A1A">
          <div className="stats-content">
            <div className="details">
              <div className="number">{stats.activeAlerts}</div>
              <div className="label">Active Alerts</div>
              <div className="change">No new alerts</div>
            </div>
            <div className="icon">
              <AlertTriangle />
            </div>
          </div>
        </ColorfulStatsCard>

        <ColorfulStatsCard bgColor="#B8A082" textColor="#1A1A1A">
          <div className="stats-content">
            <div className="details">
              <div className="number">{stats.droneRequests}</div>
              <div className="label">Drone Requests</div>
              <div className="change">+1 pending</div>
            </div>
            <div className="icon">
              <Drone />
            </div>
          </div>
        </ColorfulStatsCard>
      </MetricsGrid>

      {/* Content grid section */}
      <ContentGrid>
        <AssetsSection>
          <SectionCard>
            <h3 className="section-title">My Vehicles</h3>
            {vehicles.length > 0 ? (
              <VehicleList>
                {vehicles.slice(0, 3).map((vehicle) => (
                  <VehicleItem key={vehicle.id}>
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
                    <div className="actions">
                      <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
                    </div>
                  </VehicleItem>
                ))}
              </VehicleList>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <Car style={{ width: "48px", height: "48px", color: "#8D99AE", marginBottom: "16px" }} />
                <p style={{ color: "#8D99AE", marginBottom: "16px" }}>No vehicles registered yet</p>
                <Button variant="secondary" size="sm" onClick={() => navigate("/register-vehicle")}>
                  Register Your First Vehicle
                </Button>
              </div>
            )}
          </SectionCard>

          <SectionCard>
            <h3 className="section-title">Recent Activity</h3>
            <ActivityList>
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index}>
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-details">
                    <div className="message">{activity.message}</div>
                    <div className="time">{activity.time}</div>
                  </div>
                </ActivityItem>
              ))}
            </ActivityList>
          </SectionCard>
        </AssetsSection>

        <QuickActionsSidebar>
          <div className="sidebar-header">
            <h3>Quick Actions</h3>
            <div className="progress-bar"></div>
          </div>
          <div className="action-list">
            <ActionItem onClick={() => navigate("/register-vehicle")}>
              <div className="step-number">1</div>
              <div className="action-details">
                <div className="title">Register Vehicle</div>
                <div className="description">Add a new vehicle to your protection network</div>
              </div>
              <Plus className="status-icon" />
            </ActionItem>

            <ActionItem onClick={() => navigate("/request-drone")}>
              <div className="step-number">2</div>
              <div className="action-details">
                <div className="title">Request Drone</div>
                <div className="description">Deploy surveillance drone for your area</div>
              </div>
              <Drone className="status-icon" />
            </ActionItem>

            <ActionItem onClick={() => navigate("/vehicle-tracking")}>
              <div className="step-number">3</div>
              <div className="action-details">
                <div className="title">Track Vehicles</div>
                <div className="description">Real-time location tracking</div>
              </div>
              <Map className="status-icon" />
            </ActionItem>

            <ActionItem onClick={() => navigate("/settings")}>
              <div className="step-number">4</div>
              <div className="action-details">
                <div className="title">Security Settings</div>
                <div className="description">Manage account preferences</div>
              </div>
              <Shield className="status-icon" />
            </ActionItem>
          </div>
        </QuickActionsSidebar>
      </ContentGrid>
    </div>
  )
}

export default UserDashboard











// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { Car, Plus, Bone as Drone, Shield, AlertTriangle, Map, User, Settings } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"
// import { useAuth } from "../../context/AuthContext"
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
//     grid-template-columns: repeat(3, 1fr);
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
//   position: relative;
//   overflow: hidden;
//   transition: all ${(props) => props.theme.transitions.normal};
  
//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 12px 30px ${(props) => props.theme.colors.primary.neonCyan}20;
//   }
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
//   }
  
//   .stats-content {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.xl};
//     padding: ${(props) => props.theme.spacing.lg} 0;
    
//     .icon {
//       width: 70px;
//       height: 70px;
//       border-radius: ${(props) => props.theme.borderRadius.xl};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}20, ${(props) => props.theme.colors.secondary.amber}10);
//       border: 2px solid ${(props) => props.theme.colors.primary.neonCyan}30;
      
//       svg {
//         width: 32px;
//         height: 32px;
//         color: ${(props) => props.theme.colors.primary.neonCyan};
//       }
//     }
    
//     .details {
//       flex: 1;
      
//       .number {
//         font-size: 36px;
//         font-weight: 900;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         line-height: 1;
//         margin-bottom: ${(props) => props.theme.spacing.sm};
//         background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         background-clip: text;
//       }
      
//       .label {
//         font-size: 14px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 0.8px;
//         font-weight: 700;
//       }
//     }
//   }
// `

// const QuickActionsSection = styled.section`
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   .section-header {
//     display: flex;
//     align-items: center;
//     justify-content: between;
//     margin-bottom: ${(props) => props.theme.spacing.xl};
    
//     h2 {
//       font-family: ${(props) => props.theme.fonts.heading};
//       font-size: 24px;
//       font-weight: 700;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       position: relative;
      
//       &::after {
//         content: '';
//         position: absolute;
//         bottom: -8px;
//         left: 0;
//         width: 60px;
//         height: 3px;
//         background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
//         border-radius: 2px;
//       }
//     }
//   }
// `

// const QuickActionsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: ${(props) => props.theme.spacing.xl};
  
//   @media (min-width: 1600px) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: ${(props) => props.theme.spacing.xxl};
//   }
  
//   @media (min-width: 1200px) and (max-width: 1599px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
  
//   @media (min-width: 768px) and (max-width: 1199px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (max-width: 767px) {
//     grid-template-columns: 1fr;
//   }
// `

// const ActionCard = styled(Card)`
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.normal};
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 3px;
//     background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
//     transform: scaleX(0);
//     transition: transform ${(props) => props.theme.transitions.normal};
//   }
  
//   &:hover {
//     transform: translateY(-6px);
//     border-color: ${(props) => props.theme.colors.primary.neonCyan};
//     box-shadow: 0 15px 35px ${(props) => props.theme.colors.primary.neonCyan}25;
    
//     &::before {
//       transform: scaleX(1);
//     }
    
//     .action-content .icon {
//       background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
      
//       svg {
//         color: ${(props) => props.theme.colors.primary.deepBlue};
//       }
//     }
//   }
  
//   .action-content {
//     text-align: center;
//     padding: ${(props) => props.theme.spacing.lg} 0;
    
//     .icon {
//       width: 60px;
//       height: 60px;
//       border-radius: 50%;
//       background-color: ${(props) => props.theme.colors.primary.deepBlue};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin: 0 auto ${(props) => props.theme.spacing.lg};
//       transition: all ${(props) => props.theme.transitions.normal};
//       border: 2px solid ${(props) => props.theme.colors.primary.neonCyan}30;
      
//       svg {
//         width: 28px;
//         height: 28px;
//         color: ${(props) => props.theme.colors.primary.neonCyan};
//         transition: color ${(props) => props.theme.transitions.fast};
//       }
//     }
    
//     h3 {
//       font-size: 18px;
//       font-weight: 700;
//       margin-bottom: ${(props) => props.theme.spacing.sm};
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//     }
    
//     p {
//       font-size: 14px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//       line-height: 1.5;
//     }
//   }
// `

// const ContentSection = styled.section`
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   .section-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: ${(props) => props.theme.spacing.xl};
    
//     h2 {
//       font-family: ${(props) => props.theme.fonts.heading};
//       font-size: 22px;
//       font-weight: 700;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       position: relative;
      
//       &::after {
//         content: '';
//         position: absolute;
//         bottom: -6px;
//         left: 0;
//         width: 50px;
//         height: 2px;
//         background: ${(props) => props.theme.colors.primary.neonCyan};
//         border-radius: 1px;
//       }
//     }
//   }
// `

// const VehicleList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.md};
// `

// const VehicleItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: ${(props) => props.theme.spacing.md};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
//   .vehicle-info {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .vehicle-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: ${(props) => props.theme.borderRadius.md};
//       background-color: ${(props) => props.theme.colors.secondary.amber};
//       display: flex;
//       align-items: center;
//       justify-content: center;
      
//       svg {
//         width: 20px;
//         height: 20px;
//         color: ${(props) => props.theme.colors.primary.darkNavy};
//       }
//     }
    
//     .details {
//       .name {
//         font-weight: 600;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         margin-bottom: 2px;
//       }
      
//       .plate {
//         font-size: 12px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 1px;
//       }
//     }
//   }
  
//   .actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.sm};
//   }
// `

// const ActivityList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.md};
// `

// const ActivityItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.md};
//   padding: ${(props) => props.theme.spacing.sm} 0;
//   border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
//   &:last-child {
//     border-bottom: none;
//   }
  
//   .activity-icon {
//     width: 32px;
//     height: 32px;
//     border-radius: 50%;
//     background-color: ${(props) => props.theme.colors.supportive.teal}20;
//     display: flex;
//     align-items: center;
//     justify-content: center;
    
//     svg {
//       width: 16px;
//       height: 16px;
//       color: ${(props) => props.theme.colors.supportive.teal};
//     }
//   }
  
//   .activity-details {
//     flex: 1;
    
//     .message {
//       font-size: 14px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       margin-bottom: 2px;
//     }
    
//     .time {
//       font-size: 12px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//     }
//   }
// `

// const DashboardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
//   padding: ${(props) => props.theme.spacing.xl} 0;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.deepBlue}10, ${(props) => props.theme.colors.primary.neonCyan}05);
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}30;
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 3px;
//     background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
//   }
  
//   .header-left {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.xl};
//     padding: 0 ${(props) => props.theme.spacing.xl};
    
//     .user-avatar {
//       width: 60px;
//       height: 60px;
//       border-radius: 50%;
//       background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       box-shadow: 0 4px 15px ${(props) => props.theme.colors.primary.neonCyan}30;
      
//       svg {
//         width: 28px;
//         height: 28px;
//         color: ${(props) => props.theme.colors.primary.deepBlue};
//       }
//     }
    
//     .user-info {
//       h1 {
//         font-family: ${(props) => props.theme.fonts.heading};
//         font-size: clamp(24px, 4vw, 32px);
//         font-weight: 800;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         margin-bottom: 6px;
//         background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         background-clip: text;
//       }
      
//       .subtitle {
//         font-size: 16px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         font-weight: 600;
//       }
//     }
//   }
  
//   .header-actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.md};
//     padding: 0 ${(props) => props.theme.spacing.xl};
//   }
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: ${(props) => props.theme.spacing.lg};
    
//     .header-left {
//       padding: 0 ${(props) => props.theme.spacing.lg};
//     }
    
//     .header-actions {
//       width: 100%;
//       justify-content: flex-start;
//       padding: 0 ${(props) => props.theme.spacing.lg};
//     }
//   }
// `

// const ColorfulStatsCard = styled.div`
//   padding: ${(props) => props.theme.spacing.xl};
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   position: relative;
//   overflow: hidden;
//   transition: all ${(props) => props.theme.transitions.normal};
//   background: ${(props) => props.bgColor || props.theme.colors.secondary.amber};
//   color: ${(props) => props.textColor || props.theme.colors.primary.darkNavy};
  
//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 12px 30px ${(props) => props.bgColor}40;
//   }
  
//   .stats-content {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
    
//     .details {
//       .number {
//         font-size: clamp(32px, 5vw, 48px);
//         font-weight: 900;
//         line-height: 1;
//         margin-bottom: ${(props) => props.theme.spacing.sm};
//       }
      
//       .label {
//         font-size: 14px;
//         text-transform: uppercase;
//         letter-spacing: 0.8px;
//         font-weight: 600;
//         opacity: 0.8;
//       }
      
//       .change {
//         font-size: 12px;
//         margin-top: ${(props) => props.theme.spacing.xs};
//         font-weight: 600;
//       }
//     }
    
//     .icon {
//       width: 60px;
//       height: 60px;
//       border-radius: ${(props) => props.theme.borderRadius.lg};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: rgba(255, 255, 255, 0.2);
      
//       svg {
//         width: 28px;
//         height: 28px;
//       }
//     }
//   }
// `

// const QuickActionsSidebar = styled.div`
//   background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.primary.deepBlue)};
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   padding: ${(props) => props.theme.spacing.xl};
//   color: ${(props) => props.theme.colors.dark.text};
  
//   .sidebar-header {
//     margin-bottom: ${(props) => props.theme.spacing.xl};
    
//     h3 {
//       font-size: 18px;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: ${(props) => props.theme.colors.secondary.amber};
//       margin-bottom: ${(props) => props.theme.spacing.sm};
//     }
    
//     .progress-bar {
//       width: 60px;
//       height: 3px;
//       background: ${(props) => props.theme.colors.secondary.amber};
//       border-radius: 2px;
//     }
//   }
  
//   .action-list {
//     display: flex;
//     flex-direction: column;
//     gap: ${(props) => props.theme.spacing.md};
//   }
// `

// const ActionItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.md};
//   padding: ${(props) => props.theme.spacing.md};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.fast};
//   border: 1px solid transparent;
  
//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//     border-color: ${(props) => props.theme.colors.primary.neonCyan}40;
//   }
  
//   .step-number {
//     width: 24px;
//     height: 24px;
//     border-radius: 50%;
//     background: ${(props) => props.theme.colors.secondary.amber};
//     color: ${(props) => props.theme.colors.primary.darkNavy};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 12px;
//     font-weight: 700;
//     flex-shrink: 0;
//   }
  
//   .action-details {
//     flex: 1;
    
//     .title {
//       font-size: 14px;
//       font-weight: 600;
//       margin-bottom: 2px;
//     }
    
//     .description {
//       font-size: 12px;
//       opacity: 0.7;
//       line-height: 1.3;
//     }
//   }
  
//   .status-icon {
//     width: 16px;
//     height: 16px;
//     color: ${(props) => props.theme.colors.supportive.teal};
//     flex-shrink: 0;
//   }
// `

// const DashboardMainGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 300px;
//   gap: ${(props) => props.theme.spacing.xxl};
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   @media (max-width: 1200px) {
//     grid-template-columns: 1fr;
//     gap: ${(props) => props.theme.spacing.xl};
//   }
// `

// const MetricsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `

// const ActivityChart = styled.div`
//   background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.primary.deepBlue)};
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   padding: ${(props) => props.theme.spacing.xl};
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
//   color: ${(props) => props.theme.colors.dark.text};
  
//   .chart-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: ${(props) => props.theme.spacing.lg};
    
//     h3 {
//       font-size: 16px;
//       font-weight: 600;
//       text-transform: uppercase;
//       letter-spacing: 1px;
//       color: ${(props) => props.theme.colors.secondary.amber};
//     }
    
//     .time-period {
//       font-size: 12px;
//       opacity: 0.7;
//     }
//   }
  
//   .chart-placeholder {
//     height: 120px;
//     background: linear-gradient(90deg, 
//       ${(props) => props.theme.colors.secondary.amber}20 0%,
//       ${(props) => props.theme.colors.secondary.amber}40 20%,
//       ${(props) => props.theme.colors.secondary.amber}60 40%,
//       ${(props) => props.theme.colors.secondary.amber}30 60%,
//       ${(props) => props.theme.colors.secondary.amber}80 80%,
//       ${(props) => props.theme.colors.secondary.amber}50 100%
//     );
//     border-radius: ${(props) => props.theme.borderRadius.md};
//     position: relative;
//     overflow: hidden;
    
//     &::after {
//       content: '';
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       height: 2px;
//       background: ${(props) => props.theme.colors.secondary.amber};
//     }
//   }
// `

// const ContentGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 320px;
//   gap: ${(props) => props.theme.spacing.xxl};
//   margin-top: ${(props) => props.theme.spacing.xl};
  
//   @media (max-width: 1200px) {
//     grid-template-columns: 1fr;
//     gap: ${(props) => props.theme.spacing.xl};
//   }
// `

// const AssetsSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: ${(props) => props.theme.spacing.xl};
  
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     gap: ${(props) => props.theme.spacing.lg};
//   }
// `

// const SectionCard = styled(Card)`
//   padding: ${(props) => props.theme.spacing.xl};
  
//   .section-title {
//     font-size: 18px;
//     font-weight: 700;
//     color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     position: relative;
    
//     &::after {
//       content: '';
//       position: absolute;
//       bottom: -8px;
//       left: 0;
//       width: 40px;
//       height: 2px;
//       background: ${(props) => props.theme.colors.primary.neonCyan};
//       border-radius: 1px;
//     }
//   }
// `

// const UserDashboard = () => {
//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const [vehicles, setVehicles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({
//     totalVehicles: 0,
//     activeAlerts: 0,
//     droneRequests: 0,
//   })

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => {
//       setVehicles([
//         {
//           id: 1,
//           make: "Toyota",
//           model: "Camry",
//           year: 2022,
//           plate: "ABC-123",
//           color: "Silver",
//           status: "active",
//         },
//         {
//           id: 2,
//           make: "Honda",
//           model: "Civic",
//           year: 2021,
//           plate: "XYZ-789",
//           color: "Blue",
//           status: "active",
//         },
//       ])
//       setStats({
//         totalVehicles: 2,
//         activeAlerts: 0,
//         droneRequests: 1,
//       })
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const recentActivity = [
//     {
//       icon: <Car />,
//       message: "Vehicle Toyota Camry (ABC-123) registered successfully",
//       time: "2 hours ago",
//     },
//     {
//       icon: <Drone />,
//       message: "Drone surveillance request submitted",
//       time: "1 day ago",
//     },
//     {
//       icon: <Shield />,
//       message: "Security alert cleared for Honda Civic",
//       time: "3 days ago",
//     },
//   ]

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
//         <LoadingSpinner size="lg" text="Loading dashboard..." />
//       </div>
//     )
//   }

//   return (
//     <div>
//       <DashboardHeader>
//         <div className="header-left">
//           <div className="user-avatar">
//             <User />
//           </div>
//           <div className="user-info">
//             <h1>Welcome back, {user?.name || "User"}</h1>
//             <div className="subtitle">Civilian Dashboard</div>
//           </div>
//         </div>
//         <div className="header-actions">
//           <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
//             <Settings />
//             Settings
//           </Button>
//         </div>
//       </DashboardHeader>

//       {/* Metrics grid section */}
//       <MetricsGrid>
//         <ColorfulStatsCard bgColor="#F4B942" textColor="#1A1A1A">
//           <div className="stats-content">
//             <div className="details">
//               <div className="number">{stats.totalVehicles}</div>
//               <div className="label">My Vehicles</div>
//               <div className="change">+0 this month</div>
//             </div>
//             <div className="icon">
//               <Car />
//             </div>
//           </div>
//         </ColorfulStatsCard>

//         <ColorfulStatsCard bgColor="#FF6B47" textColor="#FFFFFF">
//           <div className="stats-content">
//             <div className="details">
//               <div className="number">{stats.activeAlerts}</div>
//               <div className="label">Active Alerts</div>
//               <div className="change">No new alerts</div>
//             </div>
//             <div className="icon">
//               <AlertTriangle />
//             </div>
//           </div>
//         </ColorfulStatsCard>

//         <ColorfulStatsCard bgColor="#B8A082" textColor="#1A1A1A">
//           <div className="stats-content">
//             <div className="details">
//               <div className="number">{stats.droneRequests}</div>
//               <div className="label">Drone Requests</div>
//               <div className="change">+1 pending</div>
//             </div>
//             <div className="icon">
//               <Drone />
//             </div>
//           </div>
//         </ColorfulStatsCard>
//       </MetricsGrid>

//       {/* Content grid section */}
//       <ContentGrid>
//         <AssetsSection>
//           <SectionCard>
//             <h3 className="section-title">My Vehicles</h3>
//             {vehicles.length > 0 ? (
//               <VehicleList>
//                 {vehicles.slice(0, 3).map((vehicle) => (
//                   <VehicleItem key={vehicle.id}>
//                     <div className="vehicle-info">
//                       <div className="vehicle-icon">
//                         <Car />
//                       </div>
//                       <div className="details">
//                         <div className="name">
//                           {vehicle.year} {vehicle.make} {vehicle.model}
//                         </div>
//                         <div className="plate">{vehicle.plate}</div>
//                       </div>
//                     </div>
//                     <div className="actions">
//                       <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
//                     </div>
//                   </VehicleItem>
//                 ))}
//               </VehicleList>
//             ) : (
//               <div style={{ textAlign: "center", padding: "40px 20px" }}>
//                 <Car style={{ width: "48px", height: "48px", color: "#8D99AE", marginBottom: "16px" }} />
//                 <p style={{ color: "#8D99AE", marginBottom: "16px" }}>No vehicles registered yet</p>
//                 <Button variant="secondary" size="sm" onClick={() => navigate("/register-vehicle")}>
//                   Register Your First Vehicle
//                 </Button>
//               </div>
//             )}
//           </SectionCard>

//           <SectionCard>
//             <h3 className="section-title">Recent Activity</h3>
//             <ActivityList>
//               {recentActivity.map((activity, index) => (
//                 <ActivityItem key={index}>
//                   <div className="activity-icon">{activity.icon}</div>
//                   <div className="activity-details">
//                     <div className="message">{activity.message}</div>
//                     <div className="time">{activity.time}</div>
//                   </div>
//                 </ActivityItem>
//               ))}
//             </ActivityList>
//           </SectionCard>
//         </AssetsSection>

//         <QuickActionsSidebar>
//           <div className="sidebar-header">
//             <h3>Quick Actions</h3>
//             <div className="progress-bar"></div>
//           </div>
//           <div className="action-list">
//             <ActionItem onClick={() => navigate("/register-vehicle")}>
//               <div className="step-number">1</div>
//               <div className="action-details">
//                 <div className="title">Register Vehicle</div>
//                 <div className="description">Add a new vehicle to your protection network</div>
//               </div>
//               <Plus className="status-icon" />
//             </ActionItem>

//             <ActionItem onClick={() => navigate("/request-drone")}>
//               <div className="step-number">2</div>
//               <div className="action-details">
//                 <div className="title">Request Drone</div>
//                 <div className="description">Deploy surveillance drone for your area</div>
//               </div>
//               <Drone className="status-icon" />
//             </ActionItem>

//             <ActionItem onClick={() => navigate("/vehicle-tracking")}>
//               <div className="step-number">3</div>
//               <div className="action-details">
//                 <div className="title">Track Vehicles</div>
//                 <div className="description">Real-time location tracking</div>
//               </div>
//               <Map className="status-icon" />
//             </ActionItem>

//             <ActionItem onClick={() => navigate("/settings")}>
//               <div className="step-number">4</div>
//               <div className="action-details">
//                 <div className="title">Security Settings</div>
//                 <div className="description">Manage account preferences</div>
//               </div>
//               <Shield className="status-icon" />
//             </ActionItem>
//           </div>
//         </QuickActionsSidebar>
//       </ContentGrid>
//     </div>
//   )
// }

// export default UserDashboard










// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { Car, Plus, Bone as Drone, Shield, AlertTriangle, Map, User, Settings } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import LoadingSpinner from "../../components/ui/LoadingSpinner"
// import { useAuth } from "../../context/AuthContext"
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
//     grid-template-columns: repeat(3, 1fr);
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
//       background-color: ${(props) => props.theme.colors.primary.neonCyan}20;
      
//       svg {
//         width: 28px;
//         height: 28px;
//         color: ${(props) => props.theme.colors.primary.neonCyan};
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
//     }
//   }
// `

// const QuickActionsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: ${(props) => props.theme.spacing.lg};
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   @media (min-width: 1600px) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: ${(props) => props.theme.spacing.xl};
//   }
  
//   @media (min-width: 1200px) and (max-width: 1599px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
  
//   @media (min-width: 768px) and (max-width: 1199px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (max-width: 767px) {
//     grid-template-columns: 1fr;
//   }
// `

// const ActionCard = styled(Card)`
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.fast};
  
//   &:hover {
//     transform: translateY(-4px);
//     border-color: ${(props) => props.theme.colors.primary.neonCyan};
//     box-shadow: 0 8px 25px ${(props) => props.theme.colors.primary.neonCyan}20;
//   }
  
//   .action-content {
//     text-align: center;
    
//     .icon {
//       width: 50px;
//       height: 50px;
//       border-radius: 50%;
//       background-color: ${(props) => props.theme.colors.primary.deepBlue};
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin: 0 auto ${(props) => props.theme.spacing.md};
      
//       svg {
//         width: 24px;
//         height: 24px;
//         color: ${(props) => props.theme.colors.primary.neonCyan};
//       }
//     }
    
//     h3 {
//       font-size: 16px;
//       margin-bottom: ${(props) => props.theme.spacing.sm};
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//     }
    
//     p {
//       font-size: 13px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//       line-height: 1.4;
//     }
//   }
// `

// const VehicleList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.md};
// `

// const VehicleItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: ${(props) => props.theme.spacing.md};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
//   .vehicle-info {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .vehicle-icon {
//       width: 40px;
//       height: 40px;
//       border-radius: ${(props) => props.theme.borderRadius.md};
//       background-color: ${(props) => props.theme.colors.secondary.amber};
//       display: flex;
//       align-items: center;
//       justify-content: center;
      
//       svg {
//         width: 20px;
//         height: 20px;
//         color: ${(props) => props.theme.colors.primary.darkNavy};
//       }
//     }
    
//     .details {
//       .name {
//         font-weight: 600;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         margin-bottom: 2px;
//       }
      
//       .plate {
//         font-size: 12px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 1px;
//       }
//     }
//   }
  
//   .actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.sm};
//   }
// `

// const ActivityList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.md};
// `

// const ActivityItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.md};
//   padding: ${(props) => props.theme.spacing.sm} 0;
//   border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
//   &:last-child {
//     border-bottom: none;
//   }
  
//   .activity-icon {
//     width: 32px;
//     height: 32px;
//     border-radius: 50%;
//     background-color: ${(props) => props.theme.colors.supportive.teal}20;
//     display: flex;
//     align-items: center;
//     justify-content: center;
    
//     svg {
//       width: 16px;
//       height: 16px;
//       color: ${(props) => props.theme.colors.supportive.teal};
//     }
//   }
  
//   .activity-details {
//     flex: 1;
    
//     .message {
//       font-size: 14px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       margin-bottom: 2px;
//     }
    
//     .time {
//       font-size: 12px;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//     }
//   }
// `

// const DashboardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: ${(props) => props.theme.spacing.xl};
//   padding: ${(props) => props.theme.spacing.lg} 0;
//   border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
//   .header-left {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.lg};
    
//     .user-avatar {
//       width: 50px;
//       height: 50px;
//       border-radius: 50%;
//       background-color: ${(props) => props.theme.colors.primary.neonCyan};
//       display: flex;
//       align-items: center;
//       justify-content: center;
      
//       svg {
//         width: 24px;
//         height: 24px;
//         color: ${(props) => props.theme.colors.primary.deepBlue};
//       }
//     }
    
//     .user-info {
//       h1 {
//         font-family: ${(props) => props.theme.fonts.heading};
//         font-size: clamp(20px, 4vw, 28px);
//         font-weight: 700;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         margin-bottom: 4px;
//       }
      
//       .subtitle {
//         font-size: 14px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//       }
//     }
//   }
  
//   .header-actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.md};
//   }
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: ${(props) => props.theme.spacing.md};
    
//     .header-actions {
//       width: 100%;
//       justify-content: flex-start;
//     }
//   }
// `

// const UserDashboard = () => {
//   const { user } = useAuth()
//   const navigate = useNavigate()
//   const [vehicles, setVehicles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({
//     totalVehicles: 0,
//     activeAlerts: 0,
//     droneRequests: 0,
//   })

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => {
//       setVehicles([
//         {
//           id: 1,
//           make: "Toyota",
//           model: "Camry",
//           year: 2022,
//           plate: "ABC-123",
//           color: "Silver",
//           status: "active",
//         },
//         {
//           id: 2,
//           make: "Honda",
//           model: "Civic",
//           year: 2021,
//           plate: "XYZ-789",
//           color: "Blue",
//           status: "active",
//         },
//       ])
//       setStats({
//         totalVehicles: 2,
//         activeAlerts: 0,
//         droneRequests: 1,
//       })
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const recentActivity = [
//     {
//       icon: <Car />,
//       message: "Vehicle Toyota Camry (ABC-123) registered successfully",
//       time: "2 hours ago",
//     },
//     {
//       icon: <Drone />,
//       message: "Drone surveillance request submitted",
//       time: "1 day ago",
//     },
//     {
//       icon: <Shield />,
//       message: "Security alert cleared for Honda Civic",
//       time: "3 days ago",
//     },
//   ]

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
//         <LoadingSpinner size="lg" text="Loading dashboard..." />
//       </div>
//     )
//   }

//   return (
//     <div>
//       <DashboardHeader>
//         <div className="header-left">
//           <div className="user-avatar">
//             <User />
//           </div>
//           <div className="user-info">
//             <h1>Welcome back, {user?.name || "User"}</h1>
//             <div className="subtitle">Civilian Dashboard</div>
//           </div>
//         </div>
//         <div className="header-actions">
//           <Button variant="outline" size="sm" onClick={() => navigate("/settings")}>
//             <Settings />
//             Settings
//           </Button>
//         </div>
//       </DashboardHeader>

//       <DashboardGrid>
//         <StatsCard title="My Vehicles">
//           <div className="stats-content">
//             <div className="icon">
//               <Car />
//             </div>
//             <div className="details">
//               <div className="number">{stats.totalVehicles}</div>
//               <div className="label">Registered Vehicles</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Active Alerts">
//           <div className="stats-content">
//             <div className="icon">
//               <AlertTriangle />
//             </div>
//             <div className="details">
//               <div className="number">{stats.activeAlerts}</div>
//               <div className="label">Security Alerts</div>
//             </div>
//           </div>
//         </StatsCard>

//         <StatsCard title="Drone Requests">
//           <div className="stats-content">
//             <div className="icon">
//               <Drone />
//             </div>
//             <div className="details">
//               <div className="number">{stats.droneRequests}</div>
//               <div className="label">Active Requests</div>
//             </div>
//           </div>
//         </StatsCard>
//       </DashboardGrid>

//       <QuickActionsGrid>
//         <ActionCard onClick={() => navigate("/register-vehicle")}>
//           <div className="action-content">
//             <div className="icon">
//               <Plus />
//             </div>
//             <h3>Register Vehicle</h3>
//             <p>Add a new vehicle to your protection network</p>
//           </div>
//         </ActionCard>

//         <ActionCard onClick={() => navigate("/request-drone")}>
//           <div className="action-content">
//             <div className="icon">
//               <Drone />
//             </div>
//             <h3>Request Drone</h3>
//             <p>Deploy surveillance drone for your area</p>
//           </div>
//         </ActionCard>

//         <ActionCard onClick={() => navigate("/vehicle-tracking")}>
//           <div className="action-content">
//             <div className="icon">
//               <Map />
//             </div>
//             <h3>Track Vehicles</h3>
//             <p>Real-time location tracking of your registered vehicles</p>
//           </div>
//         </ActionCard>

//         <ActionCard onClick={() => navigate("/settings")}>
//           <div className="action-content">
//             <div className="icon">
//               <Shield />
//             </div>
//             <h3>Security Settings</h3>
//             <p>Manage your account and alert preferences</p>
//           </div>
//         </ActionCard>
//       </QuickActionsGrid>

//       <DashboardGrid>
//         <Card
//           title="My Vehicles"
//           headerAction={
//             <Button variant="outline" size="sm" onClick={() => navigate("/register-vehicle")}>
//               View All
//             </Button>
//           }
//         >
//           {vehicles.length > 0 ? (
//             <VehicleList>
//               {vehicles.slice(0, 3).map((vehicle) => (
//                 <VehicleItem key={vehicle.id}>
//                   <div className="vehicle-info">
//                     <div className="vehicle-icon">
//                       <Car />
//                     </div>
//                     <div className="details">
//                       <div className="name">
//                         {vehicle.year} {vehicle.make} {vehicle.model}
//                       </div>
//                       <div className="plate">{vehicle.plate}</div>
//                     </div>
//                   </div>
//                   <div className="actions">
//                     <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
//                   </div>
//                 </VehicleItem>
//               ))}
//             </VehicleList>
//           ) : (
//             <div style={{ textAlign: "center", padding: "40px 20px" }}>
//               <Car style={{ width: "48px", height: "48px", color: "#8D99AE", marginBottom: "16px" }} />
//               <p style={{ color: "#8D99AE", marginBottom: "16px" }}>No vehicles registered yet</p>
//               <Button variant="secondary" size="sm" onClick={() => navigate("/register-vehicle")}>
//                 Register Your First Vehicle
//               </Button>
//             </div>
//           )}
//         </Card>

//         <Card title="Recent Activity">
//           <ActivityList>
//             {recentActivity.map((activity, index) => (
//               <ActivityItem key={index}>
//                 <div className="activity-icon">{activity.icon}</div>
//                 <div className="activity-details">
//                   <div className="message">{activity.message}</div>
//                   <div className="time">{activity.time}</div>
//                 </div>
//               </ActivityItem>
//             ))}
//           </ActivityList>
//         </Card>
//       </DashboardGrid>
//     </div>
//   )
// }

// export default UserDashboard






// // "use client"
// // import { useState, useEffect } from "react"
// // import styled from "styled-components"
// // import { Car, Plus, Bone as Drone, Shield, AlertTriangle, Map } from "lucide-react"
// // import Card from "../../components/ui/Card"
// // import Button from "../../components/ui/Button"
// // import StatusBadge from "../../components/ui/StatusBadge"
// // import LoadingSpinner from "../../components/ui/LoadingSpinner"
// // import { useAuth } from "../../context/AuthContext"
// // import { useNavigate } from "react-router-dom"

// // const DashboardGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// //   gap: ${(props) => props.theme.spacing.xl};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
  
// //   @media (min-width: 1600px) {
// //     grid-template-columns: repeat(4, 1fr);
// //     gap: ${(props) => props.theme.spacing.xxl};
// //   }
  
// //   @media (min-width: 1200px) and (max-width: 1599px) {
// //     grid-template-columns: repeat(3, 1fr);
// //     gap: ${(props) => props.theme.spacing.xl};
// //   }
  
// //   @media (min-width: 768px) and (max-width: 1199px) {
// //     grid-template-columns: repeat(2, 1fr);
// //   }
  
// //   @media (max-width: 767px) {
// //     grid-template-columns: 1fr;
// //     gap: ${(props) => props.theme.spacing.lg};
// //   }
// // `

// // const StatsCard = styled(Card)`
// //   .stats-content {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.lg};
    
// //     .icon {
// //       width: 60px;
// //       height: 60px;
// //       border-radius: ${(props) => props.theme.borderRadius.lg};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       background-color: ${(props) => props.theme.colors.primary.neonCyan}20;
      
// //       svg {
// //         width: 28px;
// //         height: 28px;
// //         color: ${(props) => props.theme.colors.primary.neonCyan};
// //       }
// //     }
    
// //     .details {
// //       flex: 1;
      
// //       .number {
// //         font-size: 32px;
// //         font-weight: 800;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         line-height: 1;
// //         margin-bottom: ${(props) => props.theme.spacing.xs};
// //       }
      
// //       .label {
// //         font-size: 14px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 0.5px;
// //         font-weight: 600;
// //       }
// //     }
// //   }
// // `

// // const QuickActionsGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //   gap: ${(props) => props.theme.spacing.lg};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
  
// //   @media (min-width: 1600px) {
// //     grid-template-columns: repeat(4, 1fr);
// //     gap: ${(props) => props.theme.spacing.xl};
// //   }
  
// //   @media (min-width: 1200px) and (max-width: 1599px) {
// //     grid-template-columns: repeat(4, 1fr);
// //   }
  
// //   @media (min-width: 768px) and (max-width: 1199px) {
// //     grid-template-columns: repeat(2, 1fr);
// //   }
  
// //   @media (max-width: 767px) {
// //     grid-template-columns: 1fr;
// //   }
// // `

// // const ActionCard = styled(Card)`
// //   cursor: pointer;
// //   transition: all ${(props) => props.theme.transitions.fast};
  
// //   &:hover {
// //     transform: translateY(-4px);
// //     border-color: ${(props) => props.theme.colors.primary.neonCyan};
// //     box-shadow: 0 8px 25px ${(props) => props.theme.colors.primary.neonCyan}20;
// //   }
  
// //   .action-content {
// //     text-align: center;
    
// //     .icon {
// //       width: 50px;
// //       height: 50px;
// //       border-radius: 50%;
// //       background-color: ${(props) => props.theme.colors.primary.deepBlue};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       margin: 0 auto ${(props) => props.theme.spacing.md};
      
// //       svg {
// //         width: 24px;
// //         height: 24px;
// //         color: ${(props) => props.theme.colors.primary.neonCyan};
// //       }
// //     }
    
// //     h3 {
// //       font-size: 16px;
// //       margin-bottom: ${(props) => props.theme.spacing.sm};
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //     }
    
// //     p {
// //       font-size: 13px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //       line-height: 1.4;
// //     }
// //   }
// // `

// // const VehicleList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const VehicleItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   padding: ${(props) => props.theme.spacing.md};
// //   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
// //   border-radius: ${(props) => props.theme.borderRadius.md};
// //   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
// //   .vehicle-info {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.md};
    
// //     .vehicle-icon {
// //       width: 40px;
// //       height: 40px;
// //       border-radius: ${(props) => props.theme.borderRadius.md};
// //       background-color: ${(props) => props.theme.colors.secondary.amber};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
      
// //       svg {
// //         width: 20px;
// //         height: 20px;
// //         color: ${(props) => props.theme.colors.primary.darkNavy};
// //       }
// //     }
    
// //     .details {
// //       .name {
// //         font-weight: 600;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         margin-bottom: 2px;
// //       }
      
// //       .plate {
// //         font-size: 12px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 1px;
// //       }
// //     }
// //   }
  
// //   .actions {
// //     display: flex;
// //     gap: ${(props) => props.theme.spacing.sm};
// //   }
// // `

// // const ActivityList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const ActivityItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: ${(props) => props.theme.spacing.md};
// //   padding: ${(props) => props.theme.spacing.sm} 0;
// //   border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
// //   &:last-child {
// //     border-bottom: none;
// //   }
  
// //   .activity-icon {
// //     width: 32px;
// //     height: 32px;
// //     border-radius: 50%;
// //     background-color: ${(props) => props.theme.colors.supportive.teal}20;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
    
// //     svg {
// //       width: 16px;
// //       height: 16px;
// //       color: ${(props) => props.theme.colors.supportive.teal};
// //     }
// //   }
  
// //   .activity-details {
// //     flex: 1;
    
// //     .message {
// //       font-size: 14px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //       margin-bottom: 2px;
// //     }
    
// //     .time {
// //       font-size: 12px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //     }
// //   }
// // `

// // const UserDashboard = () => {
// //   const { user } = useAuth()
// //   const navigate = useNavigate()
// //   const [vehicles, setVehicles] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [stats, setStats] = useState({
// //     totalVehicles: 0,
// //     activeAlerts: 0,
// //     droneRequests: 0,
// //   })

// //   useEffect(() => {
// //     // Simulate loading data
// //     setTimeout(() => {
// //       setVehicles([
// //         {
// //           id: 1,
// //           make: "Toyota",
// //           model: "Camry",
// //           year: 2022,
// //           plate: "ABC-123",
// //           color: "Silver",
// //           status: "active",
// //         },
// //         {
// //           id: 2,
// //           make: "Honda",
// //           model: "Civic",
// //           year: 2021,
// //           plate: "XYZ-789",
// //           color: "Blue",
// //           status: "active",
// //         },
// //       ])
// //       setStats({
// //         totalVehicles: 2,
// //         activeAlerts: 0,
// //         droneRequests: 1,
// //       })
// //       setLoading(false)
// //     }, 1000)
// //   }, [])

// //   const recentActivity = [
// //     {
// //       icon: <Car />,
// //       message: "Vehicle Toyota Camry (ABC-123) registered successfully",
// //       time: "2 hours ago",
// //     },
// //     {
// //       icon: <Drone />,
// //       message: "Drone surveillance request submitted",
// //       time: "1 day ago",
// //     },
// //     {
// //       icon: <Shield />,
// //       message: "Security alert cleared for Honda Civic",
// //       time: "3 days ago",
// //     },
// //   ]

// //   if (loading) {
// //     return (
// //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
// //         <LoadingSpinner size="lg" text="Loading dashboard..." />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div>
// //       <DashboardGrid>
// //         <StatsCard title="My Vehicles">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Car />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.totalVehicles}</div>
// //               <div className="label">Registered Vehicles</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Active Alerts">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <AlertTriangle />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.activeAlerts}</div>
// //               <div className="label">Security Alerts</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Drone Requests">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.droneRequests}</div>
// //               <div className="label">Active Requests</div>
// //             </div>
// //           </div>
// //         </StatsCard>
// //       </DashboardGrid>

// //       <QuickActionsGrid>
// //         <ActionCard onClick={() => navigate("/register-vehicle")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Plus />
// //             </div>
// //             <h3>Register Vehicle</h3>
// //             <p>Add a new vehicle to your protection network</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => navigate("/request-drone")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <h3>Request Drone</h3>
// //             <p>Deploy surveillance drone for your area</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => navigate("/vehicle-tracking")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Map />
// //             </div>
// //             <h3>Track Vehicles</h3>
// //             <p>Real-time location tracking of your registered vehicles</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => navigate("/settings")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Shield />
// //             </div>
// //             <h3>Security Settings</h3>
// //             <p>Manage your account and alert preferences</p>
// //           </div>
// //         </ActionCard>
// //       </QuickActionsGrid>

// //       <DashboardGrid>
// //         <Card
// //           title="My Vehicles"
// //           headerAction={
// //             <Button variant="outline" size="sm" onClick={() => navigate("/register-vehicle")}>
// //               View All
// //             </Button>
// //           }
// //         >
// //           {vehicles.length > 0 ? (
// //             <VehicleList>
// //               {vehicles.slice(0, 3).map((vehicle) => (
// //                 <VehicleItem key={vehicle.id}>
// //                   <div className="vehicle-info">
// //                     <div className="vehicle-icon">
// //                       <Car />
// //                     </div>
// //                     <div className="details">
// //                       <div className="name">
// //                         {vehicle.year} {vehicle.make} {vehicle.model}
// //                       </div>
// //                       <div className="plate">{vehicle.plate}</div>
// //                     </div>
// //                   </div>
// //                   <div className="actions">
// //                     <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
// //                   </div>
// //                 </VehicleItem>
// //               ))}
// //             </VehicleList>
// //           ) : (
// //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// //               <Car style={{ width: "48px", height: "48px", color: "#8D99AE", marginBottom: "16px" }} />
// //               <p style={{ color: "#8D99AE", marginBottom: "16px" }}>No vehicles registered yet</p>
// //               <Button variant="secondary" size="sm" onClick={() => navigate("/register-vehicle")}>
// //                 Register Your First Vehicle
// //               </Button>
// //             </div>
// //           )}
// //         </Card>

// //         <Card title="Recent Activity">
// //           <ActivityList>
// //             {recentActivity.map((activity, index) => (
// //               <ActivityItem key={index}>
// //                 <div className="activity-icon">{activity.icon}</div>
// //                 <div className="activity-details">
// //                   <div className="message">{activity.message}</div>
// //                   <div className="time">{activity.time}</div>
// //                 </div>
// //               </ActivityItem>
// //             ))}
// //           </ActivityList>
// //         </Card>
// //       </DashboardGrid>
// //     </div>
// //   )
// // }

// // export default UserDashboard















// // "use client"
// // import { useState, useEffect } from "react"
// // import styled from "styled-components"
// // import { Car, Plus, Bone as Drone, Shield, AlertTriangle, Map } from "lucide-react"
// // import Card from "../../components/ui/Card"
// // import Button from "../../components/ui/Button"
// // import StatusBadge from "../../components/ui/StatusBadge"
// // import LoadingSpinner from "../../components/ui/LoadingSpinner"
// // import { useAuth } from "../../context/AuthContext"
// // import { useNavigate } from "react-router-dom"

// // const DashboardGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
// //   gap: ${(props) => props.theme.spacing.xl};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
  
// //   @media (min-width: 1400px) {
// //     grid-template-columns: repeat(4, 1fr);
// //   }
  
// //   @media (min-width: 1200px) {
// //     grid-template-columns: repeat(3, 1fr);
// //   }
  
// //   @media (min-width: 768px) and (max-width: 1199px) {
// //     grid-template-columns: repeat(2, 1fr);
// //   }
  
// //   @media (max-width: 767px) {
// //     grid-template-columns: 1fr;
// //     gap: ${(props) => props.theme.spacing.lg};
// //   }
// // `

// // const StatsCard = styled(Card)`
// //   .stats-content {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.lg};
    
// //     .icon {
// //       width: 60px;
// //       height: 60px;
// //       border-radius: ${(props) => props.theme.borderRadius.lg};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       background-color: ${(props) => props.theme.colors.primary.neonCyan}20;
      
// //       svg {
// //         width: 28px;
// //         height: 28px;
// //         color: ${(props) => props.theme.colors.primary.neonCyan};
// //       }
// //     }
    
// //     .details {
// //       flex: 1;
      
// //       .number {
// //         font-size: 32px;
// //         font-weight: 800;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         line-height: 1;
// //         margin-bottom: ${(props) => props.theme.spacing.xs};
// //       }
      
// //       .label {
// //         font-size: 14px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 0.5px;
// //         font-weight: 600;
// //       }
// //     }
// //   }
// // `

// // const QuickActionsGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
// //   gap: ${(props) => props.theme.spacing.lg};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
  
// //   @media (min-width: 1400px) {
// //     grid-template-columns: repeat(4, 1fr);
// //   }
  
// //   @media (min-width: 1200px) {
// //     grid-template-columns: repeat(4, 1fr);
// //   }
  
// //   @media (min-width: 768px) and (max-width: 1199px) {
// //     grid-template-columns: repeat(2, 1fr);
// //   }
  
// //   @media (max-width: 767px) {
// //     grid-template-columns: 1fr;
// //   }
// // `

// // const ActionCard = styled(Card)`
// //   cursor: pointer;
// //   transition: all ${(props) => props.theme.transitions.fast};
  
// //   &:hover {
// //     transform: translateY(-4px);
// //     border-color: ${(props) => props.theme.colors.primary.neonCyan};
// //     box-shadow: 0 8px 25px ${(props) => props.theme.colors.primary.neonCyan}20;
// //   }
  
// //   .action-content {
// //     text-align: center;
    
// //     .icon {
// //       width: 50px;
// //       height: 50px;
// //       border-radius: 50%;
// //       background-color: ${(props) => props.theme.colors.primary.deepBlue};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       margin: 0 auto ${(props) => props.theme.spacing.md};
      
// //       svg {
// //         width: 24px;
// //         height: 24px;
// //         color: ${(props) => props.theme.colors.primary.neonCyan};
// //       }
// //     }
    
// //     h3 {
// //       font-size: 16px;
// //       margin-bottom: ${(props) => props.theme.spacing.sm};
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //     }
    
// //     p {
// //       font-size: 13px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //       line-height: 1.4;
// //     }
// //   }
// // `

// // const VehicleList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const VehicleItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   padding: ${(props) => props.theme.spacing.md};
// //   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
// //   border-radius: ${(props) => props.theme.borderRadius.md};
// //   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
// //   .vehicle-info {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.md};
    
// //     .vehicle-icon {
// //       width: 40px;
// //       height: 40px;
// //       border-radius: ${(props) => props.theme.borderRadius.md};
// //       background-color: ${(props) => props.theme.colors.secondary.amber};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
      
// //       svg {
// //         width: 20px;
// //         height: 20px;
// //         color: ${(props) => props.theme.colors.primary.darkNavy};
// //       }
// //     }
    
// //     .details {
// //       .name {
// //         font-weight: 600;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         margin-bottom: 2px;
// //       }
      
// //       .plate {
// //         font-size: 12px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 1px;
// //       }
// //     }
// //   }
  
// //   .actions {
// //     display: flex;
// //     gap: ${(props) => props.theme.spacing.sm};
// //   }
// // `

// // const ActivityList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const ActivityItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: ${(props) => props.theme.spacing.md};
// //   padding: ${(props) => props.theme.spacing.sm} 0;
// //   border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
// //   &:last-child {
// //     border-bottom: none;
// //   }
  
// //   .activity-icon {
// //     width: 32px;
// //     height: 32px;
// //     border-radius: 50%;
// //     background-color: ${(props) => props.theme.colors.supportive.teal}20;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
    
// //     svg {
// //       width: 16px;
// //       height: 16px;
// //       color: ${(props) => props.theme.colors.supportive.teal};
// //     }
// //   }
  
// //   .activity-details {
// //     flex: 1;
    
// //     .message {
// //       font-size: 14px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //       margin-bottom: 2px;
// //     }
    
// //     .time {
// //       font-size: 12px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //     }
// //   }
// // `

// // const UserDashboard = () => {
// //   const { user } = useAuth()
// //   const navigate = useNavigate()
// //   const [vehicles, setVehicles] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [stats, setStats] = useState({
// //     totalVehicles: 0,
// //     activeAlerts: 0,
// //     droneRequests: 0,
// //   })

// //   useEffect(() => {
// //     // Simulate loading data
// //     setTimeout(() => {
// //       setVehicles([
// //         {
// //           id: 1,
// //           make: "Toyota",
// //           model: "Camry",
// //           year: 2022,
// //           plate: "ABC-123",
// //           color: "Silver",
// //           status: "active",
// //         },
// //         {
// //           id: 2,
// //           make: "Honda",
// //           model: "Civic",
// //           year: 2021,
// //           plate: "XYZ-789",
// //           color: "Blue",
// //           status: "active",
// //         },
// //       ])
// //       setStats({
// //         totalVehicles: 2,
// //         activeAlerts: 0,
// //         droneRequests: 1,
// //       })
// //       setLoading(false)
// //     }, 1000)
// //   }, [])

// //   const recentActivity = [
// //     {
// //       icon: <Car />,
// //       message: "Vehicle Toyota Camry (ABC-123) registered successfully",
// //       time: "2 hours ago",
// //     },
// //     {
// //       icon: <Drone />,
// //       message: "Drone surveillance request submitted",
// //       time: "1 day ago",
// //     },
// //     {
// //       icon: <Shield />,
// //       message: "Security alert cleared for Honda Civic",
// //       time: "3 days ago",
// //     },
// //   ]

// //   if (loading) {
// //     return (
// //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
// //         <LoadingSpinner size="lg" text="Loading dashboard..." />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div>
// //       <DashboardGrid>
// //         <StatsCard title="My Vehicles">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Car />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.totalVehicles}</div>
// //               <div className="label">Registered Vehicles</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Active Alerts">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <AlertTriangle />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.activeAlerts}</div>
// //               <div className="label">Security Alerts</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Drone Requests">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.droneRequests}</div>
// //               <div className="label">Active Requests</div>
// //             </div>
// //           </div>
// //         </StatsCard>
// //       </DashboardGrid>

// //       <QuickActionsGrid>
// //         <ActionCard onClick={() => navigate("/register-vehicle")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Plus />
// //             </div>
// //             <h3>Register Vehicle</h3>
// //             <p>Add a new vehicle to your protection network</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => navigate("/request-drone")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <h3>Request Drone</h3>
// //             <p>Deploy surveillance drone for your area</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => navigate("/vehicle-tracking")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Map />
// //             </div>
// //             <h3>Track Vehicles</h3>
// //             <p>Real-time location tracking of your registered vehicles</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => navigate("/settings")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Shield />
// //             </div>
// //             <h3>Security Settings</h3>
// //             <p>Manage your account and alert preferences</p>
// //           </div>
// //         </ActionCard>
// //       </QuickActionsGrid>

// //       <DashboardGrid>
// //         <Card
// //           title="My Vehicles"
// //           headerAction={
// //             <Button variant="outline" size="sm" onClick={() => navigate("/register-vehicle")}>
// //               View All
// //             </Button>
// //           }
// //         >
// //           {vehicles.length > 0 ? (
// //             <VehicleList>
// //               {vehicles.slice(0, 3).map((vehicle) => (
// //                 <VehicleItem key={vehicle.id}>
// //                   <div className="vehicle-info">
// //                     <div className="vehicle-icon">
// //                       <Car />
// //                     </div>
// //                     <div className="details">
// //                       <div className="name">
// //                         {vehicle.year} {vehicle.make} {vehicle.model}
// //                       </div>
// //                       <div className="plate">{vehicle.plate}</div>
// //                     </div>
// //                   </div>
// //                   <div className="actions">
// //                     <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
// //                   </div>
// //                 </VehicleItem>
// //               ))}
// //             </VehicleList>
// //           ) : (
// //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// //               <Car style={{ width: "48px", height: "48px", color: "#8D99AE", marginBottom: "16px" }} />
// //               <p style={{ color: "#8D99AE", marginBottom: "16px" }}>No vehicles registered yet</p>
// //               <Button variant="secondary" size="sm" onClick={() => navigate("/register-vehicle")}>
// //                 Register Your First Vehicle
// //               </Button>
// //             </div>
// //           )}
// //         </Card>

// //         <Card title="Recent Activity">
// //           <ActivityList>
// //             {recentActivity.map((activity, index) => (
// //               <ActivityItem key={index}>
// //                 <div className="activity-icon">{activity.icon}</div>
// //                 <div className="activity-details">
// //                   <div className="message">{activity.message}</div>
// //                   <div className="time">{activity.time}</div>
// //                 </div>
// //               </ActivityItem>
// //             ))}
// //           </ActivityList>
// //         </Card>
// //       </DashboardGrid>
// //     </div>
// //   )
// // }

// // export default UserDashboard












// // "use client"
// // import { useState, useEffect } from "react"
// // import styled from "styled-components"
// // import { Car, Plus, Bone as Drone, Shield, AlertTriangle, Map } from "lucide-react"
// // import Card from "../../components/ui/Card"
// // import Button from "../../components/ui/Button"
// // import StatusBadge from "../../components/ui/StatusBadge"
// // import LoadingSpinner from "../../components/ui/LoadingSpinner"
// // import { useAuth } from "../../context/AuthContext"

// // const DashboardGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// //   gap: ${(props) => props.theme.spacing.xl};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
  
// //   @media (min-width: 1200px) {
// //     grid-template-columns: repeat(3, 1fr);
// //   }
  
// //   @media (max-width: 768px) {
// //     grid-template-columns: 1fr;
// //     gap: ${(props) => props.theme.spacing.lg};
// //   }
// // `

// // const StatsCard = styled(Card)`
// //   .stats-content {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.lg};
    
// //     .icon {
// //       width: 60px;
// //       height: 60px;
// //       border-radius: ${(props) => props.theme.borderRadius.lg};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       background-color: ${(props) => props.theme.colors.primary.neonCyan}20;
      
// //       svg {
// //         width: 28px;
// //         height: 28px;
// //         color: ${(props) => props.theme.colors.primary.neonCyan};
// //       }
// //     }
    
// //     .details {
// //       flex: 1;
      
// //       .number {
// //         font-size: 32px;
// //         font-weight: 800;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         line-height: 1;
// //         margin-bottom: ${(props) => props.theme.spacing.xs};
// //       }
      
// //       .label {
// //         font-size: 14px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 0.5px;
// //         font-weight: 600;
// //       }
// //     }
// //   }
// // `

// // const QuickActionsGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //   gap: ${(props) => props.theme.spacing.lg};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
  
// //   @media (min-width: 1200px) {
// //     grid-template-columns: repeat(4, 1fr);
// //   }
// // `

// // const ActionCard = styled(Card)`
// //   cursor: pointer;
// //   transition: all ${(props) => props.theme.transitions.fast};
  
// //   &:hover {
// //     transform: translateY(-4px);
// //     border-color: ${(props) => props.theme.colors.primary.neonCyan};
// //     box-shadow: 0 8px 25px ${(props) => props.theme.colors.primary.neonCyan}20;
// //   }
  
// //   .action-content {
// //     text-align: center;
    
// //     .icon {
// //       width: 50px;
// //       height: 50px;
// //       border-radius: 50%;
// //       background-color: ${(props) => props.theme.colors.primary.deepBlue};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       margin: 0 auto ${(props) => props.theme.spacing.md};
      
// //       svg {
// //         width: 24px;
// //         height: 24px;
// //         color: ${(props) => props.theme.colors.primary.neonCyan};
// //       }
// //     }
    
// //     h3 {
// //       font-size: 16px;
// //       margin-bottom: ${(props) => props.theme.spacing.sm};
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //     }
    
// //     p {
// //       font-size: 13px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //       line-height: 1.4;
// //     }
// //   }
// // `

// // const VehicleList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const VehicleItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   padding: ${(props) => props.theme.spacing.md};
// //   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
// //   border-radius: ${(props) => props.theme.borderRadius.md};
// //   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
// //   .vehicle-info {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.md};
    
// //     .vehicle-icon {
// //       width: 40px;
// //       height: 40px;
// //       border-radius: ${(props) => props.theme.borderRadius.md};
// //       background-color: ${(props) => props.theme.colors.secondary.amber};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
      
// //       svg {
// //         width: 20px;
// //         height: 20px;
// //         color: ${(props) => props.theme.colors.primary.darkNavy};
// //       }
// //     }
    
// //     .details {
// //       .name {
// //         font-weight: 600;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         margin-bottom: 2px;
// //       }
      
// //       .plate {
// //         font-size: 12px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 1px;
// //       }
// //     }
// //   }
  
// //   .actions {
// //     display: flex;
// //     gap: ${(props) => props.theme.spacing.sm};
// //   }
// // `

// // const ActivityList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const ActivityItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: ${(props) => props.theme.spacing.md};
// //   padding: ${(props) => props.theme.spacing.sm} 0;
// //   border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
// //   &:last-child {
// //     border-bottom: none;
// //   }
  
// //   .activity-icon {
// //     width: 32px;
// //     height: 32px;
// //     border-radius: 50%;
// //     background-color: ${(props) => props.theme.colors.supportive.teal}20;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
    
// //     svg {
// //       width: 16px;
// //       height: 16px;
// //       color: ${(props) => props.theme.colors.supportive.teal};
// //     }
// //   }
  
// //   .activity-details {
// //     flex: 1;
    
// //     .message {
// //       font-size: 14px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //       margin-bottom: 2px;
// //     }
    
// //     .time {
// //       font-size: 12px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //     }
// //   }
// // `

// // const UserDashboard = ({ onNavigate }) => {
// //   const { user } = useAuth()
// //   const [vehicles, setVehicles] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [stats, setStats] = useState({
// //     totalVehicles: 0,
// //     activeAlerts: 0,
// //     droneRequests: 0,
// //   })

// //   useEffect(() => {
// //     // Simulate loading data
// //     setTimeout(() => {
// //       setVehicles([
// //         {
// //           id: 1,
// //           make: "Toyota",
// //           model: "Camry",
// //           year: 2022,
// //           plate: "ABC-123",
// //           color: "Silver",
// //           status: "active",
// //         },
// //         {
// //           id: 2,
// //           make: "Honda",
// //           model: "Civic",
// //           year: 2021,
// //           plate: "XYZ-789",
// //           color: "Blue",
// //           status: "active",
// //         },
// //       ])
// //       setStats({
// //         totalVehicles: 2,
// //         activeAlerts: 0,
// //         droneRequests: 1,
// //       })
// //       setLoading(false)
// //     }, 1000)
// //   }, [])

// //   const recentActivity = [
// //     {
// //       icon: <Car />,
// //       message: "Vehicle Toyota Camry (ABC-123) registered successfully",
// //       time: "2 hours ago",
// //     },
// //     {
// //       icon: <Drone />,
// //       message: "Drone surveillance request submitted",
// //       time: "1 day ago",
// //     },
// //     {
// //       icon: <Shield />,
// //       message: "Security alert cleared for Honda Civic",
// //       time: "3 days ago",
// //     },
// //   ]

// //   if (loading) {
// //     return (
// //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
// //         <LoadingSpinner size="lg" text="Loading dashboard..." />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div>
// //       <DashboardGrid>
// //         <StatsCard title="My Vehicles">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Car />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.totalVehicles}</div>
// //               <div className="label">Registered Vehicles</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Active Alerts">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <AlertTriangle />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.activeAlerts}</div>
// //               <div className="label">Security Alerts</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Drone Requests">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.droneRequests}</div>
// //               <div className="label">Active Requests</div>
// //             </div>
// //           </div>
// //         </StatsCard>
// //       </DashboardGrid>

// //       <QuickActionsGrid>
// //         <ActionCard onClick={() => onNavigate("vehicles")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Plus />
// //             </div>
// //             <h3>Register Vehicle</h3>
// //             <p>Add a new vehicle to your protection network</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => onNavigate("drone-request")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <h3>Request Drone</h3>
// //             <p>Deploy surveillance drone for your area</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => onNavigate("vehicle-tracking")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Map />
// //             </div>
// //             <h3>Track Vehicles</h3>
// //             <p>Real-time location tracking of your registered vehicles</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => onNavigate("settings")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Shield />
// //             </div>
// //             <h3>Security Settings</h3>
// //             <p>Manage your account and alert preferences</p>
// //           </div>
// //         </ActionCard>
// //       </QuickActionsGrid>

// //       <DashboardGrid>
// //         <Card
// //           title="My Vehicles"
// //           headerAction={
// //             <Button variant="outline" size="sm" onClick={() => onNavigate("vehicles")}>
// //               View All
// //             </Button>
// //           }
// //         >
// //           {vehicles.length > 0 ? (
// //             <VehicleList>
// //               {vehicles.slice(0, 3).map((vehicle) => (
// //                 <VehicleItem key={vehicle.id}>
// //                   <div className="vehicle-info">
// //                     <div className="vehicle-icon">
// //                       <Car />
// //                     </div>
// //                     <div className="details">
// //                       <div className="name">
// //                         {vehicle.year} {vehicle.make} {vehicle.model}
// //                       </div>
// //                       <div className="plate">{vehicle.plate}</div>
// //                     </div>
// //                   </div>
// //                   <div className="actions">
// //                     <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
// //                   </div>
// //                 </VehicleItem>
// //               ))}
// //             </VehicleList>
// //           ) : (
// //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// //               <Car style={{ width: "48px", height: "48px", color: "#8D99AE", marginBottom: "16px" }} />
// //               <p style={{ color: "#8D99AE", marginBottom: "16px" }}>No vehicles registered yet</p>
// //               <Button variant="secondary" size="sm" onClick={() => onNavigate("vehicles")}>
// //                 Register Your First Vehicle
// //               </Button>
// //             </div>
// //           )}
// //         </Card>

// //         <Card title="Recent Activity">
// //           <ActivityList>
// //             {recentActivity.map((activity, index) => (
// //               <ActivityItem key={index}>
// //                 <div className="activity-icon">{activity.icon}</div>
// //                 <div className="activity-details">
// //                   <div className="message">{activity.message}</div>
// //                   <div className="time">{activity.time}</div>
// //                 </div>
// //               </ActivityItem>
// //             ))}
// //           </ActivityList>
// //         </Card>
// //       </DashboardGrid>
// //     </div>
// //   )
// // }

// // export default UserDashboard















// // "use client"
// // import { useState, useEffect } from "react"
// // import styled from "styled-components"
// // import { Car, Plus, Bone as Drone, Shield, AlertTriangle } from "lucide-react"
// // import Card from "../../components/ui/Card"
// // import Button from "../../components/ui/Button"
// // import StatusBadge from "../../components/ui/StatusBadge"
// // import LoadingSpinner from "../../components/ui/LoadingSpinner"
// // import { useAuth } from "../../context/AuthContext"

// // const DashboardGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// //   gap: ${(props) => props.theme.spacing.xl};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
// // `

// // const StatsCard = styled(Card)`
// //   .stats-content {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.lg};
    
// //     .icon {
// //       width: 60px;
// //       height: 60px;
// //       border-radius: ${(props) => props.theme.borderRadius.lg};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       background-color: ${(props) => props.theme.colors.secondary.amber}20;
      
// //       svg {
// //         width: 28px;
// //         height: 28px;
// //         color: ${(props) => props.theme.colors.secondary.amber};
// //       }
// //     }
    
// //     .details {
// //       flex: 1;
      
// //       .number {
// //         font-size: 32px;
// //         font-weight: 800;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         line-height: 1;
// //         margin-bottom: ${(props) => props.theme.spacing.xs};
// //       }
      
// //       .label {
// //         font-size: 14px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 0.5px;
// //         font-weight: 600;
// //       }
// //     }
// //   }
// // `

// // const QuickActionsGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //   gap: ${(props) => props.theme.spacing.lg};
// //   margin-bottom: ${(props) => props.theme.spacing.xl};
// // `

// // const ActionCard = styled(Card)`
// //   cursor: pointer;
// //   transition: all ${(props) => props.theme.transitions.fast};
  
// //   &:hover {
// //     transform: translateY(-4px);
// //     border-color: ${(props) => props.theme.colors.secondary.amber};
// //   }
  
// //   .action-content {
// //     text-align: center;
    
// //     .icon {
// //       width: 50px;
// //       height: 50px;
// //       border-radius: 50%;
// //       background-color: ${(props) => props.theme.colors.primary.deepBlue};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
// //       margin: 0 auto ${(props) => props.theme.spacing.md};
      
// //       svg {
// //         width: 24px;
// //         height: 24px;
// //         color: ${(props) => props.theme.colors.secondary.amber};
// //       }
// //     }
    
// //     h3 {
// //       font-size: 16px;
// //       margin-bottom: ${(props) => props.theme.spacing.sm};
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //     }
    
// //     p {
// //       font-size: 13px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //       line-height: 1.4;
// //     }
// //   }
// // `

// // const VehicleList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const VehicleItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   padding: ${(props) => props.theme.spacing.md};
// //   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
// //   border-radius: ${(props) => props.theme.borderRadius.md};
// //   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
// //   .vehicle-info {
// //     display: flex;
// //     align-items: center;
// //     gap: ${(props) => props.theme.spacing.md};
    
// //     .vehicle-icon {
// //       width: 40px;
// //       height: 40px;
// //       border-radius: ${(props) => props.theme.borderRadius.md};
// //       background-color: ${(props) => props.theme.colors.secondary.amber};
// //       display: flex;
// //       align-items: center;
// //       justify-content: center;
      
// //       svg {
// //         width: 20px;
// //         height: 20px;
// //         color: ${(props) => props.theme.colors.primary.darkNavy};
// //       }
// //     }
    
// //     .details {
// //       .name {
// //         font-weight: 600;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //         margin-bottom: 2px;
// //       }
      
// //       .plate {
// //         font-size: 12px;
// //         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //         text-transform: uppercase;
// //         letter-spacing: 1px;
// //       }
// //     }
// //   }
  
// //   .actions {
// //     display: flex;
// //     gap: ${(props) => props.theme.spacing.sm};
// //   }
// // `

// // const ActivityList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: ${(props) => props.theme.spacing.md};
// // `

// // const ActivityItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   gap: ${(props) => props.theme.spacing.md};
// //   padding: ${(props) => props.theme.spacing.sm} 0;
// //   border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
  
// //   &:last-child {
// //     border-bottom: none;
// //   }
  
// //   .activity-icon {
// //     width: 32px;
// //     height: 32px;
// //     border-radius: 50%;
// //     background-color: ${(props) => props.theme.colors.supportive.teal}20;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
    
// //     svg {
// //       width: 16px;
// //       height: 16px;
// //       color: ${(props) => props.theme.colors.supportive.teal};
// //     }
// //   }
  
// //   .activity-details {
// //     flex: 1;
    
// //     .message {
// //       font-size: 14px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
// //       margin-bottom: 2px;
// //     }
    
// //     .time {
// //       font-size: 12px;
// //       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
// //     }
// //   }
// // `

// // const UserDashboard = ({ onNavigate }) => {
// //   const { user } = useAuth()
// //   const [vehicles, setVehicles] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [stats, setStats] = useState({
// //     totalVehicles: 0,
// //     activeAlerts: 0,
// //     droneRequests: 0,
// //   })

// //   useEffect(() => {
// //     // Simulate loading data
// //     setTimeout(() => {
// //       setVehicles([
// //         {
// //           id: 1,
// //           make: "Toyota",
// //           model: "Camry",
// //           year: 2022,
// //           plate: "ABC-123",
// //           color: "Silver",
// //           status: "active",
// //         },
// //         {
// //           id: 2,
// //           make: "Honda",
// //           model: "Civic",
// //           year: 2021,
// //           plate: "XYZ-789",
// //           color: "Blue",
// //           status: "active",
// //         },
// //       ])
// //       setStats({
// //         totalVehicles: 2,
// //         activeAlerts: 0,
// //         droneRequests: 1,
// //       })
// //       setLoading(false)
// //     }, 1000)
// //   }, [])

// //   const recentActivity = [
// //     {
// //       icon: <Car />,
// //       message: "Vehicle Toyota Camry (ABC-123) registered successfully",
// //       time: "2 hours ago",
// //     },
// //     {
// //       icon: <Drone />,
// //       message: "Drone surveillance request submitted",
// //       time: "1 day ago",
// //     },
// //     {
// //       icon: <Shield />,
// //       message: "Security alert cleared for Honda Civic",
// //       time: "3 days ago",
// //     },
// //   ]

// //   if (loading) {
// //     return (
// //       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
// //         <LoadingSpinner size="lg" text="Loading dashboard..." />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div>
// //       <DashboardGrid>
// //         <StatsCard title="My Vehicles">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Car />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.totalVehicles}</div>
// //               <div className="label">Registered Vehicles</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Active Alerts">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <AlertTriangle />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.activeAlerts}</div>
// //               <div className="label">Security Alerts</div>
// //             </div>
// //           </div>
// //         </StatsCard>

// //         <StatsCard title="Drone Requests">
// //           <div className="stats-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <div className="details">
// //               <div className="number">{stats.droneRequests}</div>
// //               <div className="label">Active Requests</div>
// //             </div>
// //           </div>
// //         </StatsCard>
// //       </DashboardGrid>

// //       <QuickActionsGrid>
// //         <ActionCard onClick={() => onNavigate("vehicles")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Plus />
// //             </div>
// //             <h3>Register Vehicle</h3>
// //             <p>Add a new vehicle to your protection network</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => onNavigate("drone-request")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Drone />
// //             </div>
// //             <h3>Request Drone</h3>
// //             <p>Deploy surveillance drone for your area</p>
// //           </div>
// //         </ActionCard>

// //         <ActionCard onClick={() => onNavigate("settings")}>
// //           <div className="action-content">
// //             <div className="icon">
// //               <Shield />
// //             </div>
// //             <h3>Security Settings</h3>
// //             <p>Manage your account and alert preferences</p>
// //           </div>
// //         </ActionCard>
// //       </QuickActionsGrid>

// //       <DashboardGrid>
// //         <Card
// //           title="My Vehicles"
// //           headerAction={
// //             <Button variant="outline" size="sm" onClick={() => onNavigate("vehicles")}>
// //               View All
// //             </Button>
// //           }
// //         >
// //           {vehicles.length > 0 ? (
// //             <VehicleList>
// //               {vehicles.slice(0, 3).map((vehicle) => (
// //                 <VehicleItem key={vehicle.id}>
// //                   <div className="vehicle-info">
// //                     <div className="vehicle-icon">
// //                       <Car />
// //                     </div>
// //                     <div className="details">
// //                       <div className="name">
// //                         {vehicle.year} {vehicle.make} {vehicle.model}
// //                       </div>
// //                       <div className="plate">{vehicle.plate}</div>
// //                     </div>
// //                   </div>
// //                   <div className="actions">
// //                     <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
// //                   </div>
// //                 </VehicleItem>
// //               ))}
// //             </VehicleList>
// //           ) : (
// //             <div style={{ textAlign: "center", padding: "40px 20px" }}>
// //               <Car style={{ width: "48px", height: "48px", color: "#8D99AE", marginBottom: "16px" }} />
// //               <p style={{ color: "#8D99AE", marginBottom: "16px" }}>No vehicles registered yet</p>
// //               <Button variant="secondary" size="sm" onClick={() => onNavigate("vehicles")}>
// //                 Register Your First Vehicle
// //               </Button>
// //             </div>
// //           )}
// //         </Card>

// //         <Card title="Recent Activity">
// //           <ActivityList>
// //             {recentActivity.map((activity, index) => (
// //               <ActivityItem key={index}>
// //                 <div className="activity-icon">{activity.icon}</div>
// //                 <div className="activity-details">
// //                   <div className="message">{activity.message}</div>
// //                   <div className="time">{activity.time}</div>
// //                 </div>
// //               </ActivityItem>
// //             ))}
// //           </ActivityList>
// //         </Card>
// //       </DashboardGrid>
// //     </div>
// //   )
// // }

// // export default UserDashboard
