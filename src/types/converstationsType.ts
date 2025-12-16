export type ConversationType = {
    id: string,
    commonSkillIds: string[],
    invitorUserId: string,
    invitedUserId: string,
    status: "Pending" | "Accepted" | "Refused",
    createdAt: Date,
    messages: MessageType[]
}

export type MessageType = {
    id: string,
    sentById: string,
    targetId: string,
    createdAt: Date,
    content: string,
    reactionsIds: string[],
    readByIds: string[]
}

export type ReactionType = {
    id: string,
    reactorPseudo: string,
    reactorId: string,
    targetMessageId: string,
    createdAt: Date,
    nature: "Haha" | "Like" | "Heart" | "Angry"
}

export type GroupWorkshopType = {
    id: string,
    commonSkillId: string,
    invitorUserId: string,
    invitedUserIds: string[],
    invitations: GroupWorkshopInvitationType[],
    createdAt: Date,
    messages: MessageType[]
}

export type GroupWorkshopInvitationType = {
    id: string,
    sentById: string,
    sentToId: string,
    groupWorkshopId: string,
    invitationStatus: "Seen" | "Accepted" | "Refused"
}