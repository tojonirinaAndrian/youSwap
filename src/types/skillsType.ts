
export default interface ChoosedSkillInterface {
    id: string,
    skillId: string,
    name: string, 
    proficiency: 'Advanced' | "Intermediate" | "Beginner" | "Unset"
    state: "UserIsTeaching" | "UserIsLearning"
};

export interface SkillInterface {
    id: string,
    name: string,
    categoryName: "Art" | "Coding" | "Sport" | "Self-Development"
}
