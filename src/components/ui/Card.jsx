import styled from "styled-components"

const CardContainer = styled.div`
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.surface : props.theme.colors.light.surface)};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: ${(props) => props.theme.spacing.xl};
  transition: all ${(props) => props.theme.transitions.fast};
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : "transparent")};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  
  h3 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const CardContent = styled.div`
  color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
  line-height: 1.6;
`

const Card = ({ title, children, headerAction, className, ...props }) => {
  return (
    <CardContainer className={className} {...props}>
      {title && (
        <CardHeader>
          <h3>{title}</h3>
          {headerAction}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  )
}

export default Card
