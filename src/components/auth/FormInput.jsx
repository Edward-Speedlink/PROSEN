"use client"
import styled from "styled-components"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const InputGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InputContainer = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => (props.hasIcon ? "48px" : props.theme.spacing.md)};
  background-color: ${(props) => props.theme.colors.primary.darkNavy};
  border: 2px solid ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.primary.deepBlue)};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.dark.text};
  font-size: 14px;
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.secondary.amber)};
    box-shadow: 0 0 0 3px ${(props) => (props.hasError ? props.theme.colors.secondary.red : props.theme.colors.secondary.amber)}20;
  }
  
  &::placeholder {
    color: ${(props) => props.theme.colors.supportive.coolGray};
  }
`

const IconButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.supportive.coolGray};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color ${(props) => props.theme.transitions.fast};
  
  &:hover {
    color: ${(props) => props.theme.colors.secondary.amber};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const ErrorMessage = styled.span`
  display: block;
  color: ${(props) => props.theme.colors.secondary.red};
  font-size: 12px;
  margin-top: ${(props) => props.theme.spacing.xs};
  font-weight: 500;
`

const FormInput = ({ label, type = "text", placeholder, value, onChange, error, required = false, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type

  return (
    <InputGroup>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: "#E63946" }}> *</span>}
        </Label>
      )}
      <InputContainer>
        <Input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasError={!!error}
          hasIcon={isPassword}
          {...props}
        />
        {isPassword && (
          <IconButton type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </IconButton>
        )}
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputGroup>
  )
}

export default FormInput
