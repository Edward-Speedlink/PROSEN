"use client"
import styled from "styled-components"
import { Menu, Bell, Sun, Moon, Search } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

const NavbarContainer = styled.header`
  height: 70px;
  background: ${(props) =>
    props.theme.isDark
      ? `linear-gradient(135deg, ${props.theme.colors.dark.surface}, ${props.theme.colors.primary.darkNavy})`
      : `linear-gradient(135deg, ${props.theme.colors.light.surface}, rgba(255,255,255,0.95))`};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.spacing.xl};
  position: fixed;
  top: 0;
  left: 280px;
  right: 0;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all ${(props) => props.theme.transitions.normal};

  @media (max-width: 768px) {
    left: 0;
  }
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.lightGray)};
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`

const PageTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 26px;
  font-weight: 800;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.secondary.amber});
    border-radius: 1px;
  }
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const SearchInput = styled.input`
  width: 320px;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  padding-left: 45px;
  background: ${(props) =>
    props.theme.isDark
      ? `linear-gradient(135deg, ${props.theme.colors.primary.darkNavy}, ${props.theme.colors.primary.deepBlue})`
      : `linear-gradient(135deg, ${props.theme.colors.light.background}, rgba(255,255,255,0.9))`};
  border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
  font-size: 14px;
  font-weight: 500;
  transition: all ${(props) => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary.neonCyan}20;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: ${(props) => props.theme.colors.supportive.coolGray};
    font-weight: 400;
  }
`

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: ${(props) => props.theme.colors.supportive.coolGray};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  transition: all ${(props) => props.theme.transitions.normal};
  position: relative;
  
  &:hover {
    background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}20, ${(props) => props.theme.colors.secondary.amber}10);
    color: ${(props) => props.theme.colors.primary.neonCyan};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.primary.neonCyan}30;
  }
  
  svg {
    width: 22px;
    height: 22px;
  }
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.theme.colors.secondary.red};
  border-radius: 50%;
  border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.dark.surface : props.theme.colors.light.surface)};
`

const TopNavbar = ({ onMenuToggle, pageTitle = "Dashboard" }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <NavbarContainer>
      <LeftSection>
        <MenuButton onClick={onMenuToggle}>
          <Menu />
        </MenuButton>
        <PageTitle>{pageTitle}</PageTitle>
      </LeftSection>

      <SearchContainer>
        <SearchIcon />
        <SearchInput type="text" placeholder="Search vehicles, suspects, cases..." />
      </SearchContainer>

      <RightSection>
        <IconButton onClick={toggleTheme}>{isDark ? <Sun /> : <Moon />}</IconButton>

        <IconButton>
          <Bell />
          <NotificationBadge />
        </IconButton>
      </RightSection>
    </NavbarContainer>
  )
}

export default TopNavbar