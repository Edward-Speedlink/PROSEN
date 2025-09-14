"use client"

import { useState } from "react"
import styled from "styled-components"
import Sidebar from "./Sidebar"
import TopNavbar from "./TopNavbar"
import SecurityShieldBackground from "../backgrounds/SecurityShieldBackground"

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.background : props.theme.colors.light.background)};
  position: relative;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.background : props.theme.colors.light.background)};
    z-index: -1;
  }
`

// const MainContent = styled.main`
//   flex: 1;
//   margin-left: 280px;
//   margin-top: 70px;
//   padding: ${(props) => props.theme.spacing.xl};
//   overflow-y: auto;
//   transition: margin-left ${(props) => props.theme.transitions.normal};
//   position: relative;
//   z-index: 1;
//   min-height: calc(100vh - 70px);
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.background : props.theme.colors.light.background)};
  
//   @media (min-width: 1200px) {
//     max-width: calc(100vw - 320px);
//     padding: ${(props) => props.theme.spacing.xxl};
//   }
  
//   @media (max-width: 768px) {
//     margin-left: 0;
//     padding: ${(props) => props.theme.spacing.lg};
//     margin-top: 60px;
//     min-height: calc(100vh - 60px);
//   }
  
//   @media (max-width: 480px) {
//     padding: ${(props) => props.theme.spacing.md};
//     margin-top: 60px;
//     min-height: calc(100vh - 60px);
//   }
  
//   &:focus {
//     outline: 2px solid ${(props) => props.theme.colors.primary.neonCyan};
//     outline-offset: -2px;
//   }
// `

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;   // ✅ leaves space for Sidebar
  margin-top: 70px;
  padding: ${(props) => props.theme.spacing.xl};
  overflow-y: auto;
  transition: margin-left ${(props) => props.theme.transitions.normal};
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 70px);
  background-color: ${(props) =>
    props.theme.isDark ? props.theme.colors.dark.background : props.theme.colors.light.background};

  @media (min-width: 1200px) {
    max-width: calc(100vw - 320px);   // 🚨 Problem here
    padding: ${(props) => props.theme.spacing.xxl};
  }
    
  @media (max-width: 768px) {
    margin-left: 0;
    padding: ${(props) => props.theme.spacing.lg};
    margin-top: 60px;
    min-height: calc(100vh - 60px);
  }
  
  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing.md};
    margin-top: 60px;
    min-height: calc(100vh - 60px);
  }
  
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary.neonCyan};
    outline-offset: -2px;
  }
`


const MobileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(13, 27, 42, 0.5);
  z-index: 999;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  backdrop-filter: blur(2px);
  
  @media (min-width: 769px) {
    display: none;
  }
`

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: ${(props) => props.theme.colors.secondary.amber};
  color: ${(props) => props.theme.colors.primary.darkNavy};
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  z-index: 10000;
  
  &:focus {
    top: 6px;
  }
`

const DashboardLayout = ({ children, pageTitle, currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleOverlayClick = () => {
    setSidebarOpen(false)
  }

  const handleNavigate = (page) => {
    onNavigate(page)
    setSidebarOpen(false) // Close sidebar on mobile after navigation
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && sidebarOpen) {
      setSidebarOpen(false)
    }
  }

  return (
    <LayoutContainer onKeyDown={handleKeyDown}>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SecurityShieldBackground opacity={0.03} />

      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        aria-label="Main navigation"
      />
      <TopNavbar onMenuToggle={handleMenuToggle} pageTitle={pageTitle} aria-label="Top navigation bar" />
      <MainContent id="main-content" tabIndex="-1" role="main" aria-label={`${pageTitle} content`}>
        {children}
      </MainContent>
      <MobileOverlay isVisible={sidebarOpen} onClick={handleOverlayClick} aria-hidden="true" />
    </LayoutContainer>
  )
}

export default DashboardLayout