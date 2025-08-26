"use client"
import styled from "styled-components"

const getButtonStyles = (variant, theme) => {
  switch (variant) {
    case "primary":
      return `
        background-color: ${theme.colors.primary.deepBlue};
        color: white;
        border: 2px solid ${theme.colors.primary.deepBlue};
        
        &:hover {
          background-color: ${theme.colors.primary.darkNavy};
          border-color: ${theme.colors.primary.darkNavy};
        }
      `
    case "secondary":
      return `
        background-color: ${theme.colors.secondary.amber};
        color: ${theme.colors.primary.darkNavy};
        border: 2px solid ${theme.colors.secondary.amber};
        
        &:hover {
          background-color: #e6a502;
          border-color: #e6a502;
        }
      `
    case "danger":
      return `
        background-color: ${theme.colors.secondary.red};
        color: white;
        border: 2px solid ${theme.colors.secondary.red};
        
        &:hover {
          background-color: #c53030;
          border-color: #c53030;
        }
      `
    case "outline":
      return `
        background-color: transparent;
        color: ${theme.isDark ? theme.colors.dark.text : theme.colors.light.text};
        border: 2px solid ${theme.colors.supportive.coolGray};
        
        &:hover {
          background-color: ${theme.colors.supportive.coolGray};
          color: white;
        }
      `
    case "ghost":
      return `
        background-color: transparent;
        color: ${theme.isDark ? theme.colors.dark.text : theme.colors.light.text};
        border: 2px solid transparent;
        
        &:hover {
          background-color: ${theme.isDark ? theme.colors.primary.deepBlue : theme.colors.supportive.lightGray};
        }
      `
    default:
      return `
        background-color: ${theme.colors.primary.deepBlue};
        color: white;
        border: 2px solid ${theme.colors.primary.deepBlue};
        
        &:hover {
          background-color: ${theme.colors.primary.darkNavy};
          border-color: ${theme.colors.primary.darkNavy};
        }
      `
  }
}

const getSizeStyles = (size) => {
  switch (size) {
    case "sm":
      return `
        padding: 8px 16px;
        font-size: 12px;
        min-height: 32px;
      `
    case "lg":
      return `
        padding: 16px 32px;
        font-size: 16px;
        min-height: 48px;
      `
    default:
      return `
        padding: 12px 24px;
        font-size: 14px;
        min-height: 40px;
      `
  }
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  ${(props) => getButtonStyles(props.variant, props.theme)}
  ${(props) => getSizeStyles(props.size)}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
    }
  }
  
  &:not(:disabled):hover {
    transform: translateY(-1px);
  }
  
  &:not(:disabled):active {
    transform: translateY(0);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
