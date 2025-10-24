'use client';
import { useState } from "react";
interface skillInterface {
    name: String, 
    level: 'advanced' | "intermediate" | "beginner"
}
interface profileInterface {
    fullName: String,
    pseudo: String,
    level: Number,
    title: String, titleColor: String,
    currentPoints: Number,
    accumulatedPoints: Number,
    leftPointsForNextLevel: Number,
    description: String,
    skills: {
        learnSkills: skillInterface[], 
        teachSkills: skillInterface[]
    },
    pictures: String[],
    portfolioVideoLink: String,
    portfolioLinks: {
        label: String, 
        link: String
    }[]
}
export default function ModifyProfilePage (props: profileInterface) {
    const [userProfile, setUserProfile] = useState<profileInterface>(props)
    const maximumLength: number = 5;
    return <>

    </>
}