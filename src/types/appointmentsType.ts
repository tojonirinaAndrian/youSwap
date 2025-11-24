export type AppointmentType = {
    id: string,
    title: string,
    description: string,
    invitorUserId: string,
    invitedUserId: string,
    scheduledDate: Date,
    appointmentStatus: "Done" | "Accepted" | "Refused" | "Pending"
    createdAt: Date
}