"use client"
import styled, { keyframes } from "styled-components"

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl};
  min-height: 200px;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  border-top: 3px solid ${(props) => props.theme.colors.secondary.amber};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${(props) => props.theme.spacing.md};
`

const LoadingText = styled.p`
  color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  animation: ${pulse} 2s ease-in-out infinite;
`

const SkeletonCard = styled.div`
  background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.lightGray)};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

const SkeletonLine = styled.div`
  height: ${(props) => props.height || "16px"};
  background: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.coolGray)};
  border-radius: 4px;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  width: ${(props) => props.width || "100%"};
`

export const LoadingSpinner = ({ text = "Loading..." }) => (
  <LoadingContainer>
    <Spinner />
    <LoadingText>{text}</LoadingText>
  </LoadingContainer>
)

export const SkeletonLoader = ({ lines = 3 }) => (
  <SkeletonCard>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLine key={index} width={index === lines - 1 ? "60%" : "100%"} height={index === 0 ? "20px" : "16px"} />
    ))}
  </SkeletonCard>
)

export default LoadingSpinner
