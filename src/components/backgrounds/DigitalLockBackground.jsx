"use client"
import styled, { keyframes } from "styled-components"

const lockRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const binaryFlow = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100vw);
    opacity: 0;
  }
`

const lockPulse = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
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

const LockPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  .lock-icon {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 2px solid ${(props) => props.theme.colors.secondary.amber};
    border-radius: 50%;
    animation: ${lockRotate} 30s linear infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid ${(props) => props.theme.colors.supportive.teal};
      border-radius: 3px;
      border-top: none;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 8px;
      border: 2px solid ${(props) => props.theme.colors.supportive.teal};
      border-bottom: none;
      border-radius: 6px 6px 0 0;
    }
    
    &:nth-child(1) {
      top: 15%;
      left: 20%;
      animation-duration: 25s;
    }
    
    &:nth-child(2) {
      top: 60%;
      left: 70%;
      animation-duration: 35s;
      animation-direction: reverse;
    }
    
    &:nth-child(3) {
      top: 80%;
      left: 15%;
      animation-duration: 40s;
    }
    
    &:nth-child(4) {
      top: 25%;
      left: 80%;
      animation-duration: 30s;
      animation-direction: reverse;
    }
  }
`

const BinaryStream = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  .binary-line {
    position: absolute;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: ${(props) => props.theme.colors.supportive.teal};
    white-space: nowrap;
    animation: ${binaryFlow} 15s linear infinite;
    
    &:nth-child(1) {
      top: 20%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 40%;
      animation-delay: 3s;
    }
    
    &:nth-child(3) {
      top: 60%;
      animation-delay: 6s;
    }
    
    &:nth-child(4) {
      top: 80%;
      animation-delay: 9s;
    }
  }
`

const DigitalLockBackground = ({ opacity = 0.1 }) => {
  const binaryStrings = [
    "01001000 01100101 01101100 01101100 01101111",
    "01010000 01110010 01101111 01110100 01100101",
    "01010011 01100101 01100011 01110101 01110010",
    "01000101 01101110 01100011 01110010 01111001",
  ]

  return (
    <BackgroundContainer opacity={opacity}>
      <LockPattern>
        <div className="lock-icon" />
        <div className="lock-icon" />
        <div className="lock-icon" />
        <div className="lock-icon" />
      </LockPattern>

      <BinaryStream>
        {binaryStrings.map((binary, index) => (
          <div key={index} className="binary-line">
            {binary}
          </div>
        ))}
      </BinaryStream>
    </BackgroundContainer>
  )
}

export default DigitalLockBackground
