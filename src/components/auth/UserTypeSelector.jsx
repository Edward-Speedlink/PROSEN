"use client"
import styled from "styled-components"
import { Shield, User } from "lucide-react"

const SelectorContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const TypeOption = styled.button`
  flex: 1;
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.secondary.amber : props.theme.colors.primary.darkNavy};
  border: 2px solid ${(props) =>
    props.isSelected ? props.theme.colors.secondary.amber : props.theme.colors.primary.deepBlue};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  color: ${(props) => (props.isSelected ? props.theme.colors.primary.darkNavy : props.theme.colors.dark.text)};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  
  &:hover {
    border-color: ${(props) => props.theme.colors.secondary.amber};
    background-color: ${(props) =>
      props.isSelected ? props.theme.colors.secondary.amber : props.theme.colors.primary.deepBlue};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  .title {
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .description {
    font-size: 12px;
    opacity: 0.8;
    text-align: center;
    line-height: 1.3;
  }
`

const UserTypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <SelectorContainer>
      <TypeOption isSelected={selectedType === "civilian"} onClick={() => onTypeChange("civilian")} type="button">
        <User />
        <div className="title">Civilian</div>
        <div className="description">Register vehicles and request drone services</div>
      </TypeOption>

      <TypeOption
        isSelected={selectedType === "law_enforcement"}
        onClick={() => onTypeChange("law_enforcement")}
        type="button"
      >
        <Shield />
        <div className="title">Law Enforcement</div>
        <div className="description">Access surveillance and tracking systems</div>
      </TypeOption>
    </SelectorContainer>
  )
}

export default UserTypeSelector
