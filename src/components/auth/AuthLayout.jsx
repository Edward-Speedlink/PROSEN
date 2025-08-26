"use client"
import styled from "styled-components"
import MatrixBackground from "../backgrounds/MatrixBackground"
import DigitalLockBackground from "../backgrounds/DigitalLockBackground"

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
  position: relative;
  overflow: hidden;
`

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: 
    radial-gradient(circle at 25% 25%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px);
  background-size: 50px 50px;
  animation: float 20s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
  }
`

const LeftPanel = styled.div`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.xxl};
  position: relative;
  z-index: 1;
  
  @media (max-width: 1200px) {
    flex: 0 0 35%;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(20px, 4vw, 60px);
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    padding: clamp(20px, 5vw, 40px);
  }
  
  @media (min-width: 1200px) {
    padding: clamp(40px, 6vw, 80px);
  }
`

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  
  h1 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: 48px;
    font-weight: 800;
    color: ${(props) => props.theme.colors.secondary.amber};
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: ${(props) => props.theme.spacing.sm};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-size: 18px;
    color: ${(props) => props.theme.colors.dark.text};
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.9;
  }
`

const FeatureList = styled.div`
  max-width: 400px;
  
  h3 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: 24px;
    color: ${(props) => props.theme.colors.dark.text};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  
  .icon {
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.secondary.amber};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${(props) => props.theme.spacing.md};
    
    svg {
      width: 20px;
      height: 20px;
      color: ${(props) => props.theme.colors.primary.darkNavy};
    }
  }
  
  .content {
    flex: 1;
    
    h4 {
      font-weight: 600;
      color: ${(props) => props.theme.colors.dark.text};
      margin-bottom: ${(props) => props.theme.spacing.xs};
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 0.5px;
    }
    
    p {
      font-size: 13px;
      color: ${(props) => props.theme.colors.dark.textSecondary};
      line-height: 1.4;
    }
  }
`

const AuthLayout = ({ children, features = [] }) => {
  return (
    <AuthContainer>
      <MatrixBackground opacity={0.12} />
      <DigitalLockBackground opacity={0.06} />

      <LeftPanel>
        <Logo>
          <h1>PROSEN</h1>
          <p>Surveillance & Asset Protection</p>
        </Logo>

        {features.length > 0 && (
          <FeatureList>
            <h3>System Features</h3>
            {features.map((feature, index) => (
              <Feature key={index}>
                <div className="icon">{feature.icon}</div>
                <div className="content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </Feature>
            ))}
          </FeatureList>
        )}
      </LeftPanel>

      <RightPanel>{children}</RightPanel>
    </AuthContainer>
  )
}

export default AuthLayout












// "use client"
// import styled from "styled-components"
// import MatrixBackground from "../backgrounds/MatrixBackground"
// import DigitalLockBackground from "../backgrounds/DigitalLockBackground"

// const AuthContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
//   position: relative;
//   overflow: hidden;
// `

// const BackgroundPattern = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.1;
//   background-image: 
//     radial-gradient(circle at 25% 25%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
//     radial-gradient(circle at 75% 75%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px);
//   background-size: 50px 50px;
//   animation: float 20s ease-in-out infinite;
  
//   @keyframes float {
//     0%, 100% { transform: translateY(0px) rotate(0deg); }
//     50% { transform: translateY(-10px) rotate(1deg); }
//   }
// `

// const LeftPanel = styled.div`
//   flex: 0 0 40%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: ${(props) => props.theme.spacing.xxl};
//   position: relative;
//   z-index: 1;
  
//   @media (max-width: 1200px) {
//     flex: 0 0 35%;
//   }
  
//   @media (max-width: 768px) {
//     display: none;
//   }
// `

// const RightPanel = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: clamp(20px, 4vw, 60px);
//   position: relative;
//   z-index: 1;
//   width: 100%;
  
//   > * {
//     width: 100%;
//     max-width: min(90%, 480px);
//     margin: 0 auto;
//   }
  
//   @media (max-width: 768px) {
//     flex: none;
//     width: 100%;
//     padding: clamp(20px, 5vw, 40px);
    
//     > * {
//       max-width: 100%;
//     }
//   }
  
//   @media (min-width: 1200px) {
//     padding: clamp(40px, 6vw, 80px);
    
//     > * {
//       max-width: 450px;
//     }
//   }
// `

// const Logo = styled.div`
//   text-align: center;
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   h1 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 48px;
//     font-weight: 800;
//     color: ${(props) => props.theme.colors.secondary.amber};
//     text-transform: uppercase;
//     letter-spacing: 3px;
//     margin-bottom: ${(props) => props.theme.spacing.sm};
//     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
//   }
  
//   p {
//     font-size: 18px;
//     color: ${(props) => props.theme.colors.dark.text};
//     text-transform: uppercase;
//     letter-spacing: 2px;
//     opacity: 0.9;
//   }
// `

// const FeatureList = styled.div`
//   max-width: 400px;
  
//   h3 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 24px;
//     color: ${(props) => props.theme.colors.dark.text};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//   }
// `

// const Feature = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: ${(props) => props.theme.spacing.lg};
  
//   .icon {
//     width: 40px;
//     height: 40px;
//     background-color: ${(props) => props.theme.colors.secondary.amber};
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: ${(props) => props.theme.spacing.md};
    
//     svg {
//       width: 20px;
//       height: 20px;
//       color: ${(props) => props.theme.colors.primary.darkNavy};
//     }
//   }
  
//   .content {
//     flex: 1;
    
//     h4 {
//       font-weight: 600;
//       color: ${(props) => props.theme.colors.dark.text};
//       margin-bottom: ${(props) => props.theme.spacing.xs};
//       text-transform: uppercase;
//       font-size: 14px;
//       letter-spacing: 0.5px;
//     }
    
//     p {
//       font-size: 13px;
//       color: ${(props) => props.theme.colors.dark.textSecondary};
//       line-height: 1.4;
//     }
//   }
// `

// const AuthLayout = ({ children, features = [] }) => {
//   return (
//     <AuthContainer>
//       <MatrixBackground opacity={0.12} />
//       <DigitalLockBackground opacity={0.06} />

//       <LeftPanel>
//         <Logo>
//           <h1>PROSEN</h1>
//           <p>Surveillance & Asset Protection</p>
//         </Logo>

//         {features.length > 0 && (
//           <FeatureList>
//             <h3>System Features</h3>
//             {features.map((feature, index) => (
//               <Feature key={index}>
//                 <div className="icon">{feature.icon}</div>
//                 <div className="content">
//                   <h4>{feature.title}</h4>
//                   <p>{feature.description}</p>
//                 </div>
//               </Feature>
//             ))}
//           </FeatureList>
//         )}
//       </LeftPanel>

//       <RightPanel>{children}</RightPanel>
//     </AuthContainer>
//   )
// }

// export default AuthLayout





// "use client"
// import styled from "styled-components"
// import MatrixBackground from "../backgrounds/MatrixBackground"
// import DigitalLockBackground from "../backgrounds/DigitalLockBackground"

// const AuthContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
//   position: relative;
//   overflow: hidden;
// `

// const BackgroundPattern = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.1;
//   background-image: 
//     radial-gradient(circle at 25% 25%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
//     radial-gradient(circle at 75% 75%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px);
//   background-size: 50px 50px;
//   animation: float 20s ease-in-out infinite;
  
//   @keyframes float {
//     0%, 100% { transform: translateY(0px) rotate(0deg); }
//     50% { transform: translateY(-10px) rotate(1deg); }
//   }
// `

// const LeftPanel = styled.div`
//   flex: 0 0 40%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: ${(props) => props.theme.spacing.xxl};
//   position: relative;
//   z-index: 1;
  
//   @media (max-width: 1200px) {
//     flex: 0 0 35%;
//   }
  
//   @media (max-width: 768px) {
//     display: none;
//   }
// `

// const RightPanel = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: clamp(20px, 4vw, 60px);
//   position: relative;
//   z-index: 1;
//   max-width: 100%;
  
//   @media (max-width: 768px) {
//     flex: none;
//     width: 100%;
//     padding: 20px;
//   }
// `

// const Logo = styled.div`
//   text-align: center;
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   h1 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 48px;
//     font-weight: 800;
//     color: ${(props) => props.theme.colors.secondary.amber};
//     text-transform: uppercase;
//     letter-spacing: 3px;
//     margin-bottom: ${(props) => props.theme.spacing.sm};
//     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
//   }
  
//   p {
//     font-size: 18px;
//     color: ${(props) => props.theme.colors.dark.text};
//     text-transform: uppercase;
//     letter-spacing: 2px;
//     opacity: 0.9;
//   }
// `

// const FeatureList = styled.div`
//   max-width: 400px;
  
//   h3 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 24px;
//     color: ${(props) => props.theme.colors.dark.text};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//   }
// `

// const Feature = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: ${(props) => props.theme.spacing.lg};
  
//   .icon {
//     width: 40px;
//     height: 40px;
//     background-color: ${(props) => props.theme.colors.secondary.amber};
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: ${(props) => props.theme.spacing.md};
    
//     svg {
//       width: 20px;
//       height: 20px;
//       color: ${(props) => props.theme.colors.primary.darkNavy};
//     }
//   }
  
//   .content {
//     flex: 1;
    
//     h4 {
//       font-weight: 600;
//       color: ${(props) => props.theme.colors.dark.text};
//       margin-bottom: ${(props) => props.theme.spacing.xs};
//       text-transform: uppercase;
//       font-size: 14px;
//       letter-spacing: 0.5px;
//     }
    
//     p {
//       font-size: 13px;
//       color: ${(props) => props.theme.colors.dark.textSecondary};
//       line-height: 1.4;
//     }
//   }
// `

// const AuthLayout = ({ children, features = [] }) => {
//   return (
//     <AuthContainer>
//       <MatrixBackground opacity={0.12} />
//       <DigitalLockBackground opacity={0.06} />

//       <LeftPanel>
//         <Logo>
//           <h1>PROSEN</h1>
//           <p>Surveillance & Asset Protection</p>
//         </Logo>

//         {features.length > 0 && (
//           <FeatureList>
//             <h3>System Features</h3>
//             {features.map((feature, index) => (
//               <Feature key={index}>
//                 <div className="icon">{feature.icon}</div>
//                 <div className="content">
//                   <h4>{feature.title}</h4>
//                   <p>{feature.description}</p>
//                 </div>
//               </Feature>
//             ))}
//           </FeatureList>
//         )}
//       </LeftPanel>

//       <RightPanel>{children}</RightPanel>
//     </AuthContainer>
//   )
// }

// export default AuthLayout






// "use client"
// import styled from "styled-components"
// import MatrixBackground from "../backgrounds/MatrixBackground"
// import DigitalLockBackground from "../backgrounds/DigitalLockBackground"

// const AuthContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
//   position: relative;
//   overflow: hidden;
// `

// const BackgroundPattern = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.1;
//   background-image: 
//     radial-gradient(circle at 25% 25%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
//     radial-gradient(circle at 75% 75%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px);
//   background-size: 50px 50px;
//   animation: float 20s ease-in-out infinite;
  
//   @keyframes float {
//     0%, 100% { transform: translateY(0px) rotate(0deg); }
//     50% { transform: translateY(-10px) rotate(1deg); }
//   }
// `

// const LeftPanel = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: ${(props) => props.theme.spacing.xxl};
//   position: relative;
//   z-index: 1;
  
//   @media (max-width: 768px) {
//     display: none;
//   }
// `

// const RightPanel = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: ${(props) => props.theme.spacing.xl};
//   position: relative;
//   z-index: 1;
  
//   @media (max-width: 768px) {
//     flex: none;
//     width: 100%;
//   }
// `

// const Logo = styled.div`
//   text-align: center;
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   h1 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 48px;
//     font-weight: 800;
//     color: ${(props) => props.theme.colors.secondary.amber};
//     text-transform: uppercase;
//     letter-spacing: 3px;
//     margin-bottom: ${(props) => props.theme.spacing.sm};
//     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
//   }
  
//   p {
//     font-size: 18px;
//     color: ${(props) => props.theme.colors.dark.text};
//     text-transform: uppercase;
//     letter-spacing: 2px;
//     opacity: 0.9;
//   }
// `

// const FeatureList = styled.div`
//   max-width: 400px;
  
//   h3 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 24px;
//     color: ${(props) => props.theme.colors.dark.text};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//   }
// `

// const Feature = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: ${(props) => props.theme.spacing.lg};
  
//   .icon {
//     width: 40px;
//     height: 40px;
//     background-color: ${(props) => props.theme.colors.secondary.amber};
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: ${(props) => props.theme.spacing.md};
    
//     svg {
//       width: 20px;
//       height: 20px;
//       color: ${(props) => props.theme.colors.primary.darkNavy};
//     }
//   }
  
//   .content {
//     flex: 1;
    
//     h4 {
//       font-weight: 600;
//       color: ${(props) => props.theme.colors.dark.text};
//       margin-bottom: ${(props) => props.theme.spacing.xs};
//       text-transform: uppercase;
//       font-size: 14px;
//       letter-spacing: 0.5px;
//     }
    
//     p {
//       font-size: 13px;
//       color: ${(props) => props.theme.colors.dark.textSecondary};
//       line-height: 1.4;
//     }
//   }
// `

// const AuthLayout = ({ children, features = [] }) => {
//   return (
//     <AuthContainer>
//       <MatrixBackground opacity={0.12} />
//       <DigitalLockBackground opacity={0.06} />

//       <LeftPanel>
//         <Logo>
//           <h1>PROSEN</h1>
//           <p>Surveillance & Asset Protection</p>
//         </Logo>

//         {features.length > 0 && (
//           <FeatureList>
//             <h3>System Features</h3>
//             {features.map((feature, index) => (
//               <Feature key={index}>
//                 <div className="icon">{feature.icon}</div>
//                 <div className="content">
//                   <h4>{feature.title}</h4>
//                   <p>{feature.description}</p>
//                 </div>
//               </Feature>
//             ))}
//           </FeatureList>
//         )}
//       </LeftPanel>

//       <RightPanel>{children}</RightPanel>
//     </AuthContainer>
//   )
// }

// export default AuthLayout
