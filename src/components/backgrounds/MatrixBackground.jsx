"use client"
import styled, { keyframes } from "styled-components"

const matrixRain = keyframes`
  0% {
    transform: translateY(-100vh);
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

const MatrixColumn = styled.div`
  position: absolute;
  top: 0;
  width: 2px;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    transparent,
    ${(props) => props.theme.colors.supportive.teal}80,
    ${(props) => props.theme.colors.supportive.teal}40,
    transparent
  );
  animation: ${matrixRain} ${(props) => props.duration}s linear infinite;
  animation-delay: ${(props) => props.delay}s;
  left: ${(props) => props.left}%;
`

const MatrixBackground = ({ opacity = 0.1 }) => {
  const columns = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: i * 5 + Math.random() * 3,
    duration: 8 + Math.random() * 4,
    delay: Math.random() * 8,
  }))

  return (
    <BackgroundContainer opacity={opacity}>
      {columns.map((column) => (
        <MatrixColumn key={column.id} left={column.left} duration={column.duration} delay={column.delay} />
      ))}
    </BackgroundContainer>
  )
}

export default MatrixBackground
