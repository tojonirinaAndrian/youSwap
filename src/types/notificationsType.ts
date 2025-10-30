export default interface NotificationInterface {
    id: string,
    content: string,
    userId: string,
    seenStatus: Boolean,
    createdAt: Date
}