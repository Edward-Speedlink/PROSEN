"use client"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { CheckCircle, AlertCircle, XCircle, X } from "lucide-react"

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`

const ToastContainer = styled.div`
  position: fixed;
  top: 90px;
  right: ${(props) => props.theme.spacing.lg};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`

const ToastItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.surface : props.theme.colors.light.surface)};
  border: 1px solid ${(props) => {
    switch (props.type) {
      case "success":
        return props.theme.colors.secondary.green
      case "error":
        return props.theme.colors.secondary.red
      case "warning":
        return props.theme.colors.secondary.amber
      default:
        return props.theme.colors.primary.deepBlue
    }
  }};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.lg};
  min-width: 300px;
  max-width: 400px;
  animation: ${(props) => (props.isExiting ? slideOut : slideIn)} 0.3s ease-out;
`

const IconWrapper = styled.div`
  color: ${(props) => {
    switch (props.type) {
      case "success":
        return props.theme.colors.secondary.green
      case "error":
        return props.theme.colors.secondary.red
      case "warning":
        return props.theme.colors.secondary.amber
      default:
        return props.theme.colors.secondary.amber
    }
  }};
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const Content = styled.div`
  flex: 1;
`

const Title = styled.div`
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
  margin-bottom: 2px;
`

const Message = styled.div`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 13px;
  color: ${(props) => props.theme.colors.supportive.coolGray};
  line-height: 1.4;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.supportive.coolGray};
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  transition: all ${(props) => props.theme.transitions.fast};
  
  &:hover {
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.lightGray)};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const getIcon = (type) => {
  switch (type) {
    case "success":
      return CheckCircle
    case "error":
      return XCircle
    case "warning":
      return AlertCircle
    default:
      return AlertCircle
  }
}

export const Toast = ({ id, type = "info", title, message, onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false)
  const Icon = getIcon(type)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose(id)
    }, 300)
  }

  return (
    <ToastItem type={type} isExiting={isExiting}>
      <IconWrapper type={type}>
        <Icon />
      </IconWrapper>
      <Content>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
      </Content>
      <CloseButton onClick={handleClose}>
        <X />
      </CloseButton>
    </ToastItem>
  )
}

export const ToastProvider = ({ toasts, onRemoveToast }) => {
  if (!toasts.length) return null

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onRemoveToast} />
      ))}
    </ToastContainer>
  )
}

export default Toast
