import styled from "styled-components"

const getStatusStyles = (status, theme) => {
  switch (status) {
    case "online":
    case "active":
    case "connected":
      return `
        background-color: ${theme.colors.supportive.teal};
        color: white;
      `
    case "offline":
    case "inactive":
    case "disconnected":
      return `
        background-color: ${theme.colors.supportive.coolGray};
        color: white;
      `
    case "warning":
    case "pending":
      return `
        background-color: ${theme.colors.secondary.amber};
        color: ${theme.colors.primary.darkNavy};
      `
    case "error":
    case "alert":
    case "critical":
      return `
        background-color: ${theme.colors.secondary.red};
        color: white;
      `
    default:
      return `
        background-color: ${theme.colors.supportive.coolGray};
        color: white;
      `
  }
}

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: 4px 8px;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${(props) => getStatusStyles(props.status, props.theme)}
`

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
`

const StatusBadge = ({ status, children, showDot = true }) => {
  return (
    <Badge status={status}>
      {showDot && <StatusDot />}
      {children || status}
    </Badge>
  )
}

export default StatusBadge
