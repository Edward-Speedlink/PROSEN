import styled from "styled-components"

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: clamp(24px, 4vw, 600px);
  width: 100%;
  max-width: min(90%, 480px);
  margin: 0 auto;
  
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  @media (max-width: 768px) {
    max-width: min(95%, 400px);
    margin: 0 auto;
    border-radius: 12px;
    padding: clamp(20px, 5vw, 32px);
  }
`

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(24px, 4vw, 32px);
`

const CardTitle = styled.h1`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: #F8FAFC;
  margin: 0 0 8px 0;
  letter-spacing: -0.025em;
`

const CardSubtitle = styled.p`
  font-size: clamp(14px, 2.5vw, 16px);
  color: #94A3B8;
  margin: 0;
  line-height: 1.5;
`

const CardContent = styled.div`
  width: 100%;
`

export default AuthCard








// "use client"
// import styled from "styled-components"

// const CardContainer = styled.div`
//   background-color: ${(props) => props.theme.colors.dark.surface};
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   padding: ${(props) => props.theme.spacing.xxl};
//   box-shadow: ${(props) => props.theme.shadows.lg};
//   width: 100%;
//   max-width: 450px;
//   border: 1px solid ${(props) => props.theme.colors.primary.deepBlue};
//   backdrop-filter: blur(10px);
// `

// const CardHeader = styled.div`
//   text-align: center;
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   h2 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 28px;
//     font-weight: 700;
//     color: ${(props) => props.theme.colors.dark.text};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: ${(props) => props.theme.spacing.sm};
//   }
  
//   p {
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//     font-size: 14px;
//   }
// `

// const CardContent = styled.div`
//   /* Content styles handled by children */
// `

// const AuthCard = ({ title, subtitle, children }) => {
//   return (
//     <CardContainer>
//       <CardHeader>
//         <h2>{title}</h2>
//         {subtitle && <p>{subtitle}</p>}
//       </CardHeader>
//       <CardContent>{children}</CardContent>
//     </CardContainer>
//   )
// }

// export default AuthCard
