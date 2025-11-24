'use client';
import {ChoosedSkillType} from "@/src/types/skillsType";
import { SkillType } from "@/src/types/skillsType";
import {userType} from "@/src/types/userProfilesType";
import { X, Search} from "lucide-react";
import { useState } from "react";
import uuid from "react-uuid";

interface addNewSkillModalProps {
    whereIsSkills: 'teach' | "learn",
    setProfileState: (arg0: userType) => void,
    profileState: userType,
}

export default function SkillChoosingMainContent (props: addNewSkillModalProps) {
    const [newSkillsList, setNewSkillsList] = useState<ChoosedSkillType[]> (
        props.whereIsSkills === "learn" ? props.profileState.choosedLearningSkills
        : props.profileState.choosedTeachingSkills
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const categoriesToChooseFrom: string[] = [
        "sport", "art", "education", "code"
    ];
    const [skillsPropositions, setSkillsPropositions] = useState<SkillType[]> ([])
    const handleDeleteSkill = (skillToDeleteId: string) => {
        const mockSkills: ChoosedSkillType[] = [];
        if (props.whereIsSkills === 'learn') {
            props.profileState.choosedLearningSkills.map((skill) => {
                if (skill.id !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
        } else {
            props.profileState.choosedTeachingSkills.map((skill) => {
                if (skill.id !== skillToDeleteId) {
                    mockSkills.push(skill)
                }
            })
        }
        setNewSkillsList(mockSkills);
    }

    function handleOnCategoryClick (categoryName: string) {
        //looking for skills with the specific category
        // const result = skillType[].where{categoryName ~= categoryName}
        // setSkillsPropositions(result)
    }

    function handleOnSearchInput (query: string) {
        //looking for skills with that category name or name
        // const result = skillType[].where{categoryName has query || name has query}
    }

    function handleOnSkillClick (skill: SkillType) {
        setNewSkillsList ([
            ...newSkillsList, {
                id : uuid(),
                userId: props.profileState.id,
                skillItself: skill,
                state: props.whereIsSkills === "learn" ? "UserIsLearning" : "UserIsTeaching",
                proficiency: 'Unset'
            }
        ])
    }

    return <>
        {newSkillsList.length > 0 ? <div className="space-y-1">
            <p className="text-black/70">Currently choosed skills :</p>
            <div className="flex gap-2">
                {newSkillsList.map((skill) => {
                    return <div className="relative" key={skill.id}>
                        <div className="filledStyle !inline-block !cursor-auto">
                            {skill.skillItself.name}
                        </div>
                        <div 
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="absolute -top-1 -right-1 cursor-pointer bg-red-200 rounded-[5px] p-0.5 text-red-700 border-red-500 hover:bg-red-300"
                        >
                            <X size={12}/>
                        </div>
                    </div>
                })}
            </div>
        </div> : <p className="text-black/70">
            Please, search and select skills.
        </p>}
        {(newSkillsList.length < 5) ? <>
            <div className="space-y-1">
                <div>Select categories you wish to look from : </div>
                <div className="*:inline-block space-x-2 space-y-2">
                    {categoriesToChooseFrom.map((category: string, i: number) => {
                        let isCategorySelected: boolean = false;
                        for (let i = 0; i <= selectedCategories.length; i++) {
                            if (selectedCategories[i] === category) {
                                isCategorySelected = true
                            } else {
                                continue
                            }
                        }
                        return <div key={i} className="">
                            <button className={`capitalize ${isCategorySelected ? `filledButton hover:!bg-blueDianne hover:!text-lightCream` : `borderedButton hover:!bg-lightCream hover:!text-blueDianne`}`}
                            onClick={()=>{
                                let referencedTable: string[] = [...selectedCategories];
                                if (!isCategorySelected) {
                                    referencedTable.push(category)
                                } else {
                                    const newTable: string[] = [];
                                    for (let i = 0; i <= referencedTable.length; i++) {
                                        if (referencedTable[i] === category) {
                                            continue
                                        } else {
                                            newTable.push(referencedTable[i]);
                                        }
                                    }
                                    referencedTable = [ ...newTable ];
                                }
                                setSelectedCategories([ ...referencedTable ]);
                            }}
                            >{category}</button>
                        </div>
                    })}
                    
                </div>
            </div>

            <div className='w-full border rounded-md p-3 flex gap-2'>
                <input
                    type="text" 
                    placeholder="Search for a skill"
                    className="w-full text-sm"
                /><Search />
            </div>

            {/* Suggestion SKILLS LIST according to the search input SHOULD BE HERE, 
            When clicking a skill, this one is automatically added to the current list of skills. 
            */}

        </> : <>
            <p className="w-full text-center space-x-2 items-center text-red-700 bg-red-100 px-5 py-3 rounded-md">
                <span>You hit the maximum number of Skills you can add.</span>
            </p>
        </>}
    </>
}