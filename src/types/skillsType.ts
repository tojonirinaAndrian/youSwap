
export default interface ChoosedSkillInterface {
    id: string,
    skillItself: SkillInterface,
    proficiency: 'Advanced' | "Intermediate" | "Beginner" | "Unset"
    state: "UserIsTeaching" | "UserIsLearning",
    userId: string
};

export interface SkillInterface {
    id: string,
    name: string,
    categoryName: "Art" | "Coding" | "Sport" | "Self-Development"
}
