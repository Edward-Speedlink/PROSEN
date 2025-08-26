import styled, { keyframes } from "styled-components"

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
`

const Spinner = styled.div`
  width: ${(props) => (props.size === "sm" ? "16px" : props.size === "lg" ? "32px" : "24px")};
  height: ${(props) => (props.size === "sm" ? "16px" : props.size === "lg" ? "32px" : "24px")};
  border: 2px solid ${(props) => props.theme.colors.supportive.coolGray};
  border-top: 2px solid ${(props) => props.theme.colors.secondary.amber};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoadingText = styled.span`
  font-size: ${(props) => (props.size === "sm" ? "12px" : props.size === "lg" ? "16px" : "14px")};
  color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
`

const LoadingSpinner = ({ size = "md", text, className }) => {
  return (
    <SpinnerContainer className={className}>
      <Spinner size={size} />
      {text && <LoadingText size={size}>{text}</LoadingText>}
    </SpinnerContainer>
  )
}

export default LoadingSpinner
