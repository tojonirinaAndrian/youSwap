export default interface NotificationInterface {
    id: string,
    content: string,
    userId: string,
    seenStatus: boolean,
    createdAt: Date
}