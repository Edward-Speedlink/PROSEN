"use client"

import { useState } from "react"
import styled from "styled-components"
import { User, Bell, Shield, Eye, Save } from "lucide-react"

const SettingsContainer = styled.div`
  padding: clamp(16px, 4vw, 32px);
  max-width: 1200px;
  margin: 0 auto;
`

const SettingsHeader = styled.div`
  margin-bottom: clamp(24px, 5vw, 48px);
`

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.dark.textSecondary};
  font-size: clamp(14px, 2.5vw, 16px);
  font-family: ${(props) => props.theme.fonts.body};
`

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(16px, 3vw, 24px);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SettingsCard = styled.div`
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: clamp(20px, 4vw, 32px);
  border: 1px solid rgba(0, 229, 255, 0.1);
  transition: all ${(props) => props.theme.transitions.normal};

  &:hover {
    border-color: rgba(0, 229, 255, 0.3);
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}20, ${(props) => props.theme.colors.primary.neonCyan}10);
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary.neonCyan};
`

const CardTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: clamp(16px, 3vw, 18px);
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark.text};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.dark.textSecondary};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.dark.text};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  transition: all ${(props) => props.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
    box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.1);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  background: ${(props) => props.theme.colors.primary.darkNavy};
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.dark.text};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.neonCyan};
  }
`

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`

const ToggleLabel = styled.span`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  color: ${(props) => props.theme.colors.dark.text};
`

const Toggle = styled.button`
  width: 50px;
  height: 24px;
  background: ${(props) => (props.active ? props.theme.colors.primary.neonCyan : props.theme.colors.supportive.coolGray)};
  border: none;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${(props) => (props.active ? "28px" : "2px")};
    transition: all ${(props) => props.theme.transitions.fast};
  }
`

const SaveButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary.neonCyan}, ${(props) => props.theme.colors.supportive.teal});
  color: ${(props) => props.theme.colors.primary.darkNavy};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 229, 255, 0.3);
  }
`

const UserSettings = () => {
  const [settings, setSettings] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    biometricAuth: true,
    twoFactorAuth: true,
    dataSharing: false,
    locationTracking: true,
    theme: "dark",
  })

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("[PROSEN] Saving user settings:", settings)
    // Add save functionality here
  }

  return (
    <SettingsContainer>
      <SettingsHeader>
        <Title>User Settings</Title>
        <Subtitle>Manage your account preferences and security settings</Subtitle>
      </SettingsHeader>

      <SettingsGrid>
        {/* Profile Settings */}
        <SettingsCard>
          <CardHeader>
            <CardIcon>
              <User size={20} />
            </CardIcon>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>

          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              value={settings.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              value={settings.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email Address</Label>
            <Input type="email" value={settings.email} onChange={(e) => handleInputChange("email", e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <Input type="tel" value={settings.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
          </FormGroup>
        </SettingsCard>

        {/* Notification Settings */}
        <SettingsCard>
          <CardHeader>
            <CardIcon>
              <Bell size={20} />
            </CardIcon>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>

          <ToggleSwitch>
            <ToggleLabel>Push Notifications</ToggleLabel>
            <Toggle
              active={settings.notifications}
              onClick={() => handleInputChange("notifications", !settings.notifications)}
            />
          </ToggleSwitch>

          <ToggleSwitch>
            <ToggleLabel>Email Alerts</ToggleLabel>
            <Toggle
              active={settings.emailAlerts}
              onClick={() => handleInputChange("emailAlerts", !settings.emailAlerts)}
            />
          </ToggleSwitch>

          <ToggleSwitch>
            <ToggleLabel>SMS Alerts</ToggleLabel>
            <Toggle active={settings.smsAlerts} onClick={() => handleInputChange("smsAlerts", !settings.smsAlerts)} />
          </ToggleSwitch>
        </SettingsCard>

        {/* Security Settings */}
        <SettingsCard>
          <CardHeader>
            <CardIcon>
              <Shield size={20} />
            </CardIcon>
            <CardTitle>Security</CardTitle>
          </CardHeader>

          <ToggleSwitch>
            <ToggleLabel>Biometric Authentication</ToggleLabel>
            <Toggle
              active={settings.biometricAuth}
              onClick={() => handleInputChange("biometricAuth", !settings.biometricAuth)}
            />
          </ToggleSwitch>

          <ToggleSwitch>
            <ToggleLabel>Two-Factor Authentication</ToggleLabel>
            <Toggle
              active={settings.twoFactorAuth}
              onClick={() => handleInputChange("twoFactorAuth", !settings.twoFactorAuth)}
            />
          </ToggleSwitch>
        </SettingsCard>

        {/* Privacy Settings */}
        <SettingsCard>
          <CardHeader>
            <CardIcon>
              <Eye size={20} />
            </CardIcon>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>

          <ToggleSwitch>
            <ToggleLabel>Data Sharing</ToggleLabel>
            <Toggle
              active={settings.dataSharing}
              onClick={() => handleInputChange("dataSharing", !settings.dataSharing)}
            />
          </ToggleSwitch>

          <ToggleSwitch>
            <ToggleLabel>Location Tracking</ToggleLabel>
            <Toggle
              active={settings.locationTracking}
              onClick={() => handleInputChange("locationTracking", !settings.locationTracking)}
            />
          </ToggleSwitch>

          <FormGroup>
            <Label>Theme Preference</Label>
            <Select value={settings.theme} onChange={(e) => handleInputChange("theme", e.target.value)}>
              <option value="dark">Dark Mode</option>
              <option value="light">Light Mode</option>
              <option value="auto">Auto</option>
            </Select>
          </FormGroup>
        </SettingsCard>
      </SettingsGrid>

      <SaveButton onClick={handleSave}>
        <Save size={16} />
        Save Settings
      </SaveButton>
    </SettingsContainer>
  )
}

export default UserSettings
