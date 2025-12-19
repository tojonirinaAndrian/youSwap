
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
    categoryName: "ART_AND_DESIGN" | "CODING_AND_TECH" | "LANGUAGES" 
    | "MUSIC_AND_AUDIO" | "COOKING_AND_CRAFT" 
    | "BUSINESS_AND_MARKETING" | "HEALTH_AND_WELLNESS"
    | "ACADEMICS" | "SPORTS_AND_FITNESS"
    | "LIFESTYLE_AND_HOME"
}

export const categoryNames: string[] = [
    "ART_AND_DESIGN", "CODING_AND_TECH", "LANGUAGES", 
    "MUSIC_AND_AUDIO", "COOKING_AND_CRAFT", "BUSINESS_AND_MARKETING", 
    "HEALTH_AND_WELLNESS", "ACADEMICS", "SPORTS_AND_FITNESS", 
    "LIFESTYLE_AND_HOME"
]