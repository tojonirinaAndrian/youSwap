'use client';
import { SkillType, ChoosedSkillType } from "@/src/types/skillsType";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const randomSkills :SkillType[] = [
    {   
        id: "123",
        name: "Drawing",
        categoryName: "Art"
    },
    {
        id: "1234",
        name: "React Framework",
        categoryName: "Coding"
    },
    {
        id: "12345",
        name: "Basketball",
        categoryName: "Sport"
    }
]

async function onAddSkillsClick () {
    try {
        const response = await axios.post(`${backendUrl}/addSkillsTest`, {
            skillsToAdd : randomSkills   
        })
        console.log(response);
    } catch (e) {
        console.log(e)
    }
}

export default function TestsPage () {
    return <div className="space-y-2 w-full p-5">
        <button className="cursor-pointer filledButton"
        onClick={onAddSkillsClick}
        >
            Click me to add mock skills to db.
        </button>
    </div>
}