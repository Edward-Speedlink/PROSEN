"use client"
import styled from "styled-components"
import { Shield, Camera, Map, Bone as Drone, ArrowRight, Users, Lock } from "lucide-react"
import Button from "../components/ui/Button"
import SecurityGridBackground from "../components/backgrounds/SecurityGridBackground"
import NetworkBackground from "../components/backgrounds/NetworkBackground"
import { useNavigate } from "react-router-dom"

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
  position: relative;
  overflow: hidden;
  width: 100%;
`

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 20% 80%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
      radial-gradient(circle at 80% 20%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px),
      radial-gradient(circle at 40% 40%, ${(props) => props.theme.colors.secondary.red} 1px, transparent 1px);
    background-size: 100px 100px, 150px 150px, 200px 200px;
    animation: drift 30s linear infinite;
  }
  
  @keyframes drift {
    0% { transform: rotate(0deg) translate(-50px, -50px); }
    100% { transform: rotate(360deg) translate(-50px, -50px); }
  }
`

const Header = styled.header`
  position: relative;
  z-index: 10;
  padding: ${(props) => props.theme.spacing.xl} clamp(${(props) => props.theme.spacing.lg}, 5vw, ${(props) => props.theme.spacing.xxl});
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.lg};
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.lg};
  }
`

const Logo = styled.div`
  h1 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 800;
    color: ${(props) => props.theme.colors.primary.neonCyan};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  p {
    font-size: 12px;
    color: ${(props) => props.theme.colors.dark.textSecondary};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
  }
`

const AuthButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`

const HeroSection = styled.section`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl} clamp(${(props) => props.theme.spacing.lg}, 5vw, 10%);
  width: 100%;
  
  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.lg};
  }
`

const HeroTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(36px, 8vw, 72px);
  font-weight: 800;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: clamp(1px, 0.5vw, 3px);
  margin-bottom: ${(props) => props.theme.spacing.lg};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
`

const HeroSubtitle = styled.p`
  font-size: clamp(18px, 3vw, 24px);
  color: ${(props) => props.theme.colors.dark.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  max-width: min(90%, 800px);
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
`

const CTAButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(${(props) => props.theme.spacing.lg}, 3vw, ${(props) => props.theme.spacing.xl});
  margin-top: ${(props) => props.theme.spacing.xxl};
  padding: 0 clamp(${(props) => props.theme.spacing.lg}, 3vw, 5%);
  width: 100%;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${(props) => props.theme.spacing.xxl};
  }
`

const FeatureCard = styled.div`
  background-color: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: clamp(${(props) => props.theme.spacing.lg}, 4vw, ${(props) => props.theme.spacing.xl});
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.primary.deepBlue};
  transition: all ${(props) => props.theme.transitions.normal};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${(props) => props.theme.shadows.lg};
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
  }
  
  .icon {
    width: 60px;
    height: 60px;
    background-color: ${(props) => props.theme.colors.primary.neonCyan};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${(props) => props.theme.spacing.lg};
    
    svg {
      width: 28px;
      height: 28px;
      color: ${(props) => props.theme.colors.primary.deepBlue};
    }
  }
  
  h3 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: clamp(16px, 2.5vw, 20px);
    font-weight: 700;
    color: ${(props) => props.theme.colors.dark.text};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: ${(props) => props.theme.spacing.md};
  }
  
  p {
    color: ${(props) => props.theme.colors.dark.textSecondary};
    line-height: 1.6;
    flex-grow: 1;
    font-size: clamp(14px, 2vw, 16px);
  }
`

const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Camera />,
      title: "Smart Surveillance",
      description: "AI-powered camera network with real-time face recognition and threat detection capabilities.",
    },
    {
      icon: <Shield />,
      title: "Asset Protection",
      description: "Comprehensive vehicle tracking and theft prevention system with instant alerts.",
    },
    {
      icon: <Map />,
      title: "Live Tracking",
      description: "Real-time GPS tracking for suspects, vehicles, and emergency response coordination.",
    },
    {
      icon: <Drone />,
      title: "Drone Services",
      description: "On-demand aerial surveillance and emergency response drone deployment.",
    },
    {
      icon: <Users />,
      title: "Multi-User Access",
      description: "Separate portals for civilians and law enforcement with role-based permissions.",
    },
    {
      icon: <Lock />,
      title: "Secure Platform",
      description: "Military-grade encryption and security protocols to protect sensitive data.",
    },
  ]

  return (
    <HomeContainer>
      <SecurityGridBackground opacity={0.15} />
      <NetworkBackground opacity={0.08} />

      <Header>
        <Logo>
          <h1>PROSEN</h1>
          <p>Surveillance & Asset Protection</p>
        </Logo>

        <AuthButtons>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button variant="secondary" onClick={() => navigate("/register")}>
            Get Started
          </Button>
        </AuthButtons>
      </Header>

      <HeroSection>
        <HeroTitle>Advanced Security Solutions</HeroTitle>
        <HeroSubtitle>
          Protect your assets and community with our comprehensive surveillance and tracking platform
        </HeroSubtitle>

        <CTAButtons>
          <Button variant="secondary" size="lg" onClick={() => navigate("/register")}>
            Join PROSEN
            <ArrowRight />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Learn More
          </Button>
        </CTAButtons>

        <FeaturesGrid id="features">
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </HeroSection>
    </HomeContainer>
  )
}

export default HomePage











// "use client"
// import styled from "styled-components"
// import { Shield, Camera, Map, Bone as Drone, ArrowRight, Users, Lock } from "lucide-react"
// import Button from "../components/ui/Button"
// import SecurityGridBackground from "../components/backgrounds/SecurityGridBackground"
// import NetworkBackground from "../components/backgrounds/NetworkBackground"
// import { useNavigate } from "react-router-dom"

// const HomeContainer = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
//   position: relative;
//   overflow: hidden;
// `

// const BackgroundAnimation = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.1;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 200%;
//     background: 
//       radial-gradient(circle at 20% 80%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
//       radial-gradient(circle at 80% 20%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px),
//       radial-gradient(circle at 40% 40%, ${(props) => props.theme.colors.secondary.red} 1px, transparent 1px);
//     background-size: 100px 100px, 150px 150px, 200px 200px;
//     animation: drift 30s linear infinite;
//   }
  
//   @keyframes drift {
//     0% { transform: rotate(0deg) translate(-50px, -50px); }
//     100% { transform: rotate(360deg) translate(-50px, -50px); }
//   }
// `

// const Header = styled.header`
//   position: relative;
//   z-index: 10;
//   padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.xxl};
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
  
//   @media (max-width: 768px) {
//     padding: ${(props) => props.theme.spacing.lg};
//     flex-direction: column;
//     gap: ${(props) => props.theme.spacing.lg};
//   }
// `

// const Logo = styled.div`
//   h1 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 32px;
//     font-weight: 800;
//     color: ${(props) => props.theme.colors.secondary.amber};
//     text-transform: uppercase;
//     letter-spacing: 2px;
//   }
  
//   p {
//     font-size: 12px;
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-top: 4px;
//   }
// `

// const AuthButtons = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.md};
  
//   @media (max-width: 480px) {
//     flex-direction: column;
//     width: 100%;
//   }
// `

// const HeroSection = styled.section`
//   position: relative;
//   z-index: 10;
//   text-align: center;
//   padding: ${(props) => props.theme.spacing.xxl} 5%;
//   width: 100%;
  
//   @media (max-width: 768px) {
//     padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.lg};
//   }
// `

// const HeroTitle = styled.h1`
//   font-family: ${(props) => props.theme.fonts.heading};
//   font-size: 64px;
//   font-weight: 800;
//   color: ${(props) => props.theme.colors.dark.text};
//   text-transform: uppercase;
//   letter-spacing: 3px;
//   margin-bottom: ${(props) => props.theme.spacing.lg};
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
//   @media (max-width: 768px) {
//     font-size: 48px;
//     letter-spacing: 2px;
//   }
  
//   @media (max-width: 480px) {
//     font-size: 36px;
//     letter-spacing: 1px;
//   }
// `

// const HeroSubtitle = styled.p`
//   font-size: 24px;
//   color: ${(props) => props.theme.colors.dark.textSecondary};
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
//   line-height: 1.4;
  
//   @media (max-width: 768px) {
//     font-size: 20px;
//   }
  
//   @media (max-width: 480px) {
//     font-size: 18px;
//   }
// `

// const CTAButtons = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.lg};
//   justify-content: center;
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   @media (max-width: 480px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-top: ${(props) => props.theme.spacing.xxl};
//   padding: 0 2%;
//   max-width: 1400px;
//   margin-left: auto;
//   margin-right: auto;
  
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     padding: 0 ${(props) => props.theme.spacing.lg};
//   }
  
//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `

// const FeatureCard = styled.div`
//   background-color: ${(props) => props.theme.colors.dark.surface};
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   padding: ${(props) => props.theme.spacing.xl};
//   text-align: center;
//   border: 1px solid ${(props) => props.theme.colors.primary.deepBlue};
//   transition: all ${(props) => props.theme.transitions.normal};
  
//   &:hover {
//     transform: translateY(-8px);
//     box-shadow: ${(props) => props.theme.shadows.lg};
//     border-color: ${(props) => props.theme.colors.secondary.amber};
//   }
  
//   .icon {
//     width: 60px;
//     height: 60px;
//     background-color: ${(props) => props.theme.colors.secondary.amber};
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto ${(props) => props.theme.spacing.lg};
    
//     svg {
//       width: 28px;
//       height: 28px;
//       color: ${(props) => props.theme.colors.primary.darkNavy};
//     }
//   }
  
//   h3 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 20px;
//     font-weight: 700;
//     color: ${(props) => props.theme.colors.dark.text};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: ${(props) => props.theme.spacing.md};
//   }
  
//   p {
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//     line-height: 1.6;
//   }
// `

// const HomePage = () => {
//   const navigate = useNavigate()

//   const features = [
//     {
//       icon: <Camera />,
//       title: "Smart Surveillance",
//       description: "AI-powered camera network with real-time face recognition and threat detection capabilities.",
//     },
//     {
//       icon: <Shield />,
//       title: "Asset Protection",
//       description: "Comprehensive vehicle tracking and theft prevention system with instant alerts.",
//     },
//     {
//       icon: <Map />,
//       title: "Live Tracking",
//       description: "Real-time GPS tracking for suspects, vehicles, and emergency response coordination.",
//     },
//     {
//       icon: <Drone />,
//       title: "Drone Services",
//       description: "On-demand aerial surveillance and emergency response drone deployment.",
//     },
//     {
//       icon: <Users />,
//       title: "Multi-User Access",
//       description: "Separate portals for civilians and law enforcement with role-based permissions.",
//     },
//     {
//       icon: <Lock />,
//       title: "Secure Platform",
//       description: "Military-grade encryption and security protocols to protect sensitive data.",
//     },
//   ]

//   return (
//     <HomeContainer>
//       <SecurityGridBackground opacity={0.15} />
//       <NetworkBackground opacity={0.08} />

//       <Header>
//         <Logo>
//           <h1>PROSEN</h1>
//           <p>Surveillance & Asset Protection</p>
//         </Logo>

//         <AuthButtons>
//           <Button variant="outline" onClick={() => navigate("/login")}>
//             Sign In
//           </Button>
//           <Button variant="secondary" onClick={() => navigate("/register")}>
//             Get Started
//           </Button>
//         </AuthButtons>
//       </Header>

//       <HeroSection>
//         <HeroTitle>Advanced Security Solutions</HeroTitle>
//         <HeroSubtitle>
//           Protect your assets and community with our comprehensive surveillance and tracking platform
//         </HeroSubtitle>

//         <CTAButtons>
//           <Button variant="secondary" size="lg" onClick={() => navigate("/register")}>
//             Join PROSEN
//             <ArrowRight />
//           </Button>
//           <Button
//             variant="outline"
//             size="lg"
//             onClick={() => {
//               document.getElementById("features").scrollIntoView({ behavior: "smooth" })
//             }}
//           >
//             Learn More
//           </Button>
//         </CTAButtons>

//         <FeaturesGrid id="features">
//           {features.map((feature, index) => (
//             <FeatureCard key={index}>
//               <div className="icon">{feature.icon}</div>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//             </FeatureCard>
//           ))}
//         </FeaturesGrid>
//       </HeroSection>
//     </HomeContainer>
//   )
// }

// export default HomePage















// "use client"
// import styled from "styled-components"
// import { Shield, Camera, Map, Bone as Drone, ArrowRight, Users, Lock } from "lucide-react"
// import Button from "../components/ui/Button"
// import SecurityGridBackground from "../components/backgrounds/SecurityGridBackground"
// import NetworkBackground from "../components/backgrounds/NetworkBackground"
// import { useNavigate } from "react-router-dom"

// const HomeContainer = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
//   position: relative;
//   overflow: hidden;
// `

// const BackgroundAnimation = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.1;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 200%;
//     background: 
//       radial-gradient(circle at 20% 80%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
//       radial-gradient(circle at 80% 20%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px),
//       radial-gradient(circle at 40% 40%, ${(props) => props.theme.colors.secondary.red} 1px, transparent 1px);
//     background-size: 100px 100px, 150px 150px, 200px 200px;
//     animation: drift 30s linear infinite;
//   }
  
//   @keyframes drift {
//     0% { transform: rotate(0deg) translate(-50px, -50px); }
//     100% { transform: rotate(360deg) translate(-50px, -50px); }
//   }
// `

// const Header = styled.header`
//   position: relative;
//   z-index: 10;
//   padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.xxl};
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
  
//   @media (max-width: 768px) {
//     padding: ${(props) => props.theme.spacing.lg};
//     flex-direction: column;
//     gap: ${(props) => props.theme.spacing.lg};
//   }
// `

// const Logo = styled.div`
//   h1 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 32px;
//     font-weight: 800;
//     color: ${(props) => props.theme.colors.secondary.amber};
//     text-transform: uppercase;
//     letter-spacing: 2px;
//   }
  
//   p {
//     font-size: 12px;
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-top: 4px;
//   }
// `

// const AuthButtons = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.md};
  
//   @media (max-width: 480px) {
//     flex-direction: column;
//     width: 100%;
//   }
// `

// const HeroSection = styled.section`
//   position: relative;
//   z-index: 10;
//   text-align: center;
//   padding: ${(props) => props.theme.spacing.xxl} ${(props) => props.theme.spacing.xl};
//   max-width: 1200px;
//   margin: 0 auto;
  
//   @media (max-width: 768px) {
//     padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.lg};
//   }
// `

// const HeroTitle = styled.h1`
//   font-family: ${(props) => props.theme.fonts.heading};
//   font-size: 64px;
//   font-weight: 800;
//   color: ${(props) => props.theme.colors.dark.text};
//   text-transform: uppercase;
//   letter-spacing: 3px;
//   margin-bottom: ${(props) => props.theme.spacing.lg};
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
//   @media (max-width: 768px) {
//     font-size: 48px;
//     letter-spacing: 2px;
//   }
  
//   @media (max-width: 480px) {
//     font-size: 36px;
//     letter-spacing: 1px;
//   }
// `

// const HeroSubtitle = styled.p`
//   font-size: 24px;
//   color: ${(props) => props.theme.colors.dark.textSecondary};
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
//   line-height: 1.4;
  
//   @media (max-width: 768px) {
//     font-size: 20px;
//   }
  
//   @media (max-width: 480px) {
//     font-size: 18px;
//   }
// `

// const CTAButtons = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.lg};
//   justify-content: center;
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   @media (max-width: 480px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-top: ${(props) => props.theme.spacing.xxl};
//   padding: 0 ${(props) => props.theme.spacing.xl};
// `

// const FeatureCard = styled.div`
//   background-color: ${(props) => props.theme.colors.dark.surface};
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   padding: ${(props) => props.theme.spacing.xl};
//   text-align: center;
//   border: 1px solid ${(props) => props.theme.colors.primary.deepBlue};
//   transition: all ${(props) => props.theme.transitions.normal};
  
//   &:hover {
//     transform: translateY(-8px);
//     box-shadow: ${(props) => props.theme.shadows.lg};
//     border-color: ${(props) => props.theme.colors.secondary.amber};
//   }
  
//   .icon {
//     width: 60px;
//     height: 60px;
//     background-color: ${(props) => props.theme.colors.secondary.amber};
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto ${(props) => props.theme.spacing.lg};
    
//     svg {
//       width: 28px;
//       height: 28px;
//       color: ${(props) => props.theme.colors.primary.darkNavy};
//     }
//   }
  
//   h3 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 20px;
//     font-weight: 700;
//     color: ${(props) => props.theme.colors.dark.text};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: ${(props) => props.theme.spacing.md};
//   }
  
//   p {
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//     line-height: 1.6;
//   }
// `

// const HomePage = () => {
//   const navigate = useNavigate()

//   const features = [
//     {
//       icon: <Camera />,
//       title: "Smart Surveillance",
//       description: "AI-powered camera network with real-time face recognition and threat detection capabilities.",
//     },
//     {
//       icon: <Shield />,
//       title: "Asset Protection",
//       description: "Comprehensive vehicle tracking and theft prevention system with instant alerts.",
//     },
//     {
//       icon: <Map />,
//       title: "Live Tracking",
//       description: "Real-time GPS tracking for suspects, vehicles, and emergency response coordination.",
//     },
//     {
//       icon: <Drone />,
//       title: "Drone Services",
//       description: "On-demand aerial surveillance and emergency response drone deployment.",
//     },
//     {
//       icon: <Users />,
//       title: "Multi-User Access",
//       description: "Separate portals for civilians and law enforcement with role-based permissions.",
//     },
//     {
//       icon: <Lock />,
//       title: "Secure Platform",
//       description: "Military-grade encryption and security protocols to protect sensitive data.",
//     },
//   ]

//   return (
//     <HomeContainer>
//       <SecurityGridBackground opacity={0.15} />
//       <NetworkBackground opacity={0.08} />

//       <Header>
//         <Logo>
//           <h1>PROSEN</h1>
//           <p>Surveillance & Asset Protection</p>
//         </Logo>

//         <AuthButtons>
//           <Button variant="outline" onClick={() => navigate("/login")}>
//             Sign In
//           </Button>
//           <Button variant="secondary" onClick={() => navigate("/register")}>
//             Get Started
//           </Button>
//         </AuthButtons>
//       </Header>

//       <HeroSection>
//         <HeroTitle>Advanced Security Solutions</HeroTitle>
//         <HeroSubtitle>
//           Protect your assets and community with our comprehensive surveillance and tracking platform
//         </HeroSubtitle>

//         <CTAButtons>
//           <Button variant="secondary" size="lg" onClick={() => navigate("/register")}>
//             Join PROSEN
//             <ArrowRight />
//           </Button>
//           <Button
//             variant="outline"
//             size="lg"
//             onClick={() => {
//               document.getElementById("features").scrollIntoView({ behavior: "smooth" })
//             }}
//           >
//             Learn More
//           </Button>
//         </CTAButtons>

//         <FeaturesGrid id="features">
//           {features.map((feature, index) => (
//             <FeatureCard key={index}>
//               <div className="icon">{feature.icon}</div>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//             </FeatureCard>
//           ))}
//         </FeaturesGrid>
//       </HeroSection>
//     </HomeContainer>
//   )
// }

// export default HomePage












// "use client"
// import styled from "styled-components"
// import { Shield, Camera, Map, Bone as Drone, ArrowRight, Users, Lock } from "lucide-react"
// import Button from "../components/ui/Button"
// import SecurityGridBackground from "../components/backgrounds/SecurityGridBackground"
// import NetworkBackground from "../components/backgrounds/NetworkBackground"

// const HomeContainer = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.darkNavy} 0%, ${(props) => props.theme.colors.primary.deepBlue} 100%);
//   position: relative;
//   overflow: hidden;
// `

// const BackgroundAnimation = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.1;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 200%;
//     background: 
//       radial-gradient(circle at 20% 80%, ${(props) => props.theme.colors.secondary.amber} 2px, transparent 2px),
//       radial-gradient(circle at 80% 20%, ${(props) => props.theme.colors.supportive.teal} 1px, transparent 1px),
//       radial-gradient(circle at 40% 40%, ${(props) => props.theme.colors.secondary.red} 1px, transparent 1px);
//     background-size: 100px 100px, 150px 150px, 200px 200px;
//     animation: drift 30s linear infinite;
//   }
  
//   @keyframes drift {
//     0% { transform: rotate(0deg) translate(-50px, -50px); }
//     100% { transform: rotate(360deg) translate(-50px, -50px); }
//   }
// `

// const Header = styled.header`
//   position: relative;
//   z-index: 10;
//   padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.xxl};
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
  
//   @media (max-width: 768px) {
//     padding: ${(props) => props.theme.spacing.lg};
//     flex-direction: column;
//     gap: ${(props) => props.theme.spacing.lg};
//   }
// `

// const Logo = styled.div`
//   h1 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 32px;
//     font-weight: 800;
//     color: ${(props) => props.theme.colors.secondary.amber};
//     text-transform: uppercase;
//     letter-spacing: 2px;
//   }
  
//   p {
//     font-size: 12px;
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-top: 4px;
//   }
// `

// const AuthButtons = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.md};
  
//   @media (max-width: 480px) {
//     flex-direction: column;
//     width: 100%;
//   }
// `

// const HeroSection = styled.section`
//   position: relative;
//   z-index: 10;
//   text-align: center;
//   padding: ${(props) => props.theme.spacing.xxl} ${(props) => props.theme.spacing.xl};
//   max-width: 1200px;
//   margin: 0 auto;
  
//   @media (max-width: 768px) {
//     padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.lg};
//   }
// `

// const HeroTitle = styled.h1`
//   font-family: ${(props) => props.theme.fonts.heading};
//   font-size: 64px;
//   font-weight: 800;
//   color: ${(props) => props.theme.colors.dark.text};
//   text-transform: uppercase;
//   letter-spacing: 3px;
//   margin-bottom: ${(props) => props.theme.spacing.lg};
//   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
//   @media (max-width: 768px) {
//     font-size: 48px;
//     letter-spacing: 2px;
//   }
  
//   @media (max-width: 480px) {
//     font-size: 36px;
//     letter-spacing: 1px;
//   }
// `

// const HeroSubtitle = styled.p`
//   font-size: 24px;
//   color: ${(props) => props.theme.colors.dark.textSecondary};
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
//   line-height: 1.4;
  
//   @media (max-width: 768px) {
//     font-size: 20px;
//   }
  
//   @media (max-width: 480px) {
//     font-size: 18px;
//   }
// `

// const CTAButtons = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.lg};
//   justify-content: center;
//   margin-bottom: ${(props) => props.theme.spacing.xxl};
  
//   @media (max-width: 480px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: ${(props) => props.theme.spacing.xl};
//   margin-top: ${(props) => props.theme.spacing.xxl};
//   padding: 0 ${(props) => props.theme.spacing.xl};
// `

// const FeatureCard = styled.div`
//   background-color: ${(props) => props.theme.colors.dark.surface};
//   border-radius: ${(props) => props.theme.borderRadius.xl};
//   padding: ${(props) => props.theme.spacing.xl};
//   text-align: center;
//   border: 1px solid ${(props) => props.theme.colors.primary.deepBlue};
//   transition: all ${(props) => props.theme.transitions.normal};
  
//   &:hover {
//     transform: translateY(-8px);
//     box-shadow: ${(props) => props.theme.shadows.lg};
//     border-color: ${(props) => props.theme.colors.secondary.amber};
//   }
  
//   .icon {
//     width: 60px;
//     height: 60px;
//     background-color: ${(props) => props.theme.colors.secondary.amber};
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto ${(props) => props.theme.spacing.lg};
    
//     svg {
//       width: 28px;
//       height: 28px;
//       color: ${(props) => props.theme.colors.primary.darkNavy};
//     }
//   }
  
//   h3 {
//     font-family: ${(props) => props.theme.fonts.heading};
//     font-size: 20px;
//     font-weight: 700;
//     color: ${(props) => props.theme.colors.dark.text};
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: ${(props) => props.theme.spacing.md};
//   }
  
//   p {
//     color: ${(props) => props.theme.colors.dark.textSecondary};
//     line-height: 1.6;
//   }
// `

// const HomePage = () => {
//   const features = [
//     {
//       icon: <Camera />,
//       title: "Smart Surveillance",
//       description: "AI-powered camera network with real-time face recognition and threat detection capabilities.",
//     },
//     {
//       icon: <Shield />,
//       title: "Asset Protection",
//       description: "Comprehensive vehicle tracking and theft prevention system with instant alerts.",
//     },
//     {
//       icon: <Map />,
//       title: "Live Tracking",
//       description: "Real-time GPS tracking for suspects, vehicles, and emergency response coordination.",
//     },
//     {
//       icon: <Drone />,
//       title: "Drone Services",
//       description: "On-demand aerial surveillance and emergency response drone deployment.",
//     },
//     {
//       icon: <Users />,
//       title: "Multi-User Access",
//       description: "Separate portals for civilians and law enforcement with role-based permissions.",
//     },
//     {
//       icon: <Lock />,
//       title: "Secure Platform",
//       description: "Military-grade encryption and security protocols to protect sensitive data.",
//     },
//   ]

//   return (
//     <HomeContainer>
//       <SecurityGridBackground opacity={0.15} />
//       <NetworkBackground opacity={0.08} />

//       <Header>
//         <Logo>
//           <h1>PROSEN</h1>
//           <p>Surveillance & Asset Protection</p>
//         </Logo>

//         <AuthButtons>
//           <Button variant="outline" onClick={() => console.log("Navigate to login")}>
//             Sign In
//           </Button>
//           <Button variant="secondary" onClick={() => console.log("Navigate to register")}>
//             Get Started
//           </Button>
//         </AuthButtons>
//       </Header>

//       <HeroSection>
//         <HeroTitle>Advanced Security Solutions</HeroTitle>
//         <HeroSubtitle>
//           Protect your assets and community with our comprehensive surveillance and tracking platform
//         </HeroSubtitle>

//         <CTAButtons>
//           <Button variant="secondary" size="lg" onClick={() => console.log("Navigate to register")}>
//             Join PROSEN
//             <ArrowRight />
//           </Button>
//           <Button variant="outline" size="lg" onClick={() => console.log("Learn more")}>
//             Learn More
//           </Button>
//         </CTAButtons>

//         <FeaturesGrid>
//           {features.map((feature, index) => (
//             <FeatureCard key={index}>
//               <div className="icon">{feature.icon}</div>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//             </FeatureCard>
//           ))}
//         </FeaturesGrid>
//       </HeroSection>
//     </HomeContainer>
//   )
// }

// export default HomePage
