import ChoosedSkillInterface from "./skillsType";

export default interface userInterface {
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

    choosedTeachingSkills: ChoosedSkillInterface[],
    choosedLearningSkills: ChoosedSkillInterface[],

    asInvitorConversationIds: string[],
    asInvitedConversationIds: string[],
    blockedUsersIds: string[],
    blockedByIds: string[],

    asInvitorAppointmentsIds: string[],
    asInvitedAppointmentsIds: string[],

    notificationsIds: string[]
}