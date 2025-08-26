"use client"
import styled, { keyframes } from "styled-components"

const shieldPulse = keyframes`
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
`

const scanLine = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
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

const ShieldSVG = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  animation: ${shieldPulse} 6s ease-in-out infinite;
  
  .shield-outline {
    fill: none;
    stroke: ${(props) => props.theme.colors.secondary.amber};
    stroke-width: 2;
    opacity: 0.3;
  }
  
  .shield-inner {
    fill: ${(props) => props.theme.colors.primary.deepBlue}20;
    stroke: ${(props) => props.theme.colors.supportive.teal};
    stroke-width: 1;
    opacity: 0.2;
  }
`

const ScanLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  .scan-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${(props) => props.theme.colors.supportive.teal}80,
      transparent
    );
    animation: ${scanLine} 8s linear infinite;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 2s;
    }
    
    &:nth-child(3) {
      animation-delay: 4s;
    }
  }
`

const SecurityShieldBackground = ({ opacity = 0.1 }) => {
  return (
    <BackgroundContainer opacity={opacity}>
      <ShieldSVG viewBox="0 0 200 200">
        <path className="shield-outline" d="M100 20 L160 50 L160 120 Q160 160 100 180 Q40 160 40 120 L40 50 Z" />
        <path className="shield-inner" d="M100 30 L150 55 L150 115 Q150 150 100 170 Q50 150 50 115 L50 55 Z" />
        <path className="shield-outline" d="M100 40 L140 60 L140 110 Q140 140 100 160 Q60 140 60 110 L60 60 Z" />
      </ShieldSVG>

      <ScanLines>
        <div className="scan-line" />
        <div className="scan-line" />
        <div className="scan-line" />
      </ScanLines>
    </BackgroundContainer>
  )
}

export default SecurityShieldBackground
