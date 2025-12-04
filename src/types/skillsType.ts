
export type ChoosedSkillType = {
    id: string,
    skillItself: SkillType,
    proficiency: 'Advanced' | "Intermediate" | "Beginner" | "Unset"
    state: "UserIsTeaching" | "UserIsLearning",
    userId: string,
    skillId: string
};

export type SkillType = {
    id: string,
    name: string,
    categoryName: "Art" | "Coding" | "Sport" | "SelfDevelopment"
}
