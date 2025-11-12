export default interface ConversationInterface {
    id: string,
    commonSkillId: string,
    invitorUserId: string,
    invitedUserId: string,
    status: "Pending" | "Accepted" | "Refused",
    createdAt: Date,
    messages: MessageInterface[]
}

export interface MessageInterface {
    id: string,
    sentById: string,
    targetId: string,
    createdAt: Date,
    content: string,
    reactions: ReactionInterface[],
    readByIds: string[]
}

export interface ReactionInterface {
    id: string,
    reactorId: string,
    targetMessageId: string,
    createdAt: Date,
    nature: "Haha" | "Like" | "Heart" | "Angry"
}

export interface GroupWorkshopInterface {
    id: string,
    commonSkillId: string,
    invitorUserId: string,
    invitedUserIds: string[],
    invitations: GroupWorkshopInvitationInterface[],
    createdAt: Date,
    messages: MessageInterface[]
}

export interface GroupWorkshopInvitationInterface {
    id: string,
    sentById: string,
    sentToId: string,
    groupWorkshopId: string,
    invitationStatus: "Seen" | "Accepted" | "Refused"
}