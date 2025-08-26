"use client"
import styled from "styled-components"
import { Home, Car, Camera, Bone as Drone, Shield, Users, AlertTriangle, Map, Settings, LogOut } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.primary.darkNavy};
  color: ${(props) => props.theme.colors.dark.text};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: ${(props) => props.theme.shadows.lg};
  transition: transform ${(props) => props.theme.transitions.normal};

  @media (max-width: 768px) {
    transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`

const Logo = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  border-bottom: 1px solid ${(props) => props.theme.colors.primary.deepBlue};
  
  h1 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: 24px;
    font-weight: 800;
    color: ${(props) => props.theme.colors.secondary.amber};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  p {
    font-size: 12px;
    color: ${(props) => props.theme.colors.supportive.coolGray};
    margin-top: ${(props) => props.theme.spacing.xs};
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`

const Navigation = styled.nav`
  flex: 1;
  padding: ${(props) => props.theme.spacing.lg} 0;
`

const NavSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  
  h3 {
    padding: 0 ${(props) => props.theme.spacing.xl};
    font-size: 12px;
    color: ${(props) => props.theme.colors.supportive.coolGray};
    margin-bottom: ${(props) => props.theme.spacing.md};
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background: none;
  color: ${(props) => (props.isActive ? props.theme.colors.secondary.amber : props.theme.colors.dark.text)};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  position: relative;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primary.deepBlue};
    color: ${(props) => props.theme.colors.secondary.amber};
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${(props) => props.theme.colors.secondary.amber};
    transform: scaleY(${(props) => (props.isActive ? 1 : 0)});
    transition: transform ${(props) => props.theme.transitions.fast};
  }
  
  svg {
    margin-right: ${(props) => props.theme.spacing.md};
    width: 20px;
    height: 20px;
  }
  
  span {
    font-weight: 500;
    font-size: 14px;
  }
`

const UserSection = styled.div`
  padding: ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.xl};
  border-top: 1px solid ${(props) => props.theme.colors.primary.deepBlue};
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing.md};
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.secondary.amber};
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primary.darkNavy};
      margin-right: ${(props) => props.theme.spacing.md};
    }
    
    .details {
      flex: 1;
      
      .name {
        font-weight: 600;
        font-size: 14px;
        color: ${(props) => props.theme.colors.dark.text};
      }
      
      .role {
        font-size: 12px;
        color: ${(props) => props.theme.colors.supportive.coolGray};
        text-transform: uppercase;
      }
    }
  }
`

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.secondary.red};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:hover {
    background-color: #c53030;
    transform: translateY(-1px);
  }
  
  svg {
    margin-right: ${(props) => props.theme.spacing.sm};
    width: 16px;
    height: 16px;
  }
  
  span {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const Sidebar = ({ isOpen, currentPage, onNavigate }) => {
  const { user, userType, logout, isLawEnforcement } = useAuth()

  const civilianNavItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "vehicles", label: "My Vehicles", icon: Car },
    { id: "drone-request", label: "Request Drone", icon: Drone },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const lawEnforcementNavItems = [
    { id: "dashboard", label: "Command Center", icon: Shield },
    { id: "cameras", label: "Camera Feeds", icon: Camera },
    { id: "complaints", label: "Complaints", icon: AlertTriangle },
    { id: "tracking", label: "Tracking", icon: Map },
    { id: "drones", label: "Drone Control", icon: Drone },
    { id: "suspects", label: "Suspects", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const navItems = isLawEnforcement ? lawEnforcementNavItems : civilianNavItems

  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo>
        <h1>PROSEN</h1>
        <p>Surveillance & Protection</p>
      </Logo>

      <Navigation>
        <NavSection>
          <h3>{isLawEnforcement ? "Law Enforcement" : "Civilian Portal"}</h3>
          {navItems.map((item) => (
            <NavItem key={item.id} isActive={currentPage === item.id} onClick={() => onNavigate(item.id)}>
              <item.icon />
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavSection>
      </Navigation>

      <UserSection>
        <div className="user-info">
          <div className="avatar">{user?.name?.charAt(0) || "U"}</div>
          <div className="details">
            <div className="name">{user?.name || "User"}</div>
            <div className="role">{isLawEnforcement ? `Officer ${user?.badge || ""}` : "Civilian"}</div>
          </div>
        </div>
        <LogoutButton onClick={logout}>
          <LogOut />
          <span>Logout</span>
        </LogoutButton>
      </UserSection>
    </SidebarContainer>
  )
}

export default Sidebar
