
export type ChoosedSkillType = {
    id: string,
    skillItself: SkillType,
    proficiency: 'Advanced' | "Intermediate" | "Beginner" | "Unset"
    state: "UserIsTeaching" | "UserIsLearning",
    userId: string
};

export type SkillType = {
    id: string,
    name: string,
    categoryName: "Art" | "Coding" | "Sport" | "Self-Development"
}
