"use client"
import styled, { keyframes } from "styled-components"

const networkPulse = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`

const connectionFlow = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
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

const NetworkSVG = styled.svg`
  width: 100%;
  height: 100%;
  
  .network-node {
    fill: ${(props) => props.theme.colors.secondary.amber};
    animation: ${networkPulse} 4s ease-in-out infinite;
    
    &:nth-child(2n) {
      animation-delay: 1s;
    }
    
    &:nth-child(3n) {
      animation-delay: 2s;
    }
  }
  
  .network-connection {
    stroke: ${(props) => props.theme.colors.supportive.teal};
    stroke-width: 1;
    fill: none;
    stroke-dasharray: 5, 5;
    animation: ${connectionFlow} 3s linear infinite;
    
    &:nth-child(2n) {
      animation-delay: 0.5s;
    }
    
    &:nth-child(3n) {
      animation-delay: 1s;
    }
  }
`

const NetworkBackground = ({ opacity = 0.1 }) => {
  return (
    <BackgroundContainer opacity={opacity}>
      <NetworkSVG viewBox="0 0 800 600">
        {/* Network connections */}
        <line className="network-connection" x1="100" y1="100" x2="300" y2="150" />
        <line className="network-connection" x1="300" y1="150" x2="500" y2="100" />
        <line className="network-connection" x1="500" y1="100" x2="700" y2="200" />
        <line className="network-connection" x1="100" y1="100" x2="200" y2="300" />
        <line className="network-connection" x1="200" y1="300" x2="400" y2="350" />
        <line className="network-connection" x1="400" y1="350" x2="600" y2="300" />
        <line className="network-connection" x1="600" y1="300" x2="700" y2="200" />
        <line className="network-connection" x1="300" y1="150" x2="400" y2="350" />
        <line className="network-connection" x1="100" y1="450" x2="300" y2="500" />
        <line className="network-connection" x1="300" y1="500" x2="500" y2="450" />
        <line className="network-connection" x1="500" y1="450" x2="700" y2="500" />
        <line className="network-connection" x1="200" y1="300" x2="300" y2="500" />

        {/* Network nodes */}
        <circle className="network-node" cx="100" cy="100" r="4" />
        <circle className="network-node" cx="300" cy="150" r="3" />
        <circle className="network-node" cx="500" cy="100" r="4" />
        <circle className="network-node" cx="700" cy="200" r="3" />
        <circle className="network-node" cx="200" cy="300" r="3" />
        <circle className="network-node" cx="400" cy="350" r="4" />
        <circle className="network-node" cx="600" cy="300" r="3" />
        <circle className="network-node" cx="100" cy="450" r="3" />
        <circle className="network-node" cx="300" cy="500" r="4" />
        <circle className="network-node" cx="500" cy="450" r="3" />
        <circle className="network-node" cx="700" cy="500" r="4" />
      </NetworkSVG>
    </BackgroundContainer>
  )
}

export default NetworkBackground
