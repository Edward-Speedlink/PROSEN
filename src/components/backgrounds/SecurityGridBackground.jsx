"use client"
import styled, { keyframes } from "styled-components"

const gridMove = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
`

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  opacity: ${(props) => props.opacity || 0.1};
`

const GridPattern = styled.div`
  position: absolute;
  top: -100px;
  left: -100px;
  right: -100px;
  bottom: -100px;
  background-image: 
    linear-gradient(${(props) => props.theme.colors.secondary.amber}40 1px, transparent 1px),
    linear-gradient(90deg, ${(props) => props.theme.colors.secondary.amber}40 1px, transparent 1px);
  background-size: 50px 50px;
  animation: ${gridMove} 20s linear infinite;
`

const SecurityNodes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  .node {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: ${(props) => props.theme.colors.supportive.teal};
    border-radius: 50%;
    animation: ${pulse} 3s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 20%;
      left: 15%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 35%;
      left: 75%;
      animation-delay: 0.5s;
    }
    
    &:nth-child(3) {
      top: 60%;
      left: 25%;
      animation-delay: 1s;
    }
    
    &:nth-child(4) {
      top: 80%;
      left: 65%;
      animation-delay: 1.5s;
    }
    
    &:nth-child(5) {
      top: 45%;
      left: 45%;
      animation-delay: 2s;
    }
    
    &:nth-child(6) {
      top: 15%;
      left: 85%;
      animation-delay: 2.5s;
    }
  }
`

const SecurityGridBackground = ({ opacity = 0.1 }) => {
  return (
    <BackgroundContainer opacity={opacity}>
      <GridPattern />
      <SecurityNodes>
        <div className="node" />
        <div className="node" />
        <div className="node" />
        <div className="node" />
        <div className="node" />
        <div className="node" />
      </SecurityNodes>
    </BackgroundContainer>
  )
}

export default SecurityGridBackground
