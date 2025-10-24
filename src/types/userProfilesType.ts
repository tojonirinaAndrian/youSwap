import skillInterface from "./skillsType";

export default interface profileInterface {
    fullName: string,
    profilePictureLink: string,
    helpedPeople: number,
    pseudo: string,
    level: number,
    title: string, titleColor: 'red' | 'blue',
    currentPoints: number,
    accumulatedPoints: number,
    leftPointsForNextLevel: number,
    description: string,
    skills: {
        learnSkills: skillInterface[], 
        teachSkills: skillInterface[]
    },
    pictures: string[],
    portfolioVideoLink: string,
    portfolioLinks: {
        linkId: string,
        label: string, 
        link: string
    }[]
}