"use client"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { AlertTriangle, ArrowLeft, Clock, User, MapPin, Phone, CheckCircle } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import StatusBadge from "../../components/ui/StatusBadge"
import FormInput from "../../components/auth/FormInput"

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  
  .header-left {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    
    h1 {
      font-family: ${(props) => props.theme.fonts.heading};
      font-size: 28px;
      font-weight: 700;
      color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
  
  .stats {
    display: flex;
    gap: ${(props) => props.theme.spacing.md};
  }
`

const FilterBar = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.surface : props.theme.colors.light.surface)};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  
  .search-container {
    flex: 1;
    max-width: 300px;
  }
  
  .filter-select {
    min-width: 120px;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
    border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
    border-radius: ${(props) => props.theme.borderRadius.md};
    color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
    font-size: 14px;
  }
`

const ComplaintsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`

const ComplaintCard = styled(Card)`
  .complaint-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    
    .complaint-info {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.md};
      
      .priority-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${(props) => {
          switch (props.priority) {
            case "critical":
              return props.theme.colors.secondary.red
            case "high":
              return props.theme.colors.secondary.amber
            default:
              return props.theme.colors.supportive.teal
          }
        }};
        
        svg {
          width: 20px;
          height: 20px;
          color: ${(props) => {
            switch (props.priority) {
              case "critical":
                return props.theme.colors.secondary.red
              case "high":
                return props.theme.colors.secondary.amber
              default:
                return props.theme.colors.supportive.teal
            }
          }};
        }
      }
      
      .details {
        .id {
          font-weight: 700;
          color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
          margin-bottom: 4px;
        }
        
        .type {
          font-size: 12px;
          color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
    
    .status-actions {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.md};
    }
  }
  
  .complaint-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: ${(props) => props.theme.spacing.xl};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
    
    .description {
      .label {
        font-size: 12px;
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: ${(props) => props.theme.spacing.sm};
      }
      
      .text {
        color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
        line-height: 1.5;
        background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
        padding: ${(props) => props.theme.spacing.md};
        border-radius: ${(props) => props.theme.borderRadius.md};
      }
    }
    
    .complaint-details {
      display: flex;
      flex-direction: column;
      gap: ${(props) => props.theme.spacing.md};
      
      .detail-item {
        display: flex;
        align-items: center;
        gap: ${(props) => props.theme.spacing.sm};
        
        .icon {
          width: 16px;
          height: 16px;
          color: ${(props) => props.theme.colors.supportive.coolGray};
        }
        
        .content {
          .label {
            font-size: 11px;
            color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .value {
            font-weight: 600;
            color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
            font-size: 13px;
          }
        }
      }
    }
  }
  
  .complaint-actions {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm};
    justify-content: flex-end;
    padding-top: ${(props) => props.theme.spacing.md};
    border-top: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  }
`

const ComplaintsManagement = ({ onNavigate }) => {
  const [complaints, setComplaints] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  useEffect(() => {
    // Simulate loading complaints data
    setComplaints([
      {
        id: "CMP-001",
        type: "Vehicle Theft",
        description:
          "My car was stolen from the parking lot at Main Street Plaza around 3 PM today. It's a blue Honda Civic with license plate XYZ-789. I have security footage from nearby cameras that might help.",
        reporter: "John Smith",
        phone: "+1 (555) 123-4567",
        location: "Main Street Plaza, Downtown",
        priority: "critical",
        status: "open",
        assignedTo: "Officer Johnson",
        reportedAt: "2024-01-20 15:30",
        lastUpdate: "2024-01-20 16:15",
      },
      {
        id: "CMP-002",
        type: "Suspicious Activity",
        description:
          "There have been suspicious individuals loitering around the school area for the past few days. They seem to be watching the children and taking photos. This is very concerning for parents.",
        reporter: "Sarah Wilson",
        phone: "+1 (555) 987-6543",
        location: "Lincoln Elementary School",
        priority: "high",
        status: "investigating",
        assignedTo: "Officer Davis",
        reportedAt: "2024-01-20 09:15",
        lastUpdate: "2024-01-20 14:30",
      },
      {
        id: "CMP-003",
        type: "Vandalism",
        description:
          "Someone spray-painted graffiti on the side of our building overnight. The damage is extensive and includes inappropriate language. We need this documented for insurance purposes.",
        reporter: "Mike Chen",
        phone: "+1 (555) 456-7890",
        location: "Commercial District, 5th Avenue",
        priority: "normal",
        status: "resolved",
        assignedTo: "Officer Martinez",
        reportedAt: "2024-01-19 08:00",
        lastUpdate: "2024-01-20 10:45",
      },
      {
        id: "CMP-004",
        type: "Noise Complaint",
        description:
          "Loud music and parties every night from the apartment upstairs. It's affecting my family's sleep and my children's school performance. This has been going on for weeks.",
        reporter: "Lisa Brown",
        phone: "+1 (555) 321-0987",
        location: "Residential Complex, Oak Street",
        priority: "normal",
        status: "open",
        assignedTo: "Officer Thompson",
        reportedAt: "2024-01-20 22:30",
        lastUpdate: "2024-01-20 22:30",
      },
    ])
  }, [])

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStatusUpdate = (complaintId, newStatus) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, status: newStatus, lastUpdate: new Date().toISOString().slice(0, 16).replace("T", " ") }
          : complaint,
      ),
    )
  }

  const openCount = complaints.filter((c) => c.status === "open").length
  const criticalCount = complaints.filter((c) => c.priority === "critical").length

  return (
    <div style={{ padding: "clamp(16px, 4vw, 32px)", maxWidth: "1400px", margin: "0 auto" }}>
      <PageHeader>
        <div className="header-left">
          <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")}>
            <ArrowLeft />
          </Button>
          <h1>Complaints Management</h1>
        </div>
        <div className="stats">
          <StatusBadge status="critical">{criticalCount} Critical</StatusBadge>
          <StatusBadge status="warning">{openCount} Open</StatusBadge>
          <StatusBadge status="active">{complaints.length} Total</StatusBadge>
        </div>
      </PageHeader>

      <FilterBar>
        <div className="search-container">
          <FormInput
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select className="filter-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
      </FilterBar>

      <ComplaintsList>
        {filteredComplaints.map((complaint) => (
          <ComplaintCard key={complaint.id} priority={complaint.priority}>
            <div className="complaint-header">
              <div className="complaint-info">
                <div className="priority-icon">
                  <AlertTriangle />
                </div>
                <div className="details">
                  <div className="id">{complaint.id}</div>
                  <div className="type">{complaint.type}</div>
                </div>
              </div>
              <div className="status-actions">
                <StatusBadge status={complaint.status}>{complaint.status}</StatusBadge>
                <StatusBadge status={complaint.priority}>{complaint.priority}</StatusBadge>
              </div>
            </div>

            <div className="complaint-content">
              <div className="description">
                <div className="label">Description</div>
                <div className="text">{complaint.description}</div>
              </div>

              <div className="complaint-details">
                <div className="detail-item">
                  <User className="icon" />
                  <div className="content">
                    <div className="label">Reporter</div>
                    <div className="value">{complaint.reporter}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <Phone className="icon" />
                  <div className="content">
                    <div className="label">Contact</div>
                    <div className="value">{complaint.phone}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <MapPin className="icon" />
                  <div className="content">
                    <div className="label">Location</div>
                    <div className="value">{complaint.location}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <Clock className="icon" />
                  <div className="content">
                    <div className="label">Reported</div>
                    <div className="value">{new Date(complaint.reportedAt).toLocaleString()}</div>
                  </div>
                </div>

                <div className="detail-item">
                  <User className="icon" />
                  <div className="content">
                    <div className="label">Assigned To</div>
                    <div className="value">{complaint.assignedTo}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="complaint-actions">
              {complaint.status === "open" && (
                <Button variant="secondary" size="sm" onClick={() => handleStatusUpdate(complaint.id, "investigating")}>
                  Start Investigation
                </Button>
              )}
              {complaint.status === "investigating" && (
                <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(complaint.id, "resolved")}>
                  <CheckCircle />
                  Mark Resolved
                </Button>
              )}
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="ghost" size="sm">
                Contact Reporter
              </Button>
            </div>
          </ComplaintCard>
        ))}
      </ComplaintsList>
    </div>
  )
}

export default ComplaintsManagement













// "use client"
// import { useState, useEffect } from "react"
// import styled from "styled-components"
// import { AlertTriangle, ArrowLeft, Clock, User, MapPin, Phone, CheckCircle } from "lucide-react"
// import Card from "../../components/ui/Card"
// import Button from "../../components/ui/Button"
// import StatusBadge from "../../components/ui/StatusBadge"
// import FormInput from "../../components/auth/FormInput"

// const PageHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: ${(props) => props.theme.spacing.xl};
  
//   .header-left {
//     display: flex;
//     align-items: center;
//     gap: ${(props) => props.theme.spacing.md};
    
//     h1 {
//       font-family: ${(props) => props.theme.fonts.heading};
//       font-size: 28px;
//       font-weight: 700;
//       color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//       text-transform: uppercase;
//       letter-spacing: 1px;
//     }
//   }
  
//   .stats {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.md};
//   }
// `

// const FilterBar = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.md};
//   align-items: center;
//   margin-bottom: ${(props) => props.theme.spacing.xl};
//   padding: ${(props) => props.theme.spacing.lg};
//   background-color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.surface : props.theme.colors.light.surface)};
//   border-radius: ${(props) => props.theme.borderRadius.lg};
//   border: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
  
//   .search-container {
//     flex: 1;
//     max-width: 300px;
//   }
  
//   .filter-select {
//     min-width: 120px;
//     padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
//     background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//     border: 2px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)};
//     border-radius: ${(props) => props.theme.borderRadius.md};
//     color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//     font-size: 14px;
//   }
// `

// const ComplaintsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.lg};
// `

// const ComplaintCard = styled(Card)`
//   .complaint-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: ${(props) => props.theme.spacing.lg};
    
//     .complaint-info {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.md};
      
//       .priority-icon {
//         width: 40px;
//         height: 40px;
//         border-radius: 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         background-color: ${(props) => {
//           switch (props.priority) {
//             case "critical":
//               return props.theme.colors.secondary.red
//             case "high":
//               return props.theme.colors.secondary.amber
//             default:
//               return props.theme.colors.supportive.teal
//           }
//         }}20;
        
//         svg {
//           width: 20px;
//           height: 20px;
//           color: ${(props) => {
//             switch (props.priority) {
//               case "critical":
//                 return props.theme.colors.secondary.red
//               case "high":
//                 return props.theme.colors.secondary.amber
//               default:
//                 return props.theme.colors.supportive.teal
//             }
//           }};
//         }
//       }
      
//       .details {
//         .id {
//           font-weight: 700;
//           color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//           margin-bottom: 4px;
//         }
        
//         .type {
//           font-size: 12px;
//           color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }
//       }
//     }
    
//     .status-actions {
//       display: flex;
//       align-items: center;
//       gap: ${(props) => props.theme.spacing.md};
//     }
//   }
  
//   .complaint-content {
//     display: grid;
//     grid-template-columns: 2fr 1fr;
//     gap: ${(props) => props.theme.spacing.xl};
//     margin-bottom: ${(props) => props.theme.spacing.lg};
    
//     @media (max-width: 768px) {
//       grid-template-columns: 1fr;
//     }
    
//     .description {
//       .label {
//         font-size: 12px;
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//         margin-bottom: ${(props) => props.theme.spacing.sm};
//       }
      
//       .text {
//         color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//         line-height: 1.5;
//         background-color: ${(props) => (props.theme.isDark ? props.theme.colors.primary.darkNavy : props.theme.colors.supportive.lightGray)};
//         padding: ${(props) => props.theme.spacing.md};
//         border-radius: ${(props) => props.theme.borderRadius.md};
//       }
//     }
    
//     .complaint-details {
//       display: flex;
//       flex-direction: column;
//       gap: ${(props) => props.theme.spacing.md};
      
//       .detail-item {
//         display: flex;
//         align-items: center;
//         gap: ${(props) => props.theme.spacing.sm};
        
//         .icon {
//           width: 16px;
//           height: 16px;
//           color: ${(props) => props.theme.colors.supportive.coolGray};
//         }
        
//         .content {
//           .label {
//             font-size: 11px;
//             color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.textSecondary : props.theme.colors.light.textSecondary)};
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//           }
          
//           .value {
//             font-weight: 600;
//             color: ${(props) => (props.theme.isDark ? props.theme.colors.dark.text : props.theme.colors.light.text)};
//             font-size: 13px;
//           }
//         }
//       }
//     }
//   }
  
//   .complaint-actions {
//     display: flex;
//     gap: ${(props) => props.theme.spacing.sm};
//     justify-content: flex-end;
//     padding-top: ${(props) => props.theme.spacing.md};
//     border-top: 1px solid ${(props) => (props.theme.isDark ? props.theme.colors.primary.deepBlue : props.theme.colors.supportive.coolGray)}40;
//   }
// `

// const ComplaintsManagement = ({ onNavigate }) => {
//   const [complaints, setComplaints] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [priorityFilter, setPriorityFilter] = useState("all")

//   useEffect(() => {
//     // Simulate loading complaints data
//     setComplaints([
//       {
//         id: "CMP-001",
//         type: "Vehicle Theft",
//         description:
//           "My car was stolen from the parking lot at Main Street Plaza around 3 PM today. It's a blue Honda Civic with license plate XYZ-789. I have security footage from nearby cameras that might help.",
//         reporter: "John Smith",
//         phone: "+1 (555) 123-4567",
//         location: "Main Street Plaza, Downtown",
//         priority: "critical",
//         status: "open",
//         assignedTo: "Officer Johnson",
//         reportedAt: "2024-01-20 15:30",
//         lastUpdate: "2024-01-20 16:15",
//       },
//       {
//         id: "CMP-002",
//         type: "Suspicious Activity",
//         description:
//           "There have been suspicious individuals loitering around the school area for the past few days. They seem to be watching the children and taking photos. This is very concerning for parents.",
//         reporter: "Sarah Wilson",
//         phone: "+1 (555) 987-6543",
//         location: "Lincoln Elementary School",
//         priority: "high",
//         status: "investigating",
//         assignedTo: "Officer Davis",
//         reportedAt: "2024-01-20 09:15",
//         lastUpdate: "2024-01-20 14:30",
//       },
//       {
//         id: "CMP-003",
//         type: "Vandalism",
//         description:
//           "Someone spray-painted graffiti on the side of our building overnight. The damage is extensive and includes inappropriate language. We need this documented for insurance purposes.",
//         reporter: "Mike Chen",
//         phone: "+1 (555) 456-7890",
//         location: "Commercial District, 5th Avenue",
//         priority: "normal",
//         status: "resolved",
//         assignedTo: "Officer Martinez",
//         reportedAt: "2024-01-19 08:00",
//         lastUpdate: "2024-01-20 10:45",
//       },
//       {
//         id: "CMP-004",
//         type: "Noise Complaint",
//         description:
//           "Loud music and parties every night from the apartment upstairs. It's affecting my family's sleep and my children's school performance. This has been going on for weeks.",
//         reporter: "Lisa Brown",
//         phone: "+1 (555) 321-0987",
//         location: "Residential Complex, Oak Street",
//         priority: "normal",
//         status: "open",
//         assignedTo: "Officer Thompson",
//         reportedAt: "2024-01-20 22:30",
//         lastUpdate: "2024-01-20 22:30",
//       },
//     ])
//   }, [])

//   const filteredComplaints = complaints.filter((complaint) => {
//     const matchesSearch =
//       complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       complaint.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       complaint.location.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
//     const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter

//     return matchesSearch && matchesStatus && matchesPriority
//   })

//   const handleStatusUpdate = (complaintId, newStatus) => {
//     setComplaints((prev) =>
//       prev.map((complaint) =>
//         complaint.id === complaintId
//           ? { ...complaint, status: newStatus, lastUpdate: new Date().toISOString().slice(0, 16).replace("T", " ") }
//           : complaint,
//       ),
//     )
//   }

//   const openCount = complaints.filter((c) => c.status === "open").length
//   const criticalCount = complaints.filter((c) => c.priority === "critical").length

//   return (
//     <div>
//       <PageHeader>
//         <div className="header-left">
//           <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")}>
//             <ArrowLeft />
//           </Button>
//           <h1>Complaints Management</h1>
//         </div>
//         <div className="stats">
//           <StatusBadge status="critical">{criticalCount} Critical</StatusBadge>
//           <StatusBadge status="warning">{openCount} Open</StatusBadge>
//           <StatusBadge status="active">{complaints.length} Total</StatusBadge>
//         </div>
//       </PageHeader>

//       <FilterBar>
//         <div className="search-container">
//           <FormInput
//             placeholder="Search complaints..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//           <option value="all">All Status</option>
//           <option value="open">Open</option>
//           <option value="investigating">Investigating</option>
//           <option value="resolved">Resolved</option>
//           <option value="closed">Closed</option>
//         </select>

//         <select className="filter-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
//           <option value="all">All Priority</option>
//           <option value="critical">Critical</option>
//           <option value="high">High</option>
//           <option value="normal">Normal</option>
//           <option value="low">Low</option>
//         </select>
//       </FilterBar>

//       <ComplaintsList>
//         {filteredComplaints.map((complaint) => (
//           <ComplaintCard key={complaint.id} priority={complaint.priority}>
//             <div className="complaint-header">
//               <div className="complaint-info">
//                 <div className="priority-icon">
//                   <AlertTriangle />
//                 </div>
//                 <div className="details">
//                   <div className="id">{complaint.id}</div>
//                   <div className="type">{complaint.type}</div>
//                 </div>
//               </div>
//               <div className="status-actions">
//                 <StatusBadge status={complaint.status}>{complaint.status}</StatusBadge>
//                 <StatusBadge status={complaint.priority}>{complaint.priority}</StatusBadge>
//               </div>
//             </div>

//             <div className="complaint-content">
//               <div className="description">
//                 <div className="label">Description</div>
//                 <div className="text">{complaint.description}</div>
//               </div>

//               <div className="complaint-details">
//                 <div className="detail-item">
//                   <User className="icon" />
//                   <div className="content">
//                     <div className="label">Reporter</div>
//                     <div className="value">{complaint.reporter}</div>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <Phone className="icon" />
//                   <div className="content">
//                     <div className="label">Contact</div>
//                     <div className="value">{complaint.phone}</div>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <MapPin className="icon" />
//                   <div className="content">
//                     <div className="label">Location</div>
//                     <div className="value">{complaint.location}</div>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <Clock className="icon" />
//                   <div className="content">
//                     <div className="label">Reported</div>
//                     <div className="value">{new Date(complaint.reportedAt).toLocaleString()}</div>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <User className="icon" />
//                   <div className="content">
//                     <div className="label">Assigned To</div>
//                     <div className="value">{complaint.assignedTo}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="complaint-actions">
//               {complaint.status === "open" && (
//                 <Button variant="secondary" size="sm" onClick={() => handleStatusUpdate(complaint.id, "investigating")}>
//                   Start Investigation
//                 </Button>
//               )}
//               {complaint.status === "investigating" && (
//                 <Button variant="outline" size="sm" onClick={() => handleStatusUpdate(complaint.id, "resolved")}>
//                   <CheckCircle />
//                   Mark Resolved
//                 </Button>
//               )}
//               <Button variant="outline" size="sm">
//                 View Details
//               </Button>
//               <Button variant="ghost" size="sm">
//                 Contact Reporter
//               </Button>
//             </div>
//           </ComplaintCard>
//         ))}
//       </ComplaintsList>
//     </div>
//   )
// }

// export default ComplaintsManagement