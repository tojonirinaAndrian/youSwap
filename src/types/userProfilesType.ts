import { ChoosedSkillType } from "./skillsType";

export type userType = {
    id: string,
    email: string,

    fullName: string,
    pseudo: string,
    age: number,
    gender: "male" | "female" | "other"

    currentPoints: number,
    accumulatedPoints: number,
    level: number,
    evolutionStatus: "Noob" | "Bloom" | "Seasoned" | "Expert",
    titleColor: "blue" | "yellow" | "orange" | "red",
    profilePicture: string,
    profileDescription : string,

    availablility: "Online" | "InPerson" | "Both"
    generalRate: number,
    doneAppointmentsNumber: number,
    
    portfolioVideo: string,
    portfolioLinks: {
        id: string,
        label: string,
        link: string
    }[],
    pictures: string[],

    createdAt: Date,
    updateAt: Date,

    choosedTeachingSkills: ChoosedSkillType[],
    choosedLearningSkills: ChoosedSkillType[],

    asInvitorConversationIds: string[],
    asInvitedConversationIds: string[],
    blockedUsersIds: string[],
    blockedByIds: string[],

    asInvitorAppointmentsIds: string[],
    asInvitedAppointmentsIds: string[],

    notificationsIds: string[]
}