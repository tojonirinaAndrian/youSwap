'use client'
import { useGlobalStore } from "@/store/use-global-store";
import { useState } from "react";
import { Search } from "lucide-react";
import { SkillInterface } from "@/src/types/skillsType";

export default function SkillsPage() {
    const { whereIsLoginRegisterPage, setWhereIsLoginRegisterPage } = useGlobalStore()
    const skills: string[] = [
        'guitar', 'coding', 'drawing', 'photographing', 'piano'
    ]
    const [ learnSkills, setLearnSkills ] = useState<SkillInterface[] | undefined>([]);
    const [ teachSkills, setTeachSkills ] = useState<SkillInterface[] | undefined>([]);
    
    return (<>
        <div className="space-y-8 w-full">
            <button className="filledButton" 
                onClick={() => setWhereIsLoginRegisterPage("infos")}
            >Back</button>
            <div className='space-y-2 md:max-w-[70%] text-center mx-auto'>
               <h2>What are the skills you want to learn ?</h2>               
            </div>
            <div className="space-y-5">
                <div className="border focus:border-black w-full rounded-md p-3 flex">
                    <input type="text"
                    className="w-full" placeholder="Search for a skill"/>
                    <Search />
                </div>
                <div className="flex gap-2">
                    {skills.map((skill, index) => {
                        return(<button key={index} className="borderedButton">{skill}</button>
                        )
                    })}
                </div>
                
            </div>
            
        </div>
    </>)
}