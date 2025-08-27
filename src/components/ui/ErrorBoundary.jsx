"use client"
import { Component } from "react"
import styled from "styled-components"
import { AlertTriangle, RefreshCw } from "lucide-react"

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;

  min-height: 300px;
  text-align: center;
`

const ErrorIcon = styled(AlertTriangle)`
  width: 64px;
  height: 64px;
  color: #FF1744; /* Red alert color */
  margin-bottom: 32px;
`

const ErrorTitle = styled.h2`
  font-family: Poppins, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1E293B; /* Dark navy (used for text) */
  margin-bottom: 16px; /* spacing.md */
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ErrorMessage = styled.p`
  color: #94A3B8; /* supportive.coolGray */
  font-family: Inter, sans-serif;
  font-size: 16px;
  margin-bottom: 24px; /* spacing.lg */
  max-width: 400px;
  line-height: 1.5;
`

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px; /* spacing.sm */
  background-color: #F59E0B; /* secondary.amber */
  color: #1E293B; /* primary.darkNavy */
  border: none;
  padding: 16px 24px; /* spacing.md & spacing.lg */
  border-radius: 8px; /* borderRadius.md */
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 150ms ease-in-out; /* transitions.fast */

  &:hover {
    background-color: #FBBF24; /* secondary.amberLight */
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("[PROSEN] Error caught by boundary:", error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon />
          <ErrorTitle>System Error</ErrorTitle>
          <ErrorMessage>
            An unexpected error occurred in the PROSEN surveillance system. Please try refreshing or contact system
            administrator if the problem persists.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            <RefreshCw />
            Retry Operation
          </RetryButton>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary










// "use client"
// import { Component } from "react"
// import styled from "styled-components"
// import { AlertTriangle, RefreshCw } from "lucide-react"

// const ErrorContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 32px;

//   min-height: 300px;
//   text-align: center;
// `

// const ErrorIcon = styled(AlertTriangle)`
//   width: 64px;
//   height: 64px;
//   color: #FF1744;
//   margin-bottom:32px;
// `

// const ErrorTitle = styled.h2`
//   font-family: Poppins, sans-serif;
//   font-size: 24px;
//   font-weight: 700;
//   color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//   margin-bottom: ${(props) => props.theme.spacing.md};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// `

// const ErrorMessage = styled.p`
//   color: ${(props) => props.theme.colors.supportive.coolGray};
//   font-family: ${(props) => props.theme.fonts.body};
//   font-size: 16px;
//   margin-bottom: ${(props) => props.theme.spacing.lg};
//   max-width: 400px;
//   line-height: 1.5;
// `

// const RetryButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.sm};
//   background-color: ${(props) => props.theme.colors.secondary.amber};
//   color: ${(props) => props.theme.colors.primary.darkNavy};
//   border: none;
//   padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
//   border-radius: ${(props) => props.theme.borderRadius.md};
//   font-family: ${(props) => props.theme.fonts.body};
//   font-weight: 600;
//   font-size: 14px;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   cursor: pointer;
//   transition: all ${(props) => props.theme.transitions.fast};

//   &:hover {
//     background-color: ${(props) => props.theme.colors.secondary.amberLight};
//     transform: translateY(-1px);
//   }

//   svg {
//     width: 16px;
//     height: 16px;
//   }
// `

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { hasError: false, error: null }
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error }
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("[PROSEN] Error caught by boundary:", error, errorInfo)
//   }

//   handleRetry = () => {
//     this.setState({ hasError: false, error: null })
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <ErrorContainer>
//           <ErrorIcon />
//           <ErrorTitle>System Error</ErrorTitle>
//           <ErrorMessage>
//             An unexpected error occurred in the PROSEN surveillance system. Please try refreshing or contact system
//             administrator if the problem persists.
//           </ErrorMessage>
//           <RetryButton onClick={this.handleRetry}>
//             <RefreshCw />
//             Retry Operation
//           </RetryButton>
//         </ErrorContainer>
//       )
//     }

//     return this.props.children
//   }
// }

// export default ErrorBoundary
