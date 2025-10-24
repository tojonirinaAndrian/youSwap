
export default interface skillInterface {
    skillId: string,
    name: string, 
    level: 'advanced' | "intermediate" | "beginner"
};

export interface rawSkillInterface {
    skillId: string,
    name: string
}